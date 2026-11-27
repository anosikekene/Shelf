# Shelf

> A full-stack web app for tracking, rating, and reviewing the books, movies, TV shows, and games you love.

**[Live demo](https://your-deployed-link-here)** | [API docs](#api-reference) | [Architecture notes](ARCHITECTURE.md)

<!-- Add a screenshot or GIF here. This is the single most useful thing in the README. -->
![Shelf screenshot](docs/screenshot.png)

[![Tests](https://github.com/anosikekene/Shelf/actions/workflows/ci.yml/badge.svg)](https://github.com/anosikekene/Shelf/actions)

<!-- The badge above only works once you add a GitHub Actions workflow named ci.yml. Remove it until then. -->

## Why I built this

One or two sentences in your own words. Example structure: the problem you wanted to solve (for instance, "I was tracking what I watched and read across several apps"), and what you wanted to learn by building it (for instance, "designing a REST API and authentication from scratch").

## Features

- Create an account and log in securely (JWT authentication)
- Search for books, movies, TV shows, and games
- Add titles to your personal shelf
- Rate and review titles
- [Add or remove items so this list matches what the app really does]

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React, [router/state libraries you use] |
| Backend | Node.js, Express |
| Database | MongoDB ([Mongoose / native driver]) |
| Auth | JSON Web Tokens, [bcrypt for password hashing] |
| External data | [Name of the catalog API you search, if any] |
| Testing | [Jest, Supertest, Playwright, once you add them] |
| Deployment | [Render / Railway / Vercel] |

## Getting started

### Prerequisites

- Node.js [version]
- A MongoDB database (local, or a free MongoDB Atlas cluster)
- [API key for the external catalog, if needed]

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
| `[EXTERNAL_API_KEY]` | [Only if you use an external API] |

Never commit your real `.env` file.

## API reference

Base URL: `/api` (rewrite these to match your actual routes)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Create an account |
| POST | `/auth/login` | No | Log in and receive a JWT |
| GET | `/titles/search?q=` | Yes | Search for titles |
| GET | `/shelf` | Yes | Get the current user's shelf |
| POST | `/shelf` | Yes | Add a title to the shelf |
| PUT | `/titles/:id/rating` | Yes | Rate a title |
| POST | `/titles/:id/reviews` | Yes | Add a review |

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
├── user_stories.md
└── task_list.md
```

(Adjust this to match your real folders.)

## Testing

```bash
cd server
npm test
```

Describe what is covered (for example: auth flow, search, rating validation, error cases). Delete this section until you have tests, then add the real numbers.

## Design decisions

Short notes on choices you made and why. A few examples of the format:

- **Why MongoDB:** [your reason, and the tradeoff]
- **How authentication works:** [JWT lifetime, where the token is stored, how routes are protected]
- **Where the 10,000+ titles come from:** [your own database or an external API, and how search works]

## What I'd improve next

Being honest about limits shows good judgment. Examples:

- Add automated tests and CI
- Build a native iOS client in SwiftUI
- Add rate limiting and stricter input validation
- Improve accessibility

## What I learned

Two or three sentences about the hardest bug you fixed or the biggest thing you learned, written in your own words.

## Author

**Kene Anosike**: [LinkedIn](https://linkedin.com/in/keneanosike) | keneanosike@gmail.com
