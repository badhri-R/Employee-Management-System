import { useState } from 'react';
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
    <form className="card form" onSubmit={submit} noValidate>
      <h2>{title}</h2>
      <div className="grid">
        {FIELDS.map(([k, label, type]) => (
          <label key={k}>{label}
            {k === 'department' ? (
              <select value={d[k]} onChange={set(k)}><option value="">Select</option>{DEPTS.map((x) => <option key={x}>{x}</option>)}</select>
            ) : k === 'status' ? (
              <select value={d[k]} onChange={set(k)}><option>Active</option><option>Inactive</option></select>
            ) : (
              <input type={type || 'text'} value={d[k]} onChange={set(k)} disabled={k === 'id' && !!initial} />
            )}
            {err[k] && <small className="error">{err[k]}</small>}
          </label>
        ))}
      </div>
      {saveErr && <p className="error">✕ Unable to save employee.</p>}
      <div className="row end">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button className="primary">Save Employee</button>
      </div>
    </form>
  );
}