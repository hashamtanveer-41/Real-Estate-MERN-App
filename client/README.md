# Client (Frontend)

This folder contains the React frontend for the Real-Estate-MERN-App, built with React and Vite.

## Prerequisites

- Node.js 16+ and npm or yarn

## Environment Setup

Create a `.env.local` file in the client folder with the following:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Adjust the URL to match your backend server's address.

## Installation & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

   The app will run at `http://localhost:3000` with hot module replacement (HMR) enabled.

## Available Scripts

- `npm start` — development server
- `npm run build` — production-optimized build (outputs to `build/`)
- `npm test` — run tests (if configured)
- `npm run lint` — run linter (if configured)
- `npm run preview` — preview production build locally

## Production Build

1. Create an optimized build:
   ```bash
   npm run build
   ```

2. The output is in the `build/` folder. Deploy this folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

   Or serve from your backend API server.

## Project Structure

```
client/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API calls and external services
│   ├── styles/          # CSS and styling
│   ├── App.jsx
│   └── main.jsx
├── public/              # Static assets
├── .env.example         # Environment variables template
├── vite.config.js       # Vite configuration
├── package.json
└── README.md
```

## Technology Stack

- **React** — UI library
- **Vite** — build tool and dev server
- **React Router** — client-side routing (if applicable)
- **Axios** or **Fetch API** — HTTP requests to backend
- **CSS/Tailwind** — styling (adjust based on your project)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Key Features

- Hot Module Replacement (HMR) for instant code updates during development
- Optimized production builds with tree-shaking
- ESLint configured for code quality
- Support for React 18+

## Connecting to Backend

Make API calls to your backend using the configured `REACT_APP_API_URL`:

```javascript
const response = await fetch(`${process.env.REACT_APP_API_URL}/properties`);
const data = await response.json();
```

## Troubleshooting

- **CORS errors?** Ensure your backend is running and CORS is properly configured.
- **API connection fails?** Check that `REACT_APP_API_URL` is correct and the backend server is running.
- **Build issues?** Delete `node_modules/` and `.vite/` cache, then run `npm install` again.

## For More Information

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- Backend API docs: see [../server/README.md](../server/README.md)
