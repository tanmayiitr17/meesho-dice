import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products, categories } from '../data/products';

const Home = () => {
  const { state, dispatch } = useApp();

  const handleSearch = (e) => {
    e.preventDefault();
    if (state.searchQuery.trim()) {

    }
  };

  const offerZoneItems = [
    { 
      title: "Kurtis & Suits", 
      price: "₹95", 
      discount: "70%", 
      color: "bg-white",
      image: "https://images.meesho.com/images/widgets/2A9BC/6rfez_300.webp"
    },
    { 
      title: "Men Fashion", 
      price: "₹95", 
      discount: "70%", 
      color: "bg-white",
      image: "https://images.meesho.com/images/widgets/HZCCZ/d31xo_300.webp"
    },
    { 
      title: "Footwear", 
      price: "₹95", 
      discount: "70%", 
      color: "bg-white",
      image: "https://images.meesho.com/images/widgets/ZEU4H/z39bk_300.webp"
    },
    { 
      title: "Sarees & Lehengas", 
      price: "₹145", 
      discount: "70%", 
      color: "bg-white",
      image: "https://images.meesho.com/images/widgets/DJELM/2lsaf_300.webp"
    },
    { 
      title: "Accessories", 
      price: "₹49", 
      discount: "70%", 
      color: "bg-white",
      image: "https://images.meesho.com/images/widgets/89JIT/z1npl_300.webp"
    },
    { 
      title: "Kids Store", 
      price: "₹95", 
      discount: "70%", 
      color: "bg-white",
      image: "https://images.meesho.com/images/widgets/GGV6S/b4hjt_300.webp"
    },
  ];

  return (
    <div className="bg-white">

      <div className="p-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for Sarees, Kurtis, Cosmetics, etc."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-sm"
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>
      </div>


      <div className="px-4 pb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2 text-meesho-pink" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>Add delivery location to check extra discount</span>
          <svg className="w-4 h-4 ml-1 text-meesho-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>


      <div className="px-4 pb-6">
        <div className="grid grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-2 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${
                    category.id === 1 ? '1594633312681-425c7b97ccd1' :
                    category.id === 2 ? '1521572163474-6864f9cf17ab' :
                    category.id === 3 ? '1505740420928-5e560c06d30e' :
                    category.id === 4 ? '1556909114-f6e7ad7d3136' :
                    category.id === 5 ? '1549298916-b41d501d3772' :
                    '1556228453-efd6c1ff04f6'
                  }?w=64&h=64&fit=crop`}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-8 h-8 bg-pink-200 rounded-lg items-center justify-center">
                  <span className="text-xs">📦</span>
                </div>
              </div>
              <span className="text-xs text-center text-gray-700">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>


      <div className="px-4 pb-6">
        <div className="relative h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=200&fit=crop"
              alt="Shopping Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
            <div className="text-white">
              <div className="text-sm font-bold mb-1">MEGA</div>
              <div className="text-lg font-bold mb-1">BLOCKBUSTER</div>
              <div className="text-lg font-bold mb-2">SALE</div>
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                SALE IS LIVE
              </div>
            </div>
            <div className="text-white text-right">
              <div className="text-sm mb-1">Music Lovers'</div>
              <div className="text-sm mb-1">Festive Picks</div>
              <div className="text-xs mb-1">Gadgets & Electronics</div>
              <div className="text-2xl font-bold mb-1">UPTO 80% OFF</div>
              <button className="bg-white text-red-500 px-3 py-1 rounded text-xs font-bold hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-800 mr-2">Offer Zone</span>
            <span className="text-lg">⚡</span>
          </div>
          <Link to="/products" className="text-meesho-pink text-sm font-medium">
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {offerZoneItems.map((item, index) => (
            <Link
              key={index}
              to="/products"
              className={`${item.color} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x150/f0f0f0/999?text=Offer';
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
