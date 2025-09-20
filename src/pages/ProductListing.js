import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const { state, dispatch } = useApp();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get('search') || state.searchQuery;
  const categoryFilter = searchParams.get('category') || state.selectedCategory;

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    filtered = filtered.filter(product => {
      const priceInRange = product.price >= state.filters.priceRange[0] && 
                          product.price <= state.filters.priceRange[1];
      const ratingMatch = product.rating >= state.filters.rating;
      const discountMatch = product.discount >= state.filters.discount;
      
      return priceInRange && ratingMatch && discountMatch;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, state.filters, sortBy]);

  const handlePriceRangeChange = (range) => {
    dispatch({ type: 'SET_FILTERS', payload: { priceRange: range } });
  };

  const handleRatingFilter = (rating) => {
    dispatch({ type: 'SET_FILTERS', payload: { rating } });
  };

  const handleDiscountFilter = (discount) => {
    dispatch({ type: 'SET_FILTERS', payload: { discount } });
  };

  const clearFilters = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        priceRange: [0, 5000],
        rating: 0,
        discount: 0
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white border-b border-gray-200 px-4 py-3 mb-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span className="text-sm font-medium">Sort</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-700">
              <span className="text-sm font-medium">Category</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-700">
              <span className="text-sm font-medium">Gender</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-meesho-pink hover:text-meesho-dark-pink"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={categoryFilter === category.name}
                          onChange={() => dispatch({ type: 'SET_CATEGORY', payload: category.name })}
                          className="w-4 h-4 text-meesho-green"
                        />
                        <span className="ml-2 text-sm text-gray-600">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      [0, 500],
                      [500, 1000],
                      [1000, 2000],
                      [2000, 5000]
                    ].map((range) => (
                      <label key={`${range[0]}-${range[1]}`} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={state.filters.priceRange[0] === range[0] && state.filters.priceRange[1] === range[1]}
                          onChange={() => handlePriceRangeChange(range)}
                          className="w-4 h-4 text-meesho-green"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          ₹{range[0]} - ₹{range[1]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Customer Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={state.filters.rating === rating}
                          onChange={() => handleRatingFilter(rating)}
                          className="w-4 h-4 text-meesho-green"
                        />
                        <span className="ml-2 flex items-center text-sm text-gray-600">
                          {rating}
                          <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          & above
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Discount</h4>
                  <div className="space-y-2">
                    {[50, 40, 30, 20, 10].map((discount) => (
                      <label key={discount} className="flex items-center">
                        <input
                          type="radio"
                          name="discount"
                          checked={state.filters.discount === discount}
                          onChange={() => handleDiscountFilter(discount)}
                          className="w-4 h-4 text-meesho-green"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {discount}% and above
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 px-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-meesho-pink text-white rounded-lg hover:bg-meesho-dark-pink transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
