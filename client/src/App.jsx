import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteProvider } from './context/SiteContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Concert from './pages/Concert'
import Artistes from './pages/Artistes'
import Contact from './pages/Contact'
import './App.css'

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="concert" element={<Concert />} />
            <Route path="artistes" element={<Artistes />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  )
}
