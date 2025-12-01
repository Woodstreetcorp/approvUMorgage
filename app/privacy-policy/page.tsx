import { Metadata } from 'next';
import { getMortgagePage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getMortgagePage('privacy-policy');
  
  return {
    title: pageData?.metaTitle || 'Privacy Policy | approvU Mortgage',
    description: pageData?.metaDescription || 'How approvU protects and uses your personal information. Our commitment to privacy and data security.',
  };
}

export default async function PrivacyPolicy() {
  let pageData = null;
  
  try {
    pageData = await getMortgagePage('privacy-policy');
  } catch (error) {
    console.error('Error fetching privacy-policy page data:', error);
  }

  const pageTitle = pageData?.heroTitle || 'Privacy Policy';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-8">{pageTitle}</h1>
      <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground">
            We collect information you provide directly to us, such as when you create an account, 
            apply for a mortgage, or contact us for support. This may include your name, email address, 
            phone number, financial information, and employment details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground">We use the information we collect to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-muted-foreground">
            <li>Process your mortgage applications and provide our services</li>
            <li>Communicate with you about your account and our services</li>
            <li>Improve and personalize your experience</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">3. Information Sharing</h2>
          <p className="text-muted-foreground">
            We may share your information with lending partners, service providers, and regulatory bodies 
            as necessary to provide our mortgage brokerage services. We do not sell your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">4. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">5. Your Rights</h2>
          <p className="text-muted-foreground">
            You have the right to access, update, or delete your personal information. 
            You may also opt out of certain communications from us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">6. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us at privacy@approvu.ca 
            or 1-800-APPROVU.
          </p>
        </section>
      </div>
    </div>
  );
}
