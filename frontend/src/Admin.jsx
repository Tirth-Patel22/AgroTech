import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';


function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin-login/', formData);
      localStorage.setItem('adminDetails', JSON.stringify(response.data));
      navigate('/admin-dashboard');
    } catch (error) {
      if (error.response && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Error: " + JSON.stringify(error.response.data));
      }
    }
  };

  return (
    <div className="admin-login-container">
  <div className="admin-login-card">
    <h2>Admin Login</h2>
    {message && <p>{message}</p>}
    <form onSubmit={handleLogin}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <div className="password-toggle-container">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="toggle-password-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button type="submit">Login</button>
    </form>

    <p style={{ marginTop: '10px' }}>
      Don't have an account? <Link to="/admin-signup">Sign up here</Link>
    </p>
  </div>
</div>
    
  );
}

export default AdminLogin;
