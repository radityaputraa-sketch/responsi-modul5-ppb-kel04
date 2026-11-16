import { Pencil, Trash2, CalendarDays, BookOpen, Check, RotateCcw } from 'lucide-react'
import { formatDate, deadlineText, daysLeft, priorityLabel, statusLabel } from '../utils/helpers'

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const done = task.status === 'done'
  const left = daysLeft(task.deadline)
  const late = !done && left !== null && left < 0
  const soon = !done && left !== null && left >= 0 && left <= 1

  return (
    <li className={`task ${done ? 'task--done' : ''}`} data-testid="task-item">
      <div className="task-main">
        <div className="task-badges">
          <span className={`badge badge--prio-${task.priority}`}>{priorityLabel(task.priority)}</span>
          <span className={`badge badge--status-${task.status}`}>{statusLabel(task.status)}</span>
        </div>
        <h3 className="task-title">{task.title}</h3>
        <div className="task-meta">
          {task.course && (
            <span><BookOpen size={14} /> {task.course}</span>
          )}
          {task.deadline && (
            <span className={late ? 'text-danger' : soon ? 'text-warn' : ''}>
              <CalendarDays size={14} /> {formatDate(task.deadline)} &middot; {deadlineText(task.deadline, task.status)}
            </span>
          )}
        </div>
        {task.notes && <p className="task-notes">{task.notes}</p>}
      </div>
      <div className="task-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={() => onToggle(task)}
          title={done ? 'Tandai belum selesai' : 'Tandai selesai'}
          aria-label={done ? 'Tandai belum selesai' : 'Tandai selesai'}
        >
          {done ? <RotateCcw size={16} /> : <Check size={16} />}
        </button>
        <button type="button" className="icon-btn" onClick={() => onEdit(task)} title="Edit" aria-label={`Edit ${task.title}`}>
          <Pencil size={16} />
        </button>
        <button type="button" className="icon-btn icon-btn--danger" onClick={() => onDelete(task)} title="Hapus" aria-label={`Hapus ${task.title}`}>
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  )
}
