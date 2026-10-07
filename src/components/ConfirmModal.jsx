import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ConfirmModal({ title, children, onCancel, onConfirm, confirmText = 'Delete' }) {
  return (
    <Dialog open onOpenChange={(o) => !o && onCancel()}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
        <div className="grid gap-1 text-sm">{children}</div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>{onConfirm ? 'Cancel' : 'Close'}</Button>
          {onConfirm && <Button variant="destructive" onClick={onConfirm}>{confirmText}</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}