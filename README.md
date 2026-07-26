# Polling App

[One or two sentences describing what the app does and who it's for.]

> *Example: **QuickPoll** — a web app where anyone can create a poll with multiple options, vote, and watch the results update. Built as a team to practice the full PERN stack end to end.*

## Live Demo

| Environment | URL |
| --- | --- |
| Frontend (Vercel) | [https://...] |
| Backend API (Render) |https://capstone-1-polling-app.onrender.com/polls|

*Both links must load. This is how we confirm the app is deployed.*

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React (Vite), React Router, CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL, Sequelize (ORM) |
| Hosting | Vercel (frontend), Render (backend), Neon (database) |

*List only what you actually used. If you added a library (e.g. a chart library), add it here.*

## Features

- [ ] View all polls on a home page, in order of earliest to latest for better user experience
- [ ] Create a poll with a title, description, and 2+ options, accompanied by option remove buttons
- [ ] Vote on a poll
- [ ] Share poll button that copies URL to clipboard on vote poll page
- [ ] See results — vote count per option – visual representation of votes per option
- [ ] Mobile-friendly UI
- [ ] Screen-reader friendly

## Architecture

[One sentence on how the pieces talk to each other.]

```
React (Vercel)  ──fetch──▶  Express API (Render)  ──Sequelize──▶  PostgreSQL (Neon)
```

*Example: The React frontend calls the Express API over HTTP. Express uses Sequelize to read and write to a PostgreSQL database hosted on Neon.*

## Database Schema

[Paste a screenshot of your dbdiagram.io ERD, or link to it.]

| Table | Key columns | Relationships |
| --- | --- | --- |
| Polls | title, description | has many Options |
| Options | text, pollId (FK) | belongs to Poll, has many Votes |
| Votes | optionId (FK) | belongs to Option |

## API Reference

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/polls` | Return all polls |
| POST | `/polls/create` | Create a poll with its options |
| GET | `/polls/:id/results` | Return one poll with options and vote counts |
| POST | `/polls/:id/vote` | Submit a vote for an option |

*Add any extra routes you built (e.g. `DELETE /polls/:id`).*

## Getting Started (Run It Locally)

### Prerequisites
- Node.js (v18+) and npm installed
- A PostgreSQL database URL (we use [Neon](https://neon.tech))

### 1. Clone the repo
https://github.com/TTP-Capstone-1-Group/Capstone-1-Polling-App/fork
### 2. Start the backend
```bash
cd [backend-folder]
npm install
# create a .env file (see below)
npm run dev
```

Backend `.env`:
```
DATABASE_URL=postgresql://user:password@host/dbname
PORT=3000
```

### 3. Start the frontend
```bash
cd [frontend-folder]
npm install
# create a .env file (see below)
npm run dev
```

Frontend `.env`:
```
VITE_API_URL=http://localhost:3000
```

The app runs at `http://localhost:5173` (Vite's default).

*If you added Auth0, list its env vars here too (e.g. `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `AUTH0_AUDIENCE`).*

## Team & Roles

| Name | Focused on |
| --- | --- |
| Yomara Martinez | backend routes + frontend fetching + database and backend deployment |
| James Dalton | Project scaffolding & dependency setup + Backend database models & integration + Frontend UI/UX refinement + Ensured team sync and steady project progress|
| Angel V | [e.g. frontend pages]  (please add yours)|

*Roles overlapping is normal — just say who focused where.*

## Design Decisions

Write 2–3 short "we did X because Y" lines. Plain English.

- [Example: We count votes by loading each option with its votes and using `.length`, because it was the simplest thing that worked.]
- [Example: We used React Router so moving between pages doesn't reload the browser.]
- [Your decision here.]

Design file (Figma / wireframe / sketch): [link or screenshot — a photo of a paper sketch is fine]
<img width="210" height="280" alt="IMG_0709jpg" src="https://github.com/user-attachments/assets/2c60405a-2803-41a2-8488-6ae7b5480e67" />

## Challenges & What We Learned

Answer in a sentence or two each. Honesty helps you more than polish.

- **Hardest bug or blocker:** [what was it, and how did you get past it?]
- **What we'd do differently:** [one thing]
- **One thing we learned about working as a team:** [one thing]
