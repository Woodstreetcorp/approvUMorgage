# Strapi CMS - Quick Reference Guide

**Date:** November 21, 2025  
**For:** New Developer / AI Assistant  

---

## 🚀 Quick Start (Under 5 Minutes)

### Start the System:

```powershell
# Terminal 1: Start Strapi
cd "C:\Users\Laptop Land\OneDrive\Desktop\strapi\my-strapi"
npm run develop
# Wait for: "Strapi started successfully"
# Access: http://localhost:1337/admin

# Terminal 2: Start Next.js
cd "C:\Users\Laptop Land\OneDrive\Desktop\Mortage-Fronted-Rebuild Latest\Mortage-Fronted-Rebuild-main"
npm run dev
# Access: http://localhost:3000
```

---

## 📊 Current Status (One Glance)

✅ **Working:** Careers page (http://localhost:3000/careers)  
❌ **Not Working:** Other 49 pages (still hardcoded)  
🎯 **Goal:** Make all 50 pages editable via Strapi  

---

## 🗂️ Data Storage

| Content Type | Where Stored | How to Edit |
|--------------|--------------|-------------|
| **Careers Page** | ✅ Strapi SQLite | Strapi Admin |
| Blog Posts | Supabase | Existing Admin |
| Agents | Supabase | Existing Admin |
| Applications | Supabase | Existing Admin |
| **Homepage** | ❌ Hardcoded | Need to migrate to Strapi |
| **Other Pages** | ❌ Hardcoded | Need to migrate to Strapi |

---

## 🔑 Key URLs

- **Website:** http://localhost:3000
- **Strapi Admin:** http://localhost:1337/admin
- **Strapi API:** http://localhost:1337/api/
- **Careers API:** http://localhost:1337/api/careers-pages
- **Supabase:** https://xxcznmlupkezjmdnpnrs.supabase.co

---

## 🛠️ Important Files

```
Next.js Project:
├── lib/strapi.ts              ← API helper (fetchAPI, getCareersPage)
├── .env                       ← NEXT_PUBLIC_STRAPI_URL
├── app/careers/page.tsx       ← ✅ Example (uses Strapi)
└── app/page.tsx               ← ❌ TODO (still hardcoded)

Strapi Project:
└── src/api/careers-page/
    ├── content-types/careers-page/schema.json  ← Fields definition
    ├── controllers/careers-page.ts              ← API logic
    ├── routes/careers-page.ts                   ← API endpoints
    └── services/careers-page.ts                 ← Business logic
```

---

## 🎯 Next Tasks (Priority Order)

### 1. Homepage (8-10 hours)
- Create "Homepage" content type in Strapi
- Fields: hero, services, testimonials, FAQs
- Update `app/page.tsx`

### 2. About Page (4 hours)
- Create "About Page" content type
- Update `app/about/page.tsx`

### 3. Contact Page (4 hours)
- Create "Contact Page" content type
- Update `app/contact/page.tsx`

### 4. Mortgage Pages (30 hours)
- Create generic "Mortgage Page" content type
- Update 30+ mortgage solution pages

### 5. Deploy (8 hours)
- Deploy Strapi to Railway/Render/DigitalOcean
- Update production environment variables
- Test live site

---

## 💡 How It Works

```
┌─────────────────────┐
│   Client Edits      │  1. Client opens Strapi Admin
│   Strapi Admin     │     http://localhost:1337/admin
└──────┬──────────────┘
       │
       │ 2. Saves content to SQLite database
       ↓
┌─────────────────────┐
│   Strapi Database   │  3. Content stored in .tmp/data.db
│   SQLite            │
└──────┬──────────────┘
       │
       │ 4. API endpoint exposes data
       ↓
┌─────────────────────┐
│   Strapi API        │  5. Next.js fetches JSON
│   /api/careers-pages│     GET http://localhost:1337/api/...
└──────┬──────────────┘
       │
       │ 6. Returns JSON data
       ↓
┌─────────────────────┐
│   Next.js Server    │  7. Server-side rendering
│   app/careers/page  │     Uses getCareersPage()
└──────┬──────────────┘
       │
       │ 8. Generates HTML
       ↓
┌─────────────────────┐
│   Browser           │  9. User sees content
│   localhost:3000    │     http://localhost:3000/careers
└─────────────────────┘
```

---

## 🔧 Common Commands

### Check Status:
```powershell
# Is Strapi running?
curl http://localhost:1337/api/careers-pages

# Is Next.js running?
curl http://localhost:3000
```

### Troubleshooting:
```powershell
# Restart Strapi
Ctrl + C  # Stop
npm run develop  # Start

# Clear Next.js cache
rm -r .next
npm run dev

# Check if files exist
Test-Path "src/api/careers-page/content-types/careers-page/schema.json"
```

### Backup:
```powershell
# Backup Strapi database
cd "C:\Users\Laptop Land\OneDrive\Desktop\strapi\my-strapi"
cp .tmp/data.db .tmp/data.db.backup-$(Get-Date -Format 'yyyy-MM-dd')
```

---

## ⚠️ Common Issues

### Issue: API Returns 404
**Fix:** Ensure all 4 files exist (schema, routes, controller, service)

### Issue: Changes Don't Show
**Fix:** 
1. Click "Publish" in Strapi (not just Save)
2. Hard refresh browser (Ctrl + Shift + R)

### Issue: Port Already in Use
**Fix:**
```powershell
# Find and kill process on port 1337
Get-NetTCPConnection -LocalPort 1337
Stop-Process -Id [PID]
```

---

## 📞 Need Help?

1. **Read:** `/docs/STRAPI_INTEGRATION_COMPLETE_GUIDE.md` (full details)
2. **Check:** Strapi docs at https://docs.strapi.io/
3. **Test:** Use curl to test API endpoints
4. **Debug:** Check browser console and terminal for errors

---

## ✅ Success Criteria

**Proof of Concept (DONE):**
- [x] Strapi installed
- [x] Careers page working
- [x] Client can edit content
- [x] Changes reflect on website

**Full Implementation (TODO):**
- [ ] All 50 pages dynamic
- [ ] Deployed to production
- [ ] Client trained
- [ ] Documentation complete

---

**Total Pages:** 50  
**Dynamic Pages:** 1 (2%)  
**Remaining:** 49 (98%)  

**Est. Time to Complete:** 50-60 hours  
**Est. Cost:** $2,000-$3,000 (at $40/hr)  

---

*Keep this document handy - it has everything you need!*
