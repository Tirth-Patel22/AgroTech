import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import './AdminUserManagement.css';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/accounts/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open modal for editing
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: ''
    });
  };

  // Update user
  const handleUpdateUser = async () => {
    try {
      const updatedData = {
        username: formData.username,
        email: formData.email,
      };
      if (formData.password.trim() !== '') {
        updatedData.password = formData.password;
      }

      await axios.patch(`http://127.0.0.1:8000/api/accounts/${selectedUser.id}/`, updatedData);
      alert(`✅ User ${formData.username} updated successfully!`);
      setSelectedUser(null);
      setFormData({ username: '', email: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
      alert('❌ Failed to update user. Please check console for details.');
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/accounts/${id}/`);
      alert('✅ User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('❌ Failed to delete user.');
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <>
    <AdminNavbar/>
    <div className='page-content'>
      
      <h2>User Management</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>********</td>
              <td>
                <button className='table-btn edit' onClick={() => handleEditClick(user)}>Edit</button>
                <button className='table-btn delete' onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedUser && (
        <div className="modal">
          <h3>Edit User: {selectedUser.username}</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          /><br/>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          /><br/>
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          /><br/>
          <button onClick={handleUpdateUser}>Update</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      )}
    </div>
    </>
    
  );
}

export default AdminUserManagement;
