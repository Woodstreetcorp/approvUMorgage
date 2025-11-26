/**
 * HYBRID HOMEPAGE - OPTION C
 * 
 * This file combines:
 * ✅ Original client-approved design/styling (100% preserved)
 * ✅ Strapi CMS content editability (all text/images editable)
 * ✅ Automatic fallback to original hardcoded content if Strapi fails
 * 
 * How it works:
 * 1. Fetches content from Strapi (getHomepage())
 * 2. If Strapi data exists → Use it
 * 3. If Strapi fails/empty → Use FALLBACK_DATA (original content)
 * 4. Renders with exact original styling (all CSS classes preserved)
 * 
 * Documentation: docs/HYBRID_HOMEPAGE_GUIDE.md
 * Test Checklist: docs/HYBRID_TEST_CHECKLIST.md
 * Original Backup: app/page-hardcoded.tsx.backup
 */

import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SchemaMarkup, organizationSchema, websiteSchema } from "@/components/seo/SchemaMarkup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calculator,
  FileText,
  TrendingDown,
  Home as HomeIcon,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  TrendingUp,
  Check,
  Star,
  Clock,
  Phone,
  Medal,
  LucideMedal,
  LucideBanknote,
} from "lucide-react";
import Link from "next/link";
import { getHomepage, getStrapiMediaUrl } from "@/lib/strapi";

// Hardcoded fallback data - keeps your approved design
const FALLBACK_DATA = {
  heroTitle: "Your Mortgage. Matched to Your Life.",
  heroSubtitle: "No haggling. No confusion. Just personalized mortgage offers that help you achieve your homeownership dreams.",
  heroCtaText: "Get Qualified in Minutes",
  heroCtaLink: "/mortgage/approval/",
  heroSecondaryCtaText: "Compare Offers",
  heroSecondaryCtaLink: "/mortgage/rates",
  heroBackgroundImage: "/images/hero/hero-family-home.jpg",
  
  howItWorksTitle: "How approvU Works",
  howItWorksSubtitle: "Three simple steps to your perfect mortgage match",
  howItWorksSteps: [
    { stepNumber: 1, stepTitle: "Tell us about you & your goals", stepDescription: "Smart, conversational quiz that learns what matters most to you", stepIcon: "MessageCircle" },
    { stepNumber: 2, stepTitle: "Get Matched to Real Mortgage Offers", stepDescription: "Based on your real profile, not estimates. See actual rates and terms", stepIcon: "TrendingUp" },
    { stepNumber: 3, stepTitle: "Enjoy Personalized Concierge Guidance", stepDescription: "Human + Tech support, zero-pressure. We're here when you need us", stepIcon: "Shield" }
  ],
  
  whyChooseTitle: "Why Choose approvU",
  whyChooseSubtitle: "Experience mortgage lending reimagined",
  whyChooseCards: [
    { cardTitle: "Personalized Offers", cardDescription: "Real mortgage offers based on your unique profile, not generic estimates", cardIcon: "Users" },
    { cardTitle: "Concierge Guidance", cardDescription: "Human + AI support when you need it, zero pressure when you don't", cardIcon: "MessageCircle" },
    { cardTitle: "No Sales Pressure", cardDescription: "Work at your own pace with complete transparency and trust", cardIcon: "Shield" }
  ],
  
  servicesTitle: "Our Services",
  servicesSubtitle: "Comprehensive mortgage solutions for every stage of homeownership",
  services: [
    { serviceTitle: "First-Time Home Purchase", serviceDescription: "Navigate your first home purchase with confidence. Get personalized guidance, competitive rates, and exclusive first-time buyer incentives.", serviceIcon: "HomeIcon", serviceFeatures: ["Down payment assistance programs", "Pre-approval with rate guarantee", "Free home buying education"] },
    { serviceTitle: "Mortgage Refinancing", serviceDescription: "Optimize your existing mortgage with better rates, terms, or access your home equity for renovations and investments.", serviceIcon: "TrendingUp", serviceFeatures: ["Rate reduction analysis", "Home equity access options", "Debt consolidation strategies"] },
    { serviceTitle: "Investment Properties", serviceDescription: "Build your real estate portfolio with specialized investment property financing and rental income analysis.", serviceIcon: "LucideBanknote", serviceFeatures: ["Rental income qualification", "Portfolio expansion strategies", "Commercial property options"] },
    { serviceTitle: "Mortgage Protection", serviceDescription: "Protect your investment with comprehensive mortgage insurance and life protection solutions.", serviceIcon: "Shield", serviceFeatures: ["Mortgage life insurance", "Disability income protection", "Home and property insurance"] }
  ],
  
  reviewsTitle: "Real Reviews from Real Clients",
  reviewsSubtitle: "See what homeowners are saying about their approvU experience",
  reviews: [
    { reviewRating: 5, reviewText: "Fast, transparent, and no sales pressure! Got my mortgage approved in 3 days. 🎉", reviewAuthor: "Sarah M.", reviewLocation: "First-time buyer, Toronto" },
    { reviewRating: 5, reviewText: "Finally found a mortgage platform that actually saves me money. The incentives are real! 💰", reviewAuthor: "Michael C.", reviewLocation: "Refinance client, Vancouver" },
    { reviewRating: 5, reviewText: "The concierge service is amazing. They answered all my questions without any pressure. ⭐", reviewAuthor: "Lisa R.", reviewLocation: "Investment property, Calgary" }
  ],
  
  trustBadges: [
    { badgeTitle: "Trustpilot Excellent", badgeIcon: "LucideMedal" },
    { badgeTitle: "4.9/5 Google Reviews", badgeIcon: "Star" },
    { badgeTitle: "FSRA Licensed", badgeIcon: "Shield" }
  ],
  
  lendersTitle: "Trusted by Canada's Leading Lenders",
  lendersSubtitle: "Over 15,000 deals matched to 25+ lenders nationwide",
  lenders: ["TD Bank", "RBC", "BMO", "Scotiabank", "CIBC", "MCAP", "First National", "CMLS", "Meridian", "DUCA", "RFA", "B2B Bank"],
  
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Get answers to common questions about our process",
  faqs: [
    { question: "How is approvU different from a mortgage broker?", answer: "Unlike traditional brokers, we use technology to match you with personalized offers from multiple lenders without any sales pressure. Our concierge service provides guidance when you need it, but you're always in control of the process." },
    { question: "Is it safe to submit my information?", answer: "Absolutely. We use bank-level encryption and are fully licensed with FSRA. Your information is secure and never shared without your explicit consent. We're committed to protecting your privacy." },
    { question: "Will this impact my credit score?", answer: "No, getting qualified through approvU does not impact your credit score. We only perform a soft credit check initially, which doesn't affect your rating. Hard credit checks only happen when you're ready to proceed with a specific lender." },
    { question: "Who are the advisors helping me?", answer: "Our mortgage concierges are licensed professionals with years of experience in Canadian mortgage lending. They're supported by our AI technology to provide you with the best possible guidance and options." }
  ],
  
  finalCtaBadgeText: "✨ Over 25,000 Happy Homeowners",
  finalCtaTitle: "Ready to find your best mortgage match?",
  finalCtaSubtitle: "Join thousands of Canadians who've trusted approvU to simplify their mortgage journey",
  finalCtaPrimaryText: "Start Your Application",
  finalCtaPrimaryLink: "/mortgage/approval/",
  finalCtaSecondaryText: "Compare Offers",
  finalCtaSecondaryLink: "/mortgage/rates",
  
  metaTitle: "approvU - Best Mortgage Rates & Expert Guidance Across Canada",
  metaDescription: "Find the best mortgage rates in Canada with approvU. Expert guidance for first-time buyers, refinancing, renewals, and investment properties. Get pre-approved in minutes."
};

// Icon mapping helper
const iconMap: { [key: string]: any } = {
  MessageCircle,
  TrendingUp,
  Shield,
  Users,
  HomeIcon,
  LucideBanknote,
  LucideMedal,
  Star,
  Clock,
  Phone,
};

function getIconComponent(iconName: string) {
  return iconMap[iconName] || Shield;
}

// Generate metadata from Strapi
export async function generateMetadata(): Promise<Metadata> {
  try {
    const homepage = await getHomepage();
    
    return {
      title: homepage?.metaTitle || "approvU - Best Mortgage Rates & Expert Guidance Across Canada",
      description: homepage?.metaDescription || "Find the best mortgage rates in Canada with approvU. Expert guidance for first-time buyers, refinancing, renewals, and investment properties. Get pre-approved in minutes.",
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "approvU - Best Mortgage Rates & Expert Guidance Across Canada",
      description: "Find the best mortgage rates in Canada with approvU. Expert guidance for first-time buyers, refinancing, renewals, and investment properties. Get pre-approved in minutes.",
    };
  }
}

export default async function Home() {
  let strapiData = null;
  
  try {
    strapiData = await getHomepage();
  } catch (error) {
    console.error('Error fetching homepage data:', error);
  }

  // Hybrid approach: Use Strapi data OR fallback to original hardcoded values
  const data = {
    heroTitle: strapiData?.heroTitle || FALLBACK_DATA.heroTitle,
    heroSubtitle: strapiData?.heroSubtitle || FALLBACK_DATA.heroSubtitle,
    heroCtaText: strapiData?.heroCtaText || FALLBACK_DATA.heroCtaText,
    heroCtaLink: strapiData?.heroCtaLink || FALLBACK_DATA.heroCtaLink,
    heroSecondaryCtaText: strapiData?.heroSecondaryCtaText || FALLBACK_DATA.heroSecondaryCtaText,
    heroSecondaryCtaLink: strapiData?.heroSecondaryCtaLink || FALLBACK_DATA.heroSecondaryCtaLink,
    heroBackgroundImage: strapiData?.heroBackgroundImage?.url 
      ? getStrapiMediaUrl(strapiData.heroBackgroundImage.url) 
      : FALLBACK_DATA.heroBackgroundImage,
    
    howItWorksTitle: strapiData?.howItWorksTitle || FALLBACK_DATA.howItWorksTitle,
    howItWorksSubtitle: strapiData?.howItWorksSubtitle || FALLBACK_DATA.howItWorksSubtitle,
    howItWorksSteps: strapiData?.howItWorksSteps?.length > 0 
      ? strapiData.howItWorksSteps 
      : FALLBACK_DATA.howItWorksSteps,
    
    whyChooseTitle: strapiData?.whyChooseTitle || FALLBACK_DATA.whyChooseTitle,
    whyChooseSubtitle: strapiData?.whyChooseSubtitle || FALLBACK_DATA.whyChooseSubtitle,
    whyChooseCards: strapiData?.whyChooseCards?.length > 0 
      ? strapiData.whyChooseCards 
      : FALLBACK_DATA.whyChooseCards,
    
    servicesTitle: strapiData?.servicesTitle || FALLBACK_DATA.servicesTitle,
    servicesSubtitle: strapiData?.servicesSubtitle || FALLBACK_DATA.servicesSubtitle,
    services: strapiData?.services?.length > 0 
      ? strapiData.services 
      : FALLBACK_DATA.services,
    
    reviewsTitle: strapiData?.reviewsTitle || FALLBACK_DATA.reviewsTitle,
    reviewsSubtitle: strapiData?.reviewsSubtitle || FALLBACK_DATA.reviewsSubtitle,
    reviews: strapiData?.reviews?.length > 0 
      ? strapiData.reviews 
      : FALLBACK_DATA.reviews,
    
    trustBadges: strapiData?.trustBadges?.length > 0 
      ? strapiData.trustBadges 
      : FALLBACK_DATA.trustBadges,
    
    lendersTitle: strapiData?.lendersTitle || FALLBACK_DATA.lendersTitle,
    lendersSubtitle: strapiData?.lendersSubtitle || FALLBACK_DATA.lendersSubtitle,
    lenders: strapiData?.lenders || FALLBACK_DATA.lenders,
    
    faqTitle: strapiData?.faqTitle || FALLBACK_DATA.faqTitle,
    faqSubtitle: strapiData?.faqSubtitle || FALLBACK_DATA.faqSubtitle,
    faqs: strapiData?.faqs?.length > 0 
      ? strapiData.faqs 
      : FALLBACK_DATA.faqs,
    
    finalCtaBadgeText: strapiData?.finalCtaBadgeText || FALLBACK_DATA.finalCtaBadgeText,
    finalCtaTitle: strapiData?.finalCtaTitle || FALLBACK_DATA.finalCtaTitle,
    finalCtaSubtitle: strapiData?.finalCtaSubtitle || FALLBACK_DATA.finalCtaSubtitle,
    finalCtaPrimaryText: strapiData?.finalCtaPrimaryText || FALLBACK_DATA.finalCtaPrimaryText,
    finalCtaPrimaryLink: strapiData?.finalCtaPrimaryLink || FALLBACK_DATA.finalCtaPrimaryLink,
    finalCtaSecondaryText: strapiData?.finalCtaSecondaryText || FALLBACK_DATA.finalCtaSecondaryText,
    finalCtaSecondaryLink: strapiData?.finalCtaSecondaryLink || FALLBACK_DATA.finalCtaSecondaryLink,
  };

  return (
    <>
      {/* Schema Markup for SEO - Invisible to users, only for Google */}
      <SchemaMarkup schema={[organizationSchema, websiteSchema]} />
      
      {/* Hero Section - Original Styling Preserved */}
      <Hero
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        ctaText={data.heroCtaText}
        ctaLink={data.heroCtaLink}
        secondaryCTA={data.heroSecondaryCtaText}
        secondaryCTALink={data.heroSecondaryCtaLink}
        backgroundImage={data.heroBackgroundImage}
      />

      {/* How approvU Works - Original Styling Preserved */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#18768B] text-3xl md:text-4xl font-bold mb-4">
              {data.howItWorksTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.howItWorksSteps.map((step: any, index: number) => {
              const IconComponent = getIconComponent(step.stepIcon);
              const stepNumber = step.stepNumber || index + 1;

              const iconBgClass = stepNumber === 1 ? "bg-secondary/10" : stepNumber === 2 ? "bg-accent/10" : "bg-success/10";
              const iconColorClass = stepNumber === 1 ? "text-secondary" : stepNumber === 2 ? "text-accent" : "text-success";
              const numberBgClass = stepNumber === 1 ? "bg-secondary" : stepNumber === 2 ? "bg-accent" : "bg-secondary";
              const hoverBorderClass = stepNumber === 2 ? "hover:border-[#FB9851]" : "hover:border-[#085668]";

              return (
                <Card
                  key={index}
                  className={`relative px-8 py-2 hover:shadow-lg ${hoverBorderClass} transition-shadow`}
                >
                  <div className="flex justify-center mb-6 mt-4">
                    <div className={`w-16 h-16 rounded-full ${iconBgClass} flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 ${iconColorClass}`} />
                    </div>
                  </div>
                  <div className="width-full flex justify-center mb-4">
                    <div className={`w-9 h-9 rounded-full ${numberBgClass} flex items-center justify-center text-white font-bold text-l`}>
                      {stepNumber}
                    </div>
                  </div>
                  <h3 className="text-[#18768B] text-l font-semibold mb-3 text-center">
                    {step.stepTitle}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {step.stepDescription}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose approvU - Original Styling Preserved */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent/5 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#18768B] text-3xl md:text-4xl font-bold mb-4">
              {data.whyChooseTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.whyChooseCards.map((card: any, index: number) => {
              const IconComponent = getIconComponent(card.cardIcon);

              return (
                <Card
                  key={index}
                  className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg hover:border-[#085668] transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-[10px] bg-secondary/10 flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-[#18768B] text-xl font-semibold mb-3 text-center">
                    {card.cardTitle}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {card.cardDescription}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Services - Original Styling Preserved */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#18768B] text-3xl md:text-4xl font-bold mb-4">
              {data.servicesTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.servicesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.services.map((service: any, index: number) => {
              const IconComponent = getIconComponent(service.serviceIcon);
              const features = typeof service.serviceFeatures === 'string' 
                ? JSON.parse(service.serviceFeatures)
                : service.serviceFeatures || [];

              return (
                <Card
                  key={index}
                  className="p-8 hover:shadow-xl hover:border-[#085668] transition-all group"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    {service.serviceTitle}
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">
                    {service.serviceDescription}
                  </p>
                  <ul className="space-y-3">
                    {features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>      {/* Real Reviews - Original Styling Preserved */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#18768B] text-3xl md:text-4xl font-bold mb-4">
              {data.reviewsTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.reviewsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {data.reviews.map((review: any, index: number) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.reviewRating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-highlight text-highlight" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{review.reviewText}"
                </p>
                <div className="text-[#18768B] font-semibold">
                  {review.reviewAuthor}
                </div>
                <div className="text-sm text-muted-foreground">
                  {review.reviewLocation}
                </div>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t">
            {data.trustBadges.map((badge: any, index: number) => {
              const IconComponent = getIconComponent(badge.badgeIcon);
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold">{badge.badgeTitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lenders We Work With - Original Styling Preserved */}
      <section className="py-20 px-4 bg-gradient-to-br from-success/10 via-secondary/10 to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.lendersTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.lendersSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {(typeof data.lenders === 'string' ? JSON.parse(data.lenders) : data.lenders).map((lender: string) => (
              <Card
                key={lender}
                className="py-6 px-4 bg-white hover:shadow-lg hover:border-[#FBA05E] text-[#348699] transition-all hover:scale-105"
              >
                <div className="w-full text-center font-semibold text-sm">
                  {lender}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="text-base px-6 py-2">
              <Shield className="w-4 h-4 mr-2" />
              FSRA Licensed & Regulated
            </Badge>
          </div>
        </div>
      </section>

      {/* FAQ Section - Original Styling Preserved */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#348699] text-3xl md:text-4xl font-bold mb-4">
              {data.faqTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {data.faqSubtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full mb-8">
            {data.faqs.map((faq: any, index: number) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with Mortgage Concierge
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA - Original Styling Preserved */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent via-accent/90 to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {data.finalCtaBadgeText}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {data.finalCtaTitle}
          </h2>
          <p className="text-xl mb-8 text-white/95">
            {data.finalCtaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 bg-white text-[#FBA05E] hover:bg-white/90 shadow-xl"
            >
              <Link href={data.finalCtaPrimaryLink}>
                {data.finalCtaPrimaryText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary backdrop-blur-sm"
            >
              <Link href={data.finalCtaSecondaryLink}>
                {data.finalCtaSecondaryText}
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 text-center">
            <div className="flex flex-row items-center align-middle justify-center gap-2">
              <Clock className="w-5 h-5 text-white/90" />
              <span className="text-sm text-white/90">5-Minute Application</span>
            </div>
            <div className="flex flex-row items-center align-middle justify-center gap-2">
              <Phone className="w-5 h-5 text-white/90" />
              <span className="text-sm text-white/90">No Sales Calls</span>
            </div>
            <div className="flex flex-row items-center align-middle justify-center gap-2">
              <Shield className="w-5 h-5 text-white/90" />
              <span className="text-sm text-white/90">100% Secure & Private</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
