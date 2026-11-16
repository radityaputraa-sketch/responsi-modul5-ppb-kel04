import { useState } from 'react'
import { IdCard, Users, GraduationCap, Save, RotateCcw, Check, Pencil } from 'lucide-react'
import profileService from '../services/profileService'
import { MEMBERS } from '../config/profile'
import { useTasks } from '../hooks/useTasks'

const initialsOf = (name) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join('')

export default function Profile() {
  const [profile, setProfile] = useState(() => profileService.get())
  const [form, setForm] = useState(profile)
  const [feedback, setFeedback] = useState('')
  const { tasks } = useTasks()

  const flash = (msg) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 2500)
  }

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const res = profileService.save({
      kelompok: form.kelompok.trim() || profile.kelompok,
      kelas: form.kelas.trim() || profile.kelas,
    })
    if (res.success) {
      setProfile(res.data)
      setForm(res.data)
      flash('Profil berhasil disimpan.')
    } else {
      flash(res.message)
    }
  }

  const reset = () => {
    const d = profileService.reset()
    setProfile(d)
    setForm(d)
    flash('Profil dikembalikan ke data awal.')
  }

  return (
    <div className="page">
      <section className="page-head">
        <div>
          <h1>Profil</h1>
          <p className="lede">Identitas kelompok pengembang aplikasi ini.</p>
        </div>
      </section>

      {feedback && (
        <div className="toast toast--success" role="status"><Check size={16} /> {feedback}</div>
      )}

      <section className="profile-card profile-card--group" data-testid="profile-card">
        <div className="avatar"><Users size={32} /></div>
        <div className="profile-info">
          <h2 data-testid="profile-kelompok">{profile.kelompok}</h2>
          <ul className="profile-list">
            <li><GraduationCap size={16} /> <span className="muted">Kelas</span> <strong>{profile.kelas}</strong></li>
            <li><Users size={16} /> <span className="muted">Anggota</span> <strong>{MEMBERS.length} orang</strong></li>
          </ul>
        </div>
      </section>

      <section className="card-box">
        <div className="card-box-head">
          <h2><IdCard size={16} /> Anggota Kelompok</h2>
        </div>
        <ul className="member-list" data-testid="member-list">
          {MEMBERS.map((m) => (
            <li key={m.nim} className="member" data-testid="member-item">
              <span className="avatar avatar--sm">{initialsOf(m.nama)}</span>
              <div className="member-info">
                <strong className="member-nama">{m.nama}</strong>
                <span className="muted">NIM: <span className="member-nim">{m.nim}</span></span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="stats stats--2">
        <div className="stat"><span className="stat-val">{tasks.length}</span><span className="stat-label">Tugas Tersimpan</span></div>
        <div className="stat"><span className="stat-val">{tasks.filter((t) => t.status === 'done').length}</span><span className="stat-label">Tugas Selesai</span></div>
      </section>

      <form className="card-box form-stack" onSubmit={submit}>
        <h2><Pencil size={16} /> Ubah Info Kelompok</h2>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="p-kel">Kelompok</label>
            <input id="p-kel" name="kelompok" className="form-input" value={form.kelompok} onChange={change} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="p-kelas">Kelas / Mata Praktikum</label>
            <input id="p-kelas" name="kelas" className="form-input" value={form.kelas} onChange={change} />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn--outline" onClick={reset}><RotateCcw size={16} /> Reset</button>
          <button type="submit" className="btn btn--primary"><Save size={16} /> Simpan</button>
        </div>
      </form>
    </div>
  )
}
