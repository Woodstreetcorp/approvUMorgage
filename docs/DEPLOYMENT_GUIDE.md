# Complete Deployment Guide - approvU Mortgage Platform

**Date:** November 23, 2025  
**Architecture:** Separated Frontend (Vercel) + Backend (Railway/Render)

---

## 🏗️ Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        PRODUCTION                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌─────────────────────┐      │
│  │   Next.js App    │  ←───→  │   Strapi CMS        │      │
│  │   (Vercel)       │  HTTP   │   (Railway/Render)  │      │
│  │                  │         │                     │      │
│  │  - SSR Pages     │         │  - PostgreSQL DB    │      │
│  │  - API Routes    │         │  - Media Uploads    │      │
│  │  - Static Assets │         │  - Admin Panel      │      │
│  └──────────────────┘         └─────────────────────┘      │
│         ↑                              ↑                    │
│         │                              │                    │
│    Users Access                   You Edit Content         │
│    yoursite.com              yourstrapi.railway.app/admin   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Deployment Checklist

### Before You Start
- [ ] Strapi is at: `C:\Users\Laptop Land\OneDrive\Desktop\strapi\my-strapi`
- [ ] Next.js is at: `C:\Users\Laptop Land\OneDrive\Desktop\Mortage-Fronted-Rebuild Latest\Mortage-Fronted-Rebuild-main`
- [ ] You have a GitHub account
- [ ] You have a Vercel account (free)
- [ ] You'll create a Railway/Render account (free tier available)

---

## PART 1: Deploy Strapi Backend (30 minutes)

### Option A: Railway (Recommended - Easiest)

#### Step 1: Prepare Strapi for Production

1. **Go to Strapi directory:**
   ```powershell
   cd "C:\Users\Laptop Land\OneDrive\Desktop\strapi\my-strapi"
   ```

2. **Install PostgreSQL package:**
   ```powershell
   npm install pg
   ```

3. **Create production database config:**
   Create file `config/database.js`:
   ```javascript
   module.exports = ({ env }) => ({
     connection: {
       client: 'postgres',
       connection: {
         host: env('DATABASE_HOST'),
         port: env.int('DATABASE_PORT', 5432),
         database: env('DATABASE_NAME'),
         user: env('DATABASE_USERNAME'),
         password: env('DATABASE_PASSWORD'),
         ssl: env.bool('DATABASE_SSL', false) ? {
           rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
         } : false,
       },
       debug: false,
     },
   });
   ```

4. **Update `.gitignore`** (should already have):
   ```
   .env
   .tmp
   node_modules
   build
   .cache
   ```

5. **Commit changes:**
   ```powershell
   git add .
   git commit -m "Prepare Strapi for production deployment"
   ```

#### Step 2: Push Strapi to GitHub

1. **Create new GitHub repository** (go to github.com):
   - Click "New repository"
   - Name: `approvu-strapi-cms`
   - Keep it PRIVATE (contains sensitive content)
   - Don't initialize with README

2. **Push to GitHub:**
   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/approvu-strapi-cms.git
   git branch -M main
   git push -u origin main
   ```

#### Step 3: Deploy to Railway

1. **Go to Railway.app** → Sign up with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `approvu-strapi-cms`

3. **Add PostgreSQL Database:**
   - In your project, click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway automatically creates database

4. **Set Environment Variables:**
   Click on Strapi service → Variables tab → Add:
   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_HOST=${PGHOST}
   DATABASE_PORT=${PGPORT}
   DATABASE_NAME=${PGDATABASE}
   DATABASE_USERNAME=${PGUSER}
   DATABASE_PASSWORD=${PGPASSWORD}
   DATABASE_SSL=true
   DATABASE_SSL_SELF=false
   APP_KEYS=your-app-key-1,your-app-key-2
   API_TOKEN_SALT=your-random-string-1
   ADMIN_JWT_SECRET=your-random-string-2
   TRANSFER_TOKEN_SALT=your-random-string-3
   JWT_SECRET=your-random-string-4
   ```

   **Generate random strings:**
   ```powershell
   # Run this 5 times to get 5 different secrets
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   ```

5. **Set Build Command** (if needed):
   - Click Settings → Build
   - Build Command: `npm run build`
   - Start Command: `npm run start`

6. **Deploy:**
   - Railway auto-deploys
   - Wait 5-10 minutes
   - Get your URL: `https://your-app.railway.app`

7. **Access Strapi Admin:**
   - Go to `https://your-app.railway.app/admin`
   - Create new admin account (first user becomes super admin)
   - **IMPORTANT:** Write down these credentials!

---

### Option B: Render (Alternative - Also Free Tier)

1. **Go to Render.com** → Sign up

2. **Create PostgreSQL Database:**
   - New → PostgreSQL
   - Name: `approvu-strapi-db`
   - Free tier selected
   - Create Database
   - Save the "Internal Database URL"

3. **Create Web Service:**
   - New → Web Service
   - Connect your GitHub `approvu-strapi-cms` repo
   - Settings:
     - Name: `approvu-strapi`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run start`

4. **Environment Variables** (same as Railway above)

5. **Deploy** → Wait 10-15 minutes

---

## PART 2: Deploy Next.js Frontend to Vercel (15 minutes)

#### Step 1: Prepare Next.js Project

1. **Go to Next.js directory:**
   ```powershell
   cd "C:\Users\Laptop Land\OneDrive\Desktop\Mortage-Fronted-Rebuild Latest\Mortage-Fronted-Rebuild-main"
   ```

2. **Update `.env.local` for production:**
   Create `.env.production`:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://your-app.railway.app
   ```
   (Replace with your actual Railway/Render URL)

3. **Verify `.gitignore` has:**
   ```
   .env.local
   .env*.local
   .next
   node_modules
   ```

4. **Initialize git (if not already):**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit - approvU Mortgage Platform"
   ```

#### Step 2: Push to GitHub

1. **Create new GitHub repository**:
   - Name: `approvu-mortgage-frontend`
   - Can be PUBLIC (no sensitive data)

2. **Push:**
   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/approvu-mortgage-frontend.git
   git branch -M main
   git push -u origin main
   ```

#### Step 3: Deploy to Vercel

1. **Go to Vercel.com** → Sign up with GitHub

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import `approvu-mortgage-frontend`

3. **Configure:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Environment Variables:**
   Add this ONE variable:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://your-app.railway.app
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 3-5 minutes
   - Get your URL: `https://your-site.vercel.app`

---

## PART 3: Post-Deployment Configuration (10 minutes)

#### Step 1: Configure Strapi CORS

Your Strapi needs to allow requests from Vercel:

1. **Edit Strapi `config/middlewares.js`** (locally):
   ```javascript
   module.exports = [
     'strapi::logger',
     'strapi::errors',
     'strapi::security',
     {
       name: 'strapi::cors',
       config: {
         enabled: true,
         origin: [
           'http://localhost:3000',
           'http://localhost:3001',
           'https://your-site.vercel.app', // Add your Vercel URL
           'https://*.vercel.app', // Allow all Vercel preview URLs
         ],
       },
     },
     'strapi::poweredBy',
     'strapi::query',
     'strapi::body',
     'strapi::session',
     'strapi::favicon',
     'strapi::public',
   ];
   ```

2. **Commit and push:**
   ```powershell
   cd "C:\Users\Laptop Land\OneDrive\Desktop\strapi\my-strapi"
   git add .
   git commit -m "Configure CORS for production"
   git push
   ```

3. Railway/Render auto-redeploys

#### Step 2: Migrate Content to Production

1. **Go to production Strapi admin:**
   `https://your-app.railway.app/admin`

2. **Manually recreate content:**
   - Homepage content
   - About page content
   - (Or export/import using Strapi plugins)

---

## PART 4: Custom Domain (Optional)

### For Vercel (Next.js):
1. Go to Vercel project → Settings → Domains
2. Add your domain: `www.approvu.com`
3. Follow DNS configuration instructions

### For Railway (Strapi):
1. Go to Railway project → Settings → Domains
2. Add custom domain: `cms.approvu.com`
3. Update DNS records

### Update Environment Variables:
After adding domains, update:
- Vercel: `NEXT_PUBLIC_STRAPI_URL=https://cms.approvu.com`
- Strapi CORS: Add `https://www.approvu.com`

---

## 🔒 Security Checklist

- [ ] Strapi GitHub repo is PRIVATE
- [ ] All environment variables set correctly
- [ ] Database SSL enabled
- [ ] CORS configured with specific origins (not '*')
- [ ] Admin password is strong (16+ characters)
- [ ] Database backups enabled (Railway/Render automatic)
- [ ] No `.env` files committed to git

---

## 📊 Cost Breakdown

### Free Tier (Good for Testing)
- **Railway:** Free $5/month credit (500 hours)
- **Render:** Free tier available (slower, sleeps after inactivity)
- **Vercel:** Free for personal projects
- **Total:** $0/month

### Recommended Production
- **Railway Starter:** $5/month (Strapi + PostgreSQL)
- **Vercel Pro:** $20/month (better performance, analytics)
- **Total:** $25/month

---

## 🚀 Deployment Commands Summary

```powershell
# STRAPI (Backend)
cd "C:\Users\Laptop Land\OneDrive\Desktop\strapi\my-strapi"
npm install pg
git add .
git commit -m "Production ready"
git push origin main
# → Deploy on Railway/Render

# NEXT.JS (Frontend)
cd "C:\Users\Laptop Land\OneDrive\Desktop\Mortage-Fronted-Rebuild Latest\Mortage-Fronted-Rebuild-main"
git add .
git commit -m "Production ready"
git push origin main
# → Deploy on Vercel
```

---

## 📝 Important URLs to Save

```
Production Strapi Admin: https://your-app.railway.app/admin
Production Strapi API: https://your-app.railway.app/api
Production Next.js Site: https://your-site.vercel.app
GitHub Strapi Repo: https://github.com/YOUR-USERNAME/approvu-strapi-cms
GitHub Frontend Repo: https://github.com/YOUR-USERNAME/approvu-mortgage-frontend
```

---

## 🆘 Troubleshooting

### Strapi won't start on Railway:
- Check logs in Railway dashboard
- Verify all environment variables set
- Ensure PostgreSQL is connected

### Next.js can't fetch from Strapi:
- Check CORS configuration
- Verify `NEXT_PUBLIC_STRAPI_URL` is correct
- Check Strapi API is accessible: `https://your-app.railway.app/api/homepages`

### Images not loading:
- Strapi images are stored in database in production
- Use Railway persistent volumes (paid feature) OR
- Integrate Cloudinary/AWS S3 for images

---

**Ready to deploy?** Start with Part 1 (Strapi) first, then Part 2 (Next.js)!
