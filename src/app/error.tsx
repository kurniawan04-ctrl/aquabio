'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Terjadi Kesalahan
        </h1>
        <p className="text-gray-600 mb-6">
          {error.message || 'Terjadi kesalahan yang tidak diketahui'}
        </p>
        
        {error.message?.includes('Supabase') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-yellow-800">
              <strong>Setup Required:</strong> Pastikan file <code className="bg-yellow-100 px-1 rounded">.env.local</code> sudah dibuat dengan:
            </p>
            <pre className="text-xs mt-2 bg-yellow-100 p-2 rounded overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key`}
            </pre>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="default">
            Coba Lagi
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Ke Login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

