import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Beauty & Health",
      icon: "💄",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=60&h=60&fit=crop",
      items: []
    },
    {
      id: 2,
      name: "Jewellery & Accessories",
      icon: "💍",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=60&h=60&fit=crop",
      items: []
    },
    {
      id: 3,
      name: "Bags & Footwear",
      icon: "👜",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop",
      items: []
    },
    {
      id: 4,
      name: "Electronics",
      icon: "📱",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop",
      items: []
    },
    {
      id: 5,
      name: "Sports & Fitness",
      icon: "🏃",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop",
      items: [
        {
          title: "Fitness",
          subcategories: [
            { name: "Yoga", icon: "🧘", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop" },
            { name: "Hand Grip Strengthener", icon: "💪", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
            { name: "Tummy trimmers", icon: "🏋️", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
            { name: "Abs Wheel Roller", icon: "⚙️", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
            { name: "Skipping Ropes", icon: "🪢", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
            { name: "Sweat Belts", icon: "🏃", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" }
          ]
        },
        {
          title: "Sports",
          subcategories: [
            { name: "Badminton", icon: "🏸", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=100&h=100&fit=crop" },
            { name: "Skating", icon: "⛸️", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop" },
            { name: "Football", icon: "⚽", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=100&h=100&fit=crop" },
            { name: "Cricket", icon: "🏏", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "Car & Motorbike",
      icon: "🚗",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=60&h=60&fit=crop",
      items: [
        {
          title: "Car Accessories",
          subcategories: [
            { name: "Car Covers", icon: "🚗", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&h=100&fit=crop" },
            { name: "Interior Accessories", icon: "🪑", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&h=100&fit=crop" },
            { name: "Car Mobile Holders", icon: "📱", image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop" },
            { name: "Car Repair Assistance", icon: "🔧", image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=100&h=100&fit=crop" }
          ]
        }
      ]
    },
    {
      id: 7,
      name: "Office Supplies & Stationary",
      icon: "📝",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=60&h=60&fit=crop",
      items: []
    },
    {
      id: 8,
      name: "Pet Supplies",
      icon: "🐕",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=60&h=60&fit=crop",
      items: []
    },
    {
      id: 9,
      name: "Food & Drinks",
      icon: "🍔",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=60&h=60&fit=crop",
      items: []
    }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState(categories[4]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-32 bg-white border-r border-gray-200 overflow-y-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`w-full p-4 text-center border-b border-gray-100 hover:bg-gray-50 ${
              selectedCategory.id === category.id ? 'bg-purple-50 border-r-2 border-r-purple-500' : ''
            }`}
          >
            <div className="w-12 h-12 mb-2 rounded-lg overflow-hidden">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <div className="text-2xl flex items-center justify-center w-full h-full" style={{ display: category.image ? 'none' : 'flex' }}>
                {category.icon}
              </div>
            </div>
            <div className="text-xs text-gray-700 leading-tight">{category.name}</div>
          </button>
        ))}
      </div>


      <div className="flex-1 overflow-y-auto">
        {selectedCategory.items.length > 0 ? (
          <div className="p-4">
            {selectedCategory.items.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">
                  {section.title}
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {section.subcategories.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={`/products?category=${encodeURIComponent(item.name)}`}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 mb-3 rounded-lg overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className="text-3xl flex items-center justify-center w-full h-full" style={{ display: item.image ? 'none' : 'flex' }}>
                            {item.icon}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            {selectedCategory.id === 6 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">
                  CAR & MOTORBIKE
                </h2>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🚗</div>
                      <p className="text-gray-600">More categories coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedCategory.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{selectedCategory.name}</h2>
              <p className="text-gray-600">Categories coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
