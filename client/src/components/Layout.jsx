import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { useSite } from '../context/SiteContext'

export default function Layout() {
  const { loading, error } = useSite()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (loading) {
    return (
      <div className="state-screen">
        <div>
          <div className="spinner" aria-hidden="true" />
          <p>Loading Canadian Gospel Artistes…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-screen">
        <div>
          <h1>Canadian Gospel Artistes</h1>
          <p>{error}</p>
          <p>Start the server, then refresh.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="site">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
