# MERN Portfolio Starter

This project is a simple MERN-style portfolio app with separate backend and frontend folders.

## Structure

```text
backend/   Express API + MongoDB contact storage
frontend/  React + Vite portfolio site
```

## Run It

1. Install dependencies from the project root:

```bash
npm install
```

2. Start both apps:

```bash
npm run dev
```

3. Open the frontend in your browser:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:5000
```

## Environment

The backend looks for `backend/.env`.

Example values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mern_portfolio
FRONTEND_URL=http://localhost:5173
```

The frontend can optionally use `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

If MongoDB is not connected yet, the site still works and the contact form falls back to local demo storage.
