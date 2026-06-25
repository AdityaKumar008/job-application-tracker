# JobTracker

A full-stack web application to track job and internship applications in one place — monitor status, manage notes, and stay organized throughout your job search.
🌐 **[View Live Demo](https://adityakumar008.github.io/job-application-tracker/)**

> **Status:** Frontend complete. Backend (Node.js, Express.js, MongoDB, JWT) is planned and in progress.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Getting Started](#getting-started)
- [Theming](#theming)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Overview

JobTracker is a personal dashboard for managing job and internship applications. Instead of relying on spreadsheets, users can log each application with its company, role, status, and notes, then track progress through a clean, visual dashboard with stats and filters.

This repository currently contains the **complete frontend** — built with plain HTML, CSS, and JavaScript (no frameworks) — designed to be easily connected to a backend API.

---

## Features

### Implemented (Frontend)

- **Landing Page** — Hero section, feature highlights, "How It Works", and a call-to-action banner
- **Authentication UI** — Combined Login / Signup card with:
  - Floating-label inputs
  - Password show/hide toggle
  - Inline, field-level validation (required fields, email format, password match)
  - Hash-based routing (`auth.html#login`, `auth.html#signup`)
- **Dashboard**
  - Collapsible sidebar navigation with user profile block
  - Live greeting and current date
  - Stats overview (Total Applications, In Interview, Offers, Rejected)
  - Search and status-based filtering
  - Card-based application list with status badges
  - Empty state when no applications match a filter/search
  - Edit and Delete actions on each application card
- **Add / Edit Application Form**
  - Shared form for adding new applications and editing existing ones
  - Pre-fills data when editing (via temporary local storage handoff)
  - Inline validation on required fields
- **Settings**
  - Profile information section (name, read-only email, target role)
  - Change password form with match validation
  - Light/Dark theme switch (persisted via `localStorage`)
  - Danger zone for account deletion
- **Light / Dark Theme** — Site-wide theme toggle using CSS variables, applied instantly on load with no flash of the wrong theme
- **Mobile Responsive** — Off-canvas sidebar drawer with backdrop on small screens
- **Custom 404 Page**
- **Custom Favicon**

### Planned (Backend)

- User authentication (signup, login, logout) using JWT
- Persistent storage of applications in MongoDB
- Real CRUD operations for applications (replacing current static/demo data)
- Real profile updates, password changes, and account deletion
- Session-aware data across the sidebar, dashboard, and settings

---

## Tech Stack

**Frontend (Current)**
- HTML5
- CSS3 (CSS Custom Properties for theming, Flexbox/Grid layouts)
- Vanilla JavaScript (ES6+)
- [Font Awesome](https://fontawesome.com/) (icons, via CDN)
- [DiceBear Avatars](https://www.dicebear.com/) (placeholder profile pictures, via API)

**Backend (Planned)**
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

---

## Project Structure

```
JobTracker/
│
├── index.html        # Landing page
├── auth.html         # Login / Signup page
├── dashboard.html    # Dashboard + Settings (toggled view)
├── form.html         # Add / Edit Application page
├── 404.html          # Custom error page
│
├── style.css         # Single global stylesheet (organized into numbered sections)
└── script.js         # Single global script file (organized into numbered sections)
```

A **single CSS file** and **single JS file** are intentionally used for the whole project, with clearly numbered, commented sections per page/feature for easy navigation and maintenance.

---

## Pages

| Page | Description |
|---|---|
| `index.html` | Public landing page introducing the app |
| `auth.html` | Combined login and signup interface |
| `dashboard.html` | Main authenticated view — applications, stats, and settings |
| `form.html` | Add or edit a job/internship application |
| `404.html` | Shown for any non-existent route |

---

## Getting Started

Since this is currently a static frontend with no build step, you can run it directly:

1. Clone the repository
```bash
   git clone https://github.com/AdityaKumar008/job-application-tracker.git
   cd job-application-tracker
```
2. Open `index.html` in your browser, or serve the folder using a local development server (recommended), for example:
```bash
   npx serve .
```
3. Navigate through the app starting from the landing page.

> Note: Since there is no backend yet, authentication, data persistence, and settings updates are not functional — these are visual/UI complete and ready to be wired up once the API is built.

---

## Theming

JobTracker supports Light and Dark themes out of the box:

- All colors are defined as CSS custom properties in `:root` (light theme defaults)
- Dark theme overrides are defined under `[data-theme="dark"]`
- The active theme is stored in `localStorage` and applied immediately on page load (before render) to avoid a flash of the wrong theme
- Users can toggle the theme from **Settings → Appearance**

---

## Roadmap

- [ ] Build REST API with Express.js
- [ ] Set up MongoDB schema for Users and Applications
- [ ] Implement JWT-based authentication (signup, login, logout)
- [ ] Connect dashboard to real application data (replace static cards)
- [ ] Wire up Add/Edit form to real create/update endpoints
- [ ] Wire up Delete to a real delete endpoint
- [ ] Connect Settings (profile update, password change, account deletion) to the backend
- [ ] Sync profile name/photo updates live across sidebar and dashboard greeting
- [ ] Add `createdAt` / `updatedAt` timestamps to application records
- [ ] Deploy frontend and backend

---

## Author

**Aditya Kumar**  
LinkedIn: [linkedin.com/in/aditya-kumar-b7920b328](https://www.linkedin.com/in/aditya-kumar-b7920b328)