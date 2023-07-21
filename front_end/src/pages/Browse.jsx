import React from 'react'
import BrowseHero from '../components/BrowseHero/BrowseHero'
import Tabs from '../components/Tabs/Tabs'
import BrowseMen from '../components/BrowseMen/BrowseMen'
import BrowseWoman from '../components/BrowseWomen/BrowseWomen'
import BrowseKids from '../components/BrowseKids/BrowseKids'
import { Stack } from '@mui/material'
import { useState, useEffect } from 'react';



const Browse = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <BrowseHero />
      <Stack my={4}  >
        <Tabs
          firstTab={<BrowseMen />}
          firstTabLabel={isMobile ? 'Men' : 'Shop for Men'}
          secondTab={<BrowseWoman />}
          secondTabLabel={isMobile ? 'Women' : 'Shop for Women'}
          thirdTab={<BrowseKids />}
          thirdTabLabel={isMobile ? 'Kids' : 'Shop for Kids'}
        />
      </Stack>
    </>
  )
}

export default Browse