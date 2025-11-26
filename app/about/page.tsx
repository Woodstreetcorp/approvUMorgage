/**
 * HYBRID ABOUT PAGE - OPTION C
 * 
 * Combines:
 * ✅ Original client-approved design/styling (100% preserved)
 * ✅ Strapi CMS content editability (all text editable)
 * ✅ Automatic fallback to original hardcoded content if Strapi fails
 * 
 * Original Backup: app/about/page-hardcoded.tsx.backup
 */

import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import CTASection from "@/components/sections/CTASection";
import { getAboutPage, getStrapiMediaUrl } from "@/lib/strapi";

// Hardcoded fallback data - preserves approved design
const FALLBACK_DATA = {
  heroTitle: "Empowering Canadians to Secure the Best Mortgage — Faster, Smarter, and With More Value",
  heroSubtitle: "We combine technology, expertise, and exclusive partnerships to simplify your path to homeownership.",
  heroCtaText: "Start My Online Approval",
  heroCtaLink: "/mortgage/approval/",
  heroBackgroundImage: "/images/features/multigenerational-family.jpg",
  
  missionVisionTitle: "Our Mission & Vision",
  missionVisionSubtitle: "The principles that guide everything we do",
  missionVisionCards: [
    {
      title: "Our Mission",
      content: "To help Canadians achieve homeownership with confidence by combining fast technology, expert guidance, and value-added partner offers.",
      icon: "🎯"
    },
    {
      title: "Our Vision", 
      content: "A world where every homebuyer gets the best mortgage — and more — without stress, guesswork, or hidden fees.",
      icon: "🌟"
    }
  ],
  
  differentiatorsTitle: "What Makes approvU Different",
  differentiatorsSubtitle: "Why thousands of Canadians choose approvU for their mortgage needs",
  differentiators: [
    {
      title: "Fast Approvals",
      description: "Get matched with top lenders in minutes, not days. Our smart technology streamlines the entire approval process.",
      icon: "⚡"
    },
    {
      title: "Expert Guidance",
      description: "Licensed mortgage brokers guide you through every step, ensuring you make informed decisions with confidence.",
      icon: "🧠"
    },
    {
      title: "Exclusive Offers",
      description: "Unlock partner perks with every mortgage - from moving discounts to free legal services and home warranties.",
      icon: "🎁"
    },
    {
      title: "Trusted & Secure",
      description: "FSRA-licensed and fully digital platform with bank-level security protecting your personal information.",
      icon: "🔒"
    }
  ],
  
  storyTitle: "Our Story",
  storySubtitle: "Who we are and why we exist",
  storyParagraph1: "approvU Mortgage was founded on the belief that homeownership should be simple, transparent, and rewarding. We've built a platform that merges smart technology with human expertise, helping Canadians compare, qualify, and close their mortgages faster — while enjoying exclusive benefits from our trusted partners.",
  storyParagraph2: "As a fully licensed mortgage brokerage under the Financial Services Regulatory Authority of Ontario (FSRA), we maintain the highest standards of professionalism and regulatory compliance while delivering an innovative digital experience.",
  storyParagraph3: "Our team combines decades of mortgage industry expertise with cutting-edge technology to ensure you get not just a mortgage, but the right mortgage for your unique situation.",
  
  statsTitle: "By the Numbers",
  stats: [
    { value: "25,000+", label: "Happy Homeowners" },
    { value: "25+", label: "Lending Partners" },
    { value: "$2.5B+", label: "Mortgages Funded" },
    { value: "4.9/5", label: "Client Rating" }
  ],
  
  quoteText: "We're obsessed with your experience — from approval to closing and beyond.",
  
  teamTitle: "Leadership Team",
  teamSubtitle: "Meet the experienced professionals leading approvU's mission to transform Canadian mortgages",
  teamMembers: [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "15+ years in mortgage lending and fintech innovation. Former VP at major Canadian bank.",
      credentials: "MBA Finance, CPA"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Former tech lead at major Canadian banks. Expert in AI, automation, and financial services technology.",
      credentials: "M.Sc Computer Science"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Mortgage Services",
      bio: "Licensed mortgage professional with 12+ years of client experience across all mortgage types.",
      credentials: "FSRA Licensed, CAAMP Member"
    }
  ],
  
  complianceTitle: "Licensed & Regulated",
  complianceSubtitle: "approvU Mortgage operates under the highest regulatory standards to protect our clients and maintain industry trust.",
  complianceBadges: [
    {
      title: "FSRA Licensed",
      description: "Licensed mortgage brokerage under Financial Services Regulatory Authority of Ontario",
      icon: "🏛️"
    },
    {
      title: "Privacy Compliant",
      description: "Full compliance with Canadian privacy laws and data protection regulations",
      icon: "🔒"
    },
    {
      title: "Insured & Bonded",
      description: "Professional liability insurance and bonding for complete client protection",
      icon: "🛡️"
    }
  ],
  
  ctaTitle: "Ready to find your perfect mortgage?",
  ctaDescription: "Join thousands of Canadians who've experienced the approvU difference. Fast approvals, expert guidance, exclusive offers.",
  ctaButtonText: "Start My Online Approval",
  ctaButtonLink: "/mortgage/approval/",
  
  metaTitle: "About approvU Mortgage | Online Mortgage Brokerage in Canada",
  metaDescription: "Learn how approvU Mortgage helps Canadians secure the best mortgage with fast approvals, expert guidance, and exclusive partner offers. FSRA licensed mortgage brokerage."
};

// Generate metadata from Strapi
export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutPage = await getAboutPage();
    
    return {
      title: aboutPage?.metaTitle || FALLBACK_DATA.metaTitle,
      description: aboutPage?.metaDescription || FALLBACK_DATA.metaDescription,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: FALLBACK_DATA.metaTitle,
      description: FALLBACK_DATA.metaDescription,
    };
  }
}

export default async function About() {
  let strapiData = null;
  
  try {
    strapiData = await getAboutPage();
  } catch (error) {
    console.error('Error fetching about page data:', error);
  }

  // Hybrid approach: Use Strapi data OR fallback to original hardcoded values
  const data = {
    heroTitle: strapiData?.heroTitle || FALLBACK_DATA.heroTitle,
    heroSubtitle: strapiData?.heroSubtitle || FALLBACK_DATA.heroSubtitle,
    heroCtaText: strapiData?.heroCtaText || FALLBACK_DATA.heroCtaText,
    heroCtaLink: strapiData?.heroCtaLink || FALLBACK_DATA.heroCtaLink,
    heroBackgroundImage: strapiData?.heroBackgroundImage?.url 
      ? getStrapiMediaUrl(strapiData.heroBackgroundImage.url) 
      : FALLBACK_DATA.heroBackgroundImage,
    
    missionVisionTitle: strapiData?.missionVisionTitle || FALLBACK_DATA.missionVisionTitle,
    missionVisionSubtitle: strapiData?.missionVisionSubtitle || FALLBACK_DATA.missionVisionSubtitle,
    missionVisionCards: strapiData?.missionVisionCards?.length > 0 
      ? strapiData.missionVisionCards 
      : FALLBACK_DATA.missionVisionCards,
    
    differentiatorsTitle: strapiData?.differentiatorsTitle || FALLBACK_DATA.differentiatorsTitle,
    differentiatorsSubtitle: strapiData?.differentiatorsSubtitle || FALLBACK_DATA.differentiatorsSubtitle,
    differentiators: strapiData?.differentiators?.length > 0 
      ? strapiData.differentiators 
      : FALLBACK_DATA.differentiators,
    
    storyTitle: strapiData?.storyTitle || FALLBACK_DATA.storyTitle,
    storySubtitle: strapiData?.storySubtitle || FALLBACK_DATA.storySubtitle,
    storyParagraph1: strapiData?.storyParagraph1 || FALLBACK_DATA.storyParagraph1,
    storyParagraph2: strapiData?.storyParagraph2 || FALLBACK_DATA.storyParagraph2,
    storyParagraph3: strapiData?.storyParagraph3 || FALLBACK_DATA.storyParagraph3,
    
    statsTitle: strapiData?.statsTitle || FALLBACK_DATA.statsTitle,
    stats: strapiData?.stats?.length > 0 
      ? strapiData.stats 
      : FALLBACK_DATA.stats,
    
    quoteText: strapiData?.quoteText || FALLBACK_DATA.quoteText,
    
    teamTitle: strapiData?.teamTitle || FALLBACK_DATA.teamTitle,
    teamSubtitle: strapiData?.teamSubtitle || FALLBACK_DATA.teamSubtitle,
    teamMembers: strapiData?.teamMembers?.length > 0 
      ? strapiData.teamMembers 
      : FALLBACK_DATA.teamMembers,
    
    complianceTitle: strapiData?.complianceTitle || FALLBACK_DATA.complianceTitle,
    complianceSubtitle: strapiData?.complianceSubtitle || FALLBACK_DATA.complianceSubtitle,
    complianceBadges: strapiData?.complianceBadges?.length > 0 
      ? strapiData.complianceBadges 
      : FALLBACK_DATA.complianceBadges,
    
    ctaTitle: strapiData?.ctaTitle || FALLBACK_DATA.ctaTitle,
    ctaDescription: strapiData?.ctaDescription || FALLBACK_DATA.ctaDescription,
    ctaButtonText: strapiData?.ctaButtonText || FALLBACK_DATA.ctaButtonText,
    ctaButtonLink: strapiData?.ctaButtonLink || FALLBACK_DATA.ctaButtonLink,
  };

  const missionVision = data.missionVisionCards;
  const differentiators = data.differentiators;

  return (
    <>
      {/* Hero Section - Original Styling Preserved */}
      <Hero
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        ctaText={data.heroCtaText}
        ctaLink={data.heroCtaLink}
        backgroundImage={data.heroBackgroundImage}
      />

      {/* Mission & Vision - Original Styling Preserved */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.missionVisionTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.missionVisionSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {missionVision.map((item, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-center">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different - Original Styling Preserved */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.differentiatorsTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.differentiatorsSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story - Original Styling Preserved */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.storyTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.storySubtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                {data.storyParagraph1}
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                {data.storyParagraph2}
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                {data.storyParagraph3}
              </p>
            </div>
            <div className="bg-gradient-to-br from-muted to-card p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-6">{data.statsTitle}</h3>
              <div className="grid grid-cols-2 gap-6">
                {data.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section - Original Styling Preserved */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-semibold text-foreground italic">
            "{data.quoteText}"
          </blockquote>
        </div>
      </section>

      {/* Leadership Team - Original Styling Preserved */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.teamTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {data.teamSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {data.teamMembers.map((member, index) => (
              <div key={index} className="bg-muted rounded-2xl p-8 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                <p className="text-secondary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{member.bio}</p>
                <p className="text-xs text-muted-foreground font-medium">{member.credentials}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing & Compliance - Original Styling Preserved */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {data.complianceTitle}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {data.complianceSubtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {data.complianceBadges.map((badge, index) => (
              <div key={index} className="bg-card p-6 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{badge.icon}</span>
                </div>
                <h3 className="font-semibold text-primary mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection 
        title={data.ctaTitle}
        description={data.ctaDescription}
        ctaText={data.ctaButtonText}
        ctaLink={data.ctaButtonLink}
      />
    </>
  );
}
