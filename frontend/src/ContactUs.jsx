import { useEffect, useState } from 'react';
import './ContactUs.css';
import Footer from './Footer';
import Navbar from './Navbar';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', username: '' });
  const [modalMsg, setModalMsg] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load username from localStorage if logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setForm((f) => ({ ...f, username: userObj.username || '' }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMsg(data.message || 'Message sent successfully!');
        setModalOpen(true);
        setForm({ ...form, name: '', email: '', message: '' });
      } else {
        setModalMsg(data.error || 'Failed to send message. Please try again.');
        setModalOpen(true);
      }
    } catch {
      setModalMsg('Network error, please try again.');
      setModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-wrapper">
        <h2 className="contact-title">Contact Us</h2>
        
        {/* Show user info if logged in */}
        {form.username && (
          <div className="user-info">
            <p>Logged in as: <strong>{form.username}</strong></p>
          </div>
        )}

        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send us a Message</h3>
            
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="contact-input"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="contact-input"
                required
              />
            </div>

            <div className="input-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="contact-textarea"
                required
              />
            </div>

            <button
              type="submit"
              className={`contact-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Uncomment if you want to add the map */}
          {/* <div className="contact-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d86412.12262524388!2d72.60277422379953!3d23.05379984939845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1751884121040!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AgroTech Location"
            />
          </div> */}
        </div>

        {modalOpen && (
          <div className="contact-modal">
            <div className="contact-modal-content">
              <p>{modalMsg}</p>
              <button
                className="contact-modal-button"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;