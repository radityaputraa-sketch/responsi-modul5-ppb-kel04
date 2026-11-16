import { Smartphone, WifiOff, Database, Rocket } from 'lucide-react'

const FEATURES = [
  { icon: Smartphone, title: 'Bisa di-install', text: 'Tambahkan ke layar utama (Add to Home Screen) dan buka seperti aplikasi native.' },
  { icon: WifiOff, title: 'Bekerja offline', text: 'Service worker menyimpan aset aplikasi sehingga tetap terbuka tanpa internet.' },
  { icon: Database, title: 'Data tersimpan lokal', text: 'CRUD tugas memakai localStorage, jadi data tidak hilang saat ditutup.' },
  { icon: Rocket, title: 'Di-deploy ke Vercel', text: 'Dibangun dengan React + Vite + vite-plugin-pwa, di-hosting di Vercel.' },
]

export default function About() {
  return (
    <div className="page">
      <section className="page-head">
        <div>
          <h1>Tentang Aplikasi</h1>
          <p className="lede">
            StudyFlow adalah pelacak tugas kuliah berbasis Progressive Web App yang dibuat untuk responsi
            Modul 5 Praktikum Pemrograman Perangkat Bergerak.
          </p>
        </div>
      </section>

      <ul className="feature-grid">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="feature">
            <span className="feature-icon"><Icon size={20} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>

      <section className="card-box">
        <h2>Teknologi</h2>
        <p className="muted">React 18 &middot; Vite &middot; vite-plugin-pwa (Workbox) &middot; Axios &middot; lucide-react &middot; localStorage &middot; Vercel</p>
      </section>
    </div>
  )
}
