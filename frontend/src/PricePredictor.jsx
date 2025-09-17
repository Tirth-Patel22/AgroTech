// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './PricePredict.css';

// function PredictPrice() {
//   const [cropOptions, setCropOptions] = useState([]);
//   const [selectedCrop, setSelectedCrop] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [predictedPrice, setPredictedPrice] = useState('');

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/market-crop-names/')
//       .then(response => {
//         setCropOptions(response.data.crops);
//       })
//       .catch(error => {
//         console.error('Error fetching crop names:', error);
//       });
//   }, []);

//   const handlePredict = () => {
//     axios.post('http://127.0.0.1:8000/api/predict-price/', {
//       crop: selectedCrop,
//       date: selectedDate
//     })
//     .then(response => {
//       setPredictedPrice(response.data.predicted_price);
//     })
//     .catch(error => {
//       console.error('Error predicting price:', error);
//     });
//   };

//   return (
//     <div className="predict-price-container">
//       <h2 className="predict-price-title">Predict Market Price</h2>

//       <label className="predict-price-label">Select Crop:</label>
//       <select 
//         value={selectedCrop}
//         onChange={e => setSelectedCrop(e.target.value)}
//         className="predict-price-select"
//       >
//         <option value="">-- Select Crop --</option>
//         {cropOptions.map(crop => (
//           <option key={crop} value={crop}>{crop}</option>
//         ))}
//       </select>

//       <label className="predict-price-label">Select Date:</label>
//       <input
//         type="date"
//         value={selectedDate}
//         onChange={e => setSelectedDate(e.target.value)}
//         className="predict-price-input"
//       />

//       <button
//         onClick={handlePredict}
//         className="predict-price-button"
//       >
//         Predict Price
//       </button>

//       {predictedPrice && (
//         <div className="predict-price-result">
//           <p className="predict-price-result-title">Predicted Price:</p>
//           <p className="predict-price-result-value">₹ {predictedPrice}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PredictPrice;

import axios from 'axios';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import './PricePredict.css';


function PredictPrice() {
  const [csvData, setCsvData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(30);
  const [cropOptions, setCropOptions] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [predictedPrice, setPredictedPrice] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('../public/market.csv')
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: results => {
            setCsvData(results.data);
          }
        });
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/market-crop-names/')
      .then(response => {
        setCropOptions(response.data.crops);
      })
      .catch(error => {
        console.error('Error fetching crop names:', error);
      });
  }, []);

  const handlePredict = () => {
    if (!selectedCrop || !selectedDate) return;

    setLoading(true);
    axios.post('http://127.0.0.1:8000/api/predict-price/', {
      crop: selectedCrop,
      date: selectedDate
    })
    .then(response => {
      setPredictedPrice(response.data.predicted_price);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error predicting price:', error);
      setLoading(false);
    });
  };

  const handleViewMore = () => {
    setVisibleRows(prev => prev + 30);
  };

  return (
    <>
    <Navbar/>
    <div className="predict-price-container">
      {/* CSV Table Section */}
      <h2 className="predict-price-title">Market Price Data</h2>
      <div className="csv-table-container">
        <table className="csv-table">
          <thead>
            <tr>
              {csvData.length > 0 && Object.keys(csvData[0]).map(header => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.slice(0, visibleRows).map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {visibleRows < csvData.length && (
          <button className="view-more-button" onClick={handleViewMore}>
            View More
          </button>
        )}
        <button className="view-more-button" onClick={() => window.open('https://agmarknet.gov.in/')}>
        Visit Website
        </button>

      </div>

      {/* Predict Price Form Section */}
      <h2 className="predict-price-title">Predict Market Price</h2>

      <label className="predict-price-label">Select Crop:</label>
      <select 
        value={selectedCrop}
        onChange={e => setSelectedCrop(e.target.value)}
        className="predict-price-select"
      >
        <option value="">-- Select Crop --</option>
        {cropOptions.map(crop => (
          <option key={crop} value={crop}>{crop}</option>
        ))}
      </select>

      <label className="predict-price-label">Select Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        className="predict-price-input"
        placeholder='Date'
      />

      <button
        onClick={handlePredict}
        className="predict-price-button"
        disabled={!selectedCrop || !selectedDate}
      >
        Predict Price
      </button>

      {loading && <p className="predict-price-loading">Predicting...</p>}

      {predictedPrice && (
        <div className="predict-price-result">
          <p className="predict-price-result-title">Predicted Price:</p>
          <p className="predict-price-result-value">₹ {predictedPrice} <span className='inner-100'>/100 KG</span></p>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default PredictPrice;
