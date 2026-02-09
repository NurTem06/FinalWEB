# FinalWEB
# MovieHub - Media & Review Platform

Full-stack web application for tracking movies, watching trailers, and leaving reviews.

## Features
- **User Authentication**: Secure register/login with JWT and Bcrypt.
- **Movie Catalog**: Dynamic movie list with YouTube trailers.
- **Review System**: 10-star rating system and user comments.
- **User Profiles**: Public profiles with watch history and personal ratings.
- **RBAC**: Admin role for content management.

## Tech Stack
- **Frontend**: HTML5, CSS3 (Bootstrap 5), JavaScript.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas.
- **Security**: JWT, .env for sensitive data.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root with:
   - `MONGODB_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_secret_key`
4. Run `node server.js` to start the server.
5. Open `http://localhost:8080` in your browser.

## API Documentation
- `POST /api/auth/register` - New user registration.
- `POST /api/auth/login` - User login & JWT issuance.
- `GET /api/movies` - Get all movies.
- `GET /api/users/:id` - Get user profile and history.
