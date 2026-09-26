Store Rating Platform

Full-stack app built for the Roxiler Systems Full Stack Developer - Trainee coding challenge. Users rate registered stores (1-5), store owners track their store's reputation, and admins manage the platform — new admin/store-owner accounts need approval before they can log in.

Live Demo
- Frontend: https://roxiler-systems-fullstack-challenge.vercel.app
- Backend: https://roxiler-systems-fullstack-challenge.onrender.com/api

> Backend is on Render's free tier — first request after inactivity may take 30-60s to wake up.

Tech Stack
Express.js, MySQL, JWT (httpOnly cookies) — React (Vite), Bootstrap 5 — deployed on Render + Vercel, DB on Aiven.

Structure
StoreRatingPlatform-backend/  Express + MySQL API
StoreRatingPlatform-frontend/ — React + Vite client

See each folder's own README for setup steps.

Roles
Admin — dashboard stats, add/approve users & stores, edit stores, assign owners
Normal User — browse/search stores, submit or update a 1-5 rating
Store Owner — see their store's average rating and who rated it (requires approval)

First Admin Account
Admin/store-owner registrations need approval, so the very first admin has to be approved manually once:
sql
UPDATE users SET status = true WHERE email = 'hariantarkar2003@gmail.com';

Every admin registered after that gets approved through the in-app Pending Approvals screen — no more SQL needed.
