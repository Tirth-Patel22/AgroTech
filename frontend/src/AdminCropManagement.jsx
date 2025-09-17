import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './AdminCropManagement.css';
import AdminNavbar from './AdminNavbar';

function AdminCropManagement() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    crop_type: '',
    sowing_season: '',
    harvest_season: '',
    duration_days: '',
    ideal_temperature_min: '',
    ideal_temperature_max: '',
    ideal_rainfall: '',
    soil_type: '',
    germination: '',
    vegetative_growth: '',
    flowering: '',
    maturity: '',
    germination_water: '',
    vegetative_water: '',
    flowering_water: '',
    maturity_water: '',
    image: '',
    description: ''
  });

  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/api/crops/');
      setCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCrop = async () => {
  try {
    await axios.post(
      'http://127.0.0.1:8000/api/api/crops/',
      JSON.stringify(formData),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    fetchCrops();
    resetForm();
    setStatusMessage('✅ Crop created successfully!');
  } catch (error) {
    console.error('Error creating crop:', error);
    setStatusMessage('❌ Error creating crop.');
  }
};


  const handleEditClick = (crop) => {
    setSelectedCrop(crop);
    setFormData({ ...crop });
    setStatusMessage('');
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUpdateCrop = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/api/crops/${selectedCrop.id}/`, formData);
      fetchCrops();
      resetForm();
      setStatusMessage('✅ Crop updated successfully!');
    } catch (error) {
      console.error('Error updating crop:', error);
      setStatusMessage('❌ Error updating crop.');
    }
  };

  const handleDeleteCrop = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/api/crops/${id}/`);
      fetchCrops();
      setStatusMessage('🗑️ Crop deleted successfully.');
    } catch (error) {
      console.error('Error deleting crop:', error);
      setStatusMessage('❌ Error deleting crop.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      crop_type: '',
      sowing_season: '',
      harvest_season: '',
      duration_days: '',
      ideal_temperature_min: '',
      ideal_temperature_max: '',
      ideal_rainfall: '',
      soil_type: '',
      germination: '',
      vegetative_growth: '',
      flowering: '',
      maturity: '',
      germination_water: '',
      vegetative_water: '',
      flowering_water: '',
      maturity_water: '',
      image: '',
      description: ''
    });
    setSelectedCrop(null);
  };

  return (
    <>
      <AdminNavbar />
      <div className='page-content'>
        <h2>Crop Management</h2>

        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Crop Type</th>
              <th>Sowing</th>
              <th>Harvest</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(crop => (
              <tr key={crop.id}>
                <td>{crop.id}</td>
                <td>{crop.name}</td>
                <td>{crop.crop_type}</td>
                <td>{crop.sowing_season}</td>
                <td>{crop.harvest_season}</td>
                <td>{crop.duration_days}</td>
                <td>
                  <button className="table-action-btn edit" onClick={() => handleEditClick(crop)}>Edit</button>
                  <button className="table-action-btn delete" onClick={() => handleDeleteCrop(crop.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div ref={formRef}>
          <h3>{selectedCrop ? `Edit Crop: ${selectedCrop.name}` : 'Create New Crop'}</h3>
          
          {/* Full form inputs */}
          <input type="text" name="name" placeholder="Crop Name" value={formData.name} onChange={handleChange} /><br/>
          <input type="text" name="crop_type" placeholder="Crop Type" value={formData.crop_type} onChange={handleChange} /><br/>
          <input type="text" name="sowing_season" placeholder="Sowing Season" value={formData.sowing_season} onChange={handleChange} /><br/>
          <input type="text" name="harvest_season" placeholder="Harvest Season" value={formData.harvest_season} onChange={handleChange} /><br/>
          <input type="number" name="duration_days" placeholder="Duration Days" value={formData.duration_days} onChange={handleChange} /><br/>
          <input type="number" step="0.1" name="ideal_temperature_min" placeholder="Min Temperature (°C)" value={formData.ideal_temperature_min} onChange={handleChange} /><br/>
          <input type="number" step="0.1" name="ideal_temperature_max" placeholder="Max Temperature (°C)" value={formData.ideal_temperature_max} onChange={handleChange} /><br/>
          <input type="number" step="0.1" name="ideal_rainfall" placeholder="Ideal Rainfall (mm)" value={formData.ideal_rainfall} onChange={handleChange} /><br/>
          <input type="text" name="soil_type" placeholder="Soil Type" value={formData.soil_type} onChange={handleChange} /><br/>
          <input type="text" name="germination" placeholder="Germination Stage" value={formData.germination} onChange={handleChange} /><br/>
          <input type="text" name="vegetative_growth" placeholder="Vegetative Growth" value={formData.vegetative_growth} onChange={handleChange} /><br/>
          <input type="text" name="flowering" placeholder="Flowering" value={formData.flowering} onChange={handleChange} /><br/>
          <input type="text" name="maturity" placeholder="Maturity" value={formData.maturity} onChange={handleChange} /><br/>
          <input type="text" name="germination_water" placeholder="Water at Germination" value={formData.germination_water} onChange={handleChange} /><br/>
          <input type="text" name="vegetative_water" placeholder="Water at Vegetative Growth" value={formData.vegetative_water} onChange={handleChange} /><br/>
          <input type="text" name="flowering_water" placeholder="Water at Flowering" value={formData.flowering_water} onChange={handleChange} /><br/>
          <input type="text" name="maturity_water" placeholder="Water at Maturity" value={formData.maturity_water} onChange={handleChange} /><br/>
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} /><br/>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea><br/>

            <div className="button-group">
              {selectedCrop ? (
            <div>
              <button onClick={handleUpdateCrop}>Update Crop</button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          ) : (
            <button onClick={handleCreateCrop}>Create Crop</button>
          )}
            </div>

          {statusMessage && <p style={{ marginTop: '10px' }}>{statusMessage}</p>}
        </div>
      </div>
    </>
  );
}

export default AdminCropManagement;
