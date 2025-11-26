import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About approvU Mortgage | Online Mortgage Brokerage in Canada",
  description: "Learn how approvU Mortgage helps Canadians secure the best mortgage with fast approvals, expert guidance, and exclusive partner offers. FSRA licensed mortgage brokerage.",
};

export default function About() {
  const missionVision = [
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
  ];

  const differentiators = [
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
  ];

  return (
    <>
      <Hero
        title="Empowering Canadians to Secure the Best Mortgage — Faster, Smarter, and With More Value"
        subtitle="We combine technology, expertise, and exclusive partnerships to simplify your path to homeownership."
        ctaText="Start My Online Approval"
        ctaLink="/mortgage/approval/"
        backgroundImage="/images/features/multigenerational-family.jpg"
      />

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
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

      {/* What Makes Us Different */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes approvU Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Why thousands of Canadians choose approvU for their mortgage needs
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

      {/* Our Story */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Who we are and why we exist
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                approvU Mortgage was founded on the belief that homeownership should be simple,
                transparent, and rewarding. We've built a platform that merges smart technology
                with human expertise, helping Canadians compare, qualify, and close their mortgages
                faster — while enjoying exclusive benefits from our trusted partners.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                As a fully licensed mortgage brokerage under the Financial Services Regulatory
                Authority of Ontario (FSRA), we maintain the highest standards of professionalism
                and regulatory compliance while delivering an innovative digital experience.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Our team combines decades of mortgage industry expertise with cutting-edge
                technology to ensure you get not just a mortgage, but the <em>right</em> mortgage
                for your unique situation.
              </p>
            </div>
            <div className="bg-gradient-to-br from-muted to-card p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-primary mb-6">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">25,000+</div>
                  <div className="text-sm text-muted-foreground">Happy Homeowners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Lending Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">$2.5B+</div>
                  <div className="text-sm text-muted-foreground">Mortgages Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-highlight mb-2">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-semibold text-foreground italic">
            "We're obsessed with your experience — from approval to closing and beyond."
          </blockquote>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced professionals leading approvU's mission to transform Canadian mortgages
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((member, index) => (
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

      {/* Licensing & Compliance */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Licensed & Regulated
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            approvU Mortgage operates under the highest regulatory standards to protect our clients and maintain industry trust.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">FSRA Licensed</h3>
              <p className="text-sm text-muted-foreground">Licensed mortgage brokerage under Financial Services Regulatory Authority of Ontario</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Privacy Compliant</h3>
              <p className="text-sm text-muted-foreground">Full compliance with Canadian privacy laws and data protection regulations</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Insured & Bonded</h3>
              <p className="text-sm text-muted-foreground">Professional liability insurance and bonding for complete client protection</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Ready to find your perfect mortgage?"
        description="Join thousands of Canadians who've experienced the approvU difference. Fast approvals, expert guidance, exclusive offers."
        ctaText="Start My Online Approval"
        ctaLink="/mortgage/approval/"
      />
    </>
  );
}
