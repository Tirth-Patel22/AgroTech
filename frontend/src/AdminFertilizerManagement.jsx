import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import './AdminPesticideManagement.css';

function AdminFertilizerManagement() {
  const [fertilizers, setFertilizers] = useState([]);
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
  const [formData, setFormData] = useState({
    crop: '',
    fertilizer_name: '',
    fertilizer_type: '',
    composition: '',
    application_method: '',
    application_time: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const cropInputRef = useRef(null);
  const pageContentRef = useRef(null);

  const fetchFertilizers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/api/fertilizers/');
      setFertilizers(response.data);
    } catch (error) {
      console.error('Error fetching fertilizers:', error);
    }
  };

  useEffect(() => {
    fetchFertilizers();
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

  const handleAddFertilizer = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/api/fertilizers/', formData);
      fetchFertilizers();
      setFormData({
        crop: '',
        fertilizer_name: '',
        fertilizer_type: '',
        composition: '',
        application_method: '',
        application_time: ''
      });
      showMessage('Fertilizer added successfully!', 'success');
    } catch (error) {
      showMessage('Error adding fertilizer.', 'error');
      console.error('Error adding fertilizer:', error.response?.data || error.message);
    }
  };

  const handleEditClick = (fert) => {
    setSelectedFertilizer(fert);
    setFormData(fert);
    scrollToTop();
    setTimeout(() => {
      cropInputRef.current?.focus();
    }, 500);
  };

  const handleUpdateFertilizer = async () => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/api/fertilizers/${selectedFertilizer.id}/`,
        formData
      );
      fetchFertilizers();
      setSelectedFertilizer(null);
      setFormData({
        crop: '',
        fertilizer_name: '',
        fertilizer_type: '',
        composition: '',
        application_method: '',
        application_time: ''
      });
      showMessage('Fertilizer updated successfully!', 'success');
    } catch (error) {
      showMessage('Error updating fertilizer.', 'error');
      console.error('Error updating fertilizer:', error.response?.data || error.message);
    }
  };

  const handleDeleteFertilizer = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/api/fertilizers/${id}/`);
      await fetchFertilizers();
      showMessage('Fertilizer deleted successfully!', 'error');
      scrollToTop();
    } catch (error) {
      showMessage('Error deleting fertilizer.', 'error');
      console.error('Error deleting fertilizer:', error);
    }
  };

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
        <h2>Fertilizer Management</h2>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <input
            ref={cropInputRef}
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            placeholder="Crop"
          />
          <input
            name="fertilizer_name"
            value={formData.fertilizer_name}
            onChange={handleChange}
            placeholder="Fertilizer Name"
          />
          <input
            name="fertilizer_type"
            value={formData.fertilizer_type}
            onChange={handleChange}
            placeholder="Type"
          />
          <input
            name="composition"
            value={formData.composition}
            onChange={handleChange}
            placeholder="Composition"
          />
          <input
            name="application_method"
            value={formData.application_method}
            onChange={handleChange}
            placeholder="Application Method"
          />
          <input
            name="application_time"
            value={formData.application_time}
            onChange={handleChange}
            placeholder="Application Time"
          />
        </div>

        {selectedFertilizer ? (
          <button className="update-btn" onClick={handleUpdateFertilizer}>Update Fertilizer</button>
        ) : (
          <button className="create-btn" onClick={handleAddFertilizer}>Add Fertilizer</button>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Crop</th>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fertilizers.map((fert) => (
              <tr key={fert.id}>
                <td>{fert.id}</td>
                <td>{fert.crop}</td>
                <td>{fert.fertilizer_name}</td>
                <td>{fert.fertilizer_type}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(fert)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteFertilizer(fert.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminFertilizerManagement;
