# E-Shop - Full Stack Next.js with MongoDB

A modern e-commerce application built with Next.js 15, MongoDB, and TypeScript.

## Features

- ✅ **Authentication System**: Complete user registration and login with MongoDB
- ✅ **JWT Token Management**: Secure authentication with HTTP-only cookies
- ✅ **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- ✅ **Full Stack**: Next.js API routes replace FastAPI backend
- 🚧 **Product Management**: Ready for implementation with MongoDB
- 🚧 **Admin Dashboard**: Framework in place for content management

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update `.env.local` with your MongoDB connection string and JWT secret:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/eshop
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXTAUTH_URL=http://localhost:3000
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Authentication

The authentication system is fully implemented with:

- **Registration**: `/register` - Create new user accounts
- **Login**: `/login` - Authenticate existing users  
- **Session Management**: Automatic token refresh and validation
- **Secure Storage**: HTTP-only cookies for token storage

### API Routes

Authentication endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Database Schema

The MongoDB database uses the following collections:

#### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
\`\`\`

### Next Steps

To complete the full-stack conversion:

1. **Implement Product Management**: Create API routes for products, categories, and inventory
2. **Add Order System**: Build shopping cart and checkout functionality  
3. **Extend Admin Features**: Complete the admin dashboard with MongoDB integration
4. **Add File Upload**: Implement image upload for products and banners

### Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with native driver
- **Authentication**: JWT with bcryptjs
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Deployment**: Vercel-ready

## Contributing

This project has been converted from FastAPI to a full-stack Next.js application. The authentication system is complete and ready for use.
