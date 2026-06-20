# Backup Guide - Power One Mall Website

This guide documents the backup strategy, automation scripts, and policies implemented to ensure project continuity and zero data loss.

---

## 1. Backup Strategy Overview

The Power One Mall website utilizes a three-tier backup system designed for maximum recovery safety:

| Backup Type | Trigger Command | Target Location | Description |
| :--- | :--- | :--- | :--- |
| **Daily Snapshot** | `npm run backup:daily` | `/backups/daily/backup_daily_[timestamp]/` | Full workspace directory copy excluding build & dependency bloat. |
| **Weekly Snapshot** | `npm run backup:weekly` | `/backups/weekly/backup_weekly_[timestamp]/` | Milestone snapshots taken weekly or prior to minor changes. |
| **Full Archive** | `npm run backup:archive` | `/backups/archives/archive_[timestamp].zip` | Compressed ZIP archive containing the complete source tree. |
| **Safety Pre-Restore**| Triggered automatically | `/backups/safety_pre_restore_[timestamp]/` | Safety snapshot taken automatically by the restore utility. |

---

## 2. Excluded Directories

To optimize disk space and restore speeds, the following directories are excluded from backups:
- `node_modules/` (re-installed via `npm install`)
- `.next/` (regenerated via `npm run build`)
- `backups/` (skips backing up prior backups recursively)
- `.git/` (Git repository history remains in the cloud)
- `.vercel/` (local deployment caches)
- Temp build info and debug logs (`*.log`, `*.tsbuildinfo`)

---

## 3. Running Backups

Backups can be run easily via `npm` or natively via PowerShell:

### Via npm (Recommended)
```bash
# Execute daily backup
npm run backup:daily

# Execute weekly backup
npm run backup:weekly

# Create compressed ZIP archive
npm run backup:archive
```

### Via PowerShell Natively
```powershell
# Open terminal and execute:
powershell -ExecutionPolicy Bypass -File ./scripts/backup-manager.ps1 -Type daily
powershell -ExecutionPolicy Bypass -File ./scripts/backup-manager.ps1 -Type weekly
powershell -ExecutionPolicy Bypass -File ./scripts/backup-manager.ps1 -Type archive
```

---

## 4. Backup Metadata

Every generated backup directory contains a `metadata.json` file to identify the project state when the backup was taken:

```json
{
  "backup_timestamp": "2026-06-20 10:15:30",
  "backup_type": "daily",
  "git_branch": "development",
  "git_commit": "6c490eb2678b4420a5be94d883b15a926234dc76",
  "files_backed_up": 142,
  "generator": "Power One Mall Automated Backup Manager"
}
```

---

## 5. Security & Secret Protection

> [!CAUTION]
> Do **NOT** store plaintext production credentials in local `.env` files. Ensure you check environment variables against `deployment/env-vars.json.example` and keep the local `backups/` folder excluded in version control to prevent leaks.
