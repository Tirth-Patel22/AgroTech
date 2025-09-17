// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import { FaBars, FaTimes } from 'react-icons/fa';

// function Navbar() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/home" className="logo" onClick={closeMenu} style={{textDecoration:'none'}}>AgroTech</Link>

//       <div className="menu-toggle" onClick={toggleMenu}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </div>

//       <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
//         <li><Link to="/home" onClick={closeMenu}>Home</Link></li>
//         <li><Link to="/crop" onClick={closeMenu}>Crops</Link></li>
//         <li><Link to="/disease" onClick={closeMenu}>Diseases</Link></li>
//         <li><Link to="/pesticide" onClick={closeMenu}>Pesticides</Link></li>
//         <li><Link to="/fertilizer" onClick={closeMenu}>Fertilizers</Link></li>
//         <li><Link to="/recommendation" onClick={closeMenu}>Recommendation</Link></li>
//         <li><Link to="/journey" onClick={closeMenu}>Journey</Link></li>
//         <li><Link to="/market" onClick={closeMenu}>Market</Link></li>
//         <li><button onClick={() => { handleLogout(); closeMenu(); }} className="logout-btn">Logout</button></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  /* ---------------- state ---------------- */
  const [menuOpen,    setMenuOpen]    = useState(false); // mobile hamburger
  const [accountOpen, setAccountOpen] = useState(false); // profile dropdown

  /* -------------- handlers --------------- */
  const toggleMenu    = () => setMenuOpen(prev => !prev);
  const closeMenu     = () => setMenuOpen(false);

  const toggleAccount = () => setAccountOpen(prev => !prev);
  const closeAccount  = () => setAccountOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username'); 
    navigate('/');
    closeAccount();
    closeMenu();
  };

  const handleNavClick = (route) => {
    navigate(route);
    closeAccount();
    closeMenu();
  };

  /* --------------- render ---------------- */
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/home" className="logo" onClick={closeMenu} style={{ textDecoration: 'none' }}>
        AgroTech
      </Link>

      {/* Hamburger icon (mobile) */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Nav links */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/home"           onClick={closeMenu}>Home</Link></li>
        <li><Link to="/crop"           onClick={closeMenu}>Crops</Link></li>
        <li><Link to="/disease"        onClick={closeMenu}>Diseases</Link></li>
        <li><Link to="/pesticide"      onClick={closeMenu}>Pesticides</Link></li>
        <li><Link to="/fertilizer"     onClick={closeMenu}>Fertilizers</Link></li>
        <li><Link to="/recommendation" onClick={closeMenu}>Recommendation</Link></li>
        <li><Link to="/journey"        onClick={closeMenu}>Journey</Link></li>
        <li><Link to="/market"         onClick={closeMenu}>Market</Link></li>

        {/* ---------- account icon & dropdown ---------- */}
        <li className={`account ${accountOpen ? 'open' : ''}`}>
          <span className="account-icon" onClick={toggleAccount}>
            <FaUserCircle />
          </span>

          <ul className="dropdown">
            <li onClick={() => handleNavClick('/profile')}>Profile</li>
            <li onClick={() => handleNavClick('/messages')}>Messages</li>
            <li onClick={() => handleNavClick('/change-password')}>Change&nbsp;Password</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
