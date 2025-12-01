import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle, Award, FileCheck } from 'lucide-react';
import { getMortgagePage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getMortgagePage('fsra-license');
  
  return {
    title: pageData?.metaTitle || 'FSRA Licensing & Regulation | approvU Mortgage',
    description: pageData?.metaDescription || 'approvU Mortgage is a fully licensed mortgage brokerage regulated by the Financial Services Regulatory Authority of Ontario (FSRA). License #13551.',
  };
}

export default async function FSRALicense() {
  let pageData = null;
  
  try {
    pageData = await getMortgagePage('fsra-license');
  } catch (error) {
    console.error('Error fetching fsra-license page data:', error);
  }

  const pageTitle = pageData?.heroTitle || 'FSRA Licensed & Regulated';
  const pageSubtitle = pageData?.heroSubtitle || 'approvU Mortgage operates under the highest regulatory standards to protect our clients and maintain industry trust.';

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
          <Shield className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">{pageTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {pageSubtitle}
        </p>
      </div>

      {/* License Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-primary mb-2 text-center">FSRA Licensed</h3>
          <p className="text-sm text-muted-foreground text-center">
            Licensed mortgage brokerage under Financial Services Regulatory Authority of Ontario
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-primary mb-2 text-center">Full Compliance</h3>
          <p className="text-sm text-muted-foreground text-center">
            Adheres to all provincial regulations, ethical standards, and consumer protection laws
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileCheck className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-primary mb-2 text-center">Regular Audits</h3>
          <p className="text-sm text-muted-foreground text-center">
            Subject to regular compliance audits and ongoing professional education requirements
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg text-muted-foreground space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Our License</h2>
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 not-prose mb-6">
            <p className="text-lg font-semibold text-primary mb-2">License Number: #13551</p>
            <p className="text-muted-foreground">
              approvU Mortgage Inc. is a licensed mortgage brokerage operating under the authority granted by the 
              Financial Services Regulatory Authority of Ontario (FSRA).
            </p>
          </div>
          <p>
            Our FSRA license ensures that we meet strict regulatory requirements for financial stability, 
            professional conduct, and consumer protection. This licensing provides you with confidence that 
            your mortgage transaction is being handled by a legitimate, regulated financial services provider.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">What is FSRA?</h2>
          <p>
            The Financial Services Regulatory Authority of Ontario (FSRA) is an independent regulatory agency 
            responsible for regulating the financial services sector in Ontario. FSRA oversees mortgage brokerages, 
            insurance companies, credit unions, pension plans, and other financial services providers.
          </p>
          <p>
            FSRA's mission is to protect consumers and promote public confidence in the financial services sector 
            through effective and efficient regulation. The authority ensures that licensed entities:
          </p>
          <ul className="list-none space-y-3 my-6 not-prose">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Meet minimum financial and competency standards</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Follow ethical business practices and codes of conduct</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Maintain appropriate insurance and bonding</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Comply with ongoing education and training requirements</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Protect consumer funds and personal information</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Your Protection as a Consumer</h2>
          <p>
            Working with an FSRA-licensed mortgage brokerage like approvU provides you with important protections:
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Professional Standards</h3>
          <p>
            All our mortgage agents and brokers are individually licensed by FSRA and must meet strict educational 
            and professional requirements. They are required to complete ongoing professional development to maintain 
            their licenses.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Errors & Omissions Insurance</h3>
          <p>
            As a licensed brokerage, we maintain comprehensive errors and omissions (E&O) insurance. This protects 
            you in the unlikely event of a professional error or omission in your mortgage transaction.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Complaint Resolution</h3>
          <p>
            If you have a concern about your mortgage transaction, FSRA provides a formal complaint resolution 
            process. Licensed brokerages are required to have internal complaint handling procedures, and FSRA 
            can investigate complaints and take disciplinary action if necessary.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Financial Safeguards</h3>
          <p>
            FSRA-licensed brokerages must meet minimum capital requirements and maintain appropriate bonding. 
            This ensures the financial stability of the brokerage and protects consumers from financial loss.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Commitment to Compliance</h2>
          <p>
            At approvU, regulatory compliance isn't just a requirement—it's a cornerstone of our business. We are 
            committed to:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Maintaining the highest standards of professional conduct</li>
            <li>Protecting your personal and financial information</li>
            <li>Providing clear, transparent disclosure of all fees and costs</li>
            <li>Acting in your best interests at all times</li>
            <li>Following all federal and provincial regulations</li>
            <li>Continuous improvement through ongoing education and training</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Verify Our License</h2>
          <p>
            You can verify our FSRA license and check our regulatory status at any time by visiting the FSRA website:
          </p>
          <div className="bg-muted/50 rounded-lg p-6 not-prose my-6">
            <p className="text-sm text-muted-foreground mb-3">
              Visit the FSRA public registry to confirm our license status and review our regulatory history:
            </p>
            <a 
              href="https://www.fsrao.ca/consumers/check-before-you-buy/mortgage-brokerage-search" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <span>FSRA Mortgage Brokerage Search</span>
              <span>→</span>
            </a>
            <p className="text-xs text-muted-foreground mt-4">
              Search for "approvU Mortgage Inc." or license number #13551
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Industry Memberships</h2>
          <p>
            Beyond our FSRA license, we maintain memberships in key industry associations:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>Canadian Association of Accredited Mortgage Professionals (CAAMP):</strong> Canada's national 
              mortgage industry association dedicated to promoting professionalism and consumer protection
            </li>
            <li>
              <strong>Mortgage Professionals Canada:</strong> Represents mortgage professionals across the country 
              and provides ongoing education and advocacy
            </li>
          </ul>
        </section>

        <section className="bg-primary/5 rounded-lg p-8 not-prose mt-12">
          <h2 className="text-2xl font-semibold text-primary mb-4">Questions About Our Licensing?</h2>
          <p className="text-muted-foreground mb-6">
            We're happy to answer any questions you have about our regulatory status, licensing, or consumer protections.
          </p>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-primary">Contact Us:</p>
            <p><strong>Email:</strong> compliance@approvu.ca</p>
            <p><strong>Phone:</strong> 1-800-APPROVU</p>
            <p><strong>Mail:</strong> approvU Mortgage Inc., 123 Financial District, Toronto, ON M5H 2N2</p>
          </div>
          <div className="mt-6 pt-6 border-t border-primary/20">
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <span>Learn more about approvU</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
