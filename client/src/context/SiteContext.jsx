import { createContext, useContext, useEffect, useState } from 'react'

const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [site, setSite] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const res = await fetch('/api/site')
        if (!res.ok) throw new Error('Unable to load site content.')
        const data = await res.json()
        if (!active) return
        setSite(data)
      } catch (err) {
        if (!active) return
        setError(err.message || 'Failed to load.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  return (
    <SiteContext.Provider value={{ site, error, loading }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
