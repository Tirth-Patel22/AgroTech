import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import './AdminPesticideManagement.css';

function AdminPesticideManagement() {
  const [pesticides, setPesticides] = useState([]);
  const [selectedPesticide, setSelectedPesticide] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    crop: '',
    application_rate: '',
    toxicity: '',
    manufacturer: '',
    usage_frequency: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const nameInputRef = useRef(null);
  const pageContentRef = useRef(null);   // 👈 added ref for page content div

  const fetchPesticides = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/api/pesticides/');
      setPesticides(response.data);
    } catch (error) {
      console.error('Error fetching pesticides:', error);
    }
  };

  useEffect(() => {
    fetchPesticides();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleAddPesticide = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/api/pesticides/', formData);
      fetchPesticides();
      setFormData({
        name: '',
        type: '',
        crop: '',
        application_rate: '',
        toxicity: '',
        manufacturer: '',
        usage_frequency: ''
      });
      showMessage('Pesticide added successfully!', 'success');
    } catch (error) {
      showMessage('Error adding pesticide.', 'error');
      console.error('Error adding pesticide:', error.response?.data || error.message);
    }
  };

  const handleEditClick = (pesticide) => {
    setSelectedPesticide(pesticide);
    setFormData(pesticide);
    scrollToTop();
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500);
  };

  const handleUpdatePesticide = async () => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/api/pesticides/${selectedPesticide.id}/`, formData);
      fetchPesticides();
      setSelectedPesticide(null);
      setFormData({
        name: '',
        type: '',
        crop: '',
        application_rate: '',
        toxicity: '',
        manufacturer: '',
        usage_frequency: ''
      });
      showMessage('Pesticide updated successfully!', 'success');
    } catch (error) {
      showMessage('Error updating pesticide.', 'error');
      console.error('Error updating pesticide:', error.response?.data || error.message);
    }
  };

  const handleDeletePesticide = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/api/pesticides/${id}/`);
      await fetchPesticides();
      showMessage('Pesticide deleted successfully!', 'error');
      scrollToTop();
    } catch (error) {
      showMessage('Error deleting pesticide.', 'error');
      console.error('Error deleting pesticide:', error);
    }
  };

  // 👇 reusable scrollToTop function
  const scrollToTop = () => {
    if (pageContentRef.current) {
      pageContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });  
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='page-content' ref={pageContentRef}>
        <h2>Pesticide Management</h2>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <input
            ref={nameInputRef}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" />
          <input name="crop" value={formData.crop} onChange={handleChange} placeholder="Crop" />
          <input name="application_rate" value={formData.application_rate} onChange={handleChange} placeholder="Application Rate (ml/ha)" />
          <input name="toxicity" value={formData.toxicity} onChange={handleChange} placeholder="Toxicity" />
          <input name="manufacturer" value={formData.manufacturer} onChange={handleChange} placeholder="Manufacturer" />
          <input name="usage_frequency" value={formData.usage_frequency} onChange={handleChange} placeholder="Usage Frequency" />
        </div>

        {selectedPesticide ? (
          <button className="update-btn" onClick={handleUpdatePesticide}>Update Pesticide</button>
        ) : (
          <button className="create-btn" onClick={handleAddPesticide}>Add Pesticide</button>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Crop</th>
              <th>Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pesticides.map((pest) => (
              <tr key={pest.id}>
                <td>{pest.id}</td>
                <td>{pest.name}</td>
                <td>{pest.crop}</td>
                <td>{pest.application_rate}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(pest)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeletePesticide(pest.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminPesticideManagement;
