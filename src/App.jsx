import Header from './components/Header'
import PWABadge from './components/PWABadge'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import About from './pages/About'
import { useHashRoute } from './hooks/useHashRoute'
import { useOnlineStatus } from './hooks/useOnlineStatus'

export default function App() {
  const { route, navigate } = useHashRoute()
  const online = useOnlineStatus()

  return (
    <div className="shell">
      <Header route={route} online={online} />
      <main className="main">
        {route === '/' && <Home navigate={navigate} />}
        {route === '/tugas' && <Tasks />}
        {route === '/profil' && <Profile />}
        {route === '/tentang' && <About />}
      </main>
      <footer className="footer">
        <p>StudyFlow &middot; PWA Praktikum PPB 2026 Ganjil</p>
      </footer>
      <PWABadge />
    </div>
  )
}
