import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  cart: [],
  wishlist: [],
  searchQuery: '',
  selectedCategory: '',
  filters: {
    priceRange: [0, 5000],
    rating: 0,
    discount: 0
  }
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color)
        )
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload.id)
      };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('meeshoAppData');
    const savedSizeSettings = localStorage.getItem('meeshoSizeSettings');
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        

        if (savedSizeSettings) {
          const parsedSizeSettings = JSON.parse(savedSizeSettings);
          if (parsedData.user) {
            parsedData.user.sizeSettings = parsedSizeSettings;
          }
        }
        
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData });
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      user: state.user,
      cart: state.cart,
      wishlist: state.wishlist
    };
    localStorage.setItem('meeshoAppData', JSON.stringify(dataToSave));
  }, [state.user, state.cart, state.wishlist]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
