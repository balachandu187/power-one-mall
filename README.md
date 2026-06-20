# Power One Mall - Premium Website Project

A premium, luxury-themed website for **Power One Mall** in Vijayawada. Built with Next.js, Tailwind CSS, and Framer Motion, it features state-of-the-art interactive store maps, events calendar, food-court digital menus, and an immersive cinema showtime booking system.

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/balachandu187/power-one-mall.git
cd power-one-mall
npm install
```

### 2. Development Server
Run the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Build
Compile and verify the static production build:
```bash
npm run build
npm run start
```

---

## 📁 Project Directory Structure

```text
PowerOneMall/
├── src/                 # Next.js Source Code
│   ├── app/             # App Router Pages
│   ├── components/      # UI Elements & Layouts
│   └── data/            # Mock Data Schemas (mockData.ts)
├── public/              # Static Assets (Images & SVGs)
├── assets/              # Raw design assets (logos, raw banners, fonts)
├── backups/             # Local Automated Backup Snapshots (Git ignored)
├── deployment/          # Deployment and DNS Config templates
├── documentation/       # System and Operations Guides
│   ├── architecture-guide.md
│   ├── backup-guide.md
│   ├── deployment-guide.md
│   └── recovery-guide.md
├── screenshots/         # Screenshots of UI and Features
├── presentations/       # Client presentation materials
└── scripts/             # PowerShell automation scripts
```

---

## 🛠️ Automated Backup & Recovery System

This project features built-in automation for data protection and disaster recovery, optimized for commercial handoffs:

### 1. Automating Backups
Generate safe snapshots of source code and configurations:
```bash
# Generate Daily Backup
npm run backup:daily

# Generate Weekly Backup
npm run backup:weekly

# Create Compressed ZIP Archive
npm run backup:archive
```

### 2. Recovery & Restoration
Overwrite active workspace files with a selected backup. The utility automatically takes a safety snapshot of current changes before restoring:
```bash
npm run backup:restore
```

### 3. Git One-Command Rollback
Instantly reset the repository HEAD to a specific release tag or commit hash, saving a backup branch of current changes:
```bash
npm run rollback -- -Target <tag-or-commit>
```

---

## 🌿 Version Control & Branching Strategy

To maintain clean releases, follow this branching strategy:
- `main` (production-ready stable code)
- `development` (integration branch for staging/testing)
- `feature/` branches (created off `development` for active modifications, e.g. `feature/movies-redesign`)

### Commit Message Standards
Use semantic commit prefixes for consistency:
- `feat: ` New feature additions
- `fix: ` Bug resolution
- `docs: ` Documentation additions
- `style: ` Styling or formatting adjustments
- `refactor: ` Code re-structuring without functional changes
- `chore: ` Updating dependencies, scripts, or build configs

---

## 📖 System Guides
For detailed operations, check out the documentation folder:
- 📑 [Architecture Guide](file:///c:/Users/ADMIN/Downloads/power_one_mall/documentation/architecture-guide.md)
- 📑 [Backup Guide](file:///c:/Users/ADMIN/Downloads/power_one_mall/documentation/backup-guide.md)
- 📑 [Deployment Guide](file:///c:/Users/ADMIN/Downloads/power_one_mall/documentation/deployment-guide.md)
- 📑 [Recovery Guide](file:///c:/Users/ADMIN/Downloads/power_one_mall/documentation/recovery-guide.md)
