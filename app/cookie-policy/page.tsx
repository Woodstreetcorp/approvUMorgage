import type { Metadata } from 'next';
import Link from 'next/link';
import { getMortgagePage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getMortgagePage('cookie-policy');
  
  return {
    title: pageData?.metaTitle || 'Cookie Policy | approvU Mortgage',
    description: pageData?.metaDescription || 'Learn about how approvU uses cookies and similar technologies to improve your experience on our website.',
  };
}

export default async function CookiePolicy() {
  let pageData = null;
  
  try {
    pageData = await getMortgagePage('cookie-policy');
  } catch (error) {
    console.error('Error fetching cookie-policy page data:', error);
  }

  const pageTitle = pageData?.heroTitle || 'Cookie Policy';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary mb-8">{pageTitle}</h1>
      <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

      <div className="prose prose-lg text-muted-foreground space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Cookies</h2>
          <p>
            approvU uses cookies and similar technologies to:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Remember your preferences and settings</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Improve website functionality and user experience</li>
            <li>Provide personalized mortgage recommendations</li>
            <li>Enable secure login and authentication</li>
            <li>Measure the effectiveness of our marketing campaigns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Types of Cookies We Use</h2>
          
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable basic functions like 
            page navigation, secure areas access, and form submissions. The website cannot function properly 
            without these cookies.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting 
            information anonymously. This helps us improve our website and services.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Functional Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalization, such as remembering your preferences 
            (like language or region) and providing customized mortgage recommendations.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Marketing Cookies</h3>
          <p>
            These cookies track your online activity to help us deliver more relevant advertising and limit the 
            number of times you see an ad. They also help us measure the effectiveness of our marketing campaigns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Third-Party Cookies</h2>
          <p>
            Some cookies on our website are placed by third-party services that appear on our pages. We use:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Google Analytics:</strong> To analyze website usage and improve our services</li>
            <li><strong>Marketing Platforms:</strong> To deliver targeted advertising and measure campaign performance</li>
            <li><strong>Customer Support Tools:</strong> To provide live chat and customer service features</li>
          </ul>
          <p className="mt-4">
            These third parties may have their own cookie policies. We recommend reviewing their privacy policies 
            to understand how they use cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Managing Your Cookie Preferences</h2>
          <p>
            You have several options to manage or disable cookies:
          </p>
          
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Browser Settings</h3>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. You can typically 
            set your browser to:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Accept all cookies</li>
            <li>Notify you when a cookie is set</li>
            <li>Reject all cookies</li>
          </ul>
          <p className="mt-4">
            Please note that if you disable cookies, some features of our website may not function properly.
          </p>

          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Opt-Out Tools</h3>
          <p>
            You can opt out of targeted advertising by visiting:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance Opt-Out</a></li>
            <li><a href="https://youradchoices.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your AdChoices (Canada)</a></li>
            <li><a href="https://www.networkadvertising.org/choices" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Network Advertising Initiative Opt-Out</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Cookie Retention</h2>
          <p>
            Different cookies have different retention periods:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Remain on your device until they expire or you delete them</li>
          </ul>
          <p className="mt-4">
            You can delete cookies at any time through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or legal 
            requirements. When we make changes, we will update the "Last updated" date at the top of this page. 
            We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
          <p>
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <ul className="list-none mt-4 space-y-2">
            <li><strong>Email:</strong> privacy@approvu.ca</li>
            <li><strong>Phone:</strong> 1-800-APPROVU</li>
            <li><strong>Mail:</strong> approvU Mortgage Inc., 123 Financial District, Toronto, ON M5H 2N2</li>
          </ul>
          <p className="mt-4">
            For more information about our privacy practices, please read our{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
