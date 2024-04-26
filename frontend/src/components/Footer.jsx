import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../assets/logo.svg';
import FeedBack from './FeedBack'; // Import the FeedBack component

const Footer = () => {
  return (
    <footer className="text-black py-8" style={{ backgroundColor: '#f5f5dc' }}>
      <div className="container mx-auto flex justify-between">
        {/* Column 1 - WI$E */}
        <div className="footer-column">
          <h3 className="font-bold mb-4">WI$E</h3>
          <ul className="list-none">
            <li className="mb-2 hover:text-gray-400">About</li>
            <li className="mb-2 hover:text-gray-400">Home</li>
          </ul>
        </div>
        {/* Column 2 - Account */}
        <div className="footer-column">
          <h3 className="font-bold mb-4">Account</h3>
          <ul className="list-none">
            <li className="mb-2 hover:text-gray-400">Login</li>
            <li className="mb-2 hover:text-gray-400">Sign Up</li>
            <li className="mb-2 hover:text-gray-400">Reset Password</li>
          </ul>
        </div>
        {/* Column 3 - More */}
        <div className="footer-column">
          <h3 className="font-bold mb-4">More</h3>
          <ul className="list-none">
            <li className="mb-2 hover:text-gray-400">Contact Us</li>
            <li className="mb-2 hover:text-gray-400">
              <Link to="/FeedBack">Feedback</Link> {/* Link to Feedback component */}
            </li>
            <li className="flex items-center mb-2 hover:text-gray-400">
              <img width="32" height="32" src="https://img.icons8.com/dusk/32/instagram-new--v1.png" alt="instagram-new--v1" />
              <li className="flex items-center hover:text-gray-400">
                <img width="32" height="32" src="https://img.icons8.com/plasticine/32/facebook-new.png" alt="facebook-new" />
              </li>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
