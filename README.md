# Real-Estate-MERN-App

A full-stack Real Estate application built with the MERN stack (MongoDB, Express, React, Node). This repository contains two main parts:

- **server/** — the backend API (Express + MongoDB)
- **client/** — the frontend (React + Vite)

## Quick Start

### Backend (Server)

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI, JWT secret, and other required values
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000` (or your configured PORT).

### Frontend (Client)

1. Navigate to the client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Configure REACT_APP_API_URL to point to your backend (e.g., http://localhost:5000/api)
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`.

## Environment Setup

### Server Variables

- `PORT` — server port (default: 5000)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `CLOUDINARY_CLOUD_NAME` — (optional) Cloudinary cloud name for image uploads
- `CLOUDINARY_API_KEY` — (optional) Cloudinary API key
- `CLOUDINARY_API_SECRET` — (optional) Cloudinary API secret

### Client Variables

- `REACT_APP_API_URL` — base URL for the backend API (e.g., http://localhost:5000/api)

## Project Structure

```
Real-Estate-MERN-App/
├── server/              # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── README.md       # Backend documentation
├── client/             # Frontend (React + Vite)
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── README.md       # Frontend documentation
└── README.md           # This file
```

## Available Scripts

### Server

- `npm run dev` — start with hot reloading (nodemon)
- `npm start` — start production server
- `npm test` — run tests (if configured)
- `npm run lint` — run linter (if configured)

### Client

- `npm start` — development server
- `npm run build` — production build
- `npm test` — run tests (if configured)

## Deployment

### Server

Deploy on platforms like:
- Heroku
- Railway
- Render
- AWS EC2

Ensure environment variables are set on your hosting platform.

### Client

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build/` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

Or serve from the backend by copying the build folder to the server's public directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## API Documentation

For detailed API endpoints, request/response formats, and authentication details, see [server/README.md](./server/README.md).

## Frontend Documentation

For component structure, styling, and environment setup details, see [client/README.md](./client/README.md).

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues, questions, or suggestions, open an issue on GitHub or contact the maintainers.