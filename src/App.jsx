import { Navigate, Route, Routes } from 'react-router-dom';
import { isLoggedIn } from './utils/storage';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeFormPage from './pages/EmployeeFormPage';

const Private = () => (isLoggedIn() ? <Layout /> : <Navigate to="/login" replace />);
const Public = () => (isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Login />);

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Public />} />
      <Route element={<Private />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<EmployeeFormPage />} />
        <Route path="/employees/edit/:id" element={<EmployeeFormPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}