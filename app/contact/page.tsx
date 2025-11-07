'use client';

import { useState } from 'react';
import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FAQBlock from "@/components/sections/FAQBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear status when user starts typing again
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          form_type: 'contact_us',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitStatus({
        type: 'success',
        message: result.message || 'Thank you for contacting us! We will get back to you soon.',
      });

      // Clear form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const faqs = [
    {
      question: "How long does the mortgage approval process take?",
      answer: "Most applications are pre-approved within 24 hours. Full approval typically takes 3-5 business days once we receive all required documents."
    },
    {
      question: "Will checking my mortgage options affect my credit score?",
      answer: "No, our initial qualification process uses a soft credit check that doesn't impact your credit score. Only when you decide to proceed with a formal application will we perform a hard credit check."
    },
    {
      question: "What documents do I need to provide?",
      answer: "Typically you'll need proof of income (pay stubs, T4s), employment verification, bank statements, and identification. Our system will tell you exactly what's needed based on your specific situation."
    },
    {
      question: "Can I speak with a mortgage advisor?",
      answer: "Absolutely! Our mortgage concierges are available via phone, email, or chat to answer questions and guide you through the process."
    },
    {
      question: "Are there any fees for using approvU?",
      answer: "approvU is completely free for borrowers. We're compensated by our lending partners, so there are no costs or hidden fees for you."
    }
  ];

  return (
    <>
      <Hero
        title="Get in Touch"
        subtitle="Have questions? Our mortgage experts are here to help you navigate your home financing journey."
        ctaText="Chat with an Expert"
        ctaLink="#contact-form"
      />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg" id="contact-form">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-600">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      placeholder="John" 
                      value={formData.first_name}
                      onChange={(e) => handleChange('first_name', e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      placeholder="Doe" 
                      value={formData.last_name}
                      onChange={(e) => handleChange('last_name', e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How can we help? <span className="text-red-500">*</span>
                  </label>
                  <Textarea 
                    placeholder="Tell us about your mortgage needs or questions..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`text-sm ${
                      submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                <Button 
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">📧 Email Support</h3>
                <p className="text-gray-600 mb-2">
                  For general inquiries and support
                </p>
                <p className="text-primary-600 font-medium">support@approvu.ca</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">📞 Phone Support</h3>
                <p className="text-gray-600 mb-2">
                  Speak with a mortgage concierge
                </p>
                <p className="text-primary-600 font-medium">1-800-APPROVU</p>
                <p className="text-sm text-gray-500 mt-1">
                  Mon-Fri 8AM-8PM ET, Sat 9AM-5PM ET
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">💬 Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Get instant answers to your questions
                </p>
                <Button variant="outline" className="w-full">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">🏢 Head Office</h3>
                <p className="text-gray-600">
                  123 Financial District<br/>
                  Toronto, ON M5H 2N2<br/>
                  Canada
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FAQBlock
        title="Frequently Asked Questions"
        faqs={faqs}
      />
    </>
  );
}
