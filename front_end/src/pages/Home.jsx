import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Hero from '../components/Hero/Hero';
import Footer from '../components/Footer/Footer';


const Home = () => {
  const [appBarHeight, setAppBarHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const appBar = document.querySelector('.MuiAppBar-root');
      if (appBar) {
        setAppBarHeight(appBar.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Hero appBarHeight={appBarHeight} />
  )
}

export default Home