import {
  HubPageTemplate,
  ChildPage,
} from "@/components/templates/HubPageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculators - Payment, Affordability & More | approvU",
  description:
    "Free Canadian mortgage calculators including payment calculator, affordability calculator, down payment calculator, and land transfer tax calculator for all provinces.",
};

export default function CalculatorsPage() {
  const childPages: ChildPage[] = [
    {
      id: "1",
      title: "Mortgage Payment Calculator",
      path: "/mortgage/calculators/payment/",
      excerpt:
        "Calculate your monthly mortgage payments based on purchase price, down payment, interest rate, and amortization period.",
      order_position: 1,
    },
    {
      id: "2",
      title: "Affordability Calculator",
      path: "/mortgage/calculators/affordability/",
      excerpt:
        "Determine how much home you can afford based on your income, debts, and down payment with the stress test applied.",
      order_position: 2,
    },
    {
      id: "3",
      title: "Down Payment Calculator",
      path: "/mortgage/calculators/down-payment/",
      excerpt:
        "Calculate the required down payment for your home purchase and estimate how long it will take to save.",
      order_position: 3,
    },
    {
      id: "4",
      title: "Land Transfer Tax Calculator",
      path: "/mortgage/calculators/land-transfer-tax/",
      excerpt:
        "Calculate provincial and municipal land transfer taxes for your home purchase across all Canadian provinces.",
      order_position: 4,
    },
  ];

  const faqs = [
    {
      question: "How accurate are online mortgage calculators?",
      answer:
        "Online calculators provide excellent estimates, but your actual payments may vary based on your lender's specific terms, insurance requirements, and property taxes. Use calculators as a starting point and get pre-approved for exact figures.",
    },
    {
      question: "What's included in my mortgage payment?",
      answer:
        "Your mortgage payment typically includes principal and interest. However, some lenders require you to include property taxes and homeowner's insurance in your monthly payment. Condo fees are separate.",
    },
    {
      question: "How does the mortgage stress test affect calculator results?",
      answer:
        "Our affordability calculator applies the stress test by qualifying you at a higher rate (your contract rate + 2% or 5.25%, whichever is higher). This ensures you can afford payments if rates increase.",
    },
  ];

  return (
    <HubPageTemplate
      title="Mortgage Calculators"
      heroHeadline="Mortgage Calculators for Canadian Homebuyers"
      heroSubheadline="Make informed decisions with our comprehensive suite of free mortgage calculators"
      heroPrimaryCTA="Calculate Affordability"
      heroPrimaryCTALink="/mortgage/calculators/affordability/"
      heroSecondaryCTA="Get Pre-Approved"
      heroSecondaryCTALink="/mortgage/approval/"
      variant="default"
      backgroundImage="/images/hero/hero-family-home.jpg"
      breadcrumbs={[
        {
          label: "Mortgage",
          href: "/mortgage/",
        },
      ]}
      childPages={childPages}
      childPagesTitle="Available Calculators"
      childPagesLayout="grid"
      faqs={faqs}
      bottomCTAHeadline="Ready to Take the Next Step?"
      bottomCTADescription="Get pre-approved and discover your real purchasing power"
      bottomCTAPrimaryText="Get Pre-Approved"
      bottomCTAPrimaryLink="/mortgage/approval/"
    />
  );
}
