# Recovery and Disaster Recovery Guide - Power One Mall Website

This guide provides step-by-step procedures for restoring the Power One Mall website, rolling back changes, and validating workspace integrity.

---

## 1. Restoration from Local Backup

The workspace can be restored to a previous daily, weekly, or archived state using the automated restore utility.

### Command
```bash
npm run backup:restore
```

### Steps
1. Run the command in your command line or PowerShell terminal.
2. The utility will list all available backups (latest first) with indexes, types, and timestamps.
3. Input the index of the backup you want to restore.
4. **Safety Snapshot**: The script will automatically copy your current files into a safety snapshot directory (e.g. `/backups/safety_pre_restore_YYYYMMDD_HHMMSS`) before overwriting anything.
5. The workspace is cleaned of code folders (`src/`, `public/`, config files), keeping dependencies (`node_modules/`, `.git/`, `.next/`).
6. Backup files are extracted (or copied) back to the root workspace.
7. Validation runs automatically to check critical files.

---

## 2. Git One-Command Rollback

If you need to discard commit history or roll back the repository state to a previous release tag (`v1.0`, `v1.1`, `v1.2`) or commit hash, use the Git Rollback tool.

### Command
```bash
# General Syntax
npm run rollback -- -Target <tag-or-commit>

# Examples
npm run rollback -- -Target v1.2
npm run rollback -- -Target 6c490eb
```

### Steps
1. Run the command, supplying the target tag or commit hash.
2. **Safety Branch**: The script creates a safety branch pointing to your current HEAD (e.g. `safety_pre_rollback_YYYYMMDD_HHMMSS`) and stashes any uncommitted workspace changes.
3. The branch undergoes a hard reset to the target tag/commit.
4. If you need to undo this rollback, you can simply run:
   ```bash
   git checkout safety_pre_rollback_YYYYMMDD_HHMMSS
   ```

---

## 3. Post-Recovery Validation Checklist

After any restore or rollback, perform the following validation steps to guarantee the site is fully operational:

1. **Verify Critical Files**: Ensure `package.json`, `src/app/page.tsx`, and `src/app/layout.tsx` exist in root.
2. **Re-install Dependencies** (if clean start):
   ```bash
   npm install
   ```
3. **Verify Build Compilation**:
   ```bash
   npm run build
   ```
4. **Test Run Locally**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) and verify that the pages (including `/movies`) load correctly and seat selections or carousel components interact smoothly.

---

## 4. Emergency Contacts & Troubleshooting

- **Server Hydration Errors**: Run `npm run build` to clear Next.js cache.
- **Lost Local Code**: Check the `/backups/` folder for `safety_pre_restore_*` directories to recover files overwritten during a restore.
