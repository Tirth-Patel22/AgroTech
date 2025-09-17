import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './AdminDiseaseManagement.css';
import AdminNavbar from './AdminNavbar';

function AdminCropDiseaseManagement() {
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [formData, setFormData] = useState({
    crop: '',
    disease: '',
    symptoms: '',
    cause: '',
    control_measures: '',
    image_path: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const pageContentRef = useRef(null);

  const fetchDiseases = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/api/diseases/');
      setDiseases(response.data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDisease = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/api/diseases/', formData);
      fetchDiseases();
      setFormData({
        crop: '',
        disease: '',
        symptoms: '',
        cause: '',
        control_measures: '',
        image_path: ''
      });
      setMessage('Disease added successfully!');
      setMessageType('success');
      scrollToTop();
    } catch (error) {
      console.error('Error adding disease:', error);
      setMessage('Error adding disease.');
      setMessageType('error');
    }
  };

  const handleEditClick = (item) => {
    setSelectedDisease(item);
    setFormData(item);
    scrollToTop();
  };

  const handleUpdateDisease = async () => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/api/diseases/${selectedDisease.id}/`, formData);
      fetchDiseases();
      setSelectedDisease(null);
      setFormData({
        crop: '',
        disease: '',
        symptoms: '',
        cause: '',
        control_measures: '',
        image_path: ''
      });
      setMessage('Disease updated successfully!');
      setMessageType('success');
      scrollToTop();
    } catch (error) {
      console.error('Error updating disease:', error);
      setMessage('Error updating disease.');
      setMessageType('error');
    }
  };

  const handleDeleteDisease = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/api/diseases/${id}/`);
      fetchDiseases();
      setMessage('Disease deleted successfully!');
      setMessageType('error');
      scrollToTop();
    } catch (error) {
      console.error('Error deleting disease:', error);
      setMessage('Error deleting disease.');
      setMessageType('error');
    }
  };

  const scrollToTop = () => {
    if (pageContentRef.current) {
      pageContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='page-content' ref={pageContentRef}>
        <h2>Crop Disease Management</h2>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <input
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            placeholder="Crop"
          />
          <input
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            placeholder="Disease"
          />
          <input
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Symptoms"
          />
          <input
            name="cause"
            value={formData.cause}
            onChange={handleChange}
            placeholder="Cause"
          />
          <input
            name="control_measures"
            value={formData.control_measures}
            onChange={handleChange}
            placeholder="Control Measures"
          />
          <input
            name="image_path"
            value={formData.image_path}
            onChange={handleChange}
            placeholder="Image Path"
          />
        </div>

        {selectedDisease ? (
          <button className="update-btn" onClick={handleUpdateDisease}>
            Update Disease
          </button>
        ) : (
          <button className="create-btn" onClick={handleAddDisease}>
            Add Disease
          </button>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Crop</th>
              <th>Disease</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {diseases.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.crop}</td>
                <td>{item.disease}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(item)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteDisease(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminCropDiseaseManagement;
