# GeekyZindagi 🧠🚀

GeekyZindagi is a multidisciplinary community platform designed for curious minds to learn, build, and explore life's various dimensions. Originally a tech-focused hub, it has evolved into a diverse ecosystem spanning Neuroscience, Startups, Art, Wellness, and more.

## ✨ Features

- **Multidomain Idea Submission**: Share and explore ideas across diverse categories like AI, Neuroscience, EEG, Psychology, and Business Strategy.
- **Role-Based Access Control (RBAC)**: Secure platform with distinct roles:
    - **Explorers**: Submit ideas and join the community.
    - **Builders (Admins)**: Manage technical facets and events.
    - **Elders (Super Admins)**: Provide mentorship and oversight.
- **Request Tracking**: Real-time data tracking for **Event Requests** and **Mentorship Opportunities**.
- **Admin Dashboard**: Comprehensive management interface for reviewing submissions, managing users, and inviting new members.
- **Secure Authentication**: NextAuth v5 implementation with MFA support and email-based password resets.
- **Automated Communication**: Professional email notifications powered by Brevo.
- **The Full Spectrum of Life**: Support for diverse domains including Quantum Computing, Consciousness, Gardening, Sports, and Culinary Arts.
- **Advanced Identity**: A centralized brand system with a dynamic animated logo and an interactive typewriter hero section that adapts to the community's evolving interests.
- **Live GitHub Metrics**: Projects page synchronized with real GitHub stars and forks via a high-performance cached API layer.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org)
- **Database**: [Prisma](https://www.prisma.io) with [MongoDB](https://www.mongodb.com)
- **Auth**: [Next-Auth v5](https://authjs.dev)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Email**: [Brevo (SMTP)](https://www.brevo.com)
- **Validation**: [Zod](https://zod.dev)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (Atlas or local)
- Brevo (formerly Sendinblue) account for emails

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/geekyzindagi/core.git
   cd core
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and configure following variables:
   ```env
   DATABASE_URL="your_mongodb_url"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   
   SMTP_HOST="smtp-relay.brevo.com"
   SMTP_PORT=587
   SMTP_USER="your_brevo_user"
   SMTP_PASSWORD="your_brevo_password"
   FROM_EMAIL="noreply@geekyzindagi.com"

   ENCRYPTION_KEY="your_64_char_hex_key"
   GITHUB_TOKEN="optional_github_api_token"
   ```

4. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🏗 CI/CD

The project uses **GitHub Actions** for Continuous Integration. Every push to `main` or `modifications` triggers:
- Dependency installation
- Prisma client generation
- Linting checks
- Production build verification

## 📁 Repository Structure

- `app/`: Next.js App Router (Pages & API)
- `components/`: React components (UI, Dashboard, Landing)
- `lib/`: Business logic, validation, and utility functions
- `prisma/`: Database schema and seed scripts
- `store/`: Redux Toolkit store and slices

## 🤝 Contributing

We welcome contributions from all domains! See our project boards in the Admin Dashboard for open ideas and mentorship requests.

---
© 2026 GeekyZindagi. Stay Curious.
