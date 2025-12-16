'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface BiotaData {
  id: string
  name: string
  location: string
  category?: string
  description?: string
  image_url?: string
  photographer?: string
  user_id?: string
  created_at?: string
}

export async function getBiota(search?: string, category?: string, location?: string) {
  const supabase = await createClient()
  
  let query = supabase
    .from('biota')
    .select('*')

  // Apply category filter (if provided)
  if (category) {
    query = query.eq('category', category)
  }

  // Apply location filter (if provided)
  if (location) {
    query = query.eq('location', location)
  }

  // Order by created_at descending
  query = query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  // If search is provided, apply strict filtering on client-side
  // This ensures only truly matching results are returned
  if (search && search.trim() && data) {
    const searchTerm = search.trim().toLowerCase()
    
    // Very strict filter: only return items where search term appears in name
    // Split search term into words for better matching
    const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0)
    
    const filtered = data.filter((item: any) => {
      const name = (item.name || '').toLowerCase().trim()
      
      // If name is empty, exclude
      if (!name) {
        return false
      }
      
      // Check if ALL search words appear in name (for multi-word searches)
      // OR if the entire search term appears in name (for single word)
      if (searchWords.length > 1) {
        // Multi-word search: all words must be in name
        const allWordsMatch = searchWords.every(word => name.includes(word))
        if (allWordsMatch) {
          return true
        }
      } else {
        // Single word search: word must be in name
        if (name.includes(searchTerm)) {
          return true
        }
      }
      
      // Optional: exact match for category (only if search term is exactly the category name)
      const itemCategory = (item.category || '').toLowerCase().trim()
      if (itemCategory && itemCategory === searchTerm) {
        return true
      }
      
      // Don't include if no match
      return false
    })
    
    console.log(`🔍 Search: "${search}" - Found ${filtered.length} results out of ${data.length} total`)
    console.log(`📋 Filtered results:`, filtered.map((item: any) => item.name))
    return filtered
  }

  // If no search, return all data
  return data || []
}

export async function getBiotaById(id: string) {
  const supabase = await createClient()
  
  // Fetch biota data without join (to avoid relationship error)
  const { data, error } = await supabase
    .from('biota')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // If biota has user_id, fetch profile separately
  if (data && data.user_id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('username, full_name')
      .eq('id', data.user_id)
      .single()
    
    // Add profile data to biota object
    if (profile) {
      return {
        ...data,
        profiles: profile
      }
    }
  }

  return data
}

export async function createBiota(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const imageFile = formData.get('image') as File | null
  
  let imageUrl = formData.get('imageUrl') as string | null

  // Upload image to Supabase Storage if file provided
  if (imageFile && imageFile.size > 0) {
    console.log('📤 Uploading image to Supabase Storage...', {
      fileName: imageFile.name,
      fileSize: imageFile.size,
      fileType: imageFile.type,
      userId: user.id
    })

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!imageFile.type || !allowedTypes.includes(imageFile.type)) {
      throw new Error(`Tipe file tidak didukung. Gunakan: JPG, PNG, WEBP, atau GIF. File Anda: ${imageFile.type || 'unknown'}`)
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (imageFile.size > maxSize) {
      throw new Error(`Ukuran file terlalu besar. Maksimal 10MB. File Anda: ${(imageFile.size / 1024 / 1024).toFixed(2)}MB`)
    }

    const fileExt = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `${user.id}/${Date.now()}.${fileExt}`
    
    console.log('📁 Uploading to:', `biota_images/${fileName}`)
    
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('biota_images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('❌ Storage upload error:', {
          message: uploadError.message,
          error: uploadError
        })
        
        // Provide more specific error messages
        if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('does not exist')) {
          throw new Error(`Bucket "biota_images" tidak ditemukan. Pastikan bucket sudah dibuat di Supabase Storage dengan nama exact "biota_images" (dengan underscore).`)
        } else if (uploadError.message.includes('Permission denied') || uploadError.message.includes('new row violates')) {
          throw new Error(`Permission denied. Pastikan bucket "biota_images" adalah public atau RLS policies sudah dikonfigurasi untuk authenticated users.`)
        } else {
          throw new Error(`Gagal upload gambar: ${uploadError.message}. Pastikan bucket "biota_images" sudah dibuat dan dikonfigurasi dengan benar di Supabase Storage.`)
        }
      } else {
        console.log('✅ Image uploaded successfully:', uploadData.path)

        const { data: { publicUrl } } = supabase.storage
          .from('biota_images')
          .getPublicUrl(uploadData.path)

        console.log('🔗 Public URL:', publicUrl)
        imageUrl = publicUrl
      }
    } catch (error: any) {
      console.error('💥 Upload exception:', error)
      // Re-throw with original message if it's already our custom error
      if (error.message && error.message.includes('Bucket') || error.message.includes('Permission')) {
        throw error
      }
      throw new Error(`Gagal upload gambar: ${error.message || 'Unknown error'}`)
    }
  } else if (!imageUrl) {
    throw new Error('Foto biota harus diupload!')
  }

  const { data, error } = await supabase
    .from('biota')
    .insert({
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      category: (formData.get('category') as string) || 'Ikan Air Tawar',
      description: formData.get('description') as string || null,
      photographer: formData.get('photographer') as string || null,
      image_url: imageUrl,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/beranda')
  revalidatePath('/gallery')
  return data
}

export async function updateBiota(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if user owns this biota or is admin
  const { data: biota } = await supabase
    .from('biota')
    .select('user_id')
    .eq('id', id)
    .single()

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (biota?.user_id !== user.id && !profile?.is_admin) {
    throw new Error('Unauthorized')
  }

  const imageFile = formData.get('image') as File | null
  let imageUrl = formData.get('imageUrl') as string | null

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('biota_images')
      .upload(fileName, imageFile)

    if (uploadError) throw new Error(uploadError.message)

    const { data: { publicUrl } } = supabase.storage
      .from('biota_images')
      .getPublicUrl(uploadData.path)

    imageUrl = publicUrl
  }

  const updateData: any = {
    name: formData.get('name') as string,
    location: formData.get('location') as string,
    category: (formData.get('category') as string) || 'Ikan Air Tawar',
    description: formData.get('description') as string || null,
    photographer: formData.get('photographer') as string || null,
  }

  if (imageUrl) {
    updateData.image_url = imageUrl
  }

  const { data, error } = await supabase
    .from('biota')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/beranda')
  revalidatePath('/gallery')
  revalidatePath(`/biota/${id}`)
  return data
}

export async function deleteBiota(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Check if user owns this biota or is admin
  const { data: biota } = await supabase
    .from('biota')
    .select('user_id')
    .eq('id', id)
    .single()

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (biota?.user_id !== user.id && !profile?.is_admin) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('biota')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/beranda')
  revalidatePath('/gallery')
}

