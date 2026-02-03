# TrueSeller – Connecting Local Sellers to Online Buyers

![TrueSeller Logo](https://via.placeholder.com/150x150?text=TrueSeller)

A comprehensive MERN-based e-commerce platform designed to empower local shopkeepers across India to sell their products online without requiring any technical expertise. TrueSeller bridges the gap between traditional brick-and-mortar stores and the digital marketplace, enabling small business owners to reach customers nationwide.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://trueseller.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/vaibhavVS18/TrueSeller)

## 🌟 Features

### For Shop Owners (Sellers)
- **Easy Registration**: Simple shop registration process without technical knowledge required
- **Shop Management**:
  - Add and manage shop details (name, address, contact information)
  - Upload shop images and branding
  - Business verification and authentication
- **Product Management**:
  - Add unlimited products with detailed descriptions
  - Upload high-quality product images via Cloudinary
  - Set competitive prices and manage inventory
  - Categorize products for easy discovery
  - Edit and update product information in real-time
- **Order Management**:
  - Receive and process customer orders
  - Update order status (pending, confirmed, shipped, delivered)
  - Track sales and revenue
  - Manage customer communications
- **Analytics Dashboard**:
  - View sales statistics and trends
  - Monitor product performance
  - Track customer engagement

### For Buyers (Customers)
- **Explore Local Products**:
  - Browse products from different states across India
  - Discover authentic local items and regional specialties
  - Search and filter products by category, location, and price
- **Seamless Shopping Experience**:
  - User-friendly product catalog with detailed information
  - Add items to cart and manage orders
  - Save favorite shops and products
  - View order history and tracking
- **Flexible Payment Options**:
  - **Cash on Delivery (COD)**: Pay when you receive
  - **Online Payment**: Secure payment gateway integration
  - Multiple payment methods supported
- **Nationwide Delivery**:
  - Home delivery to any location in India
  - Real-time order tracking
  - Estimated delivery dates
  - Reliable shipping partners

### Platform Features
- **Secure Authentication**: JWT-based authentication for all users
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Image Optimization**: Fast loading with Cloudinary CDN
- **Real-time Updates**: Live order status and notifications
- **Search Functionality**: Advanced search and filtering capabilities
- **State-wise Product Discovery**: Explore products by Indian states

## 🛠️ Tech Stack

### Frontend
- **React** - Modern, component-based UI library
- **React Router DOM** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Icons** - Beautiful icon library
- **React Hot Toast** - Toast notifications for user feedback
- **Vite** - Lightning-fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT (jsonwebtoken)** - Secure authentication tokens
- **Bcrypt.js** - Password hashing for security
- **Cloudinary** - Cloud-based image storage and optimization
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **Nodemon** - Auto-restart during development

## 📁 Project Structure

```
TrueSeller/
├── client/                 # Frontend React application
│   ├── public/
│   │   └── assets/         # Static assets and images
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Buyer/      # Buyer-specific components
│   │   │   ├── Seller/     # Seller-specific components
│   │   │   └── Shared/     # Common components
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/        # React Context for state management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   │   ├── api.js      # API service functions
│   │   │   └── helpers.js  # Helper utilities
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   └── package.json
│
└── server/                 # Backend Node.js application
    ├── config/
    │   └── db.js           # Database configuration
    ├── controllers/        # Request handlers and business logic
    │   ├── authController.js
    │   ├── shopController.js
    │   ├── productController.js
    │   └── orderController.js
    ├── models/             # Mongoose schemas and models
    │   ├── User.js
    │   ├── Shop.js
    │   ├── Product.js
    │   └── Order.js
    ├── routes/             # API route definitions
    │   ├── auth.js
    │   ├── shop.js
    │   ├── product.js
    │   └── order.js
    ├── middleware/         # Custom middleware
    │   ├── auth.js         # JWT authentication
    │   └── upload.js       # File upload handling
    ├── utils/              # Utility functions
    │   └── cloudinary.js   # Cloudinary configuration
    ├── server.js           # Express server setup
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud) or local installation
- **Cloudinary Account** - [Sign up](https://cloudinary.com/) for image hosting

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/vaibhavVS18/TrueSeller.git
cd TrueSeller
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../server
npm install
```

### Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string
# Example: mongodb+srv://username:password@cluster.mongodb.net/trueseller

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Gateway (Optional - for online payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
CLIENT_URL=http://localhost:5173
```

#### Frontend Environment Variables
Create a `.env` file in the `client/` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Cloudinary Configuration (for direct uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
```

### Database Setup

1. **Create MongoDB Database**:
   - Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster (free tier available)
   - Get your connection string
   - Replace `MONGODB_URI` in `.env`

2. **Configure Database Access**:
   - Add your IP address to whitelist
   - Create database user credentials

### Cloudinary Setup

1. **Create Cloudinary Account**:
   - Sign up at [Cloudinary](https://cloudinary.com/)
   - Navigate to Dashboard
   - Copy Cloud Name, API Key, and API Secret

2. **Create Upload Preset**:
   - Go to Settings → Upload
   - Create an unsigned upload preset for public images
   - Copy preset name to `.env`

### Running the Application

#### Development Mode

1. **Start the Backend Server**:
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5000`

2. **Start the Frontend Development Server** (in a new terminal):
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`

3. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5173`
   - Register as a seller or buyer to start using the platform

#### Production Mode

1. **Build Frontend**:
```bash
cd client
npm run build
```

2. **Start Backend**:
```bash
cd server
npm start
```

## 📱 Usage Guide

### For Shop Owners

1. **Registration & Setup**:
   - Click "Register as Seller"
   - Fill in shop details (name, address, contact)
   - Upload shop logo/image
   - Verify your account

2. **Adding Products**:
   - Navigate to "My Shop" dashboard
   - Click "Add New Product"
   - Fill in product details:
     - Product name
     - Description
     - Category
     - Price
     - Stock quantity
   - Upload product images
   - Click "Submit"

3. **Managing Orders**:
   - View incoming orders in "Orders" section
   - Update order status:
     - Confirm order
     - Mark as shipped
     - Mark as delivered
   - Communicate with buyers

4. **Track Performance**:
   - View sales analytics
   - Monitor popular products
   - Check revenue reports

### For Buyers

1. **Browsing Products**:
   - Explore products by state/region
   - Use search and filters
   - View detailed product information
   - Check seller ratings and reviews

2. **Shopping Process**:
   - Add products to cart
   - Review cart and update quantities
   - Proceed to checkout
   - Enter delivery address

3. **Payment & Delivery**:
   - Choose payment method:
     - Cash on Delivery (COD)
     - Online Payment (card/UPI/net banking)
   - Confirm order
   - Track order status
   - Receive products at doorstep

4. **Account Management**:
   - View order history
   - Manage saved addresses
   - Update profile information
   - Save favorite shops

## 🔐 Authentication & Security

- **JWT-based Authentication**: Secure token-based user authentication
- **Password Encryption**: Bcrypt hashing for secure password storage
- **Protected Routes**: Client and server-side route protection
- **Role-based Access Control**: Separate permissions for sellers and buyers
- **Secure Payment Processing**: Encrypted payment gateway integration
- **Input Validation**: Server-side validation for all user inputs
- **XSS Protection**: Prevention against cross-site scripting attacks
- **CORS Configuration**: Controlled cross-origin access

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (seller/buyer)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Shop Management (Seller)
- `POST /api/shop/create` - Create new shop
- `GET /api/shop/:id` - Get shop details
- `PUT /api/shop/:id` - Update shop information
- `DELETE /api/shop/:id` - Delete shop
- `GET /api/shop/my-shop` - Get seller's shop
- `GET /api/shop/all` - Get all shops (with pagination)

### Product Management
- `POST /api/products` - Add new product
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/shop/:shopId` - Get products by shop
- `GET /api/products/state/:state` - Get products by state
- `GET /api/products/search` - Search products

### Order Management
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/seller/pending` - Get seller's pending orders
- `DELETE /api/orders/:id` - Cancel order

### Payment
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/cod` - Place COD order

## 🎨 Features Highlights

### State-wise Product Discovery
TrueSeller allows buyers to explore authentic local products from different states of India:
- **Regional Specialties**: Discover unique products from each state
- **Cultural Items**: Handicrafts, traditional wear, local foods
- **Support Local Economy**: Direct connection with local sellers
- **Geographical Filters**: Easy state-based browsing

### Seller Dashboard
Comprehensive dashboard for shop owners:
- **Sales Overview**: Revenue, orders, and growth metrics
- **Product Management**: Easy add/edit/delete interface
- **Order Processing**: Streamlined order fulfillment workflow
- **Inventory Tracking**: Real-time stock management
- **Customer Insights**: Buyer behavior and preferences

### Buyer Experience
Optimized shopping journey:
- **Intuitive Navigation**: Easy-to-use interface
- **Advanced Search**: Find products quickly
- **Product Comparison**: Compare similar items
- **Wishlist**: Save products for later
- **Order Tracking**: Real-time delivery updates
- **Reviews & Ratings**: Make informed decisions

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. **Connect Repository**:
   - Sign up at [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Select the `client` directory as root

2. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**:
   - Add all `VITE_*` variables from `.env`
   - Update `VITE_API_URL` to production backend URL

4. **Deploy**:
   - Click "Deploy"
   - Automatic deployments on every push to main branch

### Backend Deployment

#### Option 1: Railway

1. **Create New Project**:
   - Sign up at [Railway](https://railway.app/)
   - Create new project from GitHub repo

2. **Configure**:
   - Select `server` directory
   - Add environment variables from `.env`
   - Set start command: `npm start`

3. **Deploy**:
   - Railway automatically deploys
   - Copy the generated URL

#### Option 2: Render

1. **Create Web Service**:
   - Sign up at [Render](https://render.com/)
   - New → Web Service
   - Connect GitHub repository

2. **Configuration**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables

3. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete

#### Option 3: Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create trueseller-api

# Set environment variables
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
# ... set all other env variables

# Deploy
git subtree push --prefix server heroku main
```

### Database (MongoDB Atlas)
- Already cloud-hosted
- Configure IP whitelist to allow deployment platform
- Update connection string in production environment variables

### Post-Deployment Checklist
- ✅ Update CORS settings to allow production frontend URL
- ✅ Test all API endpoints
- ✅ Verify file uploads to Cloudinary
- ✅ Test payment gateway integration
- ✅ Check authentication flow
- ✅ Monitor application logs
- ✅ Set up error tracking (e.g., Sentry)
- ✅ Configure custom domain (optional)

## 🌐 Live Demo

**Live Application**: [https://trueseller.vercel.app/](https://trueseller.vercel.app/)

**Test Credentials** (if applicable):
- Seller Account: `seller@example.com` / `password123`
- Buyer Account: `buyer@example.com` / `password123`

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['buyer', 'seller']),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Shop Model
```javascript
{
  owner: ObjectId (ref: User),
  shopName: String,
  description: String,
  shopImage: String (Cloudinary URL),
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  contactNumber: String,
  isVerified: Boolean,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  shop: ObjectId (ref: Shop),
  name: String,
  description: String,
  images: [String] (Cloudinary URLs),
  price: Number,
  category: String,
  stock: Number,
  state: String,
  specifications: Object,
  rating: Number,
  reviews: [Review],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  buyer: ObjectId (ref: User),
  seller: ObjectId (ref: User),
  products: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  shippingAddress: Object,
  paymentMethod: String (enum: ['COD', 'Online']),
  paymentStatus: String,
  orderStatus: String (enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  trackingNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Troubleshooting

### Common Issues

**Database Connection Failed**:
```bash
# Check MongoDB URI format
# Ensure IP is whitelisted in MongoDB Atlas
# Verify credentials are correct
```

**Cloudinary Upload Error**:
```bash
# Verify Cloudinary credentials
# Check upload preset configuration
# Ensure images are under size limit
```

**CORS Error**:
```bash
# Add frontend URL to CORS whitelist in server
# Check if CLIENT_URL is set correctly
```

**JWT Token Expired**:
```bash
# Clear browser localStorage
# Re-login to get new token
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Vaibhav** - [@vaibhavVS18](https://github.com/vaibhavVS18) - Lead Developer

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Cloudinary for image management
- Vercel for frontend hosting
- All open-source contributors whose libraries made this project possible
- The local shopkeepers who inspired this platform

## 📞 Support

For support, email support@trueseller.com or open an issue on GitHub.

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced analytics for sellers
- [ ] AI-powered product recommendations
- [ ] Multi-language support
- [ ] Seller verification system
- [ ] Customer reviews and ratings
- [ ] Promotional campaigns and discounts
- [ ] Integration with logistics partners
- [ ] Real-time chat between buyers and sellers
- [ ] Seller subscription plans
- [ ] Advanced inventory management
- [ ] Export orders to Excel/PDF

---

**Made with ❤️ to empower local businesses across India**

**Connecting Local Markets to the Digital World 🛒🌏**
