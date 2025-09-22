# Testing Guide for Authentication and Cart System

## Authentication Testing

### Registration Flow
1. Navigate to `/register`
2. Fill in name, email, and password (minimum 6 characters)
3. Click "Register"
4. Should redirect to homepage with user logged in
5. Check that user info appears in header/navigation

### Login Flow
1. Navigate to `/login`
2. Enter registered email and password
3. Click "Login"
4. Should redirect to homepage with user logged in

### Navigation Links
- Login page should have link to register page
- Register page should have link to login page

## Cart Persistence Testing

### Guest User Cart (localStorage)
1. Add products to cart while not logged in
2. Refresh page - cart should persist
3. Close browser and reopen - cart should persist

### Logged-in User Cart (Database)
1. Login to account
2. Add products to cart
3. Logout and login again - cart should persist
4. Login from different browser/device - cart should sync

### Cart Merging
1. Add products to cart as guest user
2. Login to account
3. Guest cart should merge with user's existing cart
4. Quantities should be combined for duplicate items

## Environment Variables Required

Make sure these are set in your environment:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `NEXTAUTH_URL` - Your app URL (e.g., http://localhost:3000)

## Troubleshooting

### Authentication Issues
- Check browser console for error messages
- Verify MongoDB connection
- Ensure JWT_SECRET is set
- Check that cookies are being set properly

### Cart Issues
- Check browser localStorage for guest cart data
- Verify MongoDB cart collection is being created
- Check network tab for API calls to `/api/cart`
- Ensure user is properly authenticated for server cart operations
