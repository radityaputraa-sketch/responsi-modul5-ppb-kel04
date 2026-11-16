import { useState, useCallback } from 'react'
import taskService from '../services/taskService'

// ---------------------------------------------------------------------------
// useTasks - state management untuk daftar tugas + aksi CRUD.
// Semua aksi mengembalikan { ok, data?, message? } agar UI mudah menampilkan feedback.
// ---------------------------------------------------------------------------
export function useTasks() {
  const [tasks, setTasks] = useState(() => taskService.getAll())
  const [error, setError] = useState(null)

  const refresh = useCallback(() => setTasks(taskService.getAll()), [])

  const run = useCallback(
    (fn) => {
      try {
        setError(null)
        const data = fn()
        refresh()
        return { ok: true, data }
      } catch (err) {
        const message = err?.message || 'Terjadi kesalahan.'
        setError(message)
        return { ok: false, message }
      }
    },
    [refresh],
  )

  const addTask = useCallback((data) => run(() => taskService.create(data)), [run])
  const editTask = useCallback((id, data) => run(() => taskService.update(id, data)), [run])
  const removeTask = useCallback((id) => run(() => taskService.remove(id)), [run])
  const clearTasks = useCallback(() => run(() => taskService.clear()), [run])

  return { tasks, error, addTask, editTask, removeTask, clearTasks, refresh }
}
