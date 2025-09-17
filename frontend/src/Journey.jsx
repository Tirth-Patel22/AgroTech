import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import './Journey.css';
import Navbar from './Navbar';

const JourneyPage = () => {
  const [showAddJourney, setShowAddJourney] = useState(false);
  const [showJourneys, setShowJourneys] = useState(false);
  const [cropOptions, setCropOptions] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [journeys, setJourneys] = useState([]);
  const [message, setMessage] = useState('');

  const fetchCropOptions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/crop-names/');
      setCropOptions(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
      setMessage('Failed to load crop options.');
    }
  };
 
  const handleAddJourney = async () => {
    if (!selectedCrop) {
      setMessage('Please select a crop.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setMessage('User not found. Please login.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/create-growth-stage/', {
        username: user.username,
        crop_name: selectedCrop,
      });

      setMessage('Journey added successfully!');
      setSelectedCrop('');
      setShowAddJourney(false);

      // Refresh journey list if currently showing
      if (showJourneys) {
        fetchJourneys();
      }

    } catch (error) {
      console.error('Error adding journey:', error);
      setMessage('Failed to add journey.');
    }
  };

  const fetchJourneys = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setMessage('User not found. Please login.');
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user-growth-stages/${user.username}/`);
      console.log("Journeys API response:", response.data);  

      if (Array.isArray(response.data) && response.data.length > 0) {
        setJourneys(response.data);
      } else {
        setJourneys([]);
      }

      setShowJourneys(true);
      setMessage('');

    } catch (error) {
      console.error('Error fetching journeys:', error);
      setJourneys([]);
      setShowJourneys(true);
      setMessage('Could not fetch journeys.');
    }
  };

  const handleDeleteJourney = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-growth-stage/${id}/`);
      setJourneys(prev => prev.filter(journey => journey.id !== id));
      setMessage('Journey deleted.');
    } catch (error) {
      console.error('Error deleting journey:', error);
      setMessage('Failed to delete journey.');
    }
  };

  const calculateTotalDuration = (journey) => {
    const start = new Date(journey.germination_start);
    const end = new Date(journey.maturity_end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    fetchCropOptions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="journey-page">
        <div className="header-box">
          <h1>Crop Growth Journeys</h1>
          <div className="button-container">
            <button onClick={() => setShowAddJourney(!showAddJourney)}>Add Journey</button>
            <button onClick={fetchJourneys}>View Journeys</button>
          </div>
        </div>

        {message && <div className="message-box" style={{ color: 'white' }}>{message}</div>}

        {showAddJourney && (
          <form
            className="add-journey-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddJourney();
            }}
          > 
            <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
              <option value="">Select a crop</option>
              {cropOptions.length > 0 ? (
                cropOptions.map((crop, index) => (
                  <option key={index} value={crop.name}>{crop.name}</option>
                ))
              ) : (
                <option disabled>No crops available</option>
              )}
            </select>
            <button type="submit">Confirm Add Journey</button>
          </form>
        )}

        {showJourneys && (
          <div className="journey-list">
            {journeys.length === 0 ? (
              <p style={{ color: 'white' }}>No journeys found.</p>
            ) : (
              journeys.map((journey, index) => (
                <div className="journey-card" key={index}>
                  <div className="card-header">
                    <h2>{journey.crop_name}</h2>
                    <button className="close-button" onClick={() => handleDeleteJourney(journey.id)}>❌</button>
                  </div>

                  <p><strong>Sowing Date:</strong> {journey.germination_start}</p>
                  <p><strong>Total Duration:</strong> {journey.duration} days</p>
                  <div className="journey-table-wrapper">
                    <table className="journey-table">
                    <thead>
                      <tr>
                        <th>Stage</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Water (Days)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Germination</td>
                        <td>{journey.germination_start}</td>
                        <td>{journey.germination_end}</td> 
                        <td>{journey.germination_water}</td>
                      </tr>
                      <tr>
                        <td>Vegetative</td>
                        <td>{journey.vegetative_start}</td>
                        <td>{journey.vegetative_end}</td>
                        <td>{journey.vegetative_water}</td>
                      </tr>
                      <tr>
                        <td>Flowering</td>
                        <td>{journey.flowering_start}</td>
                        <td>{journey.flowering_end}</td>
                        <td>{journey.flowering_water}</td>
                      </tr>
                      <tr>
                        <td>Maturity</td>
                        <td>{journey.maturity_start}</td>
                        <td>{journey.maturity_end}</td>
                        <td>{journey.maturity_water}</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default JourneyPage;
