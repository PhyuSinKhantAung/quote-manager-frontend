'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
    } else {
      router.push('/quotes')
    }
  }, [router])

  // Return a loading state or null while checking
  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      Loading...
    </div>
  )
}
