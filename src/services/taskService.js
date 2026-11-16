import { readJSON, writeJSON } from '../utils/storage'
import { generateId, todayStr, dateToStr } from '../utils/helpers'

// ---------------------------------------------------------------------------
// TaskService - operasi CRUD tugas. Data disimpan di localStorage sehingga
// tetap berfungsi penuh ketika offline.
// ---------------------------------------------------------------------------
const KEY = 'studyflow_tasks_v1'

const addDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return dateToStr(d)
}

const seed = () => [
  {
    id: generateId(),
    title: 'Responsi Modul 5 PPB',
    course: 'Pemrograman Perangkat Bergerak',
    deadline: todayStr(),
    priority: 'tinggi',
    status: 'doing',
    notes: 'Bangun PWA dari awal, deploy ke Vercel, kumpulkan link.',
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Laporan Praktikum Basis Data',
    course: 'Basis Data',
    deadline: addDays(3),
    priority: 'sedang',
    status: 'todo',
    notes: '',
    createdAt: new Date(Date.now() - 1000).toISOString(),
  },
  {
    id: generateId(),
    title: 'Rangkuman Bab 4 Jaringan Komputer',
    course: 'Jaringan Komputer',
    deadline: addDays(7),
    priority: 'rendah',
    status: 'todo',
    notes: 'Fokus ke materi routing.',
    createdAt: new Date(Date.now() - 2000).toISOString(),
  },
]

const load = () => {
  const data = readJSON(KEY, null)
  if (Array.isArray(data)) return data
  const initial = seed()
  writeJSON(KEY, initial)
  return initial
}

const save = (list) => {
  const ok = writeJSON(KEY, list)
  if (!ok) throw new Error('Gagal menyimpan data (penyimpanan penuh / diblokir).')
}

const taskService = {
  // READ (semua)
  getAll() {
    return load()
  },
  // READ (satu)
  getById(id) {
    return load().find((t) => t.id === id) || null
  },
  // CREATE
  create(data) {
    const list = load()
    const task = {
      id: generateId(),
      title: data.title.trim(),
      course: (data.course || '').trim(),
      deadline: data.deadline || '',
      priority: data.priority || 'sedang',
      status: data.status || 'todo',
      notes: (data.notes || '').trim(),
      createdAt: new Date().toISOString(),
    }
    save([task, ...list])
    return task
  },
  // UPDATE
  update(id, data) {
    const list = load()
    const idx = list.findIndex((t) => t.id === id)
    if (idx === -1) throw new Error('Tugas tidak ditemukan.')
    const old = list[idx]
    const updated = {
      ...old,
      ...data,
      title: (data.title ?? old.title).trim(),
      course: (data.course ?? old.course ?? '').trim(),
      notes: (data.notes ?? old.notes ?? '').trim(),
      updatedAt: new Date().toISOString(),
    }
    const next = [...list]
    next[idx] = updated
    save(next)
    return updated
  },
  // DELETE
  remove(id) {
    save(load().filter((t) => t.id !== id))
    return true
  },
  // Hapus semua
  clear() {
    save([])
  },
}

export default taskService
