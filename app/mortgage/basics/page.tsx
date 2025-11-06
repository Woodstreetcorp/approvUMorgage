import Hero from "@/components/sections/Hero";
import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Mortgage Basics",
  description:
    "Learn the fundamentals of mortgages in Canada including terms, concepts, and essential information.",
};

const faqs = [
  {
    question: "What's the difference between mortgage term and amortization?",
    answer:
      "The mortgage term is the length of your current mortgage agreement (typically 1-10 years), while amortization is the total time it takes to pay off the entire mortgage (usually 25-30 years). You'll renew your mortgage several times over the amortization period.",
  },
  {
    question: "Do I need mortgage insurance?",
    answer:
      "CMHC or other mortgage default insurance is required if your down payment is less than 20% of the home's value. This insurance protects the lender if you default. With 20%+ down payment, you can avoid this insurance premium.",
  },
  {
    question: "Can I switch mortgage types during my term?",
    answer:
      "Switching from variable to fixed (or vice versa) during your term is possible but usually involves breaking your mortgage contract, which can result in penalties. Some lenders offer more flexible conversion options.",
  },
  {
    question: "What happens at mortgage renewal?",
    answer:
      "At the end of your term, you can renew with your current lender, switch to a new lender, or pay off the remaining balance. This is an opportunity to renegotiate your rate and terms without penalties.",
  },
];

export default function MortgageBasicsPage() {
  return (
    <>
      <Hero
        title="Master Mortgage Fundamentals"
        subtitle="Build a solid understanding of how mortgages work in Canada with our comprehensive basics guide"
        ctaText="✨ Get Pre-Approved"
        ctaLink="/mortgage/approval"
        secondaryCTA="Use Calculators"
        secondaryCTALink="/mortgage/calculators"
        backgroundImage="/images/default-hero.jpg"
        variant="default"
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          Understanding Mortgages in Canada
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          A mortgage is one of the biggest financial commitments most Canadians
          will make. Whether you're a first-time buyer or experienced homeowner,
          understanding mortgage basics helps you make informed decisions and
          potentially save thousands of dollars over your loan's lifetime.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          This section covers everything from how mortgages work to the
          different types available, helping you navigate the Canadian mortgage
          landscape with confidence.
        </p>
        <h1 className="text-4xl font-bold mb-6">Essential Mortgage Topics</h1>
        {(() => {
          const mortgageTopics = [
            {
              id: "1",
              title: "What is a Mortgage?",
              href: "/mortgage/basics/what-is-mortgage/",
              description:
                "Learn the fundamentals of how mortgages work in Canada, including principal, interest, and amortization.",
            },
            {
              id: "2",
              title: "Mortgage Stress Test",
              href: "/mortgage/basics/mortgage-stress-test/",
              description:
                "Understand Canada's mortgage stress test and how it affects your borrowing capacity.",
            },
            {
              id: "3",
              title: "Fixed vs Variable Rates",
              href: "/mortgage/basics/fixed-vs-variable/",
              description:
                "Compare fixed and variable rate mortgages to determine which option suits your financial situation.",
            },
            {
              id: "4",
              title: "Mortgage Terms Explained",
              href: "/mortgage/basics/mortgage-terms/",
              description:
                "Demystify common mortgage terminology from amortization to CMHC insurance.",
            },
            {
              id: "5",
              title: "Assumable Mortgages",
              href: "/mortgage/basics/assumable-mortgage/",
              description:
                "Learn how assumable mortgages work and when they might benefit buyers and sellers.",
            },
            {
              id: "6",
              title: "Private Mortgages",
              href: "/mortgage/basics/private-mortgages/",
              description:
                "Explore private mortgage options for borrowers who don't qualify with traditional lenders.",
            },
            {
              id: "7",
              title: "Blended Mortgages",
              href: "/mortgage/basics/blended-mortgage/",
              description:
                "Understand how blended mortgage rates combine existing and new rates during refinancing.",
            },
            {
              id: "8",
              title: "Mortgage Pre-Payment Options",
              href: "/mortgage/basics/prepayment-options/",
              description:
                "Learn about prepayment privileges and how they can help you pay off your mortgage faster.",
            },
          ];

          return (
            <div className="grid md:grid-cols-3 gap-6 ">
              {mortgageTopics.map((topic) => (
                <a
                  key={topic.href}
                  href={topic.href}
                  className="p-6 border rounded-lg hover:shadow-lg transition hover:text-[#18768B] hover:border-[#18768B]"
                >
                  <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                  <span className="text-primary-600 font-medium mt-2 inline-block">
                    Learn More →
                  </span>
                </a>
              ))}
            </div>
          );
        })()}
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
      </div>
    </>
  );
}
