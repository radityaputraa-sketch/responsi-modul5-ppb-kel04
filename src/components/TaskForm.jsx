import { useState, useEffect } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'
import { PRIORITIES, STATUSES, todayStr } from '../utils/helpers'

const EMPTY = { title: '', course: '', deadline: '', priority: 'sedang', status: 'todo', notes: '' }

// Form tambah / ubah tugas dalam bentuk modal.
export default function TaskForm({ open, task, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const isEdit = Boolean(task)

  useEffect(() => {
    if (open) {
      setForm(task ? { ...EMPTY, ...task } : { ...EMPTY, deadline: todayStr() })
      setError('')
    }
  }, [open, task])

  if (!open) return null

  const change = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (form.title.trim().length < 3) {
      setError('Judul tugas minimal 3 karakter.')
      return
    }
    setError('')
    onSubmit(
      {
        title: form.title,
        course: form.course,
        deadline: form.deadline,
        priority: form.priority,
        status: form.status,
        notes: form.notes,
      },
      task,
    )
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal-box modal-box--form" onClick={(e) => e.stopPropagation()} onSubmit={submit} noValidate>
        <div className="modal-head">
          <h3 className="modal-title">{isEdit ? 'Ubah Tugas' : 'Tambah Tugas'}</h3>
          <button type="button" className="icon-btn" onClick={onCancel} aria-label="Tutup">
            <X size={16} />
          </button>
        </div>

        {error && (
          <div className="toast toast--error" role="alert">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="f-title" className="form-label">Judul Tugas <span className="req">*</span></label>
          <input id="f-title" name="title" value={form.title} onChange={change} className="form-input" placeholder="mis. Laporan Praktikum Modul 3" autoFocus />
        </div>

        <div className="form-group">
          <label htmlFor="f-course" className="form-label">Mata Kuliah</label>
          <input id="f-course" name="course" value={form.course} onChange={change} className="form-input" placeholder="mis. Basis Data" />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="f-deadline" className="form-label">Deadline</label>
            <input id="f-deadline" type="date" name="deadline" value={form.deadline} onChange={change} className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="f-priority" className="form-label">Prioritas</label>
            <select id="f-priority" name="priority" value={form.priority} onChange={change} className="form-input">
              {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="f-status" className="form-label">Status</label>
          <select id="f-status" name="status" value={form.status} onChange={change} className="form-input">
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="f-notes" className="form-label">Catatan</label>
          <textarea id="f-notes" name="notes" value={form.notes} onChange={change} rows={3} className="form-input" placeholder="Detail tambahan (opsional)" />
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn--outline" onClick={onCancel}>Batal</button>
          <button type="submit" className="btn btn--primary" data-testid="task-save">
            <Save size={16} /> {isEdit ? 'Simpan Perubahan' : 'Simpan Tugas'}
          </button>
        </div>
      </form>
    </div>
  )
}
