const COLS = [
  ['id', 'ID'], ['name', 'Name'], ['email', 'Email'], ['department', 'Department'],
  ['joiningDate', 'Joining Date'], ['salary', 'Salary'], ['status', 'Status'],
];

export default function EmployeeTable({ rows, sort, onSort, onView, onEdit, onDelete }) {
  const arrow = (k) => (sort.key === k ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ' ↕');
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {COLS.map(([k, label]) => (
              <th key={k} className="sortable" onClick={() => onSort(k)}>{label}{arrow(k)}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={8}>No employees found.</td></tr>}
          {rows.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td><td>{e.name}</td><td>{e.email}</td><td>{e.department}</td>
              <td>{e.joiningDate}</td><td>₹{Number(e.salary).toLocaleString('en-IN')}</td>
              <td><span className={`badge ${e.status}`}>{e.status}</span></td>
              <td className="actions">
                <button onClick={() => onView(e)}>👁</button>
                <button onClick={() => onEdit(e.id)}>✏️</button>
                <button onClick={() => onDelete(e)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}