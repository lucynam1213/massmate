import { useState, useEffect } from 'react'
import { fetchTodayMass } from '../services/massService'

/**
 * Loads today's Mass data via the service layer.
 * Returns { massInfo, loading, error } — components should handle all three.
 *
 * When fetchTodayMass() is replaced with a real API call, this hook
 * automatically gains proper loading/error states with no further changes.
 */
export function useMassData() {
  const [massInfo, setMassInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetchTodayMass()
      .then((data) => {
        if (!cancelled) {
          setMassInfo(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { massInfo, loading, error }
}
