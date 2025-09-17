// AboutUs.jsx
import { useEffect } from 'react';
import './AboutUs.css';
import Footer from './Footer';
import Navbar from './Navbar';

function AboutUs() {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in");
    sections.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, i * 200);
    });
  }, []);

  return (
    <>
    <Navbar/>
    <div id="about-wrapper">
      <div className="about-container">
        <h1 className="fade-in heading">About AgroSmart</h1>
        <p className="fade-in">
          AgroSmart is a smart agriculture platform that helps farmers make informed decisions 
          through crop suggestions, disease identification, pesticide and fertilizer recommendations,
          and journey tracking.
        </p>

        <section className="fade-in">
          <h2>Our Mission</h2>
          <p>
            To empower farmers with intelligent tools and insights that promote sustainable agriculture,
            increase productivity, and reduce crop losses using technology.
          </p>
        </section>

        <section className="fade-in">
          <h2>Our Vision</h2>
          <p>
            To become the world’s leading AgriTech partner, transforming traditional farming into smart,
            efficient, and environmentally friendly agriculture.
          </p>
        </section>

        <section className="fade-in">
          <h2>Our Achievements</h2>
          <ul>
            <li>Served over 5,000 farmers across 3 states.</li>
            <li>Prevented 10,000+ crop disease cases.</li>
            <li>Awarded Best AgriTech Innovation 2024.</li>
            <li>Partnered with local agricultural departments.</li>
          </ul>
        </section>

        <section className="fade-in">
          <h2>Meet the Team</h2>
          <p>
            We are a team of developers, agricultural scientists, and designers working to bridge
            technology and sustainable farming.
          </p>
        </section>

        <section className="fade-in">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:support@agrosmart.com">support@agrosmart.com</a></p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: AgroSmart HQ, AgriTech Park, Pune, Maharashtra, India</p>
        </section>
      </div>
    </div>
    <Footer/>
    </>
    
  );
}

export default AboutUs;
