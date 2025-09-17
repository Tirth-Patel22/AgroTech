import { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import './Pesticide.css';

const PesticideList = () => {
  const [pesticides, setPesticides] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPesticides = async (query = '') => {
    setLoading(true); 
    try {
      const response = await fetch(`http://localhost:8000/api/pesticides/?search=${query}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setPesticides(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setPesticides([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPesticides();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchPesticides(value);
  };

  return (
    <>
    <Navbar/>
    <div className="pesticide-container">
      {/* Centered Header */}
      <div className="pesticide-header">
        <h2>Pesticide List</h2>
        <div className="pesticide-search-bar-wrapper">
          <input
          type="text"
          placeholder="Search pesticide or crop name..."
          value={search}
          onChange={handleSearch}
          className="search-input-pesticide"
        />
        </div>
        
      </div> 

      {/* List Section */}
      {loading ? (
        <p className="pesticide-message">Loading...</p>
      ) : pesticides.length === 0 ? (
        <p className="pesticide-message">No pesticides found.</p>
      ) : (
        <div className="pesticide-list">
          {pesticides.map((item) => (
            <div key={item.id} className="pesticide-card">
              <h3>{item.name}</h3>
              <p><strong>Crop:</strong> {item.crop}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Application Rate:</strong> {item.application_rate} kg/ha</p>
              <p><strong>Toxicity:</strong> {item.toxicity}</p>
              <p><strong>Manufacturer:</strong> {item.manufacturer}</p>
              <p><strong>Usage Frequency:</strong> {item.usage_frequency}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
    
  );
};

export default PesticideList;
