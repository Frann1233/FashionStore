import React from 'react';
import Footer from '../components/Footer/Footer';
import { Box, Stack } from '@mui/material';
import AdminNavigationBar from '../components/NavigationBar/AdminNavigationBar';
import bg from '../assets/bg.png'



const AdminLayout = ({ children }) => {
  return (
    <Box sx={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }} >
      <Stack
        direction='row'
        justifyContent='space-between'
        flexWrap='unset'
        minHeight={'100vh'}
      >
        <AdminNavigationBar />
        <Stack direction='column' width='100%' height='100%'>
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AdminLayout;
