# Meesho Clone - React.js Frontend

A complete clone of the Meesho e-commerce platform built with React.js, featuring all the core functionalities including product browsing, cart management, user authentication, and responsive design.

## Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse products with categories, search, and filters
- **Product Details**: Detailed product pages with image gallery, size/color selection
- **Shopping Cart**: Add to cart, quantity management, and checkout process
- **Wishlist**: Save favorite products for later
- **User Authentication**: Login/signup with localStorage persistence

### 🎨 UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Interface**: Clean, Meesho-inspired design with Tailwind CSS
- **Interactive Components**: Smooth animations and hover effects
- **Search & Filters**: Advanced filtering by price, rating, discount, and categories

### 🔧 Technical Features
- **React Router**: Single-page application with client-side routing
- **Context API**: Global state management for cart, user, and preferences
- **LocalStorage**: Persistent data storage (no backend required)
- **Dummy Data**: Pre-populated with sample products and categories
- **Error Handling**: Graceful error handling and fallback UI

## Technologies Used

- **Frontend**: React.js (JavaScript)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API + useReducer
- **Storage**: LocalStorage API
- **Build Tool**: React Scripts (Create React App)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/tanmaypandey/Desktop/CodeStuff/meesho
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   └── ProductCard.js  # Product display card
├── pages/              # Main application pages
│   ├── Home.js         # Homepage with categories and featured products
│   ├── ProductListing.js # Product catalog with filters
│   ├── ProductDetails.js # Individual product page
│   ├── Cart.js         # Shopping cart and checkout
│   ├── Login.js        # Authentication page
│   └── Profile.js      # User profile and order history
├── context/            # Global state management
│   └── AppContext.js   # Main application context
├── data/               # Static data and configurations
│   └── products.js     # Sample products and categories
├── App.js              # Main application component
└── index.js           # Application entry point
```

## Key Features Explained

### 🏠 Homepage
- Hero banner with call-to-action
- Category grid for easy navigation
- Featured products showcase
- Benefits section highlighting key features

### 🔍 Product Listing
- Grid/list view of products
- Advanced filtering (price, rating, discount, category)
- Sorting options (relevance, price, rating, discount)
- Responsive design with mobile-friendly filters

### 📱 Product Details
- Image gallery with thumbnail navigation
- Size and color selection
- Quantity picker
- Add to cart and buy now options
- Product specifications and seller information

### 🛒 Shopping Cart
- Item quantity management
- Price calculations with discounts
- Order summary with savings display
- Checkout process (demo mode)

### 👤 User Authentication
- Login and signup forms with validation
- Demo account option for quick testing
- Profile management
- Order history (mock data)

### 💾 Data Persistence
All user data is stored in localStorage:
- User profile information
- Shopping cart contents
- Wishlist items
- Search preferences

## Demo Account

For quick testing, use the "Continue with Demo Account" button on the login page, or use these credentials:
- Email: demo@meesho.com
- Password: demo123

## Responsive Design

The application is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

This is a demo project. For educational purposes, feel free to:
1. Fork the project
2. Create feature branches
3. Add new functionality
4. Improve the UI/UX

## License

This project is for educational purposes only. Meesho is a trademark of Meesho Inc.

## Acknowledgments

- Design inspiration from Meesho official website
- Icons from Heroicons
- Styling with Tailwind CSS
- Built with Create React App
