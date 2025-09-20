import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Wishlist = () => {
  const { state, dispatch } = useApp();
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const wishlistItems = state.wishlist.map((item, index) => ({
    ...item,
    discount: item.originalPrice > item.price ? `${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off` : null,
    specialOffers: `₹${Math.floor(item.price * 0.9)} with 2 Special Offers`,
    discountForRoorkee: item.price > 500 ? "₹8 off | Discount for Roorkee" : null,
    freeDelivery: item.freeDelivery !== false,
    inStock: index % 3 !== 1,
    outOfStock: index % 3 === 1,
    notifyWhenInStock: index % 3 === 1
  }));

  const filteredItems = showInStockOnly 
    ? wishlistItems.filter(item => item.inStock)
    : wishlistItems;

  const removeFromWishlist = (item) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">Show in stock products only</span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)}
            />
            <div
              className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                showInStockOnly ? 'bg-meesho-pink' : 'bg-gray-300'
              }`}
              onClick={() => setShowInStockOnly(!showInStockOnly)}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  showInStockOnly ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}
              />
            </div>
          </div>
        </div>
                
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[3/4] object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x250/f0f0f0/999?text=Product';
                  }}
                />
                <button
                  onClick={() => removeFromWishlist(item)}
                  className="absolute top-2 right-2 p-1"
                >
                  <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="p-3">
                <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 h-10">
                  {item.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                  )}
                  {item.discount && (
                    <span className="text-xs text-meesho-green">{item.discount}</span>
                  )}
                </div>
                
                <div className="text-xs text-meesho-green mb-2">
                  {item.specialOffers}
                </div>
                
                {item.discountForRoorkee && (
                  <div className="text-xs text-meesho-green mb-2">
                    {item.discountForRoorkee}
                  </div>
                )}
                
                <div className="text-xs text-gray-600 mb-2">Free Delivery</div>
                
                {item.rating && (
                  <div className="flex items-center mb-2">
                    <div className="flex items-center bg-meesho-green text-white px-1 py-0.5 rounded text-xs">
                      <span className="font-bold">{item.rating}</span>
                      <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 ml-2">({item.reviews})</span>
                  </div>
                )}
                
                {item.outOfStock ? (
                  <div className="mt-2">
                    <div className="text-xs text-red-600 mb-2">Out of stock</div>
                    {item.notifyWhenInStock && (
                      <>
                        <div className="text-xs text-gray-600 mb-2">Get notified when in stock</div>
                        <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs">
                          Notify me
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        const cartItem = {
                          ...item,
                          size: item.sizes && item.sizes.length > 0 ? item.sizes[0] : 'Free Size',
                          color: item.colors && item.colors.length > 0 ? item.colors[0] : 'Standard'
                        };
                        dispatch({ type: 'ADD_TO_CART', payload: cartItem });
                      }}
                      className="w-full bg-meesho-pink text-white py-2 px-4 rounded text-xs font-medium hover:bg-meesho-dark-pink transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No items in wishlist</h3>
            <p className="text-gray-600 mb-4">Items you add to wishlist will appear here</p>
            <Link
              to="/products"
              className="inline-block bg-meesho-pink text-white px-6 py-2 rounded-lg font-medium hover:bg-meesho-dark-pink transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
