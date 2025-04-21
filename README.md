# 🚀 ConTracked

**Your all-in-one platform to track coding contests, analyze performance, and showcase your competitive programming journey!**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-green?style=for-the-badge&logo=vercel)](https://contracked.vercel.app)

ConTracked is a full-stack web app that aggregates contests from multiple platforms and gives users a beautiful dashboard to manage contests, view analytics, and upload or find solutions.

---

## ✨ Features

- 🗓️ **Track Coding Contests**: Stay up to date with upcoming, ongoing, and past contests.
- ⚙️ **Advanced Filtering**: Filter contests by platform, bookmarked status, and solution availability.
- 📌 **Bookmark Contests**: Save contests for quick access # ConTracked

![ConTracked Logo](https://github.com/yourusername/contracked/raw/main/public/images/logo.png)

> A unified platform for competitive programmers to track contests, analyze performance, and improve coding skills

## 🌐 Live Demo

**[https://contracked.vercel.app](https://contracked.vercel.app)**

Experience the full functionality of ConTracked by visiting our live demo. Connect your competitive programming accounts, track upcoming contests, and analyze your performance across platforms.

## 📖 About

ConTracked is a comprehensive web application designed for competitive programmers who participate in contests across multiple platforms like Codeforces, CodeChef, and LeetCode. The application provides a unified interface to:

- Track upcoming and past coding contests
- Monitor performance across different platforms
- View detailed analytics of solved problems and rating progression
- Access contest solutions and coding resources
- Connect multiple competitive programming accounts in one place

Built with modern web technologies, ConTracked offers a seamless user experience with responsive design and dark/light mode support.

## 🚀 Features

### Contest Tracking
- **Comprehensive Contest Page**: Monitor upcoming contests with real-time countdown timers
- **Advanced Filtering**: Filter past contests by time period (week/month/year)
- **Bookmarking System**: Toggle bookmarks on contests for quick access
- **Solution Availability Filter**: Filter contests that have solutions available

### User Authentication
- **Role-based Access**: Implemented using NextAuth with Google provider
- **Admin Privileges**: Special access for uploading and managing contest solutions
- **Secure Sessions**: Protected routes and authenticated API endpoints

### Profile Dashboard
- **Platform Linking**: Connect accounts from Codeforces, CodeChef, and LeetCode
- **Cross-Platform Analytics**: Unified view of performance across all linked platforms
- **Data Visualization**: Interactive charts showing progress and statistics
- **Rating History**: Detailed graph of rating changes with contest participation markers

### Analytics System
- **Doughnut Chart**: Visual representation of solved problems distribution across platforms
- **Rating History Graph**: Interactive timeline with tooltips showing contest participation
- **Profile Statistics**: Detailed metrics displaying max rating, current rating, problems solved, and contests participated
- **Platform Selector**: Filter statistics by specific coding platform

### User Interface
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Dark/Light Mode Toggle**: Switch between themes based on preference
- **Modern UI Components**: Built with Tailwind CSS for consistent styling
- **Intuitive Navigation**: Easy access to all major features

## 📸 Screenshots

### Landing Page
![Landing Page](./screenshots/landing-page.png)
*Master Competitive Programming - Track contests, explore solutions, code smarter*

### Profile Dashboard (Light Mode)
![Profile Dashboard Light](./screenshots/profile-dashboard-light.png)
*Profile dashboard showing platform connections, rating progress, and solved problems visualization*

### Profile Dashboard (Dark Mode)
![Profile Dashboard Dark](./screenshots/profile-dashboard-dark.png)
*Dark mode version of the profile dashboard with the same powerful analytics*

### Contests Page
![Contests Page](./screenshots/contests-page.png)
*View upcoming contests with detailed information about duration and start times*

### Past Contests
![Past Contests](./screenshots/past-contests.png)
*Explore past contests with bookmarking and filtering options*

## 🛠️ Technical Implementation

### Frontend
- **Next.js**: Server-side rendering and static generation for optimal performance
- **TypeScript**: Type-safe code to prevent runtime errors and improve developer experience
- **Tailwind CSS**: Utility-first CSS framework for responsive and customizable design
- **Chart.js**: Data visualization library for interactive analytics charts
- **NextAuth.js**: Authentication solution integrated with Google provider

### Backend
- **Node.js**: JavaScript runtime for the server environment
- **Express**: Web framework for handling API requests
- **RESTful API**: Well-structured endpoints for efficient data flow between frontend and backend
- **Cross-Platform Integration**: API connections to Codeforces, CodeChef, and LeetCode

### Database
- **PostgreSQL**: Robust relational database for data persistence
- **Prisma ORM**: Type-safe database client for simplified database operations
- **Data Models**: Structured schema for users, contests, solutions, and platform connections

### Deployment
- **Vercel**: Frontend deployment with CI/CD integration
- **Render**: Backend service hosting
- **Database Hosting**: PostgreSQL instance for production data

## 🔮 Upcoming Features

- **Auto-fetch Solutions**: Automatically fetch solutions from YouTube and other sources
- **Coding Discussions**: Forum-like section for discussing contest problems and solutions
- **AI Profile Analyzer**: AI-powered insights and recommendations based on your profile statistics
- **Integrated Code Editor**: Practice coding with an integrated editor environment

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL
- Google OAuth credentials (for authentication)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/contracked.git
   cd contracked
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration including:
   # - Database connection string
   # - NextAuth secret
   # - Google OAuth credentials
   # - API endpoints
   ```

4. Set up the database
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- [Your Name](https://github.com/yourusername)

## 🙏 Acknowledgements

- The competitive programming community
- APIs provided by Codeforces, CodeChef, and LeetCode
- [Chart.js](https://www.chartjs.org/) for the visualization components
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Next.js](https://nextjs.org/) for the React framework
- [Prisma](https://www.prisma.io/) for the database ORMon your dashboard.
- 🧠 **Upload & View Solutions** *(Admin Only)*: Easily manage solution links and explanations.
- 📊 **Coding Profile Dashboard**: View and compare your stats across Codeforces, CodeChef & LeetCode.
- 🌙 **Light & Dark Mode**: Smooth UI that adapts to your vibe.

---

## 🖼️ Screenshots

### 🏠 Landing Page

![Landing Page](https://github.com/user-attachments/assets/fc77b479-15e4-421b-8775-1a34430e4242)

> Clean homepage showing a snapshot of contests from top platforms.

---

### 📅 Detailed Contest View

![Contest Details](https://github.com/user-attachments/assets/71f42f2e-add2-4df9-acf2-4d1c7f4bc77a)

> Each contest has a dedicated view with time info, direct links, and action options.

---

### 👤 User Dashboard & Stats

![User Dashboard](https://github.com/user-attachments/assets/3d1d3d60-ba53-45cb-9f17-4ff1fb361cff)

> Personalized dashboard showing bookmarked contests, rating history (Chart.js), and problem solve stats (Doughnut chart).

---

### 🔍 Contest Listings with Filters

![Contest Listings](https://github.com/user-attachments/assets/8fd0d1a1-9e80-4743-b0b0-86d1fac090b8)

> Browse contests with toggles for bookmarks, platforms, and solution status.

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
