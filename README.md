# Shelf

> A full-stack web app for tracking, rating, and reviewing the books, movies, TV shows, and games you love.

**[Live demo](https://your-deployed-link-here)** | [API docs](#api-reference) |

<!-- Add a screenshot or GIF here. This is the single most useful thing in the README. -->
![Shelf screenshot](docs/screenshot.png)

[![Tests](https://github.com/anosikekene/Shelf/actions/workflows/ci.yml/badge.svg)](https://github.com/anosikekene/Shelf/actions)

<!-- The badge above only works once you add a GitHub Actions workflow named ci.yml. Remove it until then. -->

## Why I built this
I built this because on my free time I enjoy consuming many different forms of media, and writing down my ratings and leaving comments in my notes app started to get overwhelming. I just wanted to combine my love for media with my interest in computer science. This project gave me the ability to learn many concepts and to deepen my knowledge.

## Features
- Create an account and log in securely
- Search for books, movies, TV shows, and games
- Add titles to your personal shelf
- Rate and review titles
- Follow users and view their Shelf additions
- Like and comment on others reviews
- Create a watchlist

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, React Router, Create React App |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Auth | JSON Web Tokens, bcrypt |
| External data | TMDB, Google Books, GameBrain |
| Testing | [N/A] |
| Deployment | [Coming soon...] |

## Getting started

### Prerequisites

- Node.js 3.1.11
- A MongoDB database (local, or a free MongoDB Atlas cluster)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/anosikekene/Shelf.git
cd Shelf

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Configure environment variables
cd ../server
cp .env.example .env
# Open .env and fill in your own values

# 4. Run the backend (from /server)
npm run dev

# 5. Run the frontend (from /client, in a second terminal)
npm start
```

The app should now be running at `http://localhost:3000`.

### Environment variables

Copy `server/.env.example` to `server/.env` and set:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Connection string for your MongoDB database |
| `JWT_SECRET` | A long random string used to sign tokens |
| `PORT` | Port for the API server (default: 5000) |

Never commit your real `.env` file.

## API reference

Base URL: `/api` (rewrite these to match your actual routes)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Create an account |
| POST | `/` | No | Log in and receive a JWT |
| GET | `/search` | Yes | Search for titles |
| GET | `/profile` | Yes | Get the current user's shelf |
| POST | `/:username/review` | Yes | Add a review to the shelf |

Protected routes expect an `Authorization: Bearer <token>` header.

## Project structure

```
Shelf/
├── client/          # React frontend
├── server/          # Express API
│   ├── routes/
│   ├── models/
│   ├── middleware/  # auth, validation, error handling
│   └── tests/
├── .gitignore
├── README.md
├── user_stories.md
└── task_list.md
```

## Testing

```bash
cd server
npm test
```

**UNDER CONSTRUCTION**

## What I'd improve next

Being honest about limits shows good judgment. Examples:

- Add automated tests and CI
- Build a native iOS client in SwiftUI
- Add rate limiting and stricter input validation
- Improve accessibility
- Improve UI

## What I learned

The hardest thing I learned with this project was the system design. It was something I wasn't taught so I needed to watch some videos and do some research before I was confident in my design. I learned how to build the backend of an application. This was the most fun part all though frustrating at times. I found joy in learning and making everything as cohesive as possible.

## Author

**Kene Anosike**: [LinkedIn](https://linkedin.com/in/keneanosike) | keneanosike@gmail.com
