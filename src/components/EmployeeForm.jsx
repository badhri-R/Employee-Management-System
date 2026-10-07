import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { DEPTS } from '../utils/storage';

const EMPTY = { id: '', name: '', email: '', phone: '', department: '', designation: '', joiningDate: '', salary: '', status: 'Active' };
const FIELDS = [['id', 'Employee ID'], ['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'],
  ['department', 'Department'], ['designation', 'Designation'], ['joiningDate', 'Joining Date', 'date'],
  ['salary', 'Salary', 'number'], ['status', 'Status']];

function validate(d, otherIds) {
  const e = {};
  if (!d.id.trim()) e.id = 'Employee ID is required.';
  else if (otherIds.includes(d.id.trim())) e.id = 'Employee ID already exists.';
  if (d.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
  if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Please enter a valid email.';
  if (!/^[6-9]\d{9}$/.test(d.phone)) e.phone = 'Enter a valid 10-digit phone number.';
  ['department', 'designation', 'joiningDate', 'status'].forEach((k) => { if (!String(d[k]).trim()) e[k] = 'This field is required.'; });
  if (!(Number(d.salary) > 0)) e.salary = 'Enter a valid positive number.';
  return e;
}

export default function EmployeeForm({ initial, otherIds, onSubmit, onCancel, title }) {
  const [d, setD] = useState(initial || EMPTY);
  const [err, setErr] = useState({});
  const [saveErr, setSaveErr] = useState(false);
  const set = (k) => (ev) => setD({ ...d, [k]: ev.target.value });

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate(d, otherIds);
    setErr(e);
    if (Object.keys(e).length) return;
    if (onSubmit({ ...d, id: d.id.trim(), name: d.name.trim() }) === false) setSaveErr(true);
  };

  return (
    <Card className="max-w-[700px]"><form className="grid gap-4" onSubmit={submit} noValidate>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {FIELDS.map(([k, label, type]) => (
          <Label key={k}>{label}
            {k === 'department' ? (
              <Select value={d[k]} onChange={set(k)}><option value="">Select</option>{DEPTS.map((x) => <option key={x}>{x}</option>)}</Select>
            ) : k === 'status' ? (
              <Select value={d[k]} onChange={set(k)}><option>Active</option><option>Inactive</option></Select>
            ) : (
              <Input type={type || 'text'} value={d[k]} onChange={set(k)} disabled={k === 'id' && !!initial} />
            )}
            {err[k] && <small className="text-[13px] font-normal text-destructive">{err[k]}</small>}
          </Label>
        ))}
      </div>
      {saveErr && <p className="text-[13px] text-destructive">✕ Unable to save employee.</p>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Employee</Button>
      </div>
    </form></Card>
  );
}