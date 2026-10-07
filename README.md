# Tukatech Internship Project

A full-stack web application built during my internship at Tukatech — consisting of a modern redesign of tukatech.com and a TUKAcloud SaaS platform for fashion teams.

## 🔗 Live Demo
- Frontend: [Coming soon]
- Backend API: [Coming soon]

## 🛠 Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Zustand (state management)
- Recharts (analytics)
- React Router v6

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (file storage)
- Gemini AI (chat assistant)

## ✨ Features

### Marketing Site
- Full Tukatech.com redesign with 20+ pages
- Software product pages (TUKAcad, TUKA3D, TUKAcloud, SMARTmark, TUKAstudio, TUKA APM)
- Hardware pages (TUKAjet, TUKAspread, TUKAcut, TUKAcut Laser, TUKAcut Rotary, TUKA INA)
- Smart Factories, About, Contact, Resources, Pricing, Testimonials
- Newsletter signup
- AI Chat Assistant (Gemini powered)

### TUKAcloud App
- Company workspace system with invite codes
- JWT authentication with role-based access
- File upload, download, delete (Cloudinary)
- Collections & file search
- Team management with real members
- Activity feed
- Storage analytics with charts
- Comments on files
- Password reset
- Drag & drop file upload

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Gemini API key

### Installation

1. Clone the repo
\`\`\`bash
git clone https://github.com/ParamChawla/Tukatech-Internship-Project.git
cd Tukatech-Internship-Project
\`\`\`

2. Setup backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
\`\`\`

3. Setup frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

4. Open `http://localhost:5173`

## 📁 Project Structure

\`\`\`
tukatech/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── store/
        └── lib/
\`\`\`

## 👨‍💻 Built By

**Param Chawla** — B.Tech ECE, KIIT University  
[LinkedIn](https://linkedin.com/in/chawla-param) · [GitHub](https://github.com/ParamChawla)
