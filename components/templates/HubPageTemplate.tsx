import { ReactNode } from "react";
import Breadcrumbs, { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import Hero from "@/components/sections/Hero";
import FAQBlock from "@/components/sections/FAQBlock";
import CTASection from "@/components/sections/CTASection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface ChildPage {
  id: string;
  title: string;
  path: string;
  excerpt: string;
  order_position?: number;
  featured_image?: string;
}

interface HubPageTemplateProps {
  // SEO
  title: string;
  metaDescription?: string;

  // Hero
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCTA: string;
  heroPrimaryCTALink?: string;
  heroSecondaryCTA?: string;
  heroSecondaryCTALink?: string;
  backgroundImage?: string;
  variant?: "default" | "gradient";

  // Breadcrumbs
  breadcrumbs?: BreadcrumbItem[];

  // Introduction
  introContent?: ReactNode;

  // Child pages
  childPages: ChildPage[];
  childPagesLayout?: "grid" | "list";
  childPagesTitle?: string;

  // Additional content blocks
  contentBlocks?: ReactNode;

  // FAQs
  faqs?: Array<{ question: string; answer: string }>;

  // Bottom CTA
  showBottomCTA?: boolean;
  bottomCTAHeadline?: string;
  bottomCTADescription?: string;
  bottomCTAPrimaryText?: string;
  bottomCTAPrimaryLink?: string;
  bottomCTASecondaryText?: string;
  bottomCTASecondaryLink?: string;
}

export function HubPageTemplate({
  title,
  metaDescription,
  heroHeadline,
  heroSubheadline,
  heroPrimaryCTA,
  heroPrimaryCTALink = "/mortgage-appointment-online/",
  heroSecondaryCTA,
  heroSecondaryCTALink,
  backgroundImage,
  variant,
  breadcrumbs = [],
  introContent,
  childPages,
  childPagesLayout = "grid",
  childPagesTitle = "Explore Topics",
  contentBlocks,
  faqs = [],
  showBottomCTA = true,
  bottomCTAHeadline = "Ready to Take the Next Step?",
  bottomCTADescription = "Get expert mortgage advice tailored to your needs",
  bottomCTAPrimaryText = "Get Pre-Approved",
  bottomCTAPrimaryLink = "/mortgage-appointment-online/",
  bottomCTASecondaryText,
  bottomCTASecondaryLink,
}: HubPageTemplateProps) {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title={heroHeadline}
        subtitle={heroSubheadline}
        ctaText={heroPrimaryCTA}
        ctaLink={heroPrimaryCTALink}
        secondaryCTA={heroSecondaryCTA}
        secondaryCTALink={heroSecondaryCTALink}
        backgroundImage={backgroundImage}
        variant={variant}
      />

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <section className="py-4 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>
      )}

      {/* Introduction Content */}
      {introContent && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">{introContent}</div>
        </section>
      )}

      {/* Child Pages Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            {childPagesTitle}
          </h2>

          {childPagesLayout === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {childPages
                .sort(
                  (a, b) => (a.order_position || 0) - (b.order_position || 0)
                )
                .map((page) => (
                  <Link key={page.id} href={page.path} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 border-transparent hover:border-primary/20">
                      {page.featured_image && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={page.featured_image}
                            alt={page.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {page.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {page.excerpt}
                        </CardDescription>
                        <div className="mt-4">
                          <Button variant="link" className="text-primary p-0">
                            Learn More →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto animate-fade-in">
              {childPages
                .sort(
                  (a, b) => (a.order_position || 0) - (b.order_position || 0)
                )
                .map((page) => (
                  <Link key={page.id} href={page.path} className="group block">
                    <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/20 border-2 border-transparent">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {page.title}
                          </CardTitle>
                          <svg
                            className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                        <CardDescription className="text-base">
                          {page.excerpt}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Content Blocks */}
      {contentBlocks && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">{contentBlocks}</div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#348699] text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
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
      {/* Bottom CTA */}
      {showBottomCTA && (
        <CTASection
          title={bottomCTAHeadline}
          description={bottomCTADescription}
          ctaText={bottomCTAPrimaryText}
          ctaLink={bottomCTAPrimaryLink}
        />
      )}
    </>
  );
}
