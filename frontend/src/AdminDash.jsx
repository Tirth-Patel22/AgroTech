import { useNavigate } from 'react-router-dom';
import './AdminDash.css';
import AdminNavbar from './AdminNavbar';

function AdminDashboard() {
  const navigate = useNavigate();
  const adminDetails = JSON.parse(localStorage.getItem('adminDetails'));

  const handleLogout = () => {
    localStorage.removeItem('adminDetails');
    navigate('/admin');
  };

  if (!adminDetails) {
    navigate('/admin');
    return null;
  }

  return (
    <>
  <AdminNavbar />
  <div className="page-content">
    <h2>Welcome, {adminDetails.name}</h2>

    <div className="dashboard-btn-group">
      <button className="dashboard-btn" onClick={() => navigate('/admin/users')}>Manage Users</button>
      <button className="dashboard-btn" onClick={() => navigate('/admin/crops')}>Manage Crops</button>
      <button className="dashboard-btn" onClick={() => navigate('/admin/pesticides')}>Manage Pesticides</button>
      <button className="dashboard-btn" onClick={() => navigate('/admin/diseases')}>Manage Disease</button>
      <button className="dashboard-btn" onClick={() => navigate('/admin/fertilizers')}>Manage Fertilizer</button>
    </div>

    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  </div>
</>
    
  );
}

export default AdminDashboard;
