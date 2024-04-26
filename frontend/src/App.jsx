import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import { Navbar, LandingPage, Footer, FeedBack, Layout, HeroSection, Dashboard } from './components';
import Login from './pages/Login';
import axios from 'axios';
import Dash from './components/Dash';

function App() {
  const [userData, setUserData] = useState({ success: false });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (!storedUserData) {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/checklogin`, {
            headers: {
              authorization: token,
            },
          });

          const userData = response.data;
          setUserData(userData);
          localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          setUserData(storedUserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout userData={userData}><LandingPage /></Layout>} />
        <Route path="/login" element={<Layout userData={userData}><Login /></Layout>} />
        <Route path="/signup" element={<Layout userData={userData}><Signup /></Layout>} />
        <Route path="/feedback" element={<Layout userData={userData}><FeedBack /></Layout>} />
        <Route path="/dashboard/createexpense" element={<Layout userData={userData}><Dashboard /></Layout>} />
        <Route path="/dashboard" element={<Layout userData={userData}><Dash/></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;