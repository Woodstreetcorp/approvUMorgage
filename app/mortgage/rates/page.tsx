import { Metadata } from "next";
import { getMortgagePage } from '@/lib/strapi';
import Hero from "@/components/sections/Hero";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getMortgagePage('mortgage-rates');
  
  return {
    title: pageData?.metaTitle || "Mortgage Rates Canada | approvU",
    description: pageData?.metaDescription || "Current mortgage rates across Canada. Compare fixed and variable rates by province.",
  };
}

export default async function RatesPage() {
  let pageData = null;
  try {
    pageData = await getMortgagePage('mortgage-rates');
  } catch (error) {
    console.error('Error fetching mortgage rates page data:', error);
  }

  const heroTitle = pageData?.heroTitle || "Compare the Best Mortgage Rates in Canada";
  const heroSubtitle = pageData?.heroSubtitle || "Find competitive rates from top lenders across all provinces. Compare fixed, variable, and specialty mortgage rates tailored to your needs.";
  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaText="✨ Get Your Free Quote"
        ctaLink="/contact"
        secondaryCTA="View Rate Trends"
        secondaryCTALink="/mortgage/contact"
        backgroundImage="/images/default-hero.jpg"
        variant="default"
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          Find Your Best Mortgage Rate
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Finding the right mortgage rate can save you thousands over the life
          of your loan. We help Canadians compare rates from over 30+ lenders to
          find the best deal for their situation.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Whether you're looking for fixed rates, variable rates, or specialty
          mortgages, we'll help you navigate the options and secure competitive
          terms.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Fixed Rates</h3>
            <a
              href="/mortgage/rates/fixed"
              className="text-primary-600 hover:underline"
            >
              View All Fixed Rates →
            </a>
          </div>
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Variable Rates</h3>
            <a
              href="/mortgage/rates/variable"
              className="text-primary-600 hover:underline"
            >
              View All Variable Rates →
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Rates by Province</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Ontario",
            "British Columbia",
            "Alberta",
            "Quebec",
            "Manitoba",
            "Saskatchewan",
            "Nova Scotia",
            "New Brunswick",
          ].map((province) => (
            <a
              key={province}
              href={`/mortgage/rates/${province
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="p-4 border rounded-lg hover:shadow-md transition hover:border-primary-500"
            >
              <h3 className="font-semibold">{province}</h3>
              <span className="text-sm text-primary-600">View Rates →</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
