# Strapi Homepage Content Type - Setup Guide

**Date:** November 23, 2025  
**Page:** Homepage (`app/page.tsx`)  
**Status:** Ready to implement  

---

## 📋 Homepage Structure Analysis

The homepage has **8 main sections** that need to be editable:

1. **Hero Section** - Main banner with title, subtitle, CTA buttons
2. **How It Works** - 3 steps showing the process
3. **Why Choose approvU** - 3 cards with benefits
4. **Our Services** - 4 service cards (mortgages, refinancing, etc.)
5. **Reviews** - 3 customer testimonials
6. **Trust Badges** - Trustpilot, Google Reviews, FSRA
7. **Lenders** - List of 12 partner lenders
8. **FAQs** - 4 frequently asked questions
9. **Final CTA** - Bottom call-to-action banner

---

## 🛠️ Step-by-Step: Create Homepage Content Type in Strapi

### **Step 1: Access Strapi Admin**

1. Open browser
2. Go to: http://localhost:1337/admin
3. Login with your credentials

### **Step 2: Create New Collection Type**

1. Click **Content-Type Builder** (left sidebar)
2. Click **+ Create new collection type**
3. Display name: `Homepage`
4. Click **Continue**

---

## 📝 Field Configuration

### **A) Hero Section Fields**

Click **+ Add another field** for each:

1. **heroTitle** (Text - short)
   - Type: Text (Short text)
   - Name: `heroTitle`
   - Click **+ Add another field**

2. **heroSubtitle** (Text - long)
   - Type: Text (Long text)
   - Name: `heroSubtitle`
   - Click **+ Add another field**

3. **heroCtaText** (Text - short)
   - Type: Text
   - Name: `heroCtaText`
   - Default value: "Get Qualified in Minutes"
   - Click **+ Add another field**

4. **heroCtaLink** (Text - short)
   - Type: Text
   - Name: `heroCtaLink`
   - Default value: "/mortgage/approval/"
   - Click **+ Add another field**

5. **heroSecondaryCtaText** (Text - short)
   - Type: Text
   - Name: `heroSecondaryCtaText`
   - Default value: "Compare Offers"
   - Click **+ Add another field**

6. **heroSecondaryCtaLink** (Text - short)
   - Type: Text
   - Name: `heroSecondaryCtaLink`
   - Default value: "/mortgage/rates"
   - Click **+ Add another field**

7. **heroBackgroundImage** (Media - Single)
   - Type: Media
   - Name: `heroBackgroundImage`
   - Single media
   - Click **+ Add another field**

---

### **B) How It Works Section**

8. **howItWorksTitle** (Text - short)
   - Type: Text
   - Name: `howItWorksTitle`
   - Default value: "How approvU Works"
   - Click **+ Add another field**

9. **howItWorksSubtitle** (Text - short)
   - Type: Text
   - Name: `howItWorksSubtitle`
   - Default value: "Three simple steps to your perfect mortgage match"
   - Click **+ Add another field**

10. **howItWorksSteps** (Component - Repeatable)
    - Type: Component
    - Name: `howItWorksSteps`
    - Select: **Create new component**
    - Component name: `StepCard`
    - Category: `shared`
    - Click **Continue**
    
    **Inside StepCard component, add fields:**
    - `stepNumber` (Number - Integer)
    - `stepTitle` (Text - short)
    - `stepDescription` (Text - long)
    - `stepIcon` (Text - short) - Icon name like "MessageCircle"
    - Click **Finish**
    
    - Back to main screen: Select "Repeatable component"
    - Min entries: 3, Max entries: 3
    - Click **+ Add another field**

---

### **C) Why Choose Section**

11. **whyChooseTitle** (Text - short)
    - Type: Text
    - Name: `whyChooseTitle`
    - Default value: "Why Choose approvU"
    - Click **+ Add another field**

12. **whyChooseSubtitle** (Text - short)
    - Type: Text
    - Name: `whyChooseSubtitle`
    - Default value: "Experience mortgage lending reimagined"
    - Click **+ Add another field**

13. **whyChooseCards** (Component - Repeatable)
    - Type: Component
    - Name: `whyChooseCards`
    - Select: **Create new component**
    - Component name: `FeatureCard`
    - Category: `shared`
    - Click **Continue**
    
    **Inside FeatureCard component, add fields:**
    - `cardTitle` (Text - short)
    - `cardDescription` (Text - long)
    - `cardIcon` (Text - short)
    - Click **Finish**
    
    - Select "Repeatable component"
    - Min: 3, Max: 3
    - Click **+ Add another field**

---

### **D) Services Section**

14. **servicesTitle** (Text - short)
    - Type: Text
    - Name: `servicesTitle`
    - Default value: "Our Services"
    - Click **+ Add another field**

15. **servicesSubtitle** (Text - short)
    - Type: Text
    - Name: `servicesSubtitle`
    - Default value: "Comprehensive mortgage solutions for every stage of homeownership"
    - Click **+ Add another field**

16. **services** (Component - Repeatable)
    - Type: Component
    - Name: `services`
    - Select: **Create new component**
    - Component name: `ServiceCard`
    - Category: `shared`
    - Click **Continue**
    
    **Inside ServiceCard component, add fields:**
    - `serviceTitle` (Text - short)
    - `serviceDescription` (Text - long)
    - `serviceIcon` (Text - short)
    - `serviceFeatures` (JSON) - For the 3 features list
    - Click **Finish**
    
    - Select "Repeatable component"
    - Min: 4, Max: 4
    - Click **+ Add another field**

---

### **E) Reviews Section**

17. **reviewsTitle** (Text - short)
    - Type: Text
    - Name: `reviewsTitle`
    - Default value: "Real Reviews from Real Clients"
    - Click **+ Add another field**

18. **reviewsSubtitle** (Text - short)
    - Type: Text
    - Name: `reviewsSubtitle`
    - Default value: "See what homeowners are saying about their approvU experience"
    - Click **+ Add another field**

19. **reviews** (Component - Repeatable)
    - Type: Component
    - Name: `reviews`
    - Select: **Create new component**
    - Component name: `Review`
    - Category: `shared`
    - Click **Continue**
    
    **Inside Review component, add fields:**
    - `reviewRating` (Number - Integer) - Default: 5
    - `reviewText` (Text - long)
    - `reviewAuthor` (Text - short)
    - `reviewLocation` (Text - short)
    - Click **Finish**
    
    - Select "Repeatable component"
    - Min: 3, Max: 5
    - Click **+ Add another field**

---

### **F) Trust Badges**

20. **trustBadges** (Component - Repeatable)
    - Type: Component
    - Name: `trustBadges`
    - Select: **Create new component**
    - Component name: `TrustBadge`
    - Category: `shared`
    - Click **Continue**
    
    **Inside TrustBadge component, add fields:**
    - `badgeTitle` (Text - short)
    - `badgeIcon` (Text - short)
    - Click **Finish**
    
    - Select "Repeatable component"
    - Min: 3, Max: 3
    - Click **+ Add another field**

---

### **G) Lenders Section**

21. **lendersTitle** (Text - short)
    - Type: Text
    - Name: `lendersTitle`
    - Default value: "Trusted by Canada's Leading Lenders"
    - Click **+ Add another field**

22. **lendersSubtitle** (Text - short)
    - Type: Text
    - Name: `lendersSubtitle`
    - Default value: "Over 15,000 deals matched to 25+ lenders nationwide"
    - Click **+ Add another field**

23. **lenders** (JSON)
    - Type: JSON
    - Name: `lenders`
    - Click **+ Add another field**

---

### **H) FAQ Section**

24. **faqTitle** (Text - short)
    - Type: Text
    - Name: `faqTitle`
    - Default value: "Frequently Asked Questions"
    - Click **+ Add another field**

25. **faqSubtitle** (Text - short)
    - Type: Text
    - Name: `faqSubtitle`
    - Default value: "Get answers to common questions about our process"
    - Click **+ Add another field**

26. **faqs** (Component - Repeatable)
    - Type: Component
    - Name: `faqs`
    - Select: **Create new component**
    - Component name: `Faq`
    - Category: `shared`
    - Click **Continue**
    
    **Inside Faq component, add fields:**
    - `question` (Text - short)
    - `answer` (Text - long)
    - Click **Finish**
    
    - Select "Repeatable component"
    - Min: 4, Max: 10
    - Click **+ Add another field**

---

### **I) Final CTA Section**

27. **finalCtaBadgeText** (Text - short)
    - Type: Text
    - Name: `finalCtaBadgeText`
    - Default value: "✨ Over 25,000 Happy Homeowners"
    - Click **+ Add another field**

28. **finalCtaTitle** (Text - short)
    - Type: Text
    - Name: `finalCtaTitle`
    - Default value: "Ready to find your best mortgage match?"
    - Click **+ Add another field**

29. **finalCtaSubtitle** (Text - short)
    - Type: Text
    - Name: `finalCtaSubtitle`
    - Default value: "Join thousands of Canadians who've trusted approvU to simplify their mortgage journey"
    - Click **+ Add another field**

30. **finalCtaPrimaryText** (Text - short)
    - Type: Text
    - Name: `finalCtaPrimaryText`
    - Default value: "Start Your Application"
    - Click **+ Add another field**

31. **finalCtaPrimaryLink** (Text - short)
    - Type: Text
    - Name: `finalCtaPrimaryLink`
    - Default value: "/mortgage/approval/"
    - Click **+ Add another field**

32. **finalCtaSecondaryText** (Text - short)
    - Type: Text
    - Name: `finalCtaSecondaryText`
    - Default value: "Compare Offers"
    - Click **+ Add another field**

33. **finalCtaSecondaryLink** (Text - short)
    - Type: Text
    - Name: `finalCtaSecondaryLink`
    - Default value: "/mortgage/rates"
    - Click **+ Add another field**

---

### **J) SEO Fields**

34. **metaTitle** (Text - short)
    - Type: Text
    - Name: `metaTitle`
    - Click **+ Add another field**

35. **metaDescription** (Text - long)
    - Type: Text
    - Name: `metaDescription`
    - Click **Finish**

---

### **Step 3: Save Content Type**

1. Click **Save** (top right)
2. Wait for Strapi to restart (30-60 seconds)
3. Server will automatically reload

---

## 🔐 Step 4: Set Permissions

1. Go to **Settings** (left sidebar, bottom)
2. Click **Roles** under "USERS & PERMISSIONS PLUGIN"
3. Click **Public**
4. Scroll to **Homepage**
5. Check these permissions:
   - ✅ `find`
   - ✅ `findOne`
6. Click **Save**

---

## ✍️ Step 5: Add Content

1. Click **Content Manager** (left sidebar)
2. Click **Homepage** under "COLLECTION TYPES"
3. Click **+ Create new entry**

### Fill in the data:

**Hero Section:**
- heroTitle: `Your Mortgage. Matched to Your Life.`
- heroSubtitle: `No haggling. No confusion. Just personalized mortgage offers that help you achieve your homeownership dreams.`
- heroCtaText: `Get Qualified in Minutes`
- heroCtaLink: `/mortgage/approval/`
- heroSecondaryCtaText: `Compare Offers`
- heroSecondaryCtaLink: `/mortgage/rates`
- heroBackgroundImage: Upload `/images/hero/hero-family-home.jpg`

**How It Works:**
- howItWorksTitle: `How approvU Works`
- howItWorksSubtitle: `Three simple steps to your perfect mortgage match`
- howItWorksSteps: (Add 3 components)
  1. Step 1: Number: 1, Title: "Tell us about you & your goals", Description: "Smart, conversational quiz that learns what matters most to you", Icon: "MessageCircle"
  2. Step 2: Number: 2, Title: "Get Matched to Real Mortgage Offers", Description: "Based on your real profile, not estimates. See actual rates and terms", Icon: "TrendingUp"
  3. Step 3: Number: 3, Title: "Enjoy Personalized Concierge Guidance", Description: "Human + Tech support, zero-pressure. We're here when you need us", Icon: "Shield"

**Why Choose:**
- whyChooseTitle: `Why Choose approvU`
- whyChooseSubtitle: `Experience mortgage lending reimagined`
- whyChooseCards: (Add 3 components)
  1. Title: "Personalized Offers", Description: "Real mortgage offers based on your unique profile, not generic estimates", Icon: "Users"
  2. Title: "Concierge Guidance", Description: "Human + AI support when you need it, zero pressure when you don't", Icon: "MessageCircle"
  3. Title: "No Sales Pressure", Description: "Work at your own pace with complete transparency and trust", Icon: "Shield"

**Services:**
- servicesTitle: `Our Services`
- servicesSubtitle: `Comprehensive mortgage solutions for every stage of homeownership`
- services: (Add 4 components)
  1. Title: "First-Time Home Purchase", Description: "Navigate your first home purchase with confidence...", Icon: "HomeIcon", Features: `["Down payment assistance programs", "Pre-approval with rate guarantee", "Free home buying education"]`
  2. Title: "Mortgage Refinancing", Description: "Optimize your existing mortgage...", Icon: "TrendingUp", Features: `["Rate reduction analysis", "Home equity access options", "Debt consolidation strategies"]`
  3. Title: "Investment Properties", Description: "Build your real estate portfolio...", Icon: "LucideBanknote", Features: `["Rental income qualification", "Portfolio expansion strategies", "Commercial property options"]`
  4. Title: "Mortgage Protection", Description: "Protect your investment...", Icon: "Shield", Features: `["Mortgage life insurance", "Disability income protection", "Home and property insurance"]`

**Reviews:**
- reviewsTitle: `Real Reviews from Real Clients`
- reviewsSubtitle: `See what homeowners are saying about their approvU experience`
- reviews: (Add 3 components)
  1. Rating: 5, Text: "Fast, transparent, and no sales pressure! Got my mortgage approved in 3 days. 🎉", Author: "Sarah M.", Location: "First-time buyer, Toronto"
  2. Rating: 5, Text: "Finally found a mortgage platform that actually saves me money. The incentives are real! 💰", Author: "Michael C.", Location: "Refinance client, Vancouver"
  3. Rating: 5, Text: "The concierge service is amazing. They answered all my questions without any pressure. ⭐", Author: "Lisa R.", Location: "Investment property, Calgary"

**Trust Badges:** (Add 3 components)
1. Title: "Trustpilot Excellent", Icon: "LucideMedal"
2. Title: "4.9/5 Google Reviews", Icon: "Star"
3. Title: "FSRA Licensed", Icon: "Shield"

**Lenders:**
- lendersTitle: `Trusted by Canada's Leading Lenders`
- lendersSubtitle: `Over 15,000 deals matched to 25+ lenders nationwide`
- lenders: `["TD Bank", "RBC", "BMO", "Scotiabank", "CIBC", "MCAP", "First National", "CMLS", "Meridian", "DUCA", "RFA", "B2B Bank"]`

**FAQs:** (Add 4 components)
1. Question: "How is approvU different from a mortgage broker?", Answer: "Unlike traditional brokers, we use technology to match you with personalized offers from multiple lenders without any sales pressure. Our concierge service provides guidance when you need it, but you're always in control of the process."
2. Question: "Is it safe to submit my information?", Answer: "Absolutely. We use bank-level encryption and are fully licensed with FSRA. Your information is secure and never shared without your explicit consent. We're committed to protecting your privacy."
3. Question: "Will this impact my credit score?", Answer: "No, getting qualified through approvU does not impact your credit score. We only perform a soft credit check initially, which doesn't affect your rating. Hard credit checks only happen when you're ready to proceed with a specific lender."
4. Question: "Who are the advisors helping me?", Answer: "Our mortgage concierges are licensed professionals with years of experience in Canadian mortgage lending. They're supported by our AI technology to provide you with the best possible guidance and options."

**Final CTA:**
- finalCtaBadgeText: `✨ Over 25,000 Happy Homeowners`
- finalCtaTitle: `Ready to find your best mortgage match?`
- finalCtaSubtitle: `Join thousands of Canadians who've trusted approvU to simplify their mortgage journey`
- finalCtaPrimaryText: `Start Your Application`
- finalCtaPrimaryLink: `/mortgage/approval/`
- finalCtaSecondaryText: `Compare Offers`
- finalCtaSecondaryLink: `/mortgage/rates`

**SEO:**
- metaTitle: `approvU - Best Mortgage Rates & Expert Guidance Across Canada`
- metaDescription: `Find the best mortgage rates in Canada with approvU. Expert guidance for first-time buyers, refinancing, renewals, and investment properties. Get pre-approved in minutes.`

4. Click **Save**
5. Click **Publish**

---

## ✅ Step 6: Test API

Open browser or PowerShell:

```powershell
curl http://localhost:1337/api/homepages?populate=*
```

You should see your data in JSON format!

---

## 📌 Next Steps

After creating this content type:
1. Update `lib/strapi.ts` with homepage helper function
2. Convert `app/page.tsx` to use Strapi data
3. Test locally
4. Repeat for About page, Contact page, etc.

---

**Document Status:** Ready for implementation  
**Estimated Time:** 30-45 minutes  
**Created:** November 23, 2025
