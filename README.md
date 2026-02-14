# GeekyZindagi Frontend 🧠🚀

GeekyZindagi is a multidisciplinary community platform designed for curious minds to learn, build, and explore life's various dimensions. This repository contains the **Frontend** application built with Next.js 15.

It communicates with the [GeekyZindagi Core Backend](https://github.com/geekyzindagi/core-backend) for all data and authentication needs.

## ✨ Features

- **Modern & Responsive UI**: Built with Tailwind CSS, Shadcn UI, and Framer Motion for a premium feel.
- **Role-Based Access**: Specialized views for Explorers, Builders, and Elders.
- **Multidomain Content**: Showcase and submit ideas across diverse categories (AI, Neuroscience, Art, etc.).
- **Interactive Experience**: Dynamic hero sections, animated logos, and real-time feedback.
- **Secure Authentication**: Integration with backend JWT-based auth and MFA flows.
- **GitHub Integration**: Live metrics for projects via GitHub API.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org) & Context API
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **API Client**: Axios with interceptors for token management
- **Forms**: React Hook Form + Zod validation

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Running instance of [Core Backend](https://github.com/geekyzindagi/core-backend)

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
   Create a `.env` file in the root directory:
   ```env
   # App Config
   NEXT_PUBLIC_APP_NAME="GeekyZindagi"
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"

   # GitHub API (Optional, for higher rate limits in projects page)
   GITHUB_TOKEN="optional_github_api_token"
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🏗 CI/CD

The project uses **GitHub Actions** for Continuous Integration. Every push to `main` triggers:
- Dependency installation
- Linting checks
- Production build verification

## 📁 Repository Structure

- `app/`: Next.js App Router (Pages & Layouts)
- `components/`: Reusable UI components (Landing, Dashboard, Shared)
- `lib/`: Utilities, API client, and hook definitions
- `store/`: Global state management (Redux)
- `public/`: Static assets

## 🤝 Contributing

We welcome contributions! Please see our project boards or open an issue to get started.

---
© 2026 GeekyZindagi. Stay Curious.
