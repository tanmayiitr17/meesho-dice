import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { getSizeRecommendation, formatSizeRecommendation } from '../utils/sizeRecommendations';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeRecommendation, setSizeRecommendation] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes.length > 0 ? foundProduct.sizes[0] : '');
      setSelectedColor(foundProduct.colors.length > 0 ? foundProduct.colors[0] : '');
      

      if (state.user && state.user.sizeSettings && foundProduct.sizes.length > 0) {
        console.log('User size settings:', state.user.sizeSettings);
        console.log('Product category:', foundProduct.subcategory);
        console.log('Product seller:', foundProduct.seller);
        
        const recommendation = getSizeRecommendation(
          foundProduct.subcategory, 
          foundProduct.seller, 
          state.user.sizeSettings
        );
        
        console.log('Size recommendation result:', recommendation);
        
        if (recommendation) {
          const formattedRec = formatSizeRecommendation(recommendation);
          console.log('Formatted recommendation:', formattedRec);
          setSizeRecommendation(formattedRec);
          

          if (foundProduct.sizes.includes(formattedRec.size)) {
            setSelectedSize(formattedRec.size);
          }
        } else {
          console.log('No recommendation generated');
        }
      } else {
        console.log('No size settings found or no sizes available');
      }
    } else {
      navigate('/products');
    }
  }, [id, navigate, state.user]);

  const isInWishlist = product && state.wishlist.some(item => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor && product.colors.length > 0) {
      alert('Please select a color');
      return;
    }

    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor
    };

    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    }

    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meesho-pink mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">

        <div className="aspect-square bg-gray-100">
          <img
            src={product.images[selectedImage] || product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              if (e.target.src.includes('placeholder')) {
                return;
              }
              const categoryPlaceholders = {
                'Women Clothing': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
                'Men Clothing': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
                'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
                'Home & Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
                'Footwear': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
                'Bags & Footwear': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
              };
              e.target.src = categoryPlaceholders[product.category] || 'https://via.placeholder.com/400x400/9f208a/ffffff?text=Meesho+Product';
            }}
          />
          

          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full ${
                    selectedImage === index ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          )}
          

          <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1">
            <span className="text-xs text-gray-600">1 Similar Products</span>
          </div>
        </div>


        <div className="p-4">
          <h1 className="text-lg font-medium text-gray-800 mb-2">
            {product.name}
          </h1>
          
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleWishlistToggle}
                className="flex items-center space-x-1 text-gray-600"
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
                <span className="text-sm">Wishlist</span>
              </button>
              
              <button className="flex items-center space-x-1 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
          
          
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-sm font-medium text-meesho-green">{product.discount}% off</span>
            </div>
            <div className="text-sm text-meesho-green mb-2">
              ₹{Math.floor(product.price * 0.1)} with 2 Special Offers
            </div>
          </div>
          
          
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-meesho-green text-white px-2 py-1 rounded text-sm">
              <span className="font-bold">{product.rating.toFixed(1)}</span>
              <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviews} Reviews)</span>
          </div>
          
              
          {product.sizes.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">Size</h3>
                {!sizeRecommendation && (
                  <button
                    onClick={() => navigate('/size-settings')}
                    className="text-xs text-meesho-pink hover:text-meesho-dark-pink"
                  >
                    Set up size preferences
                  </button>
                )}
              </div>
              

              {sizeRecommendation && (
                <div className="mb-3">
                  <p className="text-sm text-purple-600">
                    <span className="font-medium">Recommended size for this product: {sizeRecommendation.size}</span>
                  </p>
                </div>
              )}
              

              {sizeRecommendation && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div className="text-sm text-purple-700">
                      <div className="font-medium">✨ Size {sizeRecommendation.size} recommended for you</div>
                      <div className="text-xs">{sizeRecommendation.message}</div>
                    </div>
                  </div>
                </div>
              )}
              

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isRecommended = sizeRecommendation && sizeRecommendation.size === size;
                  const isSelected = selectedSize === size;
                  
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium relative ${
                        isSelected
                          ? 'border-meesho-pink bg-meesho-pink text-white'
                          : isRecommended
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 text-gray-700 hover:border-meesho-pink'
                      }`}
                    >
                      {size}
                      {isRecommended && !isSelected && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              

              <div className="mt-3 text-center">
                <button
                  onClick={() => navigate('/size-settings')}
                  className="text-xs text-gray-500 hover:text-meesho-pink"
                >
                  📏 Size Guide & Fit Preferences
                </button>
              </div>
            </div>
          )}


          <div className="bg-green-50 border border-meesho-green rounded-lg p-3 mb-4">
            <div className="text-sm text-meesho-dark-green">
              <div className="font-medium mb-1">₹5 off | Discount for Roorkee</div>
              <div>Free Delivery</div>
            </div>
          </div>
          

          <div className="flex space-x-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-meesho-pink text-meesho-pink py-3 px-6 rounded-lg font-medium text-center flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-meesho-pink text-white py-3 px-6 rounded-lg font-medium text-center flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
