import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { state, dispatch } = useApp();
  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      ...product,
      size: product.sizes.length > 0 ? product.sizes[0] : '',
      color: product.colors.length > 0 ? product.colors[0] : ''
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
            onError={(e) => {
              if (e.target.src.includes('placeholder')) {
                return;
              }
              
              const categoryPlaceholders = {
                'Women Clothing': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop',
                'Men Clothing': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
                'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop',
                'Home & Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop',
                'Footwear': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
                'Bags & Footwear': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop'
              };
              e.target.src = categoryPlaceholders[product.category] || 'https://via.placeholder.com/200x200/9f208a/ffffff?text=Meesho';
            }}
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-1"
          >
            <svg
              className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              fill={isInWishlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          
          {product.discount > 0 && (
            <div className="absolute top-2 left-2">
              <div className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded font-medium">
                {product.discount}% off
              </div>
            </div>
          )}
          
          <div className="absolute bottom-2 left-2">
            <div className="bg-meesho-green text-white text-xs px-1 py-0.5 rounded font-medium">
              ₹{Math.floor(product.price * 0.1)} off
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 h-10">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          
          <div className="text-xs text-meesho-green mb-2">
            ₹{Math.floor(product.price * 0.15)} with 2 Special Offers
          </div>
          
          <div className="text-xs text-gray-600 mb-2">Free Delivery</div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center bg-meesho-green text-white px-1 py-0.5 rounded text-xs">
                <span className="font-bold">{product.rating.toFixed(1)}</span>
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-xs text-gray-600 ml-2">({product.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
