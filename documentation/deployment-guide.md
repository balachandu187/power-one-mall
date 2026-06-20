# Deployment Guide - Power One Mall Website

This guide provides steps for deploying the Power One Mall website, configuring custom domains, securing DNS settings, and managing Vercel environments.

---

## 1. Vercel Deployment Setup

The Power One Mall website is optimized for deployment on the **Vercel Cloud Platform**.

### Prerequisites
- Install the Vercel CLI globally: `npm install -g vercel`
- Log in to your Vercel account: `vercel login`

### Initial Deployment Steps
1. Navigate to the project root directory.
2. Link the project to Vercel:
   ```bash
   vercel
   ```
   Follow the prompts to associate the project with your Vercel workspace.
3. Configure the build parameters:
   - **Framework**: `Next.js`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 2. Environment Variables Configuration

Set up environment variables in the Vercel Dashboard or via Vercel CLI. Reference [env-vars.json.example](file:///c:/Users/ADMIN/Downloads/power_one_mall/deployment/env-vars.json.example) for required keys.

To add a variable via Vercel CLI:
```bash
vercel env add DATABASE_URL
```

---

## 3. Custom Domain & DNS Settings

The primary production domain is `poweronemall.com`.

### 1. Adding Domain in Vercel
Go to **Vercel Dashboard $\rightarrow$ Project Settings $\rightarrow$ Domains** and add `poweronemall.com` and `www.poweronemall.com`.

### 2. Configure DNS Zone (at Registrar/DNS Host)
Use the zone details in [dns-records.zone](file:///c:/Users/ADMIN/Downloads/power_one_mall/deployment/dns-records.zone) to configure the host records:
- **Apex Domain (A Record)**: Point `@` to `76.76.21.21`.
- **Subdomain (CNAME Record)**: Point `www` to `cname.vercel-dns.com`.
- **Alternative (Nameservers)**: Point registrar nameservers to Vercel nameservers:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`

---

## 4. Pre-Deployment Safety Checklist

Before pushing any feature branch changes to production:

1. **Verify Development Branch Build**:
   Ensure local compilation passes successfully:
   ```bash
   npm run build
   ```
2. **Execute Safety Backup**:
   Run a daily backup to capture the current stable state of files:
   ```bash
   npm run backup:daily
   ```
3. **Check Secret Protection**:
   Ensure no active database credentials, email passwords, or private API keys are checked into Git.
4. **Git Branch Flow**:
   Merge feature branches to `development` for staging tests, and then merge `development` to `main` for Vercel production deployment.
