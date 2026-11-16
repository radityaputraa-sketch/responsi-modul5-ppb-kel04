export const PRIORITIES = [
  { value: 'tinggi', label: 'Tinggi' },
  { value: 'sedang', label: 'Sedang' },
  { value: 'rendah', label: 'Rendah' },
]

export const STATUSES = [
  { value: 'todo', label: 'Belum Dikerjakan' },
  { value: 'doing', label: 'Sedang Dikerjakan' },
  { value: 'done', label: 'Selesai' },
]

export const statusLabel = (v) => STATUSES.find((s) => s.value === v)?.label ?? v
export const priorityLabel = (v) => PRIORITIES.find((p) => p.value === v)?.label ?? v

export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

// "YYYY-MM-DD" -> Date lokal jam 00:00 (menghindari bug timezone)
export const parseDate = (str) => {
  if (!str) return null
  const [y, m, d] = str.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

const pad = (x) => String(x).padStart(2, '0')

export const dateToStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayStr = () => dateToStr(new Date())

export const formatDate = (str) => {
  const d = parseDate(str)
  if (!d) return '-'
  return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

// Selisih hari dari hari ini (negatif = lewat)
export const daysLeft = (str) => {
  const d = parseDate(str)
  if (!d) return null
  const t = parseDate(todayStr())
  return Math.round((d - t) / 86400000)
}

export const deadlineText = (str, status) => {
  if (status === 'done') return 'Selesai'
  const n = daysLeft(str)
  if (n === null) return 'Tanpa deadline'
  if (n < 0) return `Terlambat ${Math.abs(n)} hari`
  if (n === 0) return 'Hari ini!'
  if (n === 1) return 'Besok'
  return `${n} hari lagi`
}

export const matchesSearch = (t, q) => {
  if (!q) return true
  const s = q.toLowerCase()
  return (
    (t.title || '').toLowerCase().includes(s) ||
    (t.course || '').toLowerCase().includes(s) ||
    (t.notes || '').toLowerCase().includes(s)
  )
}

const PRIO_ORDER = { tinggi: 0, sedang: 1, rendah: 2 }

export const sortTasks = (items, key) => {
  const arr = [...items]
  if (key === 'deadline') {
    arr.sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'))
  } else if (key === 'priority') {
    arr.sort((a, b) => PRIO_ORDER[a.priority] - PRIO_ORDER[b.priority])
  } else if (key === 'title') {
    arr.sort((a, b) => a.title.localeCompare(b.title))
  } else {
    arr.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
  }
  return arr
}
