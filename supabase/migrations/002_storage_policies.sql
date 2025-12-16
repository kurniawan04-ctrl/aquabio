-- Storage Policies untuk bucket biota_images
-- Jalankan migration ini di Supabase SQL Editor setelah bucket dibuat

-- Policy 1: Authenticated users dapat upload gambar
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'biota_images');

-- Policy 2: Anyone dapat melihat gambar (public read)
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'biota_images');

-- Policy 3: Users dapat menghapus gambar mereka sendiri
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'biota_images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 4: Users dapat update gambar mereka sendiri (opsional, jika perlu)
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'biota_images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'biota_images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

