import { useState, useEffect, useCallback } from 'react'

export const ROUTES = ['/', '/tugas', '/profil', '/tentang']

const read = () => {
  const h = window.location.hash.replace(/^#/, '') || '/'
  return ROUTES.includes(h) ? h : '/'
}

// Router sederhana berbasis hash (#/tugas). Tidak butuh konfigurasi server,
// refresh halaman aman, dan tetap jalan offline.
export function useHashRoute() {
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const onChange = () => {
      setRoute(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = useCallback((to) => {
    window.location.hash = to
  }, [])

  return { route, navigate }
}
