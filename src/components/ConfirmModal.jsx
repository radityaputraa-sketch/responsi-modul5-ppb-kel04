import { AlertTriangle } from 'lucide-react'

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Ya',
  cancelLabel = 'Batal',
  danger = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal-box"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-msg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-icon ${danger ? 'modal-icon--danger' : ''}`}>
          <AlertTriangle size={26} />
        </div>
        <h3 id="confirm-title" className="modal-title">{title}</h3>
        <p id="confirm-msg" className="modal-msg">{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn--outline" onClick={onCancel}>{cancelLabel}</button>
          <button
            type="button"
            className={`btn ${danger ? 'btn--danger' : 'btn--primary'}`}
            onClick={onConfirm}
            data-testid="confirm-yes"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
