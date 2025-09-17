import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminDetails');
    navigate('/admin');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand" onClick={() => navigate('/admin-dashboard')}>
        AgroSmart Admin
      </div>

      <div className={`admin-navbar-links ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => navigate('/admin/users')}>Users</button>
        <button onClick={() => navigate('/admin/crops')}>Crops</button>
        <button onClick={() => navigate('/admin/pesticides')}>Pesticides</button>
        <button onClick={() => navigate('/admin/diseases')}>Diseases</button>
        <button onClick={() => navigate('/admin/fertilizers')}>Fertilizers</button>
        {/* <button className="logout-btn" onClick={handleLogout}>Logout</button> */}
      </div>

      <div
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default AdminNavbar;
