# Tukatech digital workflow platform

A full-stack internship project that extends the Tukatech marketing site with a connected product-development and manufacturing workspace.

## What is included

- Existing public site: product, hardware, resource, pricing, contact, newsletter, and AI-assistant pages.
- TUKAcloud: account authentication, team workspaces, Cloudinary file storage, comments, collections, activity feed and analytics.
- New style workflow: style records, seasons, brands, tags, kanban status, search/filtering, review requests and decisions, and notifications.
- File enhancements: workspace-safe file access, tags, style association, linked versions, type/size upload validation.
- Connected operations: fabric-savings estimator, solution finder, and a live-style MES factory dashboard.
- Demo workspace seeder with four styles and three production orders for presentations.

## Local setup

1. Copy `backend/.env.example` to `backend/.env` and supply MongoDB, Cloudinary, JWT and Gemini credentials.
2. Copy `frontend/.env.example` to `frontend/.env` when the API is not on the default local address.
3. Install dependencies in each folder: `npm install`.
4. Start the API: `cd backend; npm run dev`.
5. Start the client: `cd frontend; npm run dev`.

## Demo flow

Register a workspace owner, open **Style Workflow** (`/styles`), and select **Load demo workspace**. Review the kanban board, visit **Factory MES** (`/factory-dashboard`), and use the public **Solution Finder** and **Fabric Savings** calculator.

## Validation

`frontend`: `npm run lint` and `npm run build`.

`backend`: `node --check server.js` (and the same command can be used on individual source files).

## API highlights

- `GET/POST /api/styles`, `PUT /api/styles/:id`
- `POST /api/styles/:id/reviews`, `POST /api/styles/:id/reviews/decision`
- `GET /api/notifications`
- `GET/POST/PUT /api/production-orders`
- `POST /api/demo/seed`
