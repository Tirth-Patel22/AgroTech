import { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import './Home.css';
import Navbar from './Navbar';

const Home = () => {
  
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  const coreFeatures = [
    { title: "Crop Management", icon: "🌱", description: "Track and manage all your crops in one place", path: "/crop" },
    { title: "Fertilizer Guide", icon: "🧪", description: "Get customized fertilizer recommendations", path: "/fertilizer" },
    { title: "Pesticide Advisor", icon: "🐞", description: "Find the right pesticides for your crops", path: "/pesticide" }
  ];

  const farmingTools = [
    { title: "Crop Journey", icon: "📅", description: "Record your crop's growth stages", path: "/journey" },
    { title: "Smart Recommendations", icon: "🤖", description: "AI-powered crop suggestions", path: "/recommendation" },
    { title: "Market Prices", icon: "💲", description: "Real-time commodity prices", path: "/market" }
  ];

  const experts = [
    {
      name: "Dr. Ankit Patel",
      image: "../public/expert1.jpg",
      specialty: "Soil & Fertilizer Specialist",
      description: "Over 15 years of experience in organic and synthetic soil nutrition management. Advisor for multiple state agricultural boards.",
      linkedin: "https://linkedin.com/in/meerapatel"
    },
    {
      name: "Dr. Rajesh Kumar",
      image: "../public/expert2.jpg",
      specialty: "Crop Disease Expert",
      description: "Specializes in early pest and fungal disease detection using AI imaging tools. Author of 3 national publications.",
      linkedin: "https://linkedin.com/in/rajeshkumar"
    },
    {
      name: "Dr. Niraj Verma",
      image: "../public/expert3.jpg",
      specialty: "Agro-Marketing Consultant",
      description: "Market strategist for export-quality crop yields and modern market integration for Indian farmers.",
      linkedin: "https://linkedin.com/in/nehaverma"
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="home-container">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>AgroTech Smart Farming</h1>
          <p>Modern tools for higher yields, smarter markets, and better farm profits</p>
        </div>
      </section>

      {/* Video Carousel */}
      <section className="carousel-section">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={5000}
        >
          <div>
            <video src="../public/v1.mp4" autoPlay muted loop></video>
          </div>
          <div>
            <video src="../public/v2.mp4" autoPlay muted loop></video>
          </div>
        </Carousel>
      </section>

      {/* Core Features */}
      <section className="feature-section">
        <h2>Core Farming Services</h2>
        <div className="features-grid">
          {coreFeatures.map((feature, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to={feature.path} className="home-btn home-btn-outlined">Explore</Link>
            </div>
          ))}
        </div>
      </section>

      {/* More Tools */}
      <section className="feature-section alt-bg">
        <h2>Essential Farmer Tools</h2>
        <div className="features-grid">
          {farmingTools.map((tool, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{tool.icon}</div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <Link to={tool.path} className="home-btn home-btn-outlined">Explore</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <h2>Our Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <h3>10,000+</h3>
            <p>Active Farmers</p>
          </div>
          <div className="achievement-card">
            <h3>30%</h3>
            <p>Average Yield Growth</p>
          </div>
          <div className="achievement-card">
            <h3>500+</h3>
            <p>Crop Varieties Supported</p>
          </div>
        </div>
      </section>

      {/* Agro Experts */}
      <section className="experts-section full-width">
        <h2>Meet Our Agro Experts</h2>
        {experts.map((expert, i) => (
          <div
            className={`expert-row ${i % 2 === 0 ? 'left-text' : 'right-text'}`}
            key={i}
          >
            <div className="expert-text">
              <h3>{expert.name}</h3>
              <p><strong>{expert.specialty}</strong></p>
              <p>{expert.description}</p>
              <a
                href={expert.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                Connect on LinkedIn
              </a>
            </div>
            <div className="expert-image">
              <img src={expert.image} alt={expert.name} />
            </div>
          </div>
        ))}
      </section>

    </div>
    <Footer/>
    </>
  );
};

export default Home;
