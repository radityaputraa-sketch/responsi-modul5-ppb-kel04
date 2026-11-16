import { useState, useEffect, useCallback } from 'react'
import quoteService, { getLocalQuote } from '../services/quoteService'

// Ambil kutipan dari API; jika gagal / offline pakai kutipan lokal.
export function useQuote() {
  const [quote, setQuote] = useState(() => getLocalQuote())
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState('lokal')

  const fetchQuote = useCallback(async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setQuote(getLocalQuote())
      setSource('lokal')
      return
    }
    try {
      setLoading(true)
      const q = await quoteService.getRandom()
      setQuote(q)
      setSource('api')
    } catch {
      setQuote(getLocalQuote())
      setSource('lokal')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  return { quote, loading, source, refetch: fetchQuote }
}
