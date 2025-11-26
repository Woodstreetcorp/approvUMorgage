import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Users, Heart, TrendingUp, Award, Coffee, Zap, Globe } from 'lucide-react';
import { getCareersPage, getStrapiMediaUrl } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const careersData = await getCareersPage();
    const { metaTitle, metaDescription } = careersData;

    return {
      title: metaTitle || 'Careers at approvU | Join Our Team',
      description: metaDescription || 'Join approvU Mortgage and help transform the Canadian mortgage industry.',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Careers at approvU | Join Our Team',
      description: 'Join approvU Mortgage and help transform the Canadian mortgage industry.',
    };
  }
}

export default async function Careers() {
  let careersData = null;
  
  try {
    careersData = await getCareersPage();
  } catch (error) {
    console.error('Error fetching careers data:', error);
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {careersData?.heroTitle || 'Join the approvU Team'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {careersData?.heroSubtitle || 'Help us transform the Canadian mortgage industry by making homeownership simpler, more transparent, and more rewarding for every Canadian.'}
          </p>
          <Link 
            href="#open-positions"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            View Open Positions
          </Link>
        </div>
      </section>

      {/* Strapi Content Section */}
      {careersData?.content && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: careersData.content.replace(/\n/g, '<br/>') }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Work Here */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Work at approvU?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building something special—a company where innovation meets impact, 
              and your work directly helps Canadians achieve their homeownership dreams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Innovative Technology</h3>
              <p className="text-muted-foreground">
                Work with modern tech stack and contribute to building cutting-edge fintech solutions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Collaborative Culture</h3>
              <p className="text-muted-foreground">
                Join a supportive team that values collaboration, creativity, and continuous learning
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Growth Opportunities</h3>
              <p className="text-muted-foreground">
                Fast-growing company with clear career progression and professional development paths
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Meaningful Impact</h3>
              <p className="text-muted-foreground">
                Help thousands of Canadians achieve homeownership and financial security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Benefits & Perks
            </h2>
            <p className="text-lg text-muted-foreground">
              We invest in our team's well-being, growth, and success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Competitive Compensation</h3>
                  <p className="text-sm text-muted-foreground">
                    Competitive salaries, performance bonuses, and equity options for key roles
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Health & Wellness</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive health, dental, and vision coverage plus mental health support
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Flexible Work</h3>
                  <p className="text-sm text-muted-foreground">
                    Remote-friendly culture with flexible hours and hybrid work options
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Professional Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Annual learning budget, conference attendance, and certification support
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Time Off</h3>
                  <p className="text-sm text-muted-foreground">
                    Generous vacation policy, paid holidays, and personal days for life events
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Team Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular team building activities, social events, and company retreats
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our growing team and make an impact
            </p>
          </div>

          <div className="space-y-6">
            {/* Position Card Template */}
            <div className="border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">Engineering</span>
                    <span className="text-xs font-semibold bg-secondary/10 text-secondary px-2 py-1 rounded">Full-Time</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Senior Full-Stack Developer</h3>
                  <p className="text-muted-foreground mb-3">
                    Build and scale our Next.js platform. Work with TypeScript, React, Node.js, and modern cloud infrastructure.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>📍 Toronto, ON (Hybrid)</span>
                    <span>•</span>
                    <span>💰 $110k - $150k</span>
                  </div>
                </div>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
                >
                  Apply Now →
                </Link>
              </div>
            </div>

            <div className="border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">Mortgage Services</span>
                    <span className="text-xs font-semibold bg-secondary/10 text-secondary px-2 py-1 rounded">Full-Time</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Licensed Mortgage Agent</h3>
                  <p className="text-muted-foreground mb-3">
                    Guide clients through their mortgage journey. FSRA license required. Competitive commission structure.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>📍 Remote (Canada-wide)</span>
                    <span>•</span>
                    <span>💰 Base + Commission</span>
                  </div>
                </div>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
                >
                  Apply Now →
                </Link>
              </div>
            </div>

            <div className="border border-primary/20 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">Product</span>
                    <span className="text-xs font-semibold bg-secondary/10 text-secondary px-2 py-1 rounded">Full-Time</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Product Manager</h3>
                  <p className="text-muted-foreground mb-3">
                    Shape the future of our mortgage platform. Define product strategy and work with cross-functional teams.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>📍 Toronto, ON (Hybrid)</span>
                    <span>•</span>
                    <span>💰 $95k - $130k</span>
                  </div>
                </div>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
                >
                  Apply Now →
                </Link>
              </div>
            </div>
          </div>

          {/* No Suitable Position */}
          <div className="mt-12 text-center bg-muted/30 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-primary mb-3">
              Don't See the Right Role?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation and 
              customer service. Send us your resume and tell us how you'd like to contribute to approvU.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-success/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join a team that's transforming Canadian homeownership, one mortgage at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#open-positions"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              View Open Positions
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
