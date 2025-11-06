import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StepsSection from "@/components/sections/StepsSection";
import FAQBlock from "@/components/sections/FAQBlock";
import CTASection from "@/components/sections/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Mortgage Pre-Approval in Minutes | approvU Mortgage",
  description:
    "Get pre-approved for your mortgage online in minutes. No credit impact, fast approvals, expert guidance, and offers from 25+ Canadian lenders.",
};

export default function MortgageApproval() {
  const approvalSteps = [
    {
      number: "1",
      title: "Submit Your Information",
      description: "Complete our secure online application in 5 minutes.",
      icon: "📝",
    },
    {
      number: "2",
      title: "Document Verification",
      description: "Upload your documents through our encrypted portal.",
      icon: "📄",
    },
    {
      number: "3",
      title: "Get Your Approval",
      description:
        "Receive your pre-approval and personalized offers from top lenders.",
      icon: "🏠",
    },
  ];

  const benefits = [
    {
      title: "Fast Approvals",
      description: "Pre-approved in as little as 24 hours.",
      icon: "⚡",
    },
    {
      title: "Expert Support",
      description: "Licensed brokers guide you through every step.",
      icon: "🧠",
    },
    {
      title: "No Credit Impact",
      description: "Soft check, no score reduction.",
      icon: "💡",
    },
    {
      title: "Multiple Options",
      description: "Compare offers from 25+ lenders.",
      icon: "🏦",
    },
  ];

  const faqs = [
    {
      question: "Will this affect my credit score?",
      answer:
        "No, our initial pre-approval uses a soft credit check which doesn't impact your credit score. Only when you're ready to proceed with a lender will a hard credit check be required.",
    },
    {
      question: "How long does pre-approval take?",
      answer:
        "Most applications are processed within 24 hours. Complex situations may take up to 2-3 business days, but we'll keep you updated throughout the process.",
    },
    {
      question: "What documents do I need?",
      answer:
        "Typically you'll need proof of income (pay stubs, T4s), employment verification, bank statements, and ID. We'll provide a detailed list based on your specific situation.",
    },
    {
      question: "Is approvU licensed?",
      answer:
        "Yes, approvU is licensed by FSRA (Financial Services Regulatory Authority of Ontario) and follows all Canadian mortgage broker regulations. Your data is secure and confidential.",
    },
    {
      question: "How many lenders do you work with?",
      answer:
        "We partner with 25+ major Canadian lenders including banks, credit unions, and alternative lenders to find you the best rates and terms.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 px-4 text-center text-white bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Get Approved in Minutes — 100% Online
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Fast, transparent mortgage pre-approval with no credit impact.
            Compare personalized offers from 25+ lenders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
            >
              Start My Application
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              Chat with an Expert
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-lg">✅</span>
              <span className="font-medium ml-2">No Credit Impact</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-lg">🛡️</span>
              <span className="font-medium ml-2">FSRA Licensed</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-lg">🔒</span>
              <span className="font-medium ml-2">Secure & Confidential</span>
            </div>
          </div>
        </div>
      </section>

      <StepsSection
        title="How It Works"
        subtitle="Getting pre-approved has never been easier."
        steps={approvalSteps}
      />

      <section className="py-20 px-4 bg-muted">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Homebuyers Choose approvU
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the smarter way to get mortgage-approved.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-card-hover cursor-pointer group"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-2xl mb-6 mx-auto text-white shadow-lg">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Get Your Pre-Approval in Minutes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Answer a few quick questions to see your best options.
            </p>
          </div>

          <Card className="bg-white rounded-2xl shadow-xl p-8 border border-primary/10">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    💰 Annual Income
                  </label>
                  <select className="w-full p-4 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option>Select income range</option>
                    <option>Under $50,000</option>
                    <option>$50,000 - $75,000</option>
                    <option>$75,000 - $100,000</option>
                    <option>$100,000 - $150,000</option>
                    <option>$150,000+</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    🏠 Down Payment
                  </label>
                  <select className="w-full p-4 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option>Select down payment</option>
                    <option>5% - 9%</option>
                    <option>10% - 14%</option>
                    <option>15% - 19%</option>
                    <option>20% or more</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    💼 Employment Type
                  </label>
                  <select className="w-full p-4 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option>Select employment type</option>
                    <option>Full-time employed</option>
                    <option>Part-time employed</option>
                    <option>Self-employed</option>
                    <option>Contract/Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    ⭐ Credit Score Range
                  </label>
                  <select className="w-full p-4 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option>Select credit range</option>
                    <option>Excellent (750+)</option>
                    <option>Good (650-749)</option>
                    <option>Fair (600-649)</option>
                    <option>Building Credit (Under 600)</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  🏡 Mortgage Type
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {["Purchase", "Refinance", "Renewal"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center p-4 border-2 border-input rounded-xl hover:bg-card-hover hover:border-primary cursor-pointer transition-all duration-200"
                    >
                      <input
                        type="radio"
                        name="mortgage-type"
                        className="mr-3 accent-primary"
                      />
                      <span className="font-semibold text-foreground">
                        {type === "Purchase" && "🏠 "}
                        {type === "Refinance" && "🔄 "}
                        {type === "Renewal" && "📋 "}
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:from-primary-glow hover:to-primary px-10 py-5 text-xl font-bold rounded-full shadow-2xl"
                >
                  🎯 Get My Pre-Approval Now
                </Button>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-lg">✅</span>
                    <span>No Credit Impact</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-lg">🛡️</span>
                    <span>Secure & Confidential</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-lg">⚡</span>
                    <span>Takes 2 Minutes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FAQBlock title="Questions About the Process?" faqs={faqs} />

      <CTASection
        headline="Ready to Get Started?"
        description="Join thousands of Canadians who chose approvU for their mortgage approval."
        primaryCTA={{
          text: "Start My Application",
          href: "/mortgage/approval/start",
        }}
      />
    </div>
  );
}
