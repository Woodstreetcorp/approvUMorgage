import { Metadata } from 'next';
import { getMortgagePage } from '@/lib/strapi';
import MortgageApprovalForm from '@/components/forms/MortgageApprovalForm';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getMortgagePage('mortgage-approval');
  
  return {
    title: pageData?.metaTitle || "Mortgage Pre-Approval Online - Get Approved in 24 Hours | approvU",
    description: pageData?.metaDescription || "Get pre-approved for your mortgage in minutes. 100% online application, no credit impact, compare offers from 25+ lenders. FSRA licensed mortgage brokers.",
  };
}

export default async function MortgageApproval() {
  let pageData = null;
  try {
    pageData = await getMortgagePage('mortgage-approval');
  } catch (error) {
    console.error('Error fetching mortgage approval page data:', error);
  }

  const heroTitle = pageData?.heroTitle || "Get Approved in Minutes — 100% Online";
  const heroSubtitle = pageData?.heroSubtitle || "Fast, transparent mortgage pre-approval with no credit impact. Compare personalized offers from 25+ lenders.";

  return <MortgageApprovalForm heroTitle={heroTitle} heroSubtitle={heroSubtitle} />;
}
