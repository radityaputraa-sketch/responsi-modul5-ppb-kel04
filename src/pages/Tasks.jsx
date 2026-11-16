import { useState, useMemo, useEffect } from 'react'
import { Plus, Search, PackageOpen, CheckCircle, AlertCircle } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import ConfirmModal from '../components/ConfirmModal'
import { STATUSES, matchesSearch, sortTasks } from '../utils/helpers'

export default function Tasks() {
  const { tasks, addTask, editTask, removeTask } = useTasks()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortKey, setSortKey] = useState('deadline')

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState(null) // { type, text }

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const visible = useMemo(() => {
    const list = tasks.filter((t) => matchesSearch(t, search) && (filter === 'all' || t.status === filter))
    return sortTasks(list, sortKey)
  }, [tasks, search, filter, sortKey])

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }
  const openEdit = (task) => {
    setEditing(task)
    setFormOpen(true)
  }

  // CREATE / UPDATE
  const handleSubmit = (data, original) => {
    const res = original ? editTask(original.id, data) : addTask(data)
    if (res.ok) {
      setFormOpen(false)
      setEditing(null)
      setToast({ type: 'success', text: original ? 'Tugas berhasil diperbarui.' : 'Tugas berhasil ditambahkan.' })
    } else {
      setToast({ type: 'error', text: res.message })
    }
  }

  // UPDATE cepat (toggle selesai)
  const handleToggle = (task) => {
    const next = task.status === 'done' ? 'todo' : 'done'
    const res = editTask(task.id, { status: next })
    setToast(res.ok
      ? { type: 'success', text: next === 'done' ? 'Tugas ditandai selesai.' : 'Tugas dikembalikan ke belum dikerjakan.' }
      : { type: 'error', text: res.message })
  }

  // DELETE
  const handleDelete = () => {
    if (!deleteTarget) return
    const res = removeTask(deleteTarget.id)
    setDeleteTarget(null)
    setToast(res.ok ? { type: 'success', text: 'Tugas dihapus.' } : { type: 'error', text: res.message })
  }

  return (
    <div className="page">
      <section className="page-head">
        <div>
          <h1>Daftar Tugas</h1>
          <p className="lede">Tambah, ubah, dan hapus tugas kuliahmu. Data tersimpan di perangkat dan aman saat offline.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openCreate} data-testid="add-task">
          <Plus size={16} /> Tambah
        </button>
      </section>

      {toast && (
        <div className={`toast toast--${toast.type}`} role="status">
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />} {toast.text}
        </div>
      )}

      <div className="toolbar">
        <div className="search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Cari judul, mata kuliah, catatan…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari tugas"
          />
        </div>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="form-input sort-select" aria-label="Urutkan">
          <option value="deadline">Urut: Deadline</option>
          <option value="priority">Urut: Prioritas</option>
          <option value="title">Urut: Judul A-Z</option>
          <option value="newest">Urut: Terbaru</option>
        </select>
      </div>

      <div className="pills">
        <button type="button" className={`pill ${filter === 'all' ? 'pill--active' : ''}`} onClick={() => setFilter('all')}>
          Semua ({tasks.length})
        </button>
        {STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            className={`pill ${filter === s.value ? 'pill--active' : ''}`}
            onClick={() => setFilter(s.value)}
          >
            {s.label} ({tasks.filter((t) => t.status === s.value).length})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="empty empty--box">
          <PackageOpen size={32} />
          <p>{tasks.length === 0 ? 'Belum ada tugas. Klik "Tambah" untuk membuat yang pertama.' : 'Tidak ada tugas yang cocok dengan pencarian / filter.'}</p>
        </div>
      ) : (
        <ul className="task-list" data-testid="task-list">
          {visible.map((t) => (
            <TaskCard key={t.id} task={t} onEdit={openEdit} onDelete={setDeleteTarget} onToggle={handleToggle} />
          ))}
        </ul>
      )}

      <TaskForm open={formOpen} task={editing} onSubmit={handleSubmit} onCancel={() => { setFormOpen(false); setEditing(null) }} />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Hapus Tugas"
        message={`Yakin ingin menghapus "${deleteTarget?.title ?? ''}"? Tindakan ini tidak bisa dibatalkan.`}
        confirmLabel="Hapus"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
