import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import { ThemeProvider } from '@mui/material/styles';
import theme from './constants/MuiTheme';
import DefaultLayout from './layouts/DefaultLayout';
import BrowseWithFilter from './pages/BrowseWithFilter';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import AdminBoard from './pages/AdminBoard';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="browse" element={<DefaultLayout><Browse /></DefaultLayout>} />
        <Route path="browse/:sex" element={<DefaultLayout><Browse /></DefaultLayout>} />
        <Route path="browse/:sex/:category/:categoryId" element={<DefaultLayout><BrowseWithFilter /></DefaultLayout>} />
        <Route path="browse/:sex/:category/:categoryId/:subCategoryId" element={<DefaultLayout><BrowseWithFilter /></DefaultLayout>} />
        <Route path='/productInfo/:productId' element={<DefaultLayout><ProductInfo /></DefaultLayout>} />
        <Route path='cart' element={<DefaultLayout><Cart /></DefaultLayout>} />

        {/* Use AdminLayout for AdminBoard */}
        <Route path='admin' element={<AdminLayout><AdminBoard /></AdminLayout>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
