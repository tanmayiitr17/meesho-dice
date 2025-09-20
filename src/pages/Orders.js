import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Orders = () => {
  const { state } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Ordered', 'Shipped', 'Delivered', 'Cancelled', 'Exchange', 'Return', 'Others'];

  const orders = [
    {
      id: '194549788318142144',
      date: '3rd September',
      customer: 'Tanmay Pandey',
      supplier: 'SAGIBO CLOTHING',
      product: {
        name: 'Designer Trendy women Viscose crepe Flared palazzos',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=60&h=60&fit=crop',
        status: 'Delivered on 19th September'
      }
    },
    {
      id: '193506670910930048',
      date: '31st August',
      customer: 'Tanmay Pandey',
      supplier: 'Our Meesho Shop',
      product: {
        name: 'FIRST BEAUTY 4 Pcs Blackhead Remover Pimple...',
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=60&h=60&fit=crop',
        status: 'Delivered on 6th September'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-50 border border-red-200 mx-4 mt-4 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-800 font-medium">Your Bank details are missing.</p>
            <p className="text-red-600 text-sm">Add bank details to receive your payments.</p>
          </div>
          <button className="bg-white border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm font-medium">
            ADD
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Orders</h2>
        
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-meesho-pink text-white'
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-800">{order.date}</p>
            </div>
            
            <div className="mb-2">
              <p className="text-sm text-gray-600">Order {order.id}</p>
              <p className="text-sm text-gray-600">Sold to {order.customer}</p>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-gray-600">Supplier: {order.supplier}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3">
                  <img
                    src={order.product.image}
                    alt={order.product.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x60/9f208a/ffffff?text=Order';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {order.product.name}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-meesho-green rounded-full mr-2"></div>
                    <p className="text-sm text-meesho-green">{order.product.status}</p>
                  </div>
                </div>
              </div>
              
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-600">Your orders will appear here once you make a purchase</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
