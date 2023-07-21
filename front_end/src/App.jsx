import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import { ThemeProvider } from '@mui/material/styles';
import theme from './constants/MuiTheme';
import DefaultLayout from './layouts/DefaultLayout';
import BrowseMenClothes from './pages/BrowseMenClothes';
import BrowseMenAccesories from './pages/BrowseMenAccessories';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browseMenClothes" element={<BrowseMenClothes />} />
          <Route path="/browseMenAccesories" element={<BrowseMenAccesories />} />
        </Routes>
      </DefaultLayout>
    </ThemeProvider>
  );
}

export default App;
