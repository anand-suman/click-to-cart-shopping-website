# Full-Stack E-Commerce MERN Application

A complete full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides a robust platform for online shopping with user authentication, product management, shopping cart functionality, and an admin panel.

![Project Screenshot](Full%20Stack%20E-Commerce%20MERN%20App.png)

## 🚀 Features

### User Features

- **User Authentication**: Sign up, sign in, and logout functionality with secure password hashing
- **User Profile Management**: Update profile information and view user details
- **Product Browsing**: Browse products by category, search, and filter products
- **Product Details**: View detailed product information with images
- **Shopping Cart**: Add, update, and remove items from cart
- **Checkout**: Complete purchase process
- **Forgot Password**: Password recovery functionality

### Admin Features

- **Admin Panel**: Dedicated admin dashboard for managing the platform
- **User Management**: View all users and update user roles
- **Product Management**: Upload, update, and manage products
- **Category Management**: Organize products by categories

### Product Features

- **Category-based Display**: Browse products by categories (Airpodes, Camera, Earphones, Mobiles, Mouse, Printers, Processor, Refrigerator, Speakers, Trimmers, Televisions, Watches)
- **Search Functionality**: Search products by name or keywords
- **Filter Products**: Filter products by various criteria
- **Product Images**: Multiple product images support
- **Price Management**: Regular price and selling price support

## 🛠️ Tech Stack

### Frontend

- **React 18.2.0**: UI library
- **React Router DOM 6.22.1**: Client-side routing
- **Redux Toolkit 2.2.1**: State management
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **React Icons 5.1.0**: Icon library
- **React Toastify 10.0.4**: Toast notifications
- **Moment.js 2.30.1**: Date formatting

### Backend

- **Node.js**: Runtime environment
- **Express.js 4.18.2**: Web framework
- **MongoDB**: Database
- **Mongoose 8.1.3**: MongoDB object modeling
- **JWT (JSON Web Tokens) 9.0.2**: Authentication
- **Bcrypt.js 2.4.3**: Password hashing
- **Multer 1.4.5**: File upload handling
- **Cookie Parser 1.4.6**: Cookie parsing
- **CORS 2.8.5**: Cross-origin resource sharing
- **Nodemon 3.0.3**: Development server auto-reload

## 📁 Project Structure

```
Full-Stack-E-Commerce-MERN-APP/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── controller/
│   │   ├── product/           # Product controllers (CRUD operations, search, filter)
│   │   └── user/              # User controllers (auth, cart, checkout)
│   ├── helpers/
│   │   └── permission.js      # Permission helper functions
│   ├── middleware/
│   │   ├── authToken.js       # JWT authentication middleware
│   │   └── upload.js          # File upload middleware
│   ├── models/
│   │   ├── userModel.js       # User schema/model
│   │   ├── productModel.js    # Product schema/model
│   │   └── cartProduct.js     # Cart schema/model
│   ├── routes/
│   │   └── index.js           # API routes definition
│   ├── scripts/
│   │   ├── createAdmin.js     # Admin user creation script
│   │   └── createSampleProduct.js  # Sample product creation script
│   ├── uploads/
│   │   └── products/          # Uploaded product images
│   ├── index.js               # Backend entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── routes/            # Route configuration
│   │   ├── context/           # React context
│   │   ├── store/             # Redux store configuration
│   │   ├── helpers/           # Utility functions
│   │   ├── common/            # Common utilities and API endpoints
│   │   └── assest/            # Static assets (images, etc.)
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── package.json
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Full-Stack-E-Commerce-MERN-APP
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# Copy the environment variables (see Environment Variables section)
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

## ⚙️ Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
PORT=8080
```

**Example:**

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

TOKEN_SECRET_KEY=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:3000
PORT=8080
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_CLOUD_NAME_CLOUDINARY=your_cloudinary_cloud_name
```

**Note:** If you're using local file uploads instead of Cloudinary, you may skip this variable.

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:8080`

2. **Start the Frontend Development Server**

```bash
cd frontend
npm start
```

The frontend application will open in your browser at `http://localhost:3000`

### Production Mode

1. **Build the Frontend**

```bash
cd frontend
npm run build
```

2. **Start the Backend (Production)**

```bash
cd backend
npm start
```

## 📡 API Endpoints

### Authentication Endpoints

- `POST /api/signup` - User registration
- `POST /api/signin` - User login
- `GET /api/user-details` - Get current user details (Protected)
- `GET /api/userLogout` - User logout

### User Management (Admin)

- `GET /api/all-user` - Get all users (Admin only)
- `POST /api/update-user` - Update user details (Admin only)

### Product Endpoints

- `GET /api/get-product` - Get all products
- `POST /api/upload-product` - Upload new product (Admin only)
- `POST /api/update-product` - Update product (Admin only)
- `GET /api/get-categoryProduct` - Get all categories
- `POST /api/category-product` - Get products by category
- `POST /api/product-details` - Get product details
- `GET /api/search` - Search products
- `POST /api/filter-product` - Filter products

### Cart Endpoints

- `POST /api/addtocart` - Add product to cart (Protected)
- `GET /api/countAddToCartProduct` - Get cart item count (Protected)
- `GET /api/view-card-product` - Get all cart items (Protected)
- `POST /api/update-cart-product` - Update cart item (Protected)
- `POST /api/delete-cart-product` - Remove item from cart (Protected)
- `GET /api/cart` - Get cart (Protected)
- `POST /api/checkout` - Checkout (Protected)

## 🎯 Available Scripts

### Backend Scripts

```bash
npm start          # Start the production server
npm run dev        # Start the development server with nodemon
npm run seed:admin # Create an admin user
```

### Frontend Scripts

```bash
npm start          # Start the development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (not recommended)
```

## 🔐 User Roles

The application supports two user roles:

- **User**: Regular customer with shopping capabilities
- **Admin**: Platform administrator with full access to user and product management

## 🗄️ Database Models

### User Model

- `name`: String
- `email`: String (unique, required)
- `password`: String (hashed)
- `profilePic`: String (URL)
- `role`: String (User/Admin)
- `timestamps`: Created and updated dates

### Product Model

- `productName`: String (required)
- `brandName`: String (required)
- `category`: String (required)
- `productImage`: Array of Strings (image URLs)
- `description`: String (required)
- `price`: Number (required, min: 0)
- `sellingPrice`: Number (required, min: 0)
- `timestamps`: Created and updated dates

### Cart Model

- User reference
- Product reference
- Quantity
- Other cart-related fields

## 📸 Screenshots

For project screenshots, visit: [Google Drive Folder](https://drive.google.com/drive/folders/1KmY74OYniEodtOVAjNGJv4628HghRbcQ?usp=sharing)

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes with authentication middleware
- Role-based access control (Admin/User)
- CORS configuration for API security
- Input validation and sanitization

## 🛣️ Routes

### Public Routes

- `/` - Home page
- `/login` - Login page
- `/sign-up` - Registration page
- `/forgot-password` - Password recovery
- `/product-category` - Category listing
- `/product/:id` - Product details
- `/search` - Search results

### Protected Routes

- `/cart` - Shopping cart (User)
- `/admin-panel` - Admin dashboard (Admin)
- `/admin-panel/all-users` - User management (Admin)
- `/admin-panel/all-products` - Product management (Admin)

## 🎨 Features Breakdown

### Product Categories

The application supports the following product categories:

- Airpodes
- Camera
- Earphones
- Mobiles
- Mouse
- Printers
- Processor
- Refrigerator
- Speakers
- Trimmers
- Televisions
- Watches

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env` file
   - Verify MongoDB connection string format

2. **Port Already in Use**

   - Change the `PORT` in backend `.env` file
   - Or stop the process using the port

3. **CORS Errors**

   - Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
   - Ensure credentials are properly configured

4. **JWT Token Errors**
   - Check `TOKEN_SECRET_KEY` is set in backend `.env`
   - Ensure token is being sent with requests

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Full Stack E-Commerce MERN Application

## 📞 Support

For support, please open an issue in the repository.

---

**Note**: Make sure to keep your `.env` files secure and never commit them to version control. Add them to your `.gitignore` file.
