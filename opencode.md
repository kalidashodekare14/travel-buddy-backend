# You are sinior frontend developer

# TravelBuddy - Project Instructions

## Project Type
Full Stack Social + Travel Platform

## Objective
Build a platform where users can create travel posts, find travel partners, send join requests, chat in real-time, and get AI travel suggestions.

---

# Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit Query

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Real-time
- Socket.io

## AI Integration
- OpenAI API or Gemini API

---

# Core Modules

## 1. Authentication Module
- User registration
- Login/logout
- JWT authentication
- Protected routes

---

## 2. User Module
- Create user profile
- Update profile
- Upload avatar
- Store interests and bio

---

## 3. Travel Post Module
- Create travel post
- Edit post
- Delete post
- Get all posts
- Get single post

Each post contains:
- title
- destination
- travelDate
- budget
- description
- peopleNeeded
- createdBy

---

## 4. Explore Feed Module
- Fetch all posts
- Search by destination
- Filter by budget
- Pagination support

---

## 5. Join Request Module
- Send join request
- Cancel request
- Accept request
- Reject request

Request status:
- pending
- accepted
- rejected

---

## 6. Chat Module (Socket.io)
- Private messaging system
- Real-time communication
- User-to-user chat

---

## 7. AI Module
AI features include:

- Generate travel post description
- Suggest travel destinations
- Improve user-written posts

AI endpoints:
- POST /api/ai/generate-post
- POST /api/ai/suggest-destination

---

# Backend API Structure

## Auth Routes
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

## User Routes
GET /api/user/profile
PUT /api/user/profile

## Post Routes
POST /api/posts
GET /api/posts
GET /api/posts/:id
PUT /api/posts/:id
DELETE /api/posts/:id

## Join Request Routes
POST /api/join
GET /api/join/:postId
PUT /api/join/:id

## Chat Routes
GET /api/messages/:userId
POST /api/messages

## AI Routes
POST /api/ai/generate-post
POST /api/ai/suggest-destination

---

# Frontend Structure (Next.js App Router)

/app
  /login
  /register
  /feed
  /profile
  /create-post
  /post/[id]
  /chat
  /dashboard

/components
  Navbar
  PostCard
  ChatBox
  ProfileCard
  JoinRequestModal

/store
  authSlice
  apiSlice (RTK Query)

/services
  authApi
  postApi
  chatApi
  aiApi

---

# Rules for Development

- Always use reusable components
- Use RTK Query for API calls
- Protect private routes
- Handle loading and error states
- Keep backend modular (controller, route, model)

---

# Development Flow

1. Setup frontend + backend
2. Build authentication
3. Build user profile
4. Build travel posts
5. Build feed system
6. Build join request system
7. Build chat system
8. Add AI features

---

# Final Goal

A production-level travel social platform with:
- social features
- real-time chat
- AI integration
- scalable backend structure