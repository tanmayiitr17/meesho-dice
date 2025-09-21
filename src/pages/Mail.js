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
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedColor, setDetectedColor] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const detectColorFromImage = (imageUrl) => {
    const colorMap = {
      'blue': ['#0000FF', '#4169E1', '#1E90FF', '#87CEEB', '#4682B4', '#5F9EA0', '#6495ED', '#7B68EE'],
      'beige': ['#F5F5DC', '#F0E68C', '#D2B48C', '#DEB887', '#F4A460', '#CD853F', '#D2691E', '#BC8F8F'],
      'white': ['#FFFFFF', '#F8F8FF', '#F5F5F5', '#F0F8FF', '#E6E6FA', '#FFF8DC', '#FFFAF0', '#FDF5E6'],
      'black': ['#000000', '#2F2F2F', '#1C1C1C', '#363636', '#4B0082', '#800080', '#483D8B', '#2E8B57'],
      'navy': ['#000080', '#191970', '#0000CD', '#4169E1', '#1E90FF', '#00008B', '#2F4F4F', '#008B8B'],
      'red': ['#FF0000', '#DC143C', '#B22222', '#8B0000', '#FF6347', '#FF4500', '#FF1493', '#C71585']
    };

    const mockDetectedColors = ['blue', 'beige', 'white', 'black', 'navy', 'red'];
    return mockDetectedColors[Math.floor(Math.random() * mockDetectedColors.length)];
  };

  const getColorSuggestions = (detectedColor) => {
    const colorData = colorCoordinationDatabase[detectedColor];
    if (!colorData) return { products: [], message: "I couldn't detect a clear color from your image." };

    let suggestedProducts = [];
    let responseMessage = `I detected ${colorData.primary} color in your image! ${colorData.description}`;

    if (detectedColor === 'blue') {
      suggestedProducts = productDatabase.colorCoordination.beigePants;
      responseMessage += " Here are some beige and khaki pants that would look great with your blue shirt:";
    } else if (detectedColor === 'beige') {
      suggestedProducts = productDatabase.colorCoordination.blueShirts;
      responseMessage += " Here are some blue shirts and t-shirts that would complement your beige pants perfectly:";
    } else if (detectedColor === 'white') {
      suggestedProducts = productDatabase.colorCoordination.blackPants;
      responseMessage += " Here are some black pants that would create a classic look with your white shirt:";
    } else if (detectedColor === 'black') {
      suggestedProducts = productDatabase.colorCoordination.whiteShirts;
      responseMessage += " Here are some white shirts that would pair beautifully with your black pants:";
    } else {
      suggestedProducts = [...productDatabase.colorCoordination.blueShirts, ...productDatabase.colorCoordination.beigePants];
      responseMessage += " Here are some versatile options that would work well:";
    }

    return { products: suggestedProducts, message: responseMessage };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setUploadedImage(imageUrl);
        
        const detectedColor = detectColorFromImage(imageUrl);
        setDetectedColor(detectedColor);
        
        const { products, message } = getColorSuggestions(detectedColor);
        
        const userMessage = {
          type: 'user',
          content: `I uploaded an image of my ${detectedColor} clothing item`,
          timestamp: new Date(),
          id: Date.now()
        };

        const aiMessage = {
          type: 'ai',
          content: message,
          timestamp: new Date(),
          id: Date.now() + 1
        };

        setMessages(prev => [...prev, userMessage, aiMessage]);
        setCurrentRecommendations(products);
        setShowSuggestions(false);
      };
      reader.readAsDataURL(file);
    }
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
    "Affordable footwear",
    "Color coordination help",
    "Blue shirt with beige pants",
    "What goes with white shirt"
  ];

  const colorCoordinationDatabase = {
    'blue': {
      primary: 'Blue',
      matches: ['Beige', 'Khaki', 'White', 'Navy', 'Brown', 'Cream'],
      complementary: 'Orange',
      description: 'Blue pairs beautifully with neutral tones like beige and khaki'
    },
    'beige': {
      primary: 'Beige',
      matches: ['Blue', 'Navy', 'Black', 'White', 'Brown', 'Olive'],
      complementary: 'Blue',
      description: 'Beige is versatile and works great with blue tones'
    },
    'white': {
      primary: 'White',
      matches: ['Black', 'Navy', 'Blue', 'Red', 'Pink', 'Gray'],
      complementary: 'Black',
      description: 'White is a classic that pairs with almost any color'
    },
    'black': {
      primary: 'Black',
      matches: ['White', 'Red', 'Pink', 'Blue', 'Gray', 'Beige'],
      complementary: 'White',
      description: 'Black is timeless and pairs with bold or neutral colors'
    },
    'navy': {
      primary: 'Navy',
      matches: ['White', 'Beige', 'Pink', 'Red', 'Yellow', 'Gray'],
      complementary: 'Orange',
      description: 'Navy is sophisticated and pairs well with light neutrals'
    },
    'red': {
      primary: 'Red',
      matches: ['White', 'Black', 'Navy', 'Beige', 'Gray', 'Denim'],
      complementary: 'Green',
      description: 'Red makes a bold statement with neutral or dark colors'
    }
  };

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
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop&crop=center",
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
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop&crop=center",
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
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
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
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop&crop=center",
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
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop&crop=center",
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
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center",
        category: "Men Clothing",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Navy", "White", "Gray", "Black"]
      }
    ],
    'colorCoordination': {
      'blueShirts': [
        {
          id: 401,
          name: "Men's Classic Blue Cotton Shirt",
          rating: 4.5,
          reviews: 1243,
          price: 499,
          originalPrice: 999,
          deliveryDate: "Wed, 25 Sept",
          deliveryCharge: "FREE delivery",
          description: "Classic blue cotton shirt perfect for casual and semi-formal occasions. Pairs beautifully with beige and khaki pants.",
          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTrcBGEr4cVS-COZ57Hlad253-T6BoyFjEUWOVsovK9LnCVmndGJQVKCBFxj2lcZLZl-N6WVKF3stlMP3n-Clhn_Gg9G9aiRl1FeL2HBNi3utaYirNipM6CeQ",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Blue"],
          dominantColor: "Blue"
        },
        {
          id: 402,
          name: "Men's Navy Blue Polo T-Shirt",
          rating: 4.3,
          reviews: 892,
          price: 399,
          originalPrice: 799,
          deliveryDate: "Thu, 26 Sept",
          deliveryCharge: "FREE delivery",
          description: "Premium navy blue polo t-shirt with comfortable fit. Great for casual outings and pairs well with light-colored bottoms.",
          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRNBx2HfJD3e4FdhU-0bPU3rB1rngx-wel9Fls0AWepIWbgooIIauaTcebHfV9NFlHkSiaegKiUoHjz8ENxhOKqzjz-eNVKZqm07gp_Erhbs1RH5E_9Zeeb",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Navy Blue"],
          dominantColor: "Blue"
        },
        {
          id: 403,
          name: "Men's Light Blue Casual Shirt",
          rating: 4.4,
          reviews: 756,
          price: 449,
          originalPrice: 899,
          deliveryDate: "Fri, 27 Sept",
          deliveryCharge: "FREE delivery",
          description: "Light blue casual shirt with modern fit. Perfect for office and weekend wear. Complements beige and khaki bottoms excellently.",
          image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT7t9FbCK_vPpRbh33v72mdfSWZd18LfJ0by3B9xxF7eGh7GqkLLPiOWompkpuuTHQL1USP1vpjno4e-EobflhVJ0WvwXvTT9P28u9RWbM-i6rMBPxKy_nNYdil6kzRxkdz93o5hbtEJw&usqp=CAc",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Light Blue"],
          dominantColor: "Blue"
        }
      ],
      'beigePants': [
        {
          id: 501,
          name: "Men's Beige Chino Pants",
          rating: 4.4,
          reviews: 1156,
          price: 699,
          originalPrice: 1299,
          deliveryDate: "Wed, 25 Sept",
          deliveryCharge: "FREE delivery",
          description: "Classic beige chino pants with perfect fit. Versatile color that pairs excellently with blue shirts and t-shirts.",
          image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTa6vhHteiBGImNe3hP5GU6inmY_1pjzcj65nJi1tQYP7T0WasStFeCY_43Z1jzBm6US8Xp-_iEoioCy-5LqRCgTrcUdUm_UUglsWHuRrwFdOFTt01sU4r8uNI&usqp=CAc",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Beige"],
          dominantColor: "Beige"
        },
        {
          id: 502,
          name: "Men's Khaki Cargo Pants",
          rating: 4.2,
          reviews: 743,
          price: 599,
          originalPrice: 1099,
          deliveryDate: "Thu, 26 Sept",
          deliveryCharge: "FREE delivery",
          description: "Comfortable khaki cargo pants with multiple pockets. Perfect casual wear that complements blue tops beautifully.",
          image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRyv8v7GllKoSbuoonWXVjZcwsRkO1NhaJUrIJBKGLlg5wEsjvAHDbujnNgmy8tZCHlMK-Uond8qOoLjRPiKO4Ov_dMsbISlo3dAF4vqIRnf7wBO0yYAdc-2A8&usqp=CAc",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Khaki"],
          dominantColor: "Beige"
        },
        {
          id: 503,
          name: "Men's Light Beige Trousers",
          rating: 4.3,
          reviews: 892,
          price: 649,
          originalPrice: 1199,
          deliveryDate: "Fri, 27 Sept",
          deliveryCharge: "FREE delivery",
          description: "Light beige formal trousers with modern cut. Perfect for business casual and pairs beautifully with blue shirts.",
          image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSPEvkNB7M2PB2To2zhgmHOo4VrKD3wok7dzpZwJeWcLTvrVYBV1P-nV6OvkWIeeM9E1y-6Q-8th0vLmVcjjW-2-VWDMZPRmtVCdQTRu0rOJln1RXlUf0QXXVYei_9S_RMC0o1jJLub0g&usqp=CAc",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Light Beige"],
          dominantColor: "Beige"
        }
      ],
      'whiteShirts': [
        {
          id: 601,
          name: "Men's Crisp White Formal Shirt",
          rating: 4.6,
          reviews: 1456,
          price: 599,
          originalPrice: 1199,
          deliveryDate: "Wed, 25 Sept",
          deliveryCharge: "FREE delivery",
          description: "Crisp white formal shirt with premium cotton fabric. Classic style that pairs with any color pants.",
          image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRY44D2fqrrJ3q4SkilevNTzJ7sEqfNBajtNabzw4laAD0rX2Wk1ky4WHF97o-slkrr4kjnrnte-Z6_XC1X1Az6vzEWbxTHgLNH9TdbgE6U2TSmts0dj18x",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["White"],
          dominantColor: "White"
        },
        {
          id: 602,
          name: "Men's White Cotton T-Shirt",
          rating: 4.1,
          reviews: 987,
          price: 299,
          originalPrice: 599,
          deliveryDate: "Thu, 26 Sept",
          deliveryCharge: "FREE delivery",
          description: "Essential white cotton t-shirt with comfortable fit. Versatile basic that works with any bottom color.",
          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRby_44_W60tW5bKZ9tTCEgIG-Q3RALPWiTQ1Vqh5Nx-ADxTy30TNQLtGGhL8wCdI8cmuKhwz7f2qasQ4V7cgWmLzMQ52Mx-gkFYu3I64icyerlVU_Bc_R50w&usqp=CAc",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL"],
          colors: ["White"],
          dominantColor: "White"
        },
        {
          id: 603,
          name: "Men's White Polo Shirt",
          rating: 4.4,
          reviews: 1123,
          price: 399,
          originalPrice: 799,
          deliveryDate: "Fri, 27 Sept",
          deliveryCharge: "FREE delivery",
          description: "Classic white polo shirt with premium cotton blend. Perfect for smart casual occasions and pairs with any color pants.",
          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRcItNK1q9hiU2sX31SveUjcE2iX4Y-Mh49gHdaZltSKYmlaGjGQ96INa1LCALuu5dD9c31FZ-OQAaAdGtS7CWkPLSoXtN3_AaULWLYDWeJ6j0tdWKnIDuxaAPOaSylecuUaj9sW2kZ&usqp=CAc",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["White"],
          dominantColor: "White"
        }
      ],
      'blackPants': [
        {
          id: 701,
          name: "Men's Black Formal Trousers",
          rating: 4.5,
          reviews: 1234,
          price: 799,
          originalPrice: 1499,
          deliveryDate: "Wed, 25 Sept",
          deliveryCharge: "FREE delivery",
          description: "Classic black formal trousers with perfect tailoring. Pairs beautifully with white and colored shirts.",
          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRsSFt757Egv0Srw_OULrmpLCJhlFpX2kSY_3X41IVvCSfpuUJroMN6VFUoaDflDPSplpjerChADv4JLRvwSIKnXP8NSl-Nd1ss3dXvgq9Buv-jxULadHdGJmTyHvCM8-KAn4xCpHs&usqp=CAc",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Black"],
          dominantColor: "Black"
        },
        {
          id: 702,
          name: "Men's Black Jeans",
          rating: 4.3,
          reviews: 876,
          price: 499,
          originalPrice: 999,
          deliveryDate: "Thu, 26 Sept",
          deliveryCharge: "FREE delivery",
          description: "Stylish black jeans with comfortable fit. Perfect casual wear that complements any colored top.",
          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRfBkNTx-shJcpUHugzp5lNVObU3aHAR_j7mMjCa5yN2SMTR5BDu4UJGeOxgUxbQlC6HwJSKO-N5wtUQOmUc0HBSoc0L873SOLm2gQXPOHl0ZotiwI9u9-2vQ&usqp=CAc",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Black"],
          dominantColor: "Black"
        },
        {
          id: 703,
          name: "Men's Black Chino Pants",
          rating: 4.4,
          reviews: 1023,
          price: 599,
          originalPrice: 1199,
          deliveryDate: "Fri, 27 Sept",
          deliveryCharge: "FREE delivery",
          description: "Versatile black chino pants with modern fit. Perfect for both casual and semi-formal occasions. Pairs excellently with white shirts.",
          image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRp5_FGDKHZp2_S4jM87U_jnSMtsAKj3oAhuMOktbiAHjyMShFDy149HaV7wrOgX5wSoD_pprFakFMBzCHP54gFD5L4HskDjcYGqUc-y3gWY0BR7hWnikc-",
          category: "Men Clothing",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Black"],
          dominantColor: "Black"
        }
      ]
    },
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
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRZ3mB5CfmTaGLuymDKAhJLh-jziqMi_QUKeBrHZlyA7f1PF0eAN9cRrqoEoteYeBhh-VyqqvZ_9yx_xM4Ab1FQodJViqGnS1caCI-BvD75bmJfBKnZ2WMnhh5JhusO&usqp=CAc",
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
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQALptmOVCxt55b3d8Tgt10O7gn9BG1FrY9j3bPtJtWt_lLtjPuwJzOSmOxPfaNoW2SmOpVAi3E3svo6D6Llof86dl576bWUgAXbsBX5Vkzfnds_sReoyf3h7i5088ZslCO2AK_uKq8ePw&usqp=CAc",
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
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTJzWiWFmqyJFyYrOPCFexcUo0xj6g61yrpHt5D8lCWm0lALvGteN879QqBHaEtOyHoM1j04tFXZFmXBVd2p6NqGtuT8VVVoeF1ITyZ1VWOVawzjJvf439AWKo&usqp=CAc",
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
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQr9RKTXrne-0Id_DUEC9E9AEkocBqEo2jhsXLUobbs_DJrTTJht5VXmNVn8YPznqOd6AJAwoc79BtLtVa8NDq9DxMQzuRhhxP5meJYMuwHASr7RS-F2sWnTXs&usqp=CAc",
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


    if (queryLower.includes('color') || queryLower.includes('coordinate') || queryLower.includes('match') || queryLower.includes('pair')) {
      responseText = "I can help you with color coordination! Upload an image of your clothing item and I'll suggest matching colors. You can also ask me about specific color combinations like 'blue shirt with beige pants' or 'what goes with white shirt'.";
      recommendedProducts = [];
    } else if (queryLower.includes('blue') && (queryLower.includes('shirt') || queryLower.includes('tshirt') || queryLower.includes('t-shirt'))) {
      recommendedProducts = productDatabase.colorCoordination.beigePants;
      responseText = "Great choice! Blue shirts look fantastic with beige and khaki pants. Here are some perfect matches:";
    } else if (queryLower.includes('beige') && (queryLower.includes('pant') || queryLower.includes('trouser'))) {
      recommendedProducts = productDatabase.colorCoordination.blueShirts;
      responseText = "Beige pants are so versatile! They pair beautifully with blue shirts and t-shirts. Check these out:";
    } else if (queryLower.includes('white') && (queryLower.includes('shirt') || queryLower.includes('tshirt') || queryLower.includes('t-shirt'))) {
      recommendedProducts = productDatabase.colorCoordination.blackPants;
      responseText = "White shirts are classic! They look great with black pants for a timeless look:";
    } else if (queryLower.includes('black') && (queryLower.includes('pant') || queryLower.includes('trouser'))) {
      recommendedProducts = productDatabase.colorCoordination.whiteShirts;
      responseText = "Black pants are essential! They pair perfectly with white shirts for a clean, professional look:";
    } else if (queryLower.includes('kurti')) {
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
              💡 You can also ask: "Show me discounted items", "What's trending?", "Help me choose", "Color coordination", or upload an image for color matching
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
        {uploadedImage && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <img
                src={uploadedImage}
                alt="Uploaded clothing"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {detectedColor ? `Detected: ${detectedColor.charAt(0).toUpperCase() + detectedColor.slice(1)}` : 'Processing...'}
                </p>
                <p className="text-xs text-gray-500">Upload another image to try different colors</p>
              </div>
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setDetectedColor(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
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
          
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </label>
          
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
            Meesho AI can help you find products, compare prices, get shopping advice, and suggest color coordination
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
