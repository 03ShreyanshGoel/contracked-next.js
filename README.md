# <img src="https://github.com/user-attachments/assets/067828ba-2977-4d5b-99c6-cca4a3fad048" width="57" alt="Contracked Logo" />ConTracked

> Your all-in-one platform to track coding contests, analyze performance, and showcase your competitive programming journey!

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=vercel)](https://contracked.vercel.app)

ConTracked is a full-stack web app that aggregates contests from multiple platforms and gives users a beautiful dashboard to manage contests, view analytics, and upload or find solutions.

---

## ✨ Features

### 🗓️ Contest Tracking
- 📅 **Comprehensive Contest Page**: Monitor upcoming contests with real-time countdowns  
- 🔎 **Advanced Filtering**: Filter past contests by week/month/year  
- 🔖 **Bookmarking System**: Quickly save and revisit contests  
- ✅ **Solution Filter**: Easily find contests with available solutions  

### 🔐 User Authentication
- 🧑‍💻 **Role-based Access**: Google OAuth login via NextAuth  
- 🛡️ **Admin Privileges**: Upload/manage contest solutions  
- 🔒 **Secure Sessions**: Authenticated API access & route protection  

### 👤 Profile Dashboard
- 🔗 **Platform Linking**: Connect Codeforces, CodeChef & LeetCode  
- 📊 **Unified Analytics**: Cross-platform stats in one place  
- 📈 **Rating History**: Graph showing changes over time  
- 🧩 **Interactive Charts**: Visuals for progress, problems, and more  

### 📈 Analytics System
- 🍩 **Doughnut Chart**: Platform-wise problem-solving distribution  
- 🕓 **Rating History Graph**: Timeline view with contest highlights  
- 🧮 **Detailed Stats**: Max rating, solved count, contests participated  
- 🎯 **Platform Selector**: View data platform-wise  

### 🖥️ User Interface
- 📱 **Responsive Design**: Works smoothly on mobile & desktop  
- 🌗 **Dark/Light Mode**: Theme toggle built-in  
- 🧩 **Tailwind UI Components**: Modern, sleek design system  
- 🧭 **Intuitive Navigation**: Simple, user-first layout  

---

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

### Contests Page
> *View upcoming contests with detailed information about duration and start times*

![Contests Page](https://github.com/user-attachments/assets/6ea3ec17-fee3-497a-9b50-d67ea7e907da)

### Past Contests
> *Explore past contests with bookmarking and filtering options*

![Past Contests](https://github.com/user-attachments/assets/5bcddf8f-7802-448e-aa12-b1e16cedf5cc)

## 🛠️ Technical Implementation

### 🧑‍🎨 Frontend
- ⚡ **Next.js** – Server-side rendering & static site generation  
- 🔡 **TypeScript** – Type-safe code for better reliability  
- 🎨 **Tailwind CSS** – Modern utility-first styling  
- 📊 **Chart.js** – Stunning charts & graphs  
- 🔐 **NextAuth.js** – Seamless auth with Google  

### 🧑‍💻 Backend
- 🟢 **Node.js** – High-performance server runtime  
- 🔧 **Express** – Simplified API handling  
- 🔗 **RESTful APIs** – Efficient frontend-backend flow  
- 🔌 **Platform APIs** – Integrated with Codeforces, CodeChef, LeetCode  

### 🗃️ Database
- 🐘 **PostgreSQL** – Reliable SQL database  
- 🧬 **Prisma ORM** – Type-safe DB access & migrations  
- 📂 **Structured Models** – Users, contests, solutions & connections  

### 🚀 Deployment
- ▲ **Vercel** – Frontend hosting with CI/CD  
- 🧾 **Render** – Backend deployment  
- 🗄️ **PostgreSQL Hosting** – Managed production DB  

---

## 🔮 Upcoming Features

- 🤖 **Auto-fetch Solutions** from YouTube and other sources  
- 💬 **Coding Discussions** for problem-solving conversations  
- 🧠 **AI Profile Analyzer** to recommend improvements  
- 🧑‍💻 **Integrated Code Editor** for in-browser practice  

---

## 🧑‍🏫 Getting Started

### ✅ Prerequisites
- Node.js 16+
- PostgreSQL
- Google OAuth credentials

### ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/contracked.git
   cd contracked
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your DB string, Google OAuth, NextAuth secret, API URLs
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Visit:** [http://localhost:3000](http://localhost:3000)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file.

---

## 👨‍💻 Author

- [Shreyansh Goel](https://github.com/03ShreyanshGoel)

---

## 🙏 Acknowledgements

- ❤️ The competitive programming community  
- 📡 APIs from Codeforces, CodeChef, LeetCode  
- 📊 [Chart.js](https://www.chartjs.org/)  
- 🎨 [Tailwind CSS](https://tailwindcss.com/)  
- ⚛️ [Next.js](https://nextjs.org/)  
- 🧬 [Prisma](https://www.prisma.io/)  
