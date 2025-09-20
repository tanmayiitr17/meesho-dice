import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

const AIAssistant = () => {
  const { state, dispatch } = useApp();
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hi! I\'m your Meesho AI assistant. I can help you find the perfect products. What are you looking for today?',
      timestamp: new Date(),
      id: 1
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentRecommendations, setCurrentRecommendations] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, currentRecommendations]);

  const suggestionChips = [
    "Best kurtis under ₹500",
    "Trending electronics",
    "Men's formal wear",
    "Kitchen essentials",
    "Ethnic sarees",
    "Affordable footwear"
  ];

  const productDatabase = {
    'kurtis': [
      {
        id: 101,
        name: "Women's Cotton Printed Kurti",
        rating: 4.3,
        reviews: 1247,
        price: 399,
        originalPrice: 999,
        deliveryDate: "Wed, 25 Sept",
        deliveryCharge: "FREE delivery",
        description: "Comfortable cotton kurti with beautiful prints. Perfect for daily wear and office.",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=120&h=120&fit=crop",
        category: "Women Clothing",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink", "Blue", "White"]
      },
      {
        id: 102,
        name: "Designer Ethnic Kurti Set",
        rating: 4.5,
        reviews: 892,
        price: 449,
        originalPrice: 1299,
        deliveryDate: "Thu, 26 Sept",
        deliveryCharge: "FREE delivery",
        description: "Trendy designer kurti with matching dupatta. Premium quality fabric.",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&h=120&fit=crop",
        category: "Women Clothing",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Navy", "Maroon"]
      }
    ],
    'electronics': [
      {
        id: 201,
        name: "Wireless Bluetooth Earphones Pro",
        rating: 4.2,
        reviews: 2341,
        price: 899,
        originalPrice: 2999,
        deliveryDate: "Tue, 24 Sept",
        deliveryCharge: "FREE delivery",
        description: "Premium wireless earphones with noise cancellation and 24-hour battery life.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
        category: "Electronics",
        sizes: [],
        colors: ["Black", "White", "Blue"]
      },
      {
        id: 202,
        name: "Smart Phone Case with Stand",
        rating: 4.1,
        reviews: 1567,
        price: 199,
        originalPrice: 499,
        deliveryDate: "Wed, 25 Sept",
        deliveryCharge: "FREE delivery",
        description: "Durable phone case with built-in stand and card holder. Drop protection guaranteed.",
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=120&h=120&fit=crop",
        category: "Electronics",
        sizes: [],
        colors: ["Black", "Blue", "Red", "Clear"]
      }
    ],
    'men': [
      {
        id: 301,
        name: "Men's Premium Cotton Formal Shirt",
        rating: 4.4,
        reviews: 743,
        price: 599,
        originalPrice: 1299,
        deliveryDate: "Thu, 26 Sept",
        deliveryCharge: "FREE delivery",
        description: "Premium formal shirt perfect for office wear. Wrinkle-free fabric with modern fit.",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&h=120&fit=crop",
        category: "Men Clothing",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Light Blue", "Pink"]
      },
      {
        id: 302,
        name: "Men's Casual Cotton T-Shirt",
        rating: 4.0,
        reviews: 856,
        price: 299,
        originalPrice: 699,
        deliveryDate: "Wed, 25 Sept",
        deliveryCharge: "FREE delivery",
        description: "Comfortable cotton t-shirt with premium quality fabric. Perfect for casual wear.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop",
        category: "Men Clothing",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Navy", "White", "Gray", "Black"]
      }
    ],
    'kitchen': [
      {
        id: 401,
        name: "Kitchen Storage Container Set",
        rating: 4.1,
        reviews: 567,
        price: 449,
        originalPrice: 999,
        deliveryDate: "Fri, 27 Sept",
        deliveryCharge: "FREE delivery",
        description: "Airtight storage containers set for kitchen organization. BPA-free plastic material.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop",
        category: "Home & Kitchen",
        sizes: [],
        colors: ["Clear", "Blue", "Green"]
      },
      {
        id: 402,
        name: "Multi-Purpose Hand Blender",
        rating: 4.0,
        reviews: 432,
        price: 899,
        originalPrice: 2199,
        deliveryDate: "Thu, 26 Sept",
        deliveryCharge: "FREE delivery",
        description: "Multi-purpose hand blender for all your kitchen needs. Easy to use and clean.",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=120&h=120&fit=crop",
        category: "Home & Kitchen",
        sizes: [],
        colors: ["White", "Red", "Black"]
      }
    ],
    'sarees': [
      {
        id: 501,
        name: "Traditional Banarasi Silk Saree",
        rating: 4.5,
        reviews: 987,
        price: 699,
        originalPrice: 1899,
        deliveryDate: "Sat, 28 Sept",
        deliveryCharge: "FREE delivery",
        description: "Beautiful traditional Banarasi silk saree perfect for festivals and weddings.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&h=120&fit=crop",
        category: "Women Clothing",
        sizes: ["Free Size"],
        colors: ["Red", "Golden", "Green", "Blue"]
      },
      {
        id: 502,
        name: "Designer Ethnic Saree Collection",
        rating: 4.3,
        reviews: 1234,
        price: 799,
        originalPrice: 1999,
        deliveryDate: "Fri, 27 Sept",
        deliveryCharge: "FREE delivery",
        description: "Premium designer saree with intricate work. Perfect for special occasions.",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=120&h=120&fit=crop",
        category: "Women Clothing",
        sizes: ["Free Size"],
        colors: ["Maroon", "Navy", "Purple", "Pink"]
      }
    ]
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputText,
      timestamp: new Date(),
      id: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev, inputText]);
    setIsTyping(true);


    setTimeout(() => {
      setIsTyping(false);
      const { response, products } = getAIResponse(inputText, conversationContext);
      setMessages(prev => [...prev, response]);
      setCurrentRecommendations(products);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds

    setInputText('');
    setShowSuggestions(false);
  };

  const getAIResponse = (query, context) => {
    const queryLower = query.toLowerCase();
    let responseText = '';
    let recommendedProducts = [];
    

    const contextualResponses = [
      "Perfect! Let me show you some great options:",
      "I found exactly what you're looking for:",
      "Here are my top recommendations for you:",
      "Based on your preferences, I suggest:",
      "These products are trending right now:",
      "Great choice! Here are some similar items:",
      "I think you'll love these options:",
      "Let me help you find the perfect match:"
    ];


    if (context.length > 0) {
      responseText = contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
    } else {
      responseText = "Here are some great products I found for you:";
    }


    if (queryLower.includes('kurti')) {
      recommendedProducts = productDatabase.kurtis;
      if (context.length > 0) {
        responseText = "I see you're interested in kurtis! Here are more beautiful options:";
      }
    } else if (queryLower.includes('saree') || queryLower.includes('ethnic')) {
      recommendedProducts = productDatabase.sarees;
      if (context.length > 0) {
        responseText = "Sarees are perfect for special occasions! Check these out:";
      }
    } else if (queryLower.includes('electronic') || queryLower.includes('trending electronics')) {
      recommendedProducts = productDatabase.electronics;
      if (context.length > 0) {
        responseText = "Electronics are always exciting! Here are the latest gadgets:";
      }
    } else if (queryLower.includes('men') || queryLower.includes('formal')) {
      recommendedProducts = productDatabase.men;
      if (context.length > 0) {
        responseText = "Men's fashion is evolving! Here are some stylish picks:";
      }
    } else if (queryLower.includes('kitchen') || queryLower.includes('home') || queryLower.includes('essential')) {
      recommendedProducts = productDatabase.kitchen;
      if (context.length > 0) {
        responseText = "Kitchen essentials make cooking so much easier! Take a look:";
      }
    } else if (queryLower.includes('under 500') || queryLower.includes('cheap') || queryLower.includes('affordable') || queryLower.includes('under ₹300')) {
      recommendedProducts = Object.values(productDatabase).flat().filter(p => p.price <= 500);
      responseText = "Budget-friendly shopping is smart! Here are great deals under ₹500:";
    } else if (queryLower.includes('best') || queryLower.includes('top') || queryLower.includes('trending')) {
      recommendedProducts = Object.values(productDatabase).flat().sort((a, b) => b.rating - a.rating).slice(0, 3);
      responseText = "You want the best? Here are our highest-rated products:";
    } else if (queryLower.includes('more') || queryLower.includes('similar') || queryLower.includes('like this')) {

      const lastCategory = context[context.length - 1]?.toLowerCase();
      if (lastCategory?.includes('kurti')) {
        recommendedProducts = productDatabase.kurtis;
      } else if (lastCategory?.includes('saree')) {
        recommendedProducts = productDatabase.sarees;
      } else {
        recommendedProducts = Object.values(productDatabase).flat().slice(0, 2);
      }
      responseText = "Sure! Here are more similar products you might like:";
    } else if (queryLower.includes('thanks') || queryLower.includes('thank you')) {
      responseText = "You're welcome! Is there anything else I can help you find today?";
      recommendedProducts = [];
    } else if (queryLower.includes('hi') || queryLower.includes('hello') || queryLower.includes('hey')) {
      responseText = "Hello! Great to see you again. What can I help you find today?";
      recommendedProducts = [];
    } else if (queryLower.includes('different category') || queryLower.includes('something else')) {

      const categories = Object.keys(productDatabase);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      recommendedProducts = productDatabase[randomCategory];
      responseText = "Let's explore something different! How about these:";
    } else {

      const allProducts = Object.values(productDatabase).flat();
      const shuffled = allProducts.sort(() => 0.5 - Math.random());
      recommendedProducts = shuffled.slice(0, 2);
      responseText = "I found some great products that might interest you:";
    }

    return {
      response: {
        type: 'ai',
        content: responseText,
        timestamp: new Date(),
        id: Date.now()
      },
      products: recommendedProducts
    };
  };

  const handleSuggestionClick = (suggestion) => {
    const userMessage = {
      type: 'user',
      content: suggestion,
      timestamp: new Date(),
      id: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev, suggestion]);
    setIsTyping(true);


    setTimeout(() => {
      setIsTyping(false);
      const { response, products } = getAIResponse(suggestion, conversationContext);
      setMessages(prev => [...prev, response]);
      setCurrentRecommendations(products);
    }, 1500);

    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-meesho-pink rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Meesho AI</h1>
              <p className="text-xs text-gray-500">beta</p>
            </div>
          </div>
          <button className="p-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
        
        {showSuggestions && (
          <div className="mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <span className="text-sm text-blue-700">Try asking me about:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestionChips.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(chip)}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-gray-300 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              💡 You can also ask: "Show me discounted items", "What's trending?", "Help me choose"
            </div>
          </div>
        )}
      </div>


      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={message.id || index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.type === 'user' 
                ? 'bg-meesho-pink text-white rounded-br-md' 
                : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-sm px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}


        <div className="space-y-4">
          {currentRecommendations.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80/f0f0f0/999?text=Product';
                  }}
                />
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}.00</span>
                    <span className="text-sm text-gray-500 line-through">M.R.P: ₹{product.originalPrice}.00</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {product.deliveryCharge} {product.deliveryDate}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-3 mb-3">
                {product.description}
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const cartItem = {
                      ...product,
                      size: product.sizes.length > 0 ? product.sizes[0] : 'Free Size',
                      color: product.colors.length > 0 ? product.colors[0] : 'Standard'
                    };
                    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
                    
                    
                    setTimeout(() => {
                      const confirmationMessages = [
                        `Awesome! "${product.name}" is now in your cart. Need anything else?`,
                        `Great choice! Added to cart. Want to see more like this?`,
                        `Perfect! I've added this to your cart. Looking for similar items?`,
                        `Nice pick! It's in your cart now. Shall I show you more options?`,
                        `Excellent! Added to cart. Would you like to explore similar products?`
                      ];
                      const randomMessage = confirmationMessages[Math.floor(Math.random() * confirmationMessages.length)];
                      
                      setMessages(prev => [...prev, {
                        type: 'ai',
                        content: randomMessage,
                        timestamp: new Date(),
                        id: Date.now()
                      }]);
                    }, 800);
                  }}
                  className="flex-1 border border-meesho-pink text-meesho-pink py-2 px-4 rounded-lg text-sm font-medium hover:bg-meesho-light-pink transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
                    
                    
                    setTimeout(() => {
                      const wishlistMessages = [
                        `Added to wishlist! ❤️ I'll remember you like this style.`,
                        `Saved to your wishlist! Want to see more similar items?`,
                        `Great taste! Added to wishlist. Looking for more like this?`,
                        `Wishlist updated! ✨ Shall I find more products in this category?`,
                        `Nice choice! Saved to wishlist. Need help finding similar products?`
                      ];
                      const randomMessage = wishlistMessages[Math.floor(Math.random() * wishlistMessages.length)];
                      
                      setMessages(prev => [...prev, {
                        type: 'ai',
                        content: randomMessage,
                        timestamp: new Date(),
                        id: Date.now()
                      }]);
                    }, 800);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:border-meesho-pink transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        

        <div ref={messagesEndRef} />
      </div>


      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask Meesho AI a question"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-meesho-pink focus:border-meesho-pink"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              inputText.trim() 
                ? 'bg-meesho-pink text-white hover:bg-meesho-dark-pink' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {inputText.trim() ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </button>
        </div>
        

        {!showSuggestions && currentRecommendations.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => handleSuggestionClick("Show me more like this")}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors"
            >
              More like this
            </button>
            <button
              onClick={() => handleSuggestionClick("Different category")}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors"
            >
              Different category
            </button>
            <button
              onClick={() => handleSuggestionClick("Under ₹300")}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors"
            >
              Under ₹300
            </button>
          </div>
        )}
        
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            Meesho AI can help you find products, compare prices, and get shopping advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
