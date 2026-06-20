# Project Architecture Documentation - Power One Mall Website

This document outlines the software architecture, technical stack, file structures, and data models of the Power One Mall commercial website.

---

## 1. Technical Stack

- **Framework**: [Next.js v16.2](https://nextjs.org) using the **App Router** (`src/app/` structure).
- **Runtime & Compilation**: React v19, TypeScript, and Turbopack compiler.
- **Styling**: Tailwind CSS v4.0 with customized CSS theme tokens in [globals.css](file:///c:/Users/ADMIN/Downloads/power_one_mall/src/app/globals.css).
- **Animations**: Framer Motion v12 for transitions, particle drift effects, and interactive magnetic animations.
- **Iconography**: Lucide React.

---

## 2. Directory Structure

```text
PowerOneMall/
├── src/
│   ├── app/                 # Next.js App Router pages (Home, Movies, Food Court, etc.)
│   ├── components/          # Reusable UI elements, layout components, animations
│   ├── data/                # Mock data models (mockData.ts) and static schemas
│   └── lib/                 # Utility helpers and library clients
├── public/                  # Next.js static asset public folder (images, SVGs)
├── assets/                  # Design assets and original source files (fonts, raw logo)
├── backups/                 # Local directory and ZIP backups (ignored by version control)
├── deployment/              # Vercel, DNS, and environment variable configuration templates
├── documentation/           # System, recovery, and architecture guides
├── screenshots/             # Screenshots of the user interface
├── presentations/           # Slides and PDFs for client presentations
└── scripts/                 # PowerShell automation scripts (backup, restore, rollback)
```

---

## 3. Data Interface Schema

The core mock data models are defined in [mockData.ts](file:///c:/Users/ADMIN/Downloads/power_one_mall/src/data/mockData.ts). Key interfaces include:

### Store Model
```typescript
export interface Store {
  id: string;
  name: string;
  category: 'Fashion' | 'Electronics' | 'Beauty' | 'Lifestyle' | 'Food' | 'Services' | 'Entertainment';
  floor: 'Ground Floor' | 'First Floor' | 'Second Floor' | 'Third Floor';
  description: string;
  openStatus: 'Open Now' | 'Closed' | 'Opening Soon';
  hours: string;
  logo: string;
  image: string;
  phone: string;
  featured: boolean;
}
```

### Movie Model
```typescript
export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  language: string;
  rating: string;
  poster: string;
  showTimings: string[];
  synopsis: string;
}
```

---

## 4. UI Layout & Styling Patterns

### Ambient Lighting & Dark Theme
The website uses a **dark luxury theme** configured via CSS custom properties in `src/app/globals.css`:
- `--background`: Deep black-red hue (`#1a0404`).
- Body backgrounds are styled with fixed radial-gradients that render soft red ambient lighting in corners.
- **Glassmorphism**: `.glass` helper classes provide unified semi-transparent backdrops (`backdrop-filter: blur(12px)`).

### Cinematic Cards
The `.cinema-card` class applies luxury glass styling with a border transition and custom red-orange glow effects (`box-shadow`) matching the Power One branding.
