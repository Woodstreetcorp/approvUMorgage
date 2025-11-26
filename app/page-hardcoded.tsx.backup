import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
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

export const metadata: Metadata = {
  title: "approvU - Best Mortgage Rates & Expert Guidance Across Canada",
  description:
    "Find the best mortgage rates in Canada with approvU. Expert guidance for first-time buyers, refinancing, renewals, and investment properties. Get pre-approved in minutes.",
};

// Data configurations
const howItWorksSteps = [
  {
    icon: MessageCircle,
    iconBg: "secondary/10",
    iconColor: "secondary",
    number: 1,
    hoverBorder: "#085668",
    title: "Tell us about you & your goals",
    description:
      "Smart, conversational quiz that learns what matters most to you",
  },
  {
    icon: TrendingUp,
    iconBg: "accent/10",
    iconColor: "accent",
    number: 2,
    hoverBorder: "#FB9851",
    title: "Get Matched to Real Mortgage Offers",
    description:
      "Based on your real profile, not estimates. See actual rates and terms",
  },
  {
    icon: Shield,
    iconBg: "success/10",
    iconColor: "success",
    number: 3,
    hoverBorder: "#085668",
    title: "Enjoy Personalized Concierge Guidance",
    description:
      "Human + Tech support, zero-pressure. We're here when you need us",
  },
];

const whyChooseCards = [
  {
    icon: Users,
    iconBg: "accent/10",
    iconColor: "accent",
    hoverBorder: "#FB9851",
    title: "Personalized Offers",
    description:
      "Real mortgage offers based on your unique profile, not generic estimates",
  },
  {
    icon: MessageCircle,
    iconBg: "secondary/10",
    iconColor: "secondary",
    hoverBorder: "#085668",
    title: "Concierge Guidance",
    description:
      "Human + AI support when you need it, zero pressure when you don't",
  },
  {
    icon: Shield,
    iconBg: "secondary/10",
    iconColor: "success",
    hoverBorder: "#085668",
    title: "No Sales Pressure",
    description: "Work at your own pace with complete transparency and trust",
  },
];

const services = [
  {
    icon: HomeIcon,
    gradientFrom: "accent",
    gradientTo: "accent/70",
    hoverBorder: "#FB9851",
    title: "First-Time Home Purchase",
    description:
      "Navigate your first home purchase with confidence. Get personalized guidance, competitive rates, and exclusive first-time buyer incentives.",
    features: [
      "Down payment assistance programs",
      "Pre-approval with rate guarantee",
      "Free home buying education",
    ],
    iconColor: "accent",
  },
  {
    icon: TrendingUp,
    gradientFrom: "secondary",
    gradientTo: "secondary/70",
    hoverBorder: "#085668",
    title: "Mortgage Refinancing",
    description:
      "Optimize your existing mortgage with better rates, terms, or access your home equity for renovations and investments.",
    features: [
      "Rate reduction analysis",
      "Home equity access options",
      "Debt consolidation strategies",
    ],
    iconColor: "secondary",
  },
  {
    icon: LucideBanknote,
    gradientFrom: "secondary",
    gradientTo: "secondary/70",
    hoverBorder: "#085668",
    title: "Investment Properties",
    description:
      "Build your real estate portfolio with specialized investment property financing and rental income analysis.",
    features: [
      "Rental income qualification",
      "Portfolio expansion strategies",
      "Commercial property options",
    ],
    iconColor: "secondary",
  },
  {
    icon: Shield,
    gradientFrom: "secondary",
    gradientTo: "secondary/70",
    hoverBorder: "#085668",
    title: "Mortgage Protection",
    description:
      "Protect your investment with comprehensive mortgage insurance and life protection solutions.",
    features: [
      "Mortgage life insurance",
      "Disability income protection",
      "Home and property insurance",
    ],
    iconColor: "secondary",
  },
];

const reviews = [
  {
    rating: 5,
    text: "Fast, transparent, and no sales pressure! Got my mortgage approved in 3 days. 🎉",
    author: "Sarah M.",
    location: "First-time buyer, Toronto",
  },
  {
    rating: 5,
    text: "Finally found a mortgage platform that actually saves me money. The incentives are real! 💰",
    author: "Michael C.",
    location: "Refinance client, Vancouver",
  },
  {
    rating: 5,
    text: "The concierge service is amazing. They answered all my questions without any pressure. ⭐",
    author: "Lisa R.",
    location: "Investment property, Calgary",
  },
];

const trustBadges = [
  {
    icon: LucideMedal,
    title: "Trustpilot Excellent",
  },
  {
    icon: Star,
    title: "4.9/5 Google Reviews",
  },
  {
    icon: Shield,
    title: "FSRA Licensed",
  },
];

const lenders = [
  "TD Bank",
  "RBC",
  "BMO",
  "Scotiabank",
  "CIBC",
  "MCAP",
  "First National",
  "CMLS",
  "Meridian",
  "DUCA",
  "RFA",
  "B2B Bank",
];

const faqs = [
  {
    question: "How is approvU different from a mortgage broker?",
    answer:
      "Unlike traditional brokers, we use technology to match you with personalized offers from multiple lenders without any sales pressure. Our concierge service provides guidance when you need it, but you're always in control of the process.",
  },
  {
    question: "Is it safe to submit my information?",
    answer:
      "Absolutely. We use bank-level encryption and are fully licensed with FSRA. Your information is secure and never shared without your explicit consent. We're committed to protecting your privacy.",
  },
  {
    question: "Will this impact my credit score?",
    answer:
      "No, getting qualified through approvU does not impact your credit score. We only perform a soft credit check initially, which doesn't affect your rating. Hard credit checks only happen when you're ready to proceed with a specific lender.",
  },
  {
    question: "Who are the advisors helping me?",
    answer:
      "Our mortgage concierges are licensed professionals with years of experience in Canadian mortgage lending. They're supported by our AI technology to provide you with the best possible guidance and options.",
  },
];

const finalCTAFeatures = [
  {
    icon: Clock,
    text: "5-Minute Application",
  },
  {
    icon: Phone,
    text: "No Sales Calls",
  },
  {
    icon: Shield,
    text: "100% Secure & Private",
  },
];

export default function Home() {
  return (
    <>
      {/* Schema Markup for SEO - Invisible to users, only for Google */}
      <SchemaMarkup schema={[organizationSchema, websiteSchema]} />
      
      <Hero
        title="Your Mortgage. Matched to Your Life."
        subtitle="No haggling. No confusion. Just personalized mortgage offers that help you achieve your homeownership dreams."
        ctaText="Get Qualified in Minutes"
        ctaLink="/mortgage/approval/"
        secondaryCTA="Compare Offers"
        secondaryCTALink="/mortgage/rates"
        backgroundImage="/images/hero/hero-family-home.jpg"
      />

      {/* How approvU Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#18768B] text-3xl md:text-4xl font-bold mb-4">
              How approvU Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to your perfect mortgage match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step) => {
              const IconComponent = step.icon;

              // Determine classes based on step number
              const iconBgClass =
                step.number === 1
                  ? "bg-secondary/10"
                  : step.number === 2
                  ? "bg-accent/10"
                  : "bg-success/10";
              const iconColorClass =
                step.number === 1
                  ? "text-secondary"
                  : step.number === 2
                  ? "text-accent"
                  : "text-success";
              const numberBgClass =
                step.number === 1
                  ? "bg-secondary"
                  : step.number === 2
                  ? "bg-accent"
                  : "bg-secondary";
              const hoverBorderClass =
                step.number === 2
                  ? "hover:border-[#FB9851]"
                  : "hover:border-[#085668]";

              return (
                <Card
                  key={step.number}
                  className={`relative px-8 py-2 hover:shadow-lg ${hoverBorderClass} transition-shadow`}
                >
                  <div className="flex justify-center mb-6 mt-4">
                    <div
                      className={`w-16 h-16 rounded-full ${iconBgClass} flex items-center justify-center`}
                    >
                      <IconComponent className={`w-8 h-8 ${iconColorClass}`} />
                    </div>
                  </div>
                  <div className="width-full flex justify-center mb-4">
                    <div
                      className={`w-9 h-9 rounded-full ${numberBgClass} flex items-center justify-center text-white font-bold text-l`}
                    >
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-[#18768B] text-l font-semibold mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {step.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose approvU */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent/5 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#18768B] text-3xl md:text-4xl font-bold mb-4">
              Why Choose approvU
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience mortgage lending reimagined
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseCards.map((card, index) => {
              const IconComponent = card.icon;

              // Determine classes based on card type
              const iconBgClass =
                card.iconColor === "accent"
                  ? "bg-accent/10"
                  : "bg-secondary/10";
              const iconColorClass =
                card.iconColor === "accent"
                  ? "text-accent"
                  : card.iconColor === "secondary"
                  ? "text-secondary"
                  : "text-success";
              const hoverBorderClass =
                card.hoverBorder === "#FB9851"
                  ? "hover:border-[#FB9851]"
                  : "hover:border-[#085668]";

              return (
                <Card
                  key={index}
                  className={`p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg ${hoverBorderClass} transition-all`}
                >
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-14 h-14 rounded-[10px] ${iconBgClass} flex items-center justify-center`}
                    >
                      <IconComponent className={`w-7 h-7 ${iconColorClass}`} />
                    </div>
                  </div>
                  <h3 className="text-[#18768B] text-xl font-semibold mb-3 text-center">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {card.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#18768B] text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive mortgage solutions for every stage of homeownership
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;

              // Determine classes based on service type
              const gradientClass =
                service.gradientFrom === "accent"
                  ? "bg-gradient-to-br from-accent to-accent/70"
                  : service.gradientFrom === "secondary"
                  ? "bg-gradient-to-br from-secondary to-secondary/70"
                  : service.gradientFrom === "success"
                  ? "bg-gradient-to-br from-success to-success/70"
                  : "bg-gradient-to-br from-highlight to-highlight/70";

              const checkColorClass =
                service.iconColor === "accent"
                  ? "text-accent"
                  : service.iconColor === "secondary"
                  ? "text-secondary"
                  : service.iconColor === "success"
                  ? "text-success"
                  : "text-highlight";

              const hoverBorderClass =
                service.hoverBorder === "#FB9851"
                  ? "hover:border-[#FB9851]"
                  : "hover:border-[#085668]";

              return (
                <Card
                  key={index}
                  className={`p-8 hover:shadow-xl ${hoverBorderClass} transition-all group`}
                >
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-20 h-20 rounded-full ${gradientClass} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <Check
                          className={`w-5 h-5 ${checkColorClass} flex-shrink-0`}
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Reviews */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#18768B] text-3xl md:text-4xl font-bold mb-4">
              Real Reviews from Real Clients
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what homeowners are saying about their approvU experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {reviews.map((review, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-highlight text-highlight"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{review.text}"
                </p>
                <div className="text-[#18768B] font-semibold">
                  {review.author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {review.location}
                </div>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold">{badge.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lenders We Work With */}
      <section className="py-20 px-4 bg-gradient-to-br from-success/10 via-secondary/10 to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Canada's Leading Lenders
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Over 15,000 deals matched to 25+ lenders nationwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {lenders.map((lender) => (
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

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#348699] text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about our process
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full mb-8">
            {faqs.map((faq, index) => (
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

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent via-accent/90 to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm"
          >
            ✨ Over 25,000 Happy Homeowners
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to find your{" "}
            <span className="text-highlight">best mortgage match</span>?
          </h2>
          <p className="text-xl mb-8 text-white/95">
            Join thousands of Canadians who've trusted approvU to simplify their
            mortgage journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 bg-white text-[#FBA05E] hover:bg-white/90 shadow-xl"
            >
              <Link href="/mortgage/approval/">
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary backdrop-blur-sm"
            >
              <Link href="/mortgage/rates">Compare Offers</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 text-center">
            {finalCTAFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-row items-center align-middle justify-center gap-2"
                >
                  <IconComponent className="w-5 h-5 text-white/90" />
                  <span className="text-sm text-white/90">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
