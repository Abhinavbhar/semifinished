import React from 'react';
import './styles.css'; 
import HeroSection from './HeroSection';
import { Link } from 'react-router-dom';
import TrackBalance from './TrackBalance';
const LandingPage = () => {


  return (
    <div className="landing-page-box"> {}
      <div className="landing-page">
        <div className="left-content">
          <h1>Welcome to Money Split!</h1>
          <div className="icons">
            <i className="fas fa-home"></i>
            <i className="fas fa-heart"></i>
            <i className="fas fa-asterisk"></i>
          </div>
          <p>Splitting money made easy for friends and family.</p>
          <button className="get-started-btn">
            <Link to="/Dashboard">Get Started</Link>
          </button>
        </div>
        <div className="right-content">
          <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2ViNGdtNXB4aWxzNG95aWppeWEzMHRsMzlyeW84dWQ2dGpyYTB4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RiVTBScC3FFUgyv7sk/giphy.gif" alt="" />
        </div>
      </div>
    <HeroSection/>
      
    </div>
  );
}
export default LandingPage;


  


