# Idol Aura - Nur Intan JKT48 Fan Website

A modern, beautiful fan website dedicated to Nur Intan from JKT48's 13th Generation. Built with React, TypeScript, and Framer Motion.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)

## ✨ Features

### Public Pages
- **Home** - Hero section with bento grid layout showcasing key information
- **About** - Detailed profile with stats, milestones, fun facts, hashtags, and stage units
- **Gallery** - Photo gallery with lightbox, shuffle, and infinite scroll
- **Schedule** - Upcoming events and performances
- **Media** - Video, audio, and article archive with filters

### Admin Panel
- **Gallery Management** - Add/remove photos via URL
- **Schedule Management** - Create events with title, date, time, location, type
- **Media Management** - Add videos, audio, and articles
- **Milestones** - Manage career milestones for About page
- **Fun Facts** - Manage fun facts section
- **Hashtags** - Manage official hashtags
- **Stage Units** - Manage theater stage unit information
- **Settings** - Configure total theater shows count
- **Export/Import** - Backup and restore all data

### Design
- 🎨 Modern, minimal aesthetic with glassmorphism effects
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 🎯 SEO optimized

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/michirineLuzz/IntanJKT48-Web.git

# Navigate to project directory
cd IntanJKT48-Web

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navigation.tsx  # Header navigation
│   ├── Footer.tsx      # Footer component
│   ├── AboutSection.tsx
│   ├── GallerySection.tsx
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── lib/               # Utilities and helpers
│   ├── supabase.ts    # Supabase client
│   ├── dataStore.ts   # Data management layer
│   └── utils.ts
├── pages/             # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Gallery.tsx
│   ├── Schedule.tsx
│   ├── Media.tsx
│   └── Admin.tsx
├── App.tsx            # Main app component
└── main.tsx          # Entry point

public/
├── robots.txt        # Search engine directives
└── ...

docs/
└── ADMIN_PANEL.md    # Admin panel documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for Supabase integration (optional):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Without Supabase configuration, the admin panel uses localStorage for data persistence.

### Supabase Setup (Optional)

For production use with authentication and cloud storage:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `docs/ADMIN_PANEL.md`
3. Add environment variables
4. Create an admin user in Supabase Auth

See [docs/ADMIN_PANEL.md](docs/ADMIN_PANEL.md) for detailed setup instructions.

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Query + Context
- **Backend (Optional)**: Supabase
- **Icons**: Lucide React

## 📝 Admin Panel

Access the admin panel at `/admin`.

### Features:
- Manage all website content
- No login required (localStorage mode)
- Optional Supabase authentication
- Export/Import data backup

### Documentation
See [docs/ADMIN_PANEL.md](docs/ADMIN_PANEL.md) for complete admin panel documentation.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

The `vercel.json` configuration handles SPA routing.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 📄 License

This is a fan-made project for educational purposes. All JKT48 related content belongs to their respective owners.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with 💕 for Intan and all her fans
