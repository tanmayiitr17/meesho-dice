import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import AIAssistant from './pages/Mail';
import Wishlist from './pages/Wishlist';
import SizeSettings from './pages/SizeSettings';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Header />
          <div className="pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/mail" element={<AIAssistant />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/size-settings" element={<SizeSettings />} />
            </Routes>
          </div>
          <BottomNavigation />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
