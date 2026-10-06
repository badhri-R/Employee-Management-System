import { useNavigate, useParams } from 'react-router-dom';
import { getEmployees, saveEmployees } from '../utils/storage';
import EmployeeForm from '../components/EmployeeForm';

export default function EmployeeFormPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const all = getEmployees();
  const emp = id ? all.find((e) => e.id === id) : null;
  if (id && !emp) return <p>Employee not found.</p>;

  const save = (data) => {
    try {
      saveEmployees(id ? all.map((e) => (e.id === id ? data : e)) : [data, ...all]);
      nav('/employees', { state: { msg: `Employee ${id ? 'updated' : 'added'} successfully` } });
    } catch { return false; }
  };

  return <EmployeeForm title={id ? 'Edit Employee' : 'Add Employee'} initial={emp}
    otherIds={all.filter((e) => e.id !== id).map((e) => e.id)} onSubmit={save} onCancel={() => nav('/employees')} />;
}