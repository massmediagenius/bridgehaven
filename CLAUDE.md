## Status
- Flask backend (app.py) is fully built and running on port 5000
- Templates built: landing, home, profile, chat, pay, user_profile, admin_login, admin
- Next.js frontend wired to Flask API via lib/api.ts (signup + donations)
- Data syncs to Google Sheets + local CSV fallback + optional SQLite
- CORS enabled for localhost:3000 and *.vercel.app
- Admin panel at /admin with CSV export
- Set NEXT_PUBLIC_API_URL in .env.local to point frontend at Flask backend
