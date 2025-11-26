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
    cache: 'no-store', // Always fetch fresh data
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
  const response = await fetchAPI('/careers-pages?populate=*');
  return response.data[0]; // Return first entry
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
    const response = await fetchAPI('/about?populate=deep');
    // For single types, Strapi returns data directly (not wrapped in response.data)
    return response;
  } catch (error) {
    console.error('Failed to fetch about page:', error);
    return null;
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
