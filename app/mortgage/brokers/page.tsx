import Hero from "@/components/sections/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Mortgage Broker",
  description:
    "Connect with experienced mortgage brokers across Canada. Find local experts in your city.",
};

export default function BrokersPage() {
  const provinces = [
    { name: "Ontario", slug: "ontario", cities: 45 },
    { name: "British Columbia", slug: "british-columbia", cities: 12 },
    { name: "Alberta", slug: "alberta", cities: 8 },
    { name: "Quebec", slug: "quebec", cities: 6 },
  ];

  return (
    <>
      <Hero
        title="Your First Home Starts Here"
        subtitle="Get expert guidance and access to programs that make your first home more affordable."
        ctaText="✨ Get Pre-Approved"
        ctaLink="/approval"
        secondaryCTA="Chat with an Expert"
        secondaryCTALink="/mortgage/contact"
        backgroundImage="/images/default-hero.jpg"
        variant="default"
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          We Know Buying Your First Home Can Feel Overwhelming
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          That's why approvU simplifies every step — helping you qualify faster,
          access special programs, and feel confident about your decisions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {provinces.map((province) => (
            <a
              key={province.slug}
              href={`/mortgage/brokers/${province.slug}`}
              className="p-6 border rounded-lg hover:shadow-lg transition hover:border-primary-500"
            >
              <h3 className="text-xl font-semibold mb-2">{province.name}</h3>
              <p className="text-gray-600">{province.cities} cities covered</p>
              <span className="text-primary-600 font-medium mt-2 inline-block">
                View Brokers →
              </span>
            </a>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Why Use a Mortgage Broker?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✓ Access to multiple lenders and rates</li>
            <li>✓ Expert guidance through the mortgage process</li>
            <li>✓ Free service - lenders pay the broker</li>
            <li>✓ Save time comparing options</li>
          </ul>
        </div>
      </div>
    </>
  );
}
