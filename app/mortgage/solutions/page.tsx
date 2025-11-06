import {
  HubPageTemplate,
  ChildPage,
} from "@/components/templates/HubPageTemplate";

export const metadata = {
  title: "Mortgage Solutions for Every Situation | approvU",
  description:
    "Explore tailored mortgage solutions including first-time buyer programs, self-employed mortgages, bad credit options, newcomer financing, and investment property loans.",
};

const childPages: ChildPage[] = [
  {
    id: "1",
    title: "First-Time Buyer Mortgages",
    path: "/mortgage/first-time-buyer/",
    excerpt:
      "Special programs, incentives, and guidance for Canadians buying their first home.",
    order_position: 1,
  },
  {
    id: "2",
    title: "Self-Employed Mortgages",
    path: "/mortgage/self-employed/",
    excerpt:
      "Mortgage solutions for self-employed Canadians with alternative income verification.",
    order_position: 2,
  },
  {
    id: "3",
    title: "Bad Credit Mortgages",
    path: "/mortgage/bad-credit/",
    excerpt: "Get approved for a mortgage even with challenged credit history.",
    order_position: 3,
  },
  {
    id: "4",
    title: "Newcomer Mortgages",
    path: "/mortgage/newcomer/",
    excerpt:
      "Mortgage programs for new immigrants and permanent residents to Canada.",
    order_position: 4,
  },
  {
    id: "5",
    title: "Investment Property Mortgages",
    path: "/mortgage/investment/",
    excerpt:
      "Financing solutions for rental properties and real estate investments.",
    order_position: 5,
  },
  {
    id: "6",
    title: "Professional Mortgages",
    path: "/mortgage/professional/",
    excerpt:
      "Exclusive programs for doctors, lawyers, accountants, and licensed professionals.",
    order_position: 6,
  },
  {
    id: "7",
    title: "Mortgage Refinancing",
    path: "/mortgage/refinancing/",
    excerpt:
      "Lower your rate, access equity, or consolidate debt through refinancing.",
    order_position: 7,
  },
  {
    id: "8",
    title: "Home Purchase Mortgages",
    path: "/mortgage/home-purchase/",
    excerpt:
      "Traditional purchase mortgages for owner-occupied and investment properties.",
    order_position: 8,
  },
];

const faqs = [
  {
    question: "Can I get a mortgage if I'm self-employed?",
    answer:
      "Yes! Self-employed Canadians can qualify for mortgages using alternative documentation like bank statements, Notice of Assessments, or stated income programs. We work with lenders who specialize in self-employed financing.",
  },
  {
    question: "What credit score do I need for a mortgage?",
    answer:
      "Most lenders require a minimum credit score of 600-680 for traditional mortgages. However, alternative lenders can work with scores as low as 500-550, though with higher rates. We can help you find the right lender for your credit situation.",
  },
  {
    question: "How much down payment is required for investment properties?",
    answer:
      "Investment properties typically require larger down payments than primary residences. Expect to put down at least 20% for rental properties versus 5-10% for owner-occupied homes. Some lenders may require 25-35% for investment properties.",
  },
  {
    question: "How long does mortgage approval take?",
    answer:
      "Pre-approval can take 24-48 hours with proper documentation. Final approval after finding a property typically takes 1-2 weeks. Self-employed and alternative documentation scenarios may take longer due to additional verification requirements.",
  },
];

export default function MortgageSolutions() {
  return (
    <HubPageTemplate
      title="Mortgage Solutions for Every Situation | approvU"
      metaDescription="Explore tailored mortgage solutions including first-time buyer programs, self-employed mortgages, bad credit options, newcomer financing, and investment property loans."
      canonicalUrl="https://approvu.com/mortgage/solutions/"
      heroHeadline="Find Your Perfect Mortgage Solution"
      heroSubheadline="Specialized mortgage programs designed for your unique financial situation and homeownership goals"
      heroPrimaryCTA="Get Pre-Approved"
      heroPrimaryCTALink="/mortgage/approval/"
      heroSecondaryCTA="Talk to an Expert"
      heroSecondaryCTALink="/contact/"
      backgroundImage="/images/hero/hero-family-home.jpg"
      variant="gradient"
      breadcrumbs={[
        {
          label: "mortgage",
          title: "Mortgage",
          href: "/mortgage/",
          level: 1,
        },
      ]}
      childPages={childPages}
      childPagesTitle="Specialized Mortgage Programs"
      childPagesLayout="grid"
      introContent={
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Mortgage Solutions Tailored to You
          </h2>
          <p className="text-lg mb-4">
            Every borrower&apos;s situation is unique. Whether you&apos;re
            self-employed, a newcomer to Canada, have credit challenges, or are
            investing in real estate, there&apos;s a mortgage solution designed
            for your circumstances.
          </p>
          <p className="text-lg mb-4">
            approvU specializes in connecting borrowers with the right lenders
            and programs, including options that traditional banks may not
            offer. Our network includes A-lenders, B-lenders, credit unions, and
            private lenders to maximize your approval chances.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">🏠 First-Time Buyers</h3>
              <p>
                Access government incentive programs, lower down payment
                options, and first-time buyer credits to make homeownership more
                affordable.
              </p>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">💼 Self-Employed</h3>
              <p>
                Alternative income verification methods including bank statement
                programs and stated income mortgages for business owners and
                contractors.
              </p>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">🌍 Newcomers</h3>
              <p>
                Specialized programs that consider foreign income, shorter
                credit histories, and work permits for new immigrants and
                temporary residents.
              </p>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">📈 Investors</h3>
              <p>
                Competitive rates on rental properties, multi-unit financing,
                and portfolio lending for real estate investors building wealth.
              </p>
            </div>
          </div>
        </div>
      }
      faqs={faqs}
      bottomCTAHeadline="Let's Find Your Solution"
      bottomCTADescription="Connect with mortgage experts who understand your unique situation"
      bottomCTAPrimaryText="Get Pre-Approved Now"
      bottomCTAPrimaryLink="/mortgage/approval/"
    />
  );
}
