import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const SizeSettings = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('measurements');

  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    shoulder: '',
    armLength: '',
    height: '',
    weight: '',
    neckSize: '',
    hipSize: ''
  });

  const [brandSizes, setBrandSizes] = useState({
    shirts: {
      brand: '',
      size: '',
      fit: 'perfect'
    },
    tshirts: {
      brand: '',
      size: '',
      fit: 'perfect'
    },
    jeans: {
      brand: '',
      size: '',
      fit: 'perfect'
    },
    footwear: {
      brand: '',
      size: '',
      fit: 'perfect'
    }
  });

  useEffect(() => {
    const savedSizeSettings = localStorage.getItem('meeshoSizeSettings');
    console.log('Loading size settings from localStorage:', savedSizeSettings);
    
    if (savedSizeSettings) {
      try {
        const parsedSettings = JSON.parse(savedSizeSettings);
        console.log('Parsed settings:', parsedSettings);
        
        if (parsedSettings.measurements) {
          setMeasurements(parsedSettings.measurements);
        }
        if (parsedSettings.brandSizes) {
          setBrandSizes(parsedSettings.brandSizes);
        }
      } catch (error) {
        console.error('Error loading size settings:', error);
      }
    }
  }, []);

  const brands = {
    shirts: ['Allen Solly', 'Van Heusen', 'Peter England', 'Raymond', 'Arrow', 'Louis Philippe', 'Park Avenue'],
    tshirts: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour', 'Levi\'s', 'H&M', 'Zara'],
    jeans: ['Levi\'s', 'Wrangler', 'Lee', 'Pepe Jeans', 'Diesel', 'Flying Machine', 'Spykar'],
    footwear: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Bata', 'Woodland', 'Red Tape', 'Sparx']
  };

  const sizes = {
    shirts: ['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44', '46'],
    tshirts: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    jeans: ['28', '30', '32', '34', '36', '38', '40', '42'],
    footwear: ['6', '7', '8', '9', '10', '11', '12']
  };

  const handleMeasurementChange = (field, value) => {
    const newMeasurements = {
      ...measurements,
      [field]: value
    };
    setMeasurements(newMeasurements);
    
    const currentSettings = JSON.parse(localStorage.getItem('meeshoSizeSettings') || '{}');
    const updatedSettings = {
      ...currentSettings,
      measurements: newMeasurements,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('meeshoSizeSettings', JSON.stringify(updatedSettings));
  };

  const handleBrandSizeChange = (category, field, value) => {
    const newBrandSizes = {
      ...brandSizes,
      [category]: {
        ...brandSizes[category],
        [field]: value
      }
    };
    setBrandSizes(newBrandSizes);
    
    const currentSettings = JSON.parse(localStorage.getItem('meeshoSizeSettings') || '{}');
    const updatedSettings = {
      ...currentSettings,
      brandSizes: newBrandSizes,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('meeshoSizeSettings', JSON.stringify(updatedSettings));
  };

  const saveSizeSettings = () => {
    const sizeData = {
      measurements,
      brandSizes,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('meeshoSizeSettings', JSON.stringify(sizeData));
    
    dispatch({
      type: 'SET_USER',
      payload: {
        ...state.user,
        sizeSettings: sizeData
      }
    });
    
    alert('Size settings saved successfully! Meesho will now recommend better fitting sizes for you.');
    navigate('/profile');
  };

  const getSizeRecommendation = (category) => {
    const userBrand = brandSizes[category];
    if (!userBrand.brand || !userBrand.size) return null;
    
    const recommendations = {
      'Levi\'s': {
        'Wrangler': 'Same size',
        'Lee': 'Same size',
        'Pepe Jeans': 'One size up',
        'Diesel': 'One size down'
      },
      'Nike': {
        'Adidas': 'Same size',
        'Puma': 'Same size',
        'Reebok': 'Half size up'
      }
    };
    
    return recommendations[userBrand.brand] || null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('measurements')}
            className={`flex-1 py-4 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'measurements'
                ? 'border-meesho-pink text-meesho-pink'
                : 'border-transparent text-gray-500'
            }`}
          >
            Body Measurements
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            className={`flex-1 py-4 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'brands'
                ? 'border-meesho-pink text-meesho-pink'
                : 'border-transparent text-gray-500'
            }`}
          >
            Brand Preferences
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'measurements' ? (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Body Measurements</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter your measurements to get personalized size recommendations
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chest (inches)</label>
                  <input
                    type="number"
                    placeholder="e.g. 38"
                    value={measurements.chest}
                    onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waist (inches)</label>
                  <input
                    type="number"
                    placeholder="e.g. 32"
                    value={measurements.waist}
                    onChange={(e) => handleMeasurementChange('waist', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shoulder (inches)</label>
                  <input
                    type="number"
                    placeholder="e.g. 16"
                    value={measurements.shoulder}
                    onChange={(e) => handleMeasurementChange('shoulder', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Arm Length (inches)</label>
                  <input
                    type="number"
                    placeholder="e.g. 24"
                    value={measurements.armLength}
                    onChange={(e) => handleMeasurementChange('armLength', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    placeholder="e.g. 170"
                    value={measurements.height}
                    onChange={(e) => handleMeasurementChange('height', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="e.g. 70"
                    value={measurements.weight}
                    onChange={(e) => handleMeasurementChange('weight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Neck Size (inches)</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={measurements.neckSize}
                    onChange={(e) => handleMeasurementChange('neckSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hip Size (inches)</label>
                  <input
                    type="number"
                    placeholder="e.g. 36"
                    value={measurements.hipSize}
                    onChange={(e) => handleMeasurementChange('hipSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">How to measure:</p>
                  <p>• Chest: Measure around the fullest part of your chest</p>
                  <p>• Waist: Measure around your natural waistline</p>
                  <p>• Shoulder: Measure from shoulder tip to shoulder tip</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(brands).map(([category, brandList]) => (
              <div key={category} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                  {category === 'tshirts' ? 'T-Shirts' : category}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <select
                      value={brandSizes[category].brand}
                      onChange={(e) => handleBrandSizeChange(category, 'brand', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                    >
                      <option value="">Select Brand</option>
                      {brandList.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <select
                      value={brandSizes[category].size}
                      onChange={(e) => handleBrandSizeChange(category, 'size', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink"
                    >
                      <option value="">Select Size</option>
                      {sizes[category].map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">How does it fit?</label>
                    <div className="flex space-x-2">
                      {['tight', 'perfect', 'loose'].map(fit => (
                        <button
                          key={fit}
                          onClick={() => handleBrandSizeChange(category, 'fit', fit)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            brandSizes[category].fit === fit
                              ? 'bg-meesho-pink text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {fit.charAt(0).toUpperCase() + fit.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {brandSizes[category].brand && brandSizes[category].size && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-purple-700">
                        <span className="font-medium">Size Profile:</span> {brandSizes[category].brand} {brandSizes[category].size} ({brandSizes[category].fit} fit)
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        ✨ Meesho will use this to recommend sizes in other brands
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-green-700">
                  <p className="font-medium mb-1">Smart Size Recommendations</p>
                  <p>Based on your brand preferences, we'll recommend the best fitting sizes across different brands for similar products.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-100 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Current Settings (Debug)</h4>
          <pre className="text-xs text-gray-600 overflow-x-auto">
            {JSON.stringify({ measurements, brandSizes }, null, 2)}
          </pre>
        </div>

        <div className="mt-8 pb-20">
          <button
            onClick={saveSizeSettings}
            className="w-full bg-meesho-pink text-white py-3 px-6 rounded-lg font-semibold hover:bg-meesho-dark-pink transition-colors"
          >
            Save Size Settings
          </button>
          
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-600 text-sm hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeSettings;
