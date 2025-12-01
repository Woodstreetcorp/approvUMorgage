import { Metadata } from "next";
import { getMortgagePage } from '@/lib/strapi';
import Hero from "@/components/sections/Hero";
import CTASection from "@/components/sections/CTASection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getMortgagePage('mortgage-main');
  
  return {
    title: pageData?.metaTitle || "Mortgage Solutions | approvU",
    description: pageData?.metaDescription || "Comprehensive mortgage guidance, calculators, rates, and expert advice for Canadian homebuyers and homeowners.",
  };
}

export default async function MortgagePage() {
  let pageData = null;
  try {
    pageData = await getMortgagePage('mortgage-main');
  } catch (error) {
    console.error('Error fetching mortgage page data:', error);
  }

  const heroTitle = pageData?.heroTitle || "Your Mortgage Journey Starts Here";
  const heroSubtitle = pageData?.heroSubtitle || "Expert guidance, competitive rates, and personalized solutions for every Canadian homebuyer";
  const sections = [
    {
      title: "Mortgage Solutions",
      href: "/mortgage/solutions",
      description:
        "Explore mortgage options tailored to your unique situation - first-time buyers, self-employed, investors and more.",
    },
    {
      title: "Mortgage Calculators",
      href: "/mortgage/calculators",
      description:
        "Calculate payments, affordability, down payments and land transfer taxes accross Canada.",
    },
    {
      title: "Mortgage Rates",
      href: "/mortgage/rates",
      description:
        "Compare the latest fixed and variable mortgage rates from top Canadian lenders.",
    },
    {
      title: "First-Time Homebuyer Guide",
      href: "/mortgage/brokers",
      description:
        "Everything first-time homebuyers need to know about mortgages, incentives, and the homebuying process.",
    },
    {
      title: "Mortgage Basics",
      href: "/mortgage/basics",
      description:
        "Learn mortgage fundamentals, terminology, and how mortgages work in Canada.",
    },
    {
      title: "Mortgage Guides",
      href: "/mortgage/guides",
      description:
        "In-depth guides covering every aspect of mortgages, from application to renewal.",
    },
  ];
  const faqs = [
    {
      question: "What credit score do I need for a mortgage in Canada?",
      answer:
        "Most lenders require a minimum credit score of 600-680 for conventional mortgages. However, some programs accept lower scores, and higher scores (above 700) typically qualify for better rates.",
    },
    {
      question: "How much down payment do I need?",
      answer:
        "Minimum down payment depends on purchase price: 5% for homes under $500k, 5% on first $500k + 10% on remainder up to $1M, and 20% for homes over $1M. Larger down payments avoid CMHC insurance fees.",
    },
    {
      question:
        "What's the difference between pre-qualification and pre-approval?",
      answer:
        "Pre-qualification is an estimate based on self-reported information. Pre-approval involves document verification and a credit check, giving you a firm commitment from a lender for a specific amount.",
    },
    {
      question: "Should I choose fixed or variable rate?",
      answer:
        "Fixed rates provide payment stability and protection from rate increases. Variable rates are typically lower but can fluctuate with Bank of Canada rate changes. Your choice depends on risk tolerance and financial situation.",
    },
  ];

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaText="✨ Get Pre-Approved Today"
        ctaLink="/mortgage-appointment-online"
        secondaryCTA="Explore Solutions"
        secondaryCTALink="/mortgage/solutions"
        backgroundImage="/images/default-hero.jpg"
        variant="default"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="block p-6 bg-gray-50 rounded-lg hover:shadow-lg transition border border-gray-200 hover:border-[#18768B] hover:text-[#18768B]"
              >
                <h3 className="text-xl font-semibold mb-2 ">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
                <span className="text-primary-600 font-medium mt-2 inline-block">
                  Learn More →
                </span>
              </a>
            ))}
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
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="hover:bg-gray-100"
              >
                <AccordionTrigger className="text-left text-[#18768B]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTASection
        title="Need Help Choosing?"
        description="Our mortgage experts are here to guide you through every step"
        ctaText="Talk to an Expert"
        ctaLink="/approu-contact-details"
      />
    </>
  );
}
