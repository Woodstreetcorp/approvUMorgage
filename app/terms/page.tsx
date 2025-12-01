import { Metadata } from 'next';
import { getMortgagePage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getMortgagePage('terms');
  
  return {
    title: pageData?.metaTitle || 'Terms of Service | approvU Mortgage',
    description: pageData?.metaDescription || 'Terms and conditions for using approvU\'s mortgage brokerage services and digital platform.',
  };
}

export default async function Terms() {
  let pageData = null;
  
  try {
    pageData = await getMortgagePage('terms');
  } catch (error) {
    console.error('Error fetching terms page data:', error);
  }

  const pageTitle = pageData?.heroTitle || 'Terms of Service';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-8">{pageTitle}</h1>
      <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using approvU's services, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">2. Description of Service</h2>
          <p className="text-muted-foreground">
            approvU is a licensed mortgage brokerage service that helps consumers find and apply for 
            mortgage products from various lending institutions across Canada.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">3. User Responsibilities</h2>
          <p className="text-muted-foreground">You agree to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-muted-foreground">
            <li>Provide accurate and complete information</li>
            <li>Keep your account information secure</li>
            <li>Notify us of any unauthorized use of your account</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">4. Fees and Payment</h2>
          <p className="text-muted-foreground">
            approvU's services are free to consumers. We receive compensation from lending partners 
            for successful mortgage applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">5. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            approvU is not liable for any indirect, incidental, or consequential damages arising 
            from your use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">6. Termination</h2>
          <p className="text-muted-foreground">
            We may terminate or suspend your access to our services at any time, with or without cause, 
            with or without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">7. Contact Information</h2>
          <p className="text-muted-foreground">
            For questions about these Terms of Service, contact us at legal@approvu.ca or 1-800-APPROVU.
          </p>
        </section>
      </div>
    </div>
  );
}
