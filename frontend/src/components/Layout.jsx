import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, userData }) => {
  const [data, setData] = useState({});

  useEffect(() => {
   setData(userData)
  }, [userData]);

  return (
    <>
      <Navbar userData={data} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
