# Quick Test Checklist

## ✅ Hybrid Homepage Verification

Run these tests to verify everything works:

### Test 1: Original Design Preserved
```bash
# View your site
http://localhost:3001
```
**Expected Result:**
- Colors match original (`#18768B`, `#FBA05E`)
- Spacing looks identical
- Hover effects work
- All sections render

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 2: Strapi Content Updates
```bash
# 1. Login to Strapi
http://localhost:1337/admin

# 2. Go to: Content Manager → Homepage
# 3. Change heroTitle to: "TEST - Strapi Working!"
# 4. Click Publish
# 5. Refresh: http://localhost:3001
```

**Expected Result:**
- Homepage shows "TEST - Strapi Working!" as hero title
- Design stays exactly the same
- All styling preserved

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 3: Fallback System
```bash
# 1. Stop Strapi (Ctrl+C in Strapi terminal)
# 2. Refresh: http://localhost:3001
```

**Expected Result:**
- Homepage shows original content ("Your Mortgage. Matched to Your Life.")
- No errors in browser console
- Site works perfectly

**Status:** ⬜ Pass / ⬜ Fail

---

### Test 4: Edit Multiple Fields
```bash
# In Strapi admin, edit:
- howItWorksTitle
- whyChooseCards (change first card title)
- reviews (edit first review text)
- faqTitle

# Publish and refresh Next.js
```

**Expected Result:**
- All 4 changes appear on homepage
- Original styling untouched
- Everything renders correctly

**Status:** ⬜ Pass / ⬜ Fail

---

## 🐛 Troubleshooting

### Homepage shows old hardcoded content (not Strapi)
**Fix:**
1. Check Strapi is running: `http://localhost:1337/admin`
2. Verify Homepage content is Published (not Draft)
3. Check browser console for fetch errors
4. Verify `.env.local` has: `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`

### Styling looks broken
**Fix:**
1. Check for TypeScript errors: Run `npm run build`
2. Clear Next.js cache: Delete `.next` folder, restart
3. Verify TailwindCSS config hasn't changed
4. Compare with backup: `app/page-hardcoded.tsx.backup`

### Strapi not loading
**Fix:**
1. Restart Strapi: `cd strapi/my-strapi && npm run develop`
2. Check port 1337 not in use
3. Verify database exists: `strapi/my-strapi/.tmp/data.db`

### Images not showing
**Fix:**
1. Check image uploaded in Strapi Media Library
2. Verify `getStrapiMediaUrl()` function in `lib/strapi.ts`
3. Check browser console for 404 errors
4. Confirm image path: `http://localhost:1337/uploads/[filename]`

---

## 📝 Quick Commands

```bash
# Start Next.js
cd "c:\Users\Laptop Land\OneDrive\Desktop\Mortage-Fronted-Rebuild Latest\Mortage-Fronted-Rebuild-main"
npm run dev

# Start Strapi
cd "c:\Users\Laptop Land\OneDrive\Desktop\Mortage-Fronted-Rebuild Latest\Mortage-Fronted-Rebuild-main\strapi\my-strapi"
npm run develop

# Check both servers
# Next.js:  http://localhost:3001
# Strapi:   http://localhost:1337/admin
```

---

## ✨ Success Criteria

All tests pass when:
- [x] Original design looks perfect
- [x] Strapi edits update homepage
- [x] Fallbacks work when Strapi offline
- [x] Multiple fields editable
- [x] No TypeScript/console errors

**Date Tested:** _________________  
**Tested By:** _________________  
**Overall Status:** ⬜ All Pass ✅ / ⬜ Issues Found ❌
