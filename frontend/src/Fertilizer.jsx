import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Fertilizer.css';
import Footer from './Footer';
import Navbar from './Navbar';

const FertilizerList = () => {
  const location = useLocation();
  const [fertilizers, setFertilizers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchFertilizers = async (query = '') => {
    try {
      const response = await fetch(`http://localhost:8000/api/fertilizers/?search=${query}`);
      if (!response.ok) throw new Error('Failed to fetch fertilizers');
      const data = await response.json();
      setFertilizers(data);
    } catch (error) {
      console.error('Error fetching fertilizers:', error);
    }
  };

  useEffect(() => {
    fetchFertilizers(search);
  }, [search]);

   useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });  // ✅ Scroll on mount/route change
  }, [location.pathname]);  // ✅ Will run on every route change

  return (
    <>
    <Navbar/>
    <div className="fertilizer-container">
      <h2>Fertilizer Information</h2>
      <div className="fertilizer-wrapper">
        <input
        type="text"
        placeholder="Search by crop name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      </div>

      <div className="fertilizer-list">
        {fertilizers.length === 0 ? (
          <p className='fertilizer-message'>No fertilizers found.</p>
        ) : (
          fertilizers.map((fertilizer) => (
            <div key={fertilizer.id} className="fertilizer-card">
              <h3>{fertilizer.crop} - {fertilizer.fertilizer_name}</h3>
              <p><strong>Type:</strong> {fertilizer.fertilizer_type}</p>
              <p><strong>Composition:</strong> {fertilizer.composition}</p>
              <p><strong>Application Method:</strong> {fertilizer.application_method}</p>
              <p><strong>Application Time:</strong> {fertilizer.application_time}</p>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default FertilizerList;
