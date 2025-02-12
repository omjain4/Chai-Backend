# VideoTube: A Feature-Rich Video Sharing Platform

VideoTube is a comprehensive video sharing platform that allows users to upload, view, and interact with videos, as well as manage their profiles and engage with other users through comments, likes, and subscriptions.

This backend application provides a robust API for managing user accounts, video uploads, playlists, comments, likes, subscriptions, and more. It's built with Node.js and Express, utilizing MongoDB for data storage and Cloudinary for media management.

## Repository Structure

```
.
├── package.json
├── src
│   ├── app.js
│   ├── constants.js
│   ├── controllers
│   ├── db
│   ├── index.js
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── utils
└── vercel.json
```

Key Files:
- `src/index.js`: Entry point of the application
- `src/app.js`: Express application setup
- `src/db/index.js`: Database connection configuration
- `vercel.json`: Vercel deployment configuration

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- MongoDB
- Cloudinary account

Steps:
1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8000
   MONGODB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Getting Started

To start the server:

```bash
npm start
```

The server will start on the port specified in the `.env` file (default: 8000).

### API Endpoints

- User Management:
  - POST `/api/v1/users/register`: Register a new user
  - POST `/api/v1/users/login`: Login user
  - POST `/api/v1/users/logout`: Logout user
  - GET `/api/v1/users/refresh-token`: Refresh access token

- Video Management:
  - GET `/api/v1/videos`: Get all videos
  - POST `/api/v1/videos`: Upload a new video
  - GET `/api/v1/videos/:videoId`: Get video by ID
  - PATCH `/api/v1/videos/:videoId`: Update video
  - DELETE `/api/v1/videos/:videoId`: Delete video

- Playlist Management:
  - POST `/api/v1/playlist`: Create a new playlist
  - GET `/api/v1/playlist/:playlistId`: Get playlist by ID
  - PATCH `/api/v1/playlist/:playlistId`: Update playlist
  - DELETE `/api/v1/playlist/:playlistId`: Delete playlist

- Comment Management:
  - POST `/api/v1/comments`: Add a comment
  - PATCH `/api/v1/comments/:commentId`: Update a comment
  - DELETE `/api/v1/comments/:commentId`: Delete a comment

- Like Management:
  - PATCH `/api/v1/like`: Toggle like status

- Subscription Management:
  - PATCH `/api/v1/subscriptions/:channelId`: Toggle subscription status

### Testing & Quality

To run tests:

```bash
npm test
```

### Troubleshooting

Common issues:

1. Database Connection Error
   - Error message: "Error connecting to MongoDB"
   - Solution: Check your MongoDB connection string in the `.env` file and ensure your MongoDB server is running.

2. Cloudinary Upload Error
   - Error message: "CLOUDINARY :: FILE UPLOAD ERROR"
   - Solution: Verify your Cloudinary credentials in the `.env` file and check your internet connection.

3. JWT Authentication Error
   - Error message: "Invalid token" or "Token expired"
   - Solution: Ensure you're sending a valid JWT token in the Authorization header for protected routes.

Debugging:
- Set `NODE_ENV=development` in your `.env` file for more detailed error logs.
- Check the console output for error messages and stack traces.

## Data Flow

The application follows a typical MVC (Model-View-Controller) architecture:

1. Client sends a request to a specific endpoint.
2. The request is first processed by relevant middleware (e.g., authentication).
3. The route handler calls the appropriate controller function.
4. The controller interacts with the database using Mongoose models.
5. For file uploads, the controller interacts with Cloudinary.
6. The controller sends back a response to the client.

```
Client Request -> Middleware -> Router -> Controller -> Model -> Database
                                                    -> Cloudinary
                   Response  <-  <-  <-  <-  <-  <-
```

## Deployment

This application is configured for deployment on Vercel. The `vercel.json` file includes a route configuration to handle client-side routing.

To deploy:
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and follow the prompts.

## Infrastructure

The application uses the following infrastructure:

- Database: MongoDB
- File Storage: Cloudinary
- Deployment: Vercel

The `vercel.json` file defines a route configuration:

```json
{
  "routes": [{ "src": "/[^.]+", "dest": "/", "status": 200 }]
}
```

This configuration ensures that all non-file requests are routed to the application's entry point, allowing client-side routing to function correctly.