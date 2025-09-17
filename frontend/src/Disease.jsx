import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Disease.css';
import Footer from './Footer';
import Navbar from './Navbar';

const CropDiseaseList = () => {

  const location = useLocation();  

  const [diseases, setDiseases] = useState([]);
  const [search, setSearch] = useState('');

  const fetchDiseases = async (query = '') => {
    try {
      const response = await fetch(`http://localhost:8000/api/crop-diseases/?search=${query}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setDiseases(data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

     useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [location.pathname]);         

    useEffect(() => {
       fetchDiseases(search);
    }, [search]);

    
  return (
    <>
    <Navbar/>
    <div className="disease-container">
      <h2>Crop Disease Information</h2>
      <div className="disease-search-wrapper">
        <input
        type="text"
        placeholder="Search by crop name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input-disease"
      />
      </div>
      <div className="disease-list">
        {diseases.length === 0 ? (
          <p className='disease-message'>No diseases found.</p>
        ) : (
          diseases.map((disease) => (
            <div key={disease.id} className="disease-card">
              <img src={disease.image_path} alt={disease.disease} />
              <h3>{disease.crop} - {disease.disease}</h3>
              <p><strong>Symptoms:</strong> {disease.symptoms}</p>
              <p><strong>Cause:</strong> {disease.cause}</p>
              <p><strong>Control:</strong> {disease.control_measures}</p>
            </div> 
          ))
        )}
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default CropDiseaseList;
