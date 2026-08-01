# MyWallet — Personal Finance Management Platform

Full-stack MERN app: React.js, Node.js, Express.js, MongoDB, JWT auth, Recharts, deployable on Render.

## Features
- JWT authentication (email/password + Google OAuth), forgot/reset password via OTP email
- Income & expense tracking with category-wise transactions
- Budget management with per-category monthly limits and progress tracking
- Savings goals with contribution tracking
- Interactive dashboards (Recharts: pie chart category breakdown, income/expense trend line)
- AI-powered financial insights via Google Gemini
- Financial reports with CSV export, multi-currency conversion
- Search & filters on transactions (by note, type, category, date range, amount range)
- Dark mode
- Responsive UI

## Project structure
```
mywallet/
├── backend/
│   ├── configs/        # db, token, mail, cloudinary, gemini
│   ├── controllers/     # auth, user, transaction, budget, goal, report, ai
│   ├── middlewares/     # isAuth, multer
│   ├── models/          # User, Category, Transaction, Budget, Goal
│   ├── routes/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── customHooks/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/axiosInstance.js
│   │   ├── app.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# fill in .env with your own values (see below)
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
# fill in .env with your own values
npm run dev
```

## Environment variables to fill in yourself

**backend/.env**
| Variable | Where to get it |
|---|---|
| `MONGODB_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | Any long random string |
| `FRONTEND_URL` | Your deployed frontend URL (or `http://localhost:5173` for dev) |
| `EMAIL_USER` / `EMAIL_PASS` | A Gmail address + [App Password](https://myaccount.google.com/apppasswords) |
| `CLOUDINARY_*` | [cloudinary.com](https://cloudinary.com) dashboard (optional, for profile pics) |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → OAuth 2.0 Client ID |
| `EXCHANGE_RATE_API_KEY` | [exchangerate-api.com](https://www.exchangerate-api.com) (free tier, for currency conversion) |

**frontend/.env**
| Variable | Value |
|---|---|
| `VITE_API_URL` | Your backend API base URL, e.g. `http://localhost:8000/api` |
| `VITE_GOOGLE_CLIENT_ID` | Same Google Client ID as above |

## Deploying on Render
1. Push this repo to GitHub.
2. Create a **Web Service** for `backend/` (Node environment, build command `npm install`, start command `npm start`), add all backend env vars in Render's dashboard.
3. Create a **Static Site** for `frontend/` (build command `npm install && npm run build`, publish directory `dist`), add the frontend env vars.
4. Update `FRONTEND_URL` in the backend service and `VITE_API_URL` in the frontend build to point to the deployed URLs.

## Notes
- All backend logic (auth, MongoDB models, API routes, AI integration via Gemini, OAuth, email, currency conversion) is fully implemented — you only need to supply your own credentials in `.env`.
- The AI insights feature calls Google Gemini (`gemini-1.5-flash`) with your transaction history from the last 30/90 days.
- Google OAuth here uses the implicit `useGoogleLogin` flow (frontend gets the profile via Google's userinfo endpoint, then sends it to the backend) — simplest to set up without a backend token-verification library. For production you may want to switch to ID-token verification with `google-auth-library` for stronger security.
