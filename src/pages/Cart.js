import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Cart = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();


  const cartItems = state.cart.map(item => ({
    ...item,
    discount: `${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off`,
    seller: item.seller || "Meesho Store",
    freeDelivery: item.freeDelivery !== false,
    easyReturns: "All issue easy returns"
  }));

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { ...item, quantity: newQuantity }
      });
    }
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const getTotalProductPrice = () => {
    return cartItems.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
  };

  const getTotalDiscounts = () => {
    return cartItems.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
  };

  const getOrderTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!state.user) {
      navigate('/login?redirect=cart');
      return;
    }
    alert('Order placed successfully! (Demo)');
    dispatch({ type: 'CLEAR_CART' });
  };


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-64 h-64 mx-auto" viewBox="0 0 400 300" fill="none">

              <ellipse cx="180" cy="280" rx="40" ry="8" fill="#E5E7EB"/>
              

              <path d="M160 180 Q160 160 180 160 Q200 160 200 180 L200 240 Q200 250 190 250 L170 250 Q160 250 160 240 Z" fill="#EC4899"/>
              

              <circle cx="180" cy="140" r="20" fill="#F3E8FF"/>
              

              <path d="M160 130 Q160 110 180 110 Q200 110 200 130 Q200 120 180 120 Q160 120 160 130" fill="#1F2937"/>
              

              <ellipse cx="145" cy="190" rx="8" ry="25" fill="#F3E8FF"/>
              <ellipse cx="215" cy="190" rx="8" ry="25" fill="#F3E8FF"/>
              

              <rect x="220" y="200" width="60" height="40" rx="5" fill="#9333EA" opacity="0.8"/>
              <circle cx="235" cy="250" r="8" fill="#4B5563"/>
              <circle cx="265" cy="250" r="8" fill="#4B5563"/>
              

              <path d="M220 200 L220 190 Q220 185 225 185 L275 185 Q280 185 280 190 L280 200" stroke="#9333EA" strokeWidth="3" fill="none"/>
              

              <g opacity="0.6">
                <rect x="300" y="80" width="30" height="40" rx="15" fill="#3B82F6"/>
                <rect x="320" y="60" width="25" height="35" rx="12" fill="#EF4444"/>
                <rect x="340" y="90" width="20" height="30" rx="10" fill="#10B981"/>
              </g>
              

              <rect x="140" y="220" width="20" height="25" rx="2" fill="#F59E0B"/>
              <path d="M145 220 Q145 215 150 215 Q155 215 155 220" stroke="#F59E0B" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Just relax, let us help you find some first-class products
          </p>
          
          <Link
            to="/products"
            className="bg-meesho-pink text-white px-8 py-3 rounded-lg font-medium hover:bg-meesho-dark-pink transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white px-4 py-4 border-b">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-meesho-pink text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-xs text-meesho-pink mt-1">Cart</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
              2
            </div>
            <span className="text-xs text-gray-500 mt-1">Address</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
              3
            </div>
            <span className="text-xs text-gray-500 mt-1">Payment</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
              4
            </div>
            <span className="text-xs text-gray-500 mt-1">Summary</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">

        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80/f0f0f0/999?text=Product';
                  }}
                />
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                    <span className="text-sm text-meesho-green">{item.discount}</span>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-2">{item.easyReturns}</div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item })}
                    className="text-sm text-gray-500 mt-2 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove
                  </button>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-600">Sold by: {item.seller}</span>
                <span className="text-sm text-meesho-green">Free Delivery</span>
              </div>
            </div>
          ))}
        </div>


        <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">Wishlist</span>
            <Link to="/wishlist" className="flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

          
        <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Price Details ({cartItems.reduce((total, item) => total + item.quantity, 0)} Items)
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Product Price</span>
              <span className="text-gray-900">+₹{getTotalProductPrice()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Discounts</span>
              <span className="text-meesho-green">-₹{getTotalDiscounts()}</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-800">Order Total</span>
                <span className="text-gray-900">₹{getOrderTotal()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4 flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-green-700">
              Yay! Your total discount is ₹{getTotalDiscounts()}
            </span>
          </div>
        </div>

                  
        <div className="mt-6 pb-20">
          <div className="text-center text-xs text-gray-500 mb-4">
            Clicking on 'Continue' will not deduct any money
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-lg font-bold text-gray-900">₹{getOrderTotal()}</div>
              <button className="text-sm text-meesho-pink">VIEW PRICE DETAILS</button>
            </div>
            
            <button
              onClick={handleCheckout}
              className="bg-meesho-pink text-white px-8 py-3 rounded-lg font-medium hover:bg-meesho-dark-pink transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
