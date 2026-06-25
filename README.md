# JobTracker

A full-stack web application to track job and internship applications in one place — monitor status, manage notes, and stay organized throughout your job search.

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