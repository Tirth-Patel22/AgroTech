import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2 style={{color:'white'}}>AgroTech</h2>
        <p>Your partner in smart, sustainable farming.</p>
      </div>

      <div className="footer-sections">
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/market">Market</Link>
          <Link to="/recommendation">Recommendation</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p><FaEnvelope /> support@agrosmart.com</p>
          <p><FaPhoneAlt /> +91 98765 43210</p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 AgroSmart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
