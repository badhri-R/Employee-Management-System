
export default function ConfirmModal({ title, children, onCancel, onConfirm, confirmText = 'Delete' }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <div className="row end">
          <button onClick={onCancel}>{onConfirm ? 'Cancel' : 'Close'}</button>
          {onConfirm && <button className="danger" onClick={onConfirm}>{confirmText}</button>}
        </div>
      </div>
    </div>
  );
}