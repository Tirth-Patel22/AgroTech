// import { useEffect, useRef, useState } from 'react';
// import './Crop.css';
// import Footer from './Footer';
// import Navbar from './Navbar';

// const CropList = () => {
//   const [crops, setCrops] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(false);

//   const resultsRef = useRef(null); // ref to results section

//   const fetchCrops = async (query = '') => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:8000/api/crops/?search=${query}`);
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       const data = await response.json();
//       setCrops(data);

//       // Scroll to results if searching or initial fetch with data
//       if ((query || data.length > 0) && resultsRef.current) {
//         resultsRef.current.scrollIntoView({ behavior: 'smooth' });
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setCrops([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCrops(); // fetch all on first load
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     fetchCrops(value);
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="crop-container">
//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-overlay"></div>
//         <div className="hero-content">
//           <h1 className="hero-title">Discover & Manage Your Crops</h1>
//           <input
//             type="text"
//             placeholder="Search crop name..."
//             value={search}
//             onChange={handleSearch}
//             className="search-input"
//           />
//           <button
//             onClick={() => resultsRef.current.scrollIntoView({ behavior: 'smooth' })}
//             className="scroll-down-btn"
//           >
//             ↓ See Crops
//           </button>
//         </div>
//       </div>

//       {/* Results Section */}
//       <div className="results-section" ref={resultsRef}>
//         {loading ? (
//           <p className="loading">Loading...</p>
//         ) : crops.length === 0 ? (
//           <p className="no-results">No crops found.</p>
//         ) : (
//           <div className="crop-list">
//             {crops.map((item) => (
//               <div key={item.id} className="crop-card">
//                 {/* Image Column */}
//                 <div className="image-column">
//                   <img src={item.image} alt={item.name} className="crop-image" />
//                 </div>

//                 {/* Details Column */}
//                 <div className="details-column">
//                   <h3 className='crop_name'>{item.name}</h3>
//                   <p><strong>Type:</strong> {item.crop_type}</p>
//                   <p><strong>Sowing Season:</strong> {item.sowing_season}</p>
//                   <p><strong>Harvest Season:</strong> {item.harvest_season}</p>
//                   <p><strong>Duration:</strong> {item.duration_days} days</p>
//                   <p><strong>Ideal Temperature:</strong> {item.ideal_temperature_min}°C - {item.ideal_temperature_max}°C</p>
//                   <p><strong>Ideal Rainfall:</strong> {item.ideal_rainfall} mm</p>
//                   <p><strong>Soil Type:</strong> {item.soil_type}</p>
//                   <p><strong>Growth Stages:</strong></p>
//                   <ul>
//                     <li><strong>Germination:</strong> {item.germination}</li>
//                     <li><strong>Vegetative:</strong> {item.vegetative_growth}</li>
//                     <li><strong>Flowering:</strong> {item.flowering}</li>
//                     <li><strong>Maturity:</strong> {item.maturity}</li>
//                   </ul>
//                   <p><strong>Watering Schedule:</strong></p>
//                   <ul>
//                     <li><strong>Germination:</strong> {item.germination_water} days</li>
//                     <li><strong>Vegetative:</strong> {item.vegetative_water} days</li>
//                     <li><strong>Flowering:</strong> {item.flowering_water} days</li>
//                     <li><strong>Maturity:</strong> {item.maturity_water} days</li>
//                   </ul>
//                   <p><strong>Description:</strong> {item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default CropList;

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Crop.css';
import Footer from './Footer';
import Navbar from './Navbar';

const CropList = () => {

  const location = useLocation(); 

  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef(null); // ref to results section

  const fetchCrops = async (query = '') => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/crops/?search=${query}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setCrops(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setCrops([]);
    }
    setLoading(false);
  };

     useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);                     
    useEffect(() => {
     fetchCrops();
   }, []);

   
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCrops(value);

    // Scroll to results section if search input has content
    if (value && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="crop-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">Discover & Manage Your Crops</h1>
            <input
              type="text"
              placeholder="Search crop name..."
              value={search}
              onChange={handleSearch}
              className="search-input-crop"
            />
            <button
              onClick={() =>
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="scroll-down-btn"
            >
              ↓ See Crops
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section" ref={resultsRef}>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : crops.length === 0 ? (
            <p className="no-results">No crops found.</p>
          ) : (
            <div className="crop-list">
              {crops.map((item) => (
                <div key={item.id} className="crop-card">
                  {/* Image Column */}
                  <div className="image-column">
                    <img src={item.image} alt={item.name} className="crop-image" />
                  </div>

                  {/* Details Column */}
                  <div className="details-column">
                    <h3 className="crop_name">{item.name}</h3>
                    <p><strong>Type:</strong> {item.crop_type}</p>
                    <p><strong>Sowing Season:</strong> {item.sowing_season}</p>
                    <p><strong>Harvest Season:</strong> {item.harvest_season}</p>
                    <p><strong>Duration:</strong> {item.duration_days} days</p>
                    <p><strong>Ideal Temperature:</strong> {item.ideal_temperature_min}°C - {item.ideal_temperature_max}°C</p>
                    <p><strong>Ideal Rainfall:</strong> {item.ideal_rainfall} mm</p>
                    <p><strong>Soil Type:</strong> {item.soil_type}</p>
                    <p><strong>Growth Stages:</strong></p>
                    <ul>
                      <li><strong>Germination:</strong> {item.germination}</li>
                      <li><strong>Vegetative:</strong> {item.vegetative_growth}</li>
                      <li><strong>Flowering:</strong> {item.flowering}</li>
                      <li><strong>Maturity:</strong> {item.maturity}</li>
                    </ul>
                    <p><strong>Watering Schedule:</strong></p>
                    <ul>
                      <li><strong>Germination:</strong> {item.germination_water} days</li>
                      <li><strong>Vegetative:</strong> {item.vegetative_water} days</li>
                      <li><strong>Flowering:</strong> {item.flowering_water} days</li>
                      <li><strong>Maturity:</strong> {item.maturity_water} days</li>
                    </ul>
                    <p><strong>Description:</strong> {item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CropList;
