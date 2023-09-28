import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import BrowseHero from '../components/BrowseHero/BrowseHero';
import Tabs from '../components/Tabs/Tabs';
import BrowseGeneral from '../components/BrowseGeneral/BrowseGeneral';
import { Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const tabToName = {
  male: 0,
  female: 1,
  kids: 2
}

const Browse = () => {
  const [isMobile, setIsMobile] = useState(false);
  const params = useParams();

  const [tabIndex, setTabIndex] = useState(0)

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

  useEffect(() => {
    console.log(params.sex)
    console.log(tabToName[params.sex])
    setTabIndex(tabToName[params.sex])
  }, [params])

  return (
    <>
      <BrowseHero />
      <Stack my={4}>
        <Tabs
          setTabIndex={setTabIndex}
          tabIndex={tabIndex}
          tabs={[
            {
              element: <BrowseGeneral tabIndex={0} />,
              label: <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/browse/male">Men</Link>,
            },
            {
              element: <BrowseGeneral tabIndex={1} />,
              label: <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/browse/female">Women</Link>,
            },
            {
              element: <BrowseGeneral tabIndex={2} />,
              label: <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/browse/kids">Kids</Link>,
            }
          ]}
        />
      </Stack >
    </>
  )
}

export default Browse;