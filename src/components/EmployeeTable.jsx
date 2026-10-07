import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const COLS = [
  ['id', 'ID'], ['name', 'Name'], ['email', 'Email'], ['department', 'Department'],
  ['joiningDate', 'Joining Date'], ['salary', 'Salary'], ['status', 'Status'],
];

export default function EmployeeTable({ rows, sort, onSort, onView, onEdit, onDelete }) {
  const arrow = (k) => (sort.key === k ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ' ↕');
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {COLS.map(([k, label]) => (
            <TableHead key={k} className="cursor-pointer select-none hover:bg-muted" onClick={() => onSort(k)}>{label}{arrow(k)}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 && <TableRow><TableCell colSpan={8}>No employees found.</TableCell></TableRow>}
        {rows.map((e) => (
          <TableRow key={e.id}>
            <TableCell>{e.id}</TableCell><TableCell>{e.name}</TableCell><TableCell>{e.email}</TableCell><TableCell>{e.department}</TableCell>
            <TableCell>{e.joiningDate}</TableCell><TableCell>₹{Number(e.salary).toLocaleString('en-IN')}</TableCell>
            <TableCell><Badge variant={e.status === 'Active' ? 'success' : 'danger'}>{e.status}</Badge></TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" aria-label="View" onClick={() => onView(e)}><Eye /></Button>
                <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => onEdit(e.id)}><Pencil /></Button>
                <Button variant="ghost" size="icon" aria-label="Delete" className="text-destructive hover:text-destructive" onClick={() => onDelete(e)}><Trash2 /></Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}