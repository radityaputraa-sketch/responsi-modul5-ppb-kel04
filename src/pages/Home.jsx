import { RefreshCw, Quote, ArrowRight, Plus } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import { useQuote } from '../hooks/useQuote'
import { formatDate, deadlineText, daysLeft } from '../utils/helpers'

export default function Home({ navigate }) {
  const { tasks } = useTasks()
  const { quote, loading, source, refetch } = useQuote()

  const total = tasks.length
  const done = tasks.filter((t) => t.status === 'done').length
  const doing = tasks.filter((t) => t.status === 'doing').length
  const late = tasks.filter((t) => t.status !== 'done' && daysLeft(t.deadline) !== null && daysLeft(t.deadline) < 0).length
  const percent = total ? Math.round((done / total) * 100) : 0

  const upcoming = tasks
    .filter((t) => t.status !== 'done' && t.deadline)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 4)

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">Selamat datang di</p>
        <h1>StudyFlow</h1>
        <p className="lede">Catat tugas kuliah, pantau deadline, dan selesaikan satu per satu. Bisa diinstall &amp; dipakai tanpa internet.</p>
        <div className="hero-actions">
          <button type="button" className="btn btn--primary" onClick={() => navigate('/tugas')}>
            Kelola Tugas <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="stats">
        <div className="stat"><span className="stat-val">{total}</span><span className="stat-label">Total Tugas</span></div>
        <div className="stat"><span className="stat-val">{doing}</span><span className="stat-label">Dikerjakan</span></div>
        <div className="stat"><span className="stat-val">{done}</span><span className="stat-label">Selesai</span></div>
        <div className="stat stat--warn"><span className="stat-val">{late}</span><span className="stat-label">Terlambat</span></div>
      </section>

      <section className="card-box">
        <div className="card-box-head">
          <h2>Progres</h2>
          <span className="count">{percent}%</span>
        </div>
        <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar" style={{ width: `${percent}%` }} />
        </div>
      </section>

      <section className="card-box">
        <div className="card-box-head">
          <h2>Deadline Terdekat</h2>
          <button type="button" className="link-btn" onClick={() => navigate('/tugas')}>Lihat semua</button>
        </div>
        {upcoming.length === 0 ? (
          <div className="empty">
            <p>Tidak ada tugas yang menunggu. Santai dulu, atau tambahkan tugas baru.</p>
            <button type="button" className="btn btn--outline btn--sm" onClick={() => navigate('/tugas')}>
              <Plus size={14} /> Tambah Tugas
            </button>
          </div>
        ) : (
          <ul className="mini-list">
            {upcoming.map((t) => (
              <li key={t.id}>
                <div>
                  <strong>{t.title}</strong>
                  <span className="muted">{t.course || 'Tanpa mata kuliah'} &middot; {formatDate(t.deadline)}</span>
                </div>
                <span className={`pill-text ${daysLeft(t.deadline) < 0 ? 'text-danger' : daysLeft(t.deadline) <= 1 ? 'text-warn' : ''}`}>
                  {deadlineText(t.deadline, t.status)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card-box quote-box">
        <div className="card-box-head">
          <h2><Quote size={16} /> Kutipan Hari Ini</h2>
          <button type="button" className="icon-btn" onClick={refetch} disabled={loading} aria-label="Muat kutipan baru" title="Kutipan baru">
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
          </button>
        </div>
        <blockquote>
          &ldquo;{quote.quote}&rdquo;
          <footer>&mdash; {quote.author} <span className="muted">({source === 'api' ? 'dari API' : 'data lokal'})</span></footer>
        </blockquote>
      </section>
    </div>
  )
}
