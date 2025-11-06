import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { FAQBlock } from "@/components/sections/FAQBlock";
import { CTASection } from "@/components/sections/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Complete Mortgage Guides | Expert Advice & Strategies | approvU",
  description:
    "Expert guides and strategies for every mortgage situation. From first-time buyers to investment properties, we've got you covered.",
};

export default function MortgageGuides() {
  const guideCategories = [
    {
      title: "First-Time Buyers",
      description:
        "Everything you need to know about buying your first home in Canada.",
      icon: "🏠",
    },
    {
      title: "Down Payment Planning",
      description:
        "Calculate and plan your down payment for different home values.",
      icon: "💰",
    },
    {
      title: "Refinancing",
      description:
        "When and how to refinance your existing mortgage to save money.",
      icon: "🔄",
    },
    {
      title: "Renewal Strategies",
      description:
        "Make the most of your mortgage renewal with expert strategies.",
      icon: "📋",
    },
    {
      title: "Investment Properties",
      description: "Financing options for rental and investment properties.",
      icon: "🏢",
    },
    {
      title: "Self-Employed Solutions",
      description: "Mortgage strategies for business owners and contractors.",
      icon: "💼",
    },
  ];

  const popularGuides = [
    {
      title: "The Complete First-Time Home Buyer Guide",
      excerpt:
        "Everything you need to know about buying your first home in Canada, from programs to closing.",
      date: "Updated Jan 2025",
      category: "First-Time Buyers",
      slug: "first-time-buyer-guide",
      readTime: "12 min",
    },
    {
      title: "Mortgage Rate Forecast 2025: What to Expect",
      excerpt:
        "Expert analysis on where mortgage rates are heading and what it means for your home purchase.",
      date: "Jan 2025",
      category: "Market Insights",
      slug: "rate-forecast-2025",
      readTime: "8 min",
    },
    {
      title: "How to Improve Your Credit Score for a Better Mortgage Rate",
      excerpt:
        "Proven strategies to boost your credit score and qualify for lower mortgage rates.",
      date: "Updated Dec 2024",
      category: "Credit Tips",
      slug: "improve-credit-score",
      readTime: "10 min",
    },
  ];

  const faqs = [
    {
      question: "What should I read first as a first-time buyer?",
      answer:
        "Start with our Complete First-Time Home Buyer Guide, then explore our mortgage basics articles and use our affordability calculator to understand your budget.",
    },
    {
      question: "How often are your guides updated?",
      answer:
        "We update our guides regularly to reflect current mortgage rates, regulations, and market conditions. All guides show their last update date.",
    },
    {
      question: "Can I download guides as PDFs?",
      answer:
        "Yes! Most of our comprehensive guides are available as downloadable PDFs. Look for the download button at the top of each guide.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Hero
        headline="Complete Mortgage Guides"
        subheadline="Expert guides and strategies for every mortgage situation. From first-time buyers to investment properties, we've got you covered."
        primaryCTA={{
          text: "Get Your Mortgage Quote",
          href: "/mortgage/approval/",
        }}
        secondaryCTA={{
          text: "Browse All Guides",
          href: "#guide-categories",
        }}
        variant="default"
        backgroundImage="/images/default-hero.jpg"
      />

      <FeaturesGrid
        title="Browse Guides by Category"
        subtitle="Find the perfect guide for your mortgage journey"
        features={guideCategories}
      />

      <section id="popular-guides" className="py-20 px-4 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Most Popular Guides
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most comprehensive and frequently accessed mortgage guides
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularGuides.map((guide, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="pt-6">
                  <Badge className="mb-4">{guide.category}</Badge>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span>{guide.date}</span>
                    <span>•</span>
                    <span>{guide.readTime} read</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 hover:text-primary-glow transition-colors">
                    <a href={`/blog/${guide.slug}/`}>{guide.title}</a>
                  </h3>
                  <p className="text-muted-foreground mb-4">{guide.excerpt}</p>
                  <a
                    href={`/blog/${guide.slug}/`}
                    className="text-primary font-semibold hover:text-primary-glow flex items-center gap-2"
                  >
                    Read Guide →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/blog/"
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-glow transition-colors"
            >
              View All Guides
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Complete Guide to Mortgage Guides and Resources
            </h2>

            <p className="text-lg mb-6">
              Navigating the Canadian mortgage landscape requires knowledge,
              strategy, and access to reliable information. Our comprehensive
              mortgage guides cover every aspect of home financing, from basic
              concepts for first-time buyers to advanced strategies for
              investors and refinancers.
            </p>

            <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">
              Why Our Guides Stand Out
            </h3>
            <p className="mb-6">
              Our mortgage guides are written by licensed mortgage professionals
              with years of industry experience. We update content regularly to
              reflect current market conditions, interest rate trends, and
              regulatory changes, ensuring you always have access to the most
              accurate and relevant information.
            </p>
          </div>
        </div>
      </section>

      <FAQBlock title="Guide FAQs" faqs={faqs} />

      <CTASection
        headline="Ready to Apply What You've Learned?"
        description="Get personalized mortgage advice from our experts and start your application"
        primaryCTA={{
          text: "Get Pre-Approved",
          href: "/mortgage/approval/",
        }}
      />
    </div>
  );
}
