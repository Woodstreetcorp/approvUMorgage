'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { useEffect, useState } from 'react';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const [socialLinks, setSocialLinks] = useState({
    linkedinUrl: 'https://linkedin.com/company/approvu',
    twitterUrl: 'https://twitter.com/approvumortgage',
    facebookUrl: 'https://facebook.com/approvu',
    instagramUrl: 'https://instagram.com/approvu',
  });
  
  // Fetch social links from API
  const fetchSocialLinks = async () => {
    try {
      // Add timestamp to prevent caching
      const response = await fetch(`/api/admin/settings?t=${Date.now()}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        // If not authorized or error, just use defaults
        return;
      }
      
      const result = await response.json();
      if (result && result.data) {
        setSocialLinks({
          linkedinUrl: result.data.linkedinUrl || socialLinks.linkedinUrl,
          twitterUrl: result.data.twitterUrl || socialLinks.twitterUrl,
          facebookUrl: result.data.facebookUrl || socialLinks.facebookUrl,
          instagramUrl: result.data.instagramUrl || socialLinks.instagramUrl,
        });
      }
    } catch (err) {
      // Silently fail and use default links
      console.log('Using default social links');
    }
  };
  
  // Fetch on mount
  useEffect(() => {
    fetchSocialLinks();
  }, []);
  
  // Re-fetch when pathname changes (user navigates)
  useEffect(() => {
    fetchSocialLinks();
  }, [pathname]);
  
  // Listen for custom event to refresh social links
  useEffect(() => {
    const handleRefresh = () => {
      fetchSocialLinks();
    };
    
    window.addEventListener('refreshSocialLinks', handleRefresh);
    return () => window.removeEventListener('refreshSocialLinks', handleRefresh);
  }, []);
  
  // Don't show footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <Footer socialLinks={socialLinks} />;
}
