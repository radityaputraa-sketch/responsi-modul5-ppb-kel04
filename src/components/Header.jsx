import { Home, ListChecks, User, Info, CheckCheck } from 'lucide-react'

export const NAV_ITEMS = [
  { path: '/', label: 'Beranda', icon: Home },
  { path: '/tugas', label: 'Tugas', icon: ListChecks },
  { path: '/profil', label: 'Profil', icon: User },
  { path: '/tentang', label: 'Tentang', icon: Info },
]

export default function Header({ route, online }) {
  return (
    <>
      <header className="header">
        <a href="#/" className="brand" aria-label="StudyFlow beranda">
          <span className="brand-badge"><CheckCheck size={18} /></span>
          <span className="brand-name">StudyFlow</span>
        </a>
        <nav className="nav-top" aria-label="Navigasi utama">
          {NAV_ITEMS.map(({ path, label }) => (
            <a key={path} href={`#${path}`} className={`nav-link ${route === path ? 'active' : ''}`}>
              {label}
            </a>
          ))}
        </nav>
        <span className={`net-dot ${online ? 'net-dot--on' : 'net-dot--off'}`} title={online ? 'Online' : 'Offline'}>
          {online ? 'Online' : 'Offline'}
        </span>
      </header>

      <nav className="nav-bottom" aria-label="Navigasi utama (mobile)">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <a key={path} href={`#${path}`} className={`nav-bottom-link ${route === path ? 'active' : ''}`}>
            <Icon size={20} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
