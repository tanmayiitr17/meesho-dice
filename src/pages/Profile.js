import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (!state.user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-4 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
              alt="User Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-orange-200 items-center justify-center">
              <span className="text-xl">🙏</span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Hello User</h2>
            <p className="text-sm text-gray-600">+91 8864893203</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="border-b border-gray-100">
          <div className="flex items-center px-4 py-4 hover:bg-gray-50">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium">My Bank & UPI Details</span>
          </div>
        </div>

        <div className="border-b border-gray-100">
          <div className="flex items-center px-4 py-4 hover:bg-gray-50">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium">My Payments</span>
          </div>
        </div>

        <div className="border-b border-gray-100">
          <div 
            className="flex items-center px-4 py-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => navigate('/size-settings')}
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium">Set Size</span>
          </div>
        </div>

        <div className="border-b border-gray-100">
          <div className="flex items-center px-4 py-4 hover:bg-gray-50">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium">Help</span>
          </div>
        </div>

        <div className="border-b border-gray-100">
          <div className="flex items-center px-4 py-4 hover:bg-gray-50">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium">Become a Supplier</span>
          </div>
        </div>

        <div className="border-b border-gray-100">
          <div className="flex items-center px-4 py-4 hover:bg-gray-50">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-gray-800 font-medium">Legal and Policies</span>
          </div>
        </div>
      </div>

      <div className="bg-white mt-6 border-b border-gray-100">
        <div className="px-4 py-4 hover:bg-gray-50">
          <span className="text-gray-800 font-medium">Delete Account</span>
        </div>
      </div>

      <div className="bg-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-4 hover:bg-gray-50 text-left"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="text-gray-800 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
