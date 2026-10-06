import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DEPTS, getEmployees, saveEmployees } from '../utils/storage';
import { exportCSV } from '../utils/csvExport';
import EmployeeTable from '../components/EmployeeTable';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';

const PER_PAGE = 10;

export default function Employees() {
  const nav = useNavigate();
  const { state } = useLocation();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(state?.msg ? { ok: true, msg: state.msg } : null);
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('');
  const [params] = useSearchParams();
  const [status, setStatus] = useState(params.get('status') || ''); 
  const [sort, setSort] = useState({ key: '', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { const t = setTimeout(() => { setAll(getEmployees()); setLoading(false); }, 400); return () => clearTimeout(t); }, []);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);
  useEffect(() => setPage(1), [q, dept, status,sort]);

 
  const onSort = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));

  const list = useMemo(() => {
    const s = q.toLowerCase();
    return all
      .filter((e) => (!s || [e.name, e.email, e.id].some((v) => v.toLowerCase().includes(s))) && (!dept || e.department === dept) && (!status || e.status === status))
      .sort((a, b) => {
        if (!sort.key) return 0;
        let x = a[sort.key], y = b[sort.key];
        if (sort.key === 'salary') { x = +x; y = +y; } else { x = String(x).toLowerCase(); y = String(y).toLowerCase(); }
        return (x > y ? 1 : x < y ? -1 : 0) * (sort.dir === 'asc' ? 1 : -1);
      });
  }, [all, q, dept, status,sort]);

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const rows = list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);

  const confirmDelete = () => {
    try {
      const next = all.filter((e) => e.id !== deleting.id);
      saveEmployees(next); setAll(next); setToast({ ok: true, msg: 'Employee deleted successfully' });
    } catch { setToast({ ok: false, msg: 'Unable to delete employee.' }); }
    setDeleting(null);
  };

  return (
    <>
      <div className="row between">
        <h2>Employees</h2>
        <div className="row">
          <button onClick={() => exportCSV(list)}>Export CSV</button>
          <Link className="primary btn" to="/employees/add">+ Add Employee</Link>
        </div>
      </div>
      {toast && <div className={`toast ${toast.ok ? 'ok' : 'bad'}`}>{toast.ok ? '✓' : '✕'} {toast.msg}</div>}
      <div className="filters">
        <input placeholder="Search by name / email / ID" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={dept} onChange={(e) => setDept(e.target.value)}><option value="">All Departments</option>{DEPTS.map((d) => <option key={d}>{d}</option>)}</select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All Status</option><option>Active</option><option>Inactive</option></select>
      </div>
      {loading ? <p>Loading employees...</p> : (
        <>
          <EmployeeTable rows={rows} sort={sort} onSort={onSort} onView={setViewing} onEdit={(id) => nav(`/employees/edit/${id}`)} onDelete={setDeleting} />
          <div className="row between">
            <span>{list.length ? `Showing ${(cur - 1) * PER_PAGE + 1}–${Math.min(cur * PER_PAGE, list.length)} of ${list.length} employees` : ''}</span>
            <Pagination page={cur} pages={pages} onChange={setPage} />
          </div>
        </>
      )}
      {deleting && <ConfirmModal title="Delete Employee?" onCancel={() => setDeleting(null)} onConfirm={confirmDelete}>
        <p>Are you sure you want to delete {deleting.name}?</p></ConfirmModal>}
      {viewing && <ConfirmModal title="Employee Details" onCancel={() => setViewing(null)}>
        {[['Employee ID', 'id'], ['Name', 'name'], ['Email', 'email'], ['Phone', 'phone'], ['Department', 'department'],
          ['Designation', 'designation'], ['Joining Date', 'joiningDate'], ['Salary', 'salary'], ['Status', 'status']].map(([l, k]) => (
          <p key={k}><b>{l}:</b> {k === 'salary' ? `₹${Number(viewing[k]).toLocaleString('en-IN')}` : viewing[k]}</p>))}
      </ConfirmModal>}
    </>
  );
}