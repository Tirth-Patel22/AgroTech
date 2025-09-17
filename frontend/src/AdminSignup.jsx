import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin-signup/', formData);
      setMessage(response.data.message);
      navigate('/admin');
    } catch (error) {
      if (error.response && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Error: " + JSON.stringify(error.response.data));
      }
    }
  };

  return (
    <div>
      <h2>Admin Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignup}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br/>
        <input style={{'margin-bottom':'15px'}} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required /><br/>
        
        <div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div><br/>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default AdminSignup;
