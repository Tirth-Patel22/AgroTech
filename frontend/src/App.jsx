import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import Admin from './Admin';
import AdminCropManagement from './AdminCropManagement';
import AdminDashboard from './AdminDash';
import AdminDiseaseManagement from './AdminDiseaseManagement';
import AdminFertilizerManagement from './AdminFertilizerManagement';
import AdminPesticideManagement from './AdminPesticideMangement';
import AdminSignUp from './AdminSignup';
import AdminUserManagement from './AdminUserManagement';
import ChangePassword from './ChangePassword';
import Contact from './ContactUs';
import Crops from './Crop';
import Disease from './Disease';
import Fertilizer from './Fertilizer';
import Home from './Home';
import Journey from './Journey';
import Messages from './Message';
import Pesticide from './Pesticide';
import Market from './PricePredictor';
import Profile from './Profile';
import Recommendation from './Recommendation';
import User from './User';

function App() {
  useEffect(()=>{
    window.scrollTo(0, 0);
    window.onbeforeunload = () => window.scrollTo(0, 0);
  },[])
  return (
    <Routes>
      <Route path="/" element={<User />} /> // 👈 Login/Register page
      <Route path="/home" element={<Home />} /> // 👈 Home page
      <Route path="/crop" element={<Crops />} /> // 👈 Crop page
      <Route path="/disease" element={<Disease />} /> // 👈 Disease page
      <Route path="/pesticide" element={<Pesticide />} /> // 👈 Pesticide page
      <Route path="/fertilizer" element={<Fertilizer />} /> // 👈 Fertilizer page
      <Route path="/recommendation" element={<Recommendation />} /> // 👈 Recommendation page
      <Route path="/journey" element={<Journey />} /> // 👈 Journey page
      <Route path="/about" element={<About />} /> // 👈 About page
      <Route path="/contact" element={<Contact />} /> // 👈 Contact page
      <Route path="/market" element={<Market />} /> // 👈 Price Predict
      <Route path="/admin" element={<Admin />} /> // 👈 Admin
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> // 👈 Admin Dashboard
      <Route path="/admin-signup" element={<AdminSignUp />} /> // 👈 Admin Signup
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/crops" element={<AdminCropManagement />} />
      <Route path="/admin/pesticides" element={<AdminPesticideManagement />} />
      <Route path='/admin/diseases' element={<AdminDiseaseManagement/>}/>
      <Route path='/admin/fertilizers' element={<AdminFertilizerManagement/>}/>
      <Route path='/messages' element={<Messages/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/change-password' element={<ChangePassword/>} />

    </Routes>
  );
}

export default App;
