# 🚀 ConTracked

**Your all-in-one platform to track coding contests, analyze performance, and showcase your competitive programming journey!**

ConTracked is a full-stack web app that aggregates contests from multiple platforms and gives users a beautiful dashboard to manage contests, view analytics, and upload or find solutions.

---

## ✨ Features

- 🗓️ **Track Coding Contests**: Stay up to date with upcoming, ongoing, and past contests.
- ⚙️ **Advanced Filtering**: Filter contests by platform, bookmarked status, and solution availability.
- 📌 **Bookmark Contests**: Save contests for quick access on your dashboard.
- 🧠 **Upload & View Solutions** *(Admin Only)*: Easily manage solution links and explanations.
- 📊 **Coding Profile Dashboard**: View and compare your stats across Codeforces, CodeChef & LeetCode.
- 🌙 **Light & Dark Mode**: Smooth UI that adapts to your vibe.

---

## 🖼️ Screenshots

### 🏠 Landing Page

![Landing Page](https://github.com/user-attachments/assets/fc77b479-15e4-421b-8775-1a34430e4242)

> Clean homepage showing a snapshot of contests from top platforms.

---

### 🔍 Contest Listings with Filters

![Contest Listings](https://github.com/user-attachments/assets/71f42f2e-add2-4df9-acf2-4d1c7f4bc77a)

> Browse contests with toggles for bookmarks, platforms, and solution status.

---

### 👤 User Dashboard & Stats

![User Dashboard](https://github.com/user-attachments/assets/3d1d3d60-ba53-45cb-9f17-4ff1fb361cff)

> Personalized dashboard showing bookmarked contests, rating history (Chart.js), and problem solve stats (Doughnut chart).

---

### 📅 Detailed Contest View

![Contest Details](https://github.com/user-attachments/assets/8fd0d1a1-9e80-4743-b0b0-86d1fac090b8)

> Each contest has a dedicated view with time info, direct links, and action options.

---

## 🛠️ Tech Stack

### 🧩 Frontend
- ⚡ [Next.js](https://nextjs.org/)
- 🌀 TypeScript
- 🎨 Tailwind CSS

### ⚙️ Backend
- 🚀 Node.js & Express
- 🛡️ TypeScript
- 🧬 Prisma ORM
- 🗄️ PostgreSQL

### 🔐 Authentication
- 🔑 Google Sign-In via [NextAuth.js](https://next-auth.js.org/)

---

## ▶️ Getting Started

```bash
git clone https://github.com/yourusername/contracked.git
cd contracked

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Set environment variables and run database migrations
npx prisma migrate dev

# Start development
npm run dev
