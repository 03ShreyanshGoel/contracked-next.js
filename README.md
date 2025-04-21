# <img src="https://github.com/user-attachments/assets/067828ba-2977-4d5b-99c6-cca4a3fad048" width="64" alt="Contracked Logo" /> ConTracked

> Your all-in-one platform to track coding contests, analyze performance, and showcase your competitive programming journey!

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=vercel)](https://contracked.vercel.app)

ConTracked is a full-stack web app that aggregates contests from multiple platforms and gives users a beautiful dashboard to manage contests, view analytics, and upload or find solutions.

---

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
> *Master Competitive Programming - Track contests, explore solutions, code smarter*

![Landing Page](https://github.com/user-attachments/assets/139cd345-5840-4d39-bebc-b8ca5a31052c)

### Profile Dashboard (Light Mode)
> *Profile dashboard showing platform connections, rating progress, and solved problems visualization*

![Profile Dashboard Light](https://github.com/user-attachments/assets/d316b1b2-8b02-46e9-9a8c-cb226042136a)



### Profile Dashboard (Dark Mode)
> *Dark mode version of the profile dashboard with the same powerful analytics*

![Profile Dashboard Dark](https://github.com/user-attachments/assets/381e1981-8e9e-45b5-8479-231bf48e016d)
<img src="https://github.com/user-attachments/assets/381e1981-8e9e-45b5-8479-231bf48e016d" alt="Profile Dashboard Dark" width="700px"/>

### Contests Page
> *View upcoming contests with detailed information about duration and start times*

![Contests Page](https://github.com/user-attachments/assets/6ea3ec17-fee3-497a-9b50-d67ea7e907da)

### Past Contests
> *Explore past contests with bookmarking and filtering options*

![Past Contests](https://github.com/user-attachments/assets/5bcddf8f-7802-448e-aa12-b1e16cedf5cc)

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

- [Shreyansh Goel](https://github.com/03ShreyanshGoel)

## 🙏 Acknowledgements

- The competitive programming community
- APIs provided by Codeforces, CodeChef, and LeetCode
- [Chart.js](https://www.chartjs.org/) for the visualization components
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Next.js](https://nextjs.org/) for the React framework
- [Prisma](https://www.prisma.io/) for the database ORM
