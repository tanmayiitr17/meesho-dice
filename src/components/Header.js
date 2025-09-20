import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (state.searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(state.searchQuery)}`);
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return null;
      case '/products':
        return 'Products For You';
      case '/cart':
        return 'CART';
      case '/profile':
        return 'ACCOUNT';
      case '/orders':
        return 'ORDERS';
      case '/wishlist':
        return 'MY PRODUCTS';
      case '/mail':
        return null;
      case '/size-settings':
        return 'SIZE SETTINGS';
      case '/categories':
        return null;
      default:
        if (location.pathname.startsWith('/product/')) {
          return null;
        }
        return 'meesho';
    }
  };

  const showBackButton = () => {
    return location.pathname !== '/' && location.pathname !== '/categories';
  };

  const showMenuButton = () => {
    return location.pathname === '/' || location.pathname === '/products';
  };

  const showCloseButton = () => {
    return location.pathname === '/categories';
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
            {showBackButton() && (
              <button
                onClick={() => navigate(-1)}
                className="p-1 mr-2"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {showMenuButton() && (
              <button
                onClick={() => navigate('/categories')}
                className="p-1 mr-3"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            {showCloseButton() && (
              <button
                onClick={() => navigate('/')}
                className="p-1 mr-3"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            <div className="text-lg font-bold text-meesho-pink">
              {getPageTitle() || 'meesho'}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {(location.pathname === '/' || location.pathname === '/products' || location.pathname.startsWith('/product/')) && (
              <>
                <button className="p-1">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <Link to="/wishlist" className="p-1 relative">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {state.wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {state.wishlist.length}
                    </span>
                  )}
                </Link>
              </>
            )}
            
            <Link to="/cart" className="p-1 relative">
              <svg className="w-6 h-6 text-meesho-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              {state.cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {state.cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
