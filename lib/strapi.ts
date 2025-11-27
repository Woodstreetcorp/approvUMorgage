/**
 * Strapi API Helper
 * Handles API calls to Strapi CMS
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchAPI<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 10 }, // Revalidate every 10 seconds (ISR)
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const requestUrl = `${STRAPI_URL}/api${path}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(`Strapi API Error: ${response.status} ${response.statusText}`);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Strapi fetch error:', error);
    throw error;
  }
}

// Helper to get careers page data
export async function getCareersPage() {
  try {
    const response = await fetchAPI('/careers-pages?populate=*');
    return response.data[0]; // Return first entry
  } catch (error) {
    console.error('Failed to fetch careers page:', error);
    return null;
  }
}

// Helper to get homepage data
export async function getHomepage() {
  try {
    const response = await fetchAPI('/homepages?populate=*');
    return response.data[0]; // Return first entry
  } catch (error) {
    console.error('Failed to fetch homepage:', error);
    return null;
  }
}

// Helper to get about page data
export async function getAboutPage() {
  try {
    const response = await fetchAPI('/about?populate=*');
    // For single types, Strapi returns data directly (not wrapped in response.data)
    return response;
  } catch (error) {
    console.error('Failed to fetch about page:', error);
    return null;
  }
}

// Helper to get mortgage page data by slug
export async function getMortgagePage(slug: string) {
  try {
    const response = await fetchAPI(`/mortgage-pages?filters[slug][$eq]=${slug}&populate=*`);
    return response.data[0]; // Return first matching entry
  } catch (error) {
    console.error(`Failed to fetch mortgage page (${slug}):`, error);
    return null;
  }
}

// Helper to get contact page data
export async function getContactPage() {
  try {
    const response = await fetchAPI('/contact-page?populate=*');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch contact page:', error);
    return null;
  }
}

// Helper to get all mortgage pages (for sitemap, etc.)
export async function getAllMortgagePages() {
  try {
    const response = await fetchAPI('/mortgage-pages?populate=*');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch mortgage pages:', error);
    return [];
  }
}

// Helper to get image URL from Strapi media
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return '/images/default-hero.jpg';
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url;
  
  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
}
