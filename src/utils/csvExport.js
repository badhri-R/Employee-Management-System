export function exportCSV(list) {
  if (!list || list.length === 0) {
    alert('Export panna employees illa.');
    return;
  }

  const head = ['Employee ID', 'Name', 'Email', 'Phone', 'Department', 'Designation', 'Joining Date', 'Salary', 'Status'];
  const rows = list.map((e) => [e.id, e.name, e.email, e.phone, e.department, e.designation, e.joiningDate, e.salary, e.status]);
  const csv = [head, ...rows]
    .map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\r\n');


  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'employees.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(url), 1000); 
}