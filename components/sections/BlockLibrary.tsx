'use client';

import { useState } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentBlock } from '@/components/sections/ContentBuilder';

interface BlockTemplate {
  id: string;
  type: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  defaultContent: any;
  defaultSettings?: any;
}

const blockTemplates: BlockTemplate[] = [
  // Hero Blocks
  {
    id: 'hero-standard',
    type: 'hero',
    title: 'Standard Hero',
    description: 'Large banner with headline, subtitle, and CTA button',
    category: 'hero',
    icon: '🎯',
    defaultContent: {
      headline: 'Welcome to Our Site',
      subtitle: 'Discover amazing features and services',
      ctaText: 'Get Started',
      ctaLink: '#',
    },
    defaultSettings: {
      backgroundColor: '#f8f9fa',
      padding: 'large',
      alignment: 'center',
    },
  },
  {
    id: 'hero-split',
    type: 'hero',
    title: 'Split Hero',
    description: 'Hero section with image on one side, content on the other',
    category: 'hero',
    icon: '🖼️',
    defaultContent: {
      headline: 'Build Something Great',
      subtitle: 'Start your journey today',
      ctaText: 'Learn More',
      ctaLink: '#',
      imageUrl: 'https://placehold.co/600x400',
    },
  },
  
  // Feature Blocks
  {
    id: 'features-grid',
    type: 'features',
    title: 'Features Grid',
    description: '3-column grid showcasing key features with icons',
    category: 'features',
    icon: '⭐',
    defaultContent: {
      features: [
        { icon: '🚀', title: 'Fast', description: 'Lightning fast performance' },
        { icon: '🔒', title: 'Secure', description: 'Bank-level security' },
        { icon: '💎', title: 'Premium', description: 'Premium quality' },
      ],
    },
  },
  {
    id: 'features-list',
    type: 'features',
    title: 'Features List',
    description: 'Vertical list of features with checkmarks',
    category: 'features',
    icon: '✓',
    defaultContent: {
      features: [
        { title: '24/7 Support', description: 'Always here to help' },
        { title: 'Easy Integration', description: 'Set up in minutes' },
        { title: 'Free Updates', description: 'Lifetime updates included' },
      ],
    },
  },

  // CTA Blocks
  {
    id: 'cta-banner',
    type: 'cta',
    title: 'CTA Banner',
    description: 'Full-width call-to-action banner',
    category: 'cta',
    icon: '📢',
    defaultContent: {
      headline: 'Ready to Get Started?',
      subtitle: 'Join thousands of satisfied customers',
      primaryButtonText: 'Sign Up Now',
      primaryButtonLink: '#',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '#',
    },
    defaultSettings: {
      backgroundColor: '#4f46e5',
      textColor: '#ffffff',
    },
  },
  {
    id: 'cta-box',
    type: 'cta',
    title: 'CTA Box',
    description: 'Centered call-to-action box',
    category: 'cta',
    icon: '📦',
    defaultContent: {
      headline: 'Start Your Free Trial',
      description: 'No credit card required',
      buttonText: 'Get Started',
      buttonLink: '#',
    },
  },

  // Content Blocks
  {
    id: 'content-text',
    type: 'content',
    title: 'Text Content',
    description: 'Rich text content block',
    category: 'content',
    icon: '📄',
    defaultContent: {
      html: '<p>Start writing your content here...</p>',
    },
  },
  // {
  //   id: 'content-image-text',
  //   type: 'content',
  //   title: 'Image + Text',
  //   description: 'Image with accompanying text',
  //   category: 'content',
  //   icon: '🖼️',
  //   defaultContent: {
  //     imageUrl: 'https://placehold.co/600x400',
  //     imagePosition: 'left',
  //     html: '<p>Your content goes here...</p>',
  //   },
  // },

  // Card Blocks
  {
    id: 'cards-3col',
    type: 'cards',
    title: '3 Column Cards',
    description: 'Grid of 3 cards with image, title, and description',
    category: 'layout',
    icon: '🃏',
    defaultContent: {
      cards: [
        {
          image: 'https://placehold.co/400x300',
          title: 'Card Title 1',
          description: 'Card description goes here',
          link: '#',
        },
        {
          image: 'https://placehold.co/400x300',
          title: 'Card Title 2',
          description: 'Card description goes here',
          link: '#',
        },
        {
          image: 'https://placehold.co/400x300',
          title: 'Card Title 3',
          description: 'Card description goes here',
          link: '#',
        },
      ],
    },
  },

  // FAQ Blocks
  {
    id: 'faq-accordion',
    type: 'faq',
    title: 'FAQ Accordion',
    description: 'Expandable FAQ accordion',
    category: 'faq',
    icon: '❓',
    defaultContent: {
      faqs: [
        { question: 'What is this?', answer: 'This is a sample answer' },
        { question: 'How does it work?', answer: 'It works like this...' },
        { question: 'Is it free?', answer: 'Yes, it is free!' },
      ],
    },
  },

  // Testimonial Blocks
  {
    id: 'testimonials-slider',
    type: 'testimonials',
    title: 'Testimonials Slider',
    description: 'Carousel of customer testimonials',
    category: 'social-proof',
    icon: '💬',
    defaultContent: {
      testimonials: [
        {
          quote: 'This product changed my life!',
          author: 'John Doe',
          role: 'CEO, Company',
          avatar: 'https://placehold.co/100x100',
        },
        {
          quote: 'Best service I have ever used!',
          author: 'Jane Smith',
          role: 'Manager, Corp',
          avatar: 'https://placehold.co/100x100',
        },
      ],
    },
  },

  // Steps Blocks
  {
    id: 'steps-vertical',
    type: 'steps',
    title: 'Step-by-Step Guide',
    description: 'Vertical timeline of steps',
    category: 'layout',
    icon: '📝',
    defaultContent: {
      steps: [
        { number: 1, title: 'Sign Up', description: 'Create your account' },
        { number: 2, title: 'Configure', description: 'Set up your preferences' },
        { number: 3, title: 'Launch', description: 'Go live!' },
      ],
    },
  },

  // Media Blocks
  {
    id: 'video-embed',
    type: 'video',
    title: 'Video Embed',
    description: 'Embedded video player (YouTube, Vimeo)',
    category: 'media',
    icon: '🎥',
    defaultContent: {
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      caption: 'Video caption',
    },
  },
  {
    id: 'image-gallery',
    type: 'image',
    title: 'Image Gallery',
    description: 'Grid of images with lightbox',
    category: 'media',
    icon: '🖼️',
    defaultContent: {
      images: [
        { url: 'https://placehold.co/400x300', alt: 'Image 1' },
        { url: 'https://placehold.co/400x300', alt: 'Image 2' },
        { url: 'https://placehold.co/400x300', alt: 'Image 3' },
      ],
    },
  },
];

const categories = [
  { id: 'all', name: 'All Blocks', icon: '📦' },
  { id: 'hero', name: 'Hero', icon: '🎯' },
  { id: 'features', name: 'Features', icon: '⭐' },
  { id: 'cta', name: 'Call to Action', icon: '📢' },
  { id: 'content', name: 'Content', icon: '📄' },
  { id: 'layout', name: 'Layout', icon: '🃏' },
  { id: 'faq', name: 'FAQ', icon: '❓' },
  { id: 'social-proof', name: 'Social Proof', icon: '💬' },
  { id: 'media', name: 'Media', icon: '🎥' },
];

interface BlockLibraryProps {
  open: boolean;
  onClose: () => void;
  onAddBlock: (block: ContentBlock) => void;
}

export function BlockLibrary({ open, onClose, onAddBlock }: BlockLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBlocks = blockTemplates.filter((block) => {
    const matchesSearch =
      block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBlock = (template: BlockTemplate) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: template.type,
      title: template.title,
      content: template.defaultContent,
      settings: template.defaultSettings || {},
      order: 0, // Will be set by ContentBuilder
    };
    onAddBlock(newBlock);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Block Library</DialogTitle>
          <DialogDescription>
            Choose a block template to add to your page
          </DialogDescription>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Sidebar - Categories */}
          <div className="w-48 border-r bg-muted/30 p-4">
            <ScrollArea className="h-full">
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search blocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Blocks Grid */}
            <ScrollArea className="flex-1 p-4">
              {filteredBlocks.length === 0 ? (
                <div className="flex h-64 items-center justify-center text-center">
                  <div>
                    <p className="text-muted-foreground mb-2">No blocks found</p>
                    <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
                      Clear search
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredBlocks.map((template) => (
                    <Card
                      key={template.id}
                      className="group cursor-pointer transition-all hover:shadow-md hover:border-primary"
                      onClick={() => handleAddBlock(template)}
                    >
                      <div className="p-4">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl">{template.icon}</span>
                            <div>
                              <h3 className="font-medium">{template.title}</h3>
                              <Badge variant="outline" className="mt-1 capitalize text-xs">
                                {template.category}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            <div className="border-t p-4 bg-muted/30">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {filteredBlocks.length} {filteredBlocks.length === 1 ? 'block' : 'blocks'} available
                </span>
                <span>Click on a block to add it to your page</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
