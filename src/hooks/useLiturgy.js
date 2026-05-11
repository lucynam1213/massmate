import { useState, useEffect } from 'react'
import { fetchTodayLiturgy } from '../services/liturgicalCalendarService'

export function useLiturgy() {
  const [liturgy, setLiturgy]   = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchTodayLiturgy().then((data) => {
      if (!cancelled) {
        setLiturgy(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [])

  return { liturgy, loading }
}
