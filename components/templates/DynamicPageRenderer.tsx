/**
 * Dynamic Page Renderer
 * Renders pages from the database with their content blocks
 */

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface ContentBlock {
  id: string;
  type: string;
  title?: string;
  content: any;
  settings?: {
    backgroundColor?: string;
    padding?: string;
    alignment?: string;
    [key: string]: any;
  };
  order?: number;
}

interface PageData {
  id: string;
  title: string;
  path: string;
  content_blocks?: ContentBlock[] | any;
  description?: string;
  excerpt?: string;
  featured_image?: string;
  status: string;
  vertical?: string;
  page_type?: string;
  author?: string;
  created_at: string;
  published_at?: string;
  meta_description?: string;
  meta_title?: string;
}

interface DynamicPageRendererProps {
  page: PageData;
}

export function DynamicPageRenderer({ page }: DynamicPageRendererProps) {
  // Parse content blocks if they're stored as JSON string
  let contentBlocks: ContentBlock[] = [];
  
  if (page.content_blocks) {
    if (typeof page.content_blocks === 'string') {
      try {
        contentBlocks = JSON.parse(page.content_blocks);
      } catch (e) {
        console.error('Failed to parse content blocks:', e);
      }
    } else if (Array.isArray(page.content_blocks)) {
      contentBlocks = page.content_blocks;
    }
  }

  // Sort blocks by order
  const sortedBlocks = [...contentBlocks].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs / Category */}
            {page.vertical && (
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {page.vertical}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {page.title}
            </h1>

            {/* Description/Excerpt */}
            {(page.description || page.excerpt) && (
              <p className="text-xl text-muted-foreground mb-6">
                {page.description || page.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {page.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(page.published_at), 'MMMM d, yyyy')}
                  </span>
                </div>
              )}
              {page.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{page.author}</span>
                </div>
              )}
              {page.page_type && (
                <Badge variant="outline">{page.page_type}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {page.featured_image && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <img
              src={page.featured_image}
              alt={page.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Content Blocks */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {sortedBlocks.length > 0 ? (
            sortedBlocks.map((block) => (
              <ContentBlockRenderer key={block.id} block={block} />
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  This page has no content yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Content Block Renderer
 * Renders individual content blocks based on their type
 */
function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  const { type, title, content, settings } = block;

  // Apply settings
  const blockStyle = {
    backgroundColor: settings?.backgroundColor,
    padding: settings?.padding,
    textAlign: settings?.alignment as any,
  };

  // Render different block types
  switch (type) {
    case 'heading':
      return (
        <div style={blockStyle}>
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
          )}
          {content?.text && (
            <h3 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              {content.text}
            </h3>
          )}
        </div>
      );

    case 'text':
    case 'paragraph':
    case 'content':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          )}
          {content?.imageUrl && (
            <div className={`mb-6 ${content.imagePosition === 'right' ? 'float-right ml-6' : content.imagePosition === 'left' ? 'float-left mr-6' : ''}`}>
              <img 
                src={content.imageUrl} 
                alt={title || 'Content image'} 
                className="rounded-lg max-w-md shadow-md"
              />
            </div>
          )}
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: content?.html || content?.text || '' }}
          />
        </div>
      );

    case 'hero':
      return (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 md:p-12" style={blockStyle}>
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {title}
              </h2>
            )}
            {content?.subtitle && (
              <p className="text-xl text-muted-foreground mb-6">
                {content.subtitle}
              </p>
            )}
            {content?.description && (
              <p className="text-lg mb-8">{content.description}</p>
            )}
            {content?.buttonText && content?.buttonLink && (
              <a
                href={content.buttonLink}
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {content.buttonText}
              </a>
            )}
          </CardContent>
        </Card>
      );

    case 'image':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          )}
          {content?.url && (
            <img
              src={content.url}
              alt={content?.alt || title || 'Image'}
              className="w-full h-auto rounded-lg shadow-md"
            />
          )}
          {content?.caption && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {content.caption}
            </p>
          )}
        </div>
      );

    case 'video':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          )}
          {content?.url && (
            <div className="aspect-video">
              <iframe
                src={content.url}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title={title || 'Video'}
              />
            </div>
          )}
        </div>
      );

    case 'cta':
    case 'call-to-action':
      return (
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center" style={blockStyle}>
            {title && (
              <h3 className="text-3xl font-bold mb-4">{title}</h3>
            )}
            {content?.description && (
              <p className="text-lg mb-6 opacity-90">{content.description}</p>
            )}
            {content?.buttonText && content?.buttonLink && (
              <a
                href={content.buttonLink}
                className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
              >
                {content.buttonText}
              </a>
            )}
          </CardContent>
        </Card>
      );

    case 'list':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          )}
          {content?.items && Array.isArray(content.items) && (
            <ul className="space-y-2 list-disc list-inside">
              {content.items.map((item: string, index: number) => (
                <li key={index} className="text-lg">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'quote':
      return (
        <Card className="border-l-4 border-primary">
          <CardContent className="p-6" style={blockStyle}>
            <blockquote className="text-xl italic text-muted-foreground">
              "{content?.text || content?.quote}"
            </blockquote>
            {content?.author && (
              <p className="mt-4 font-semibold">— {content.author}</p>
            )}
          </CardContent>
        </Card>
      );

    case 'faq':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-2xl font-semibold mb-6">{title}</h3>
          )}
          {content?.items && Array.isArray(content.items) && (
            <div className="space-y-4">
              {content.items.map((item: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">
                      {item.question}
                    </h4>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {content?.faqs && Array.isArray(content.faqs) && (
            <div className="space-y-4">
              {content.faqs.map((faq: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      );

    case 'features':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-3xl font-bold mb-8 text-center">{title}</h3>
          )}
          {content?.heading && (
            <h3 className="text-3xl font-bold mb-8 text-center">{content.heading}</h3>
          )}
          {content?.features && Array.isArray(content.features) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.features.map((feature: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{feature.icon || '✨'}</div>
                    <h4 className="text-xl font-semibold mb-2">{feature.title || `Feature ${index + 1}`}</h4>
                    <p className="text-muted-foreground">{feature.description || 'Feature description'}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      );

    case 'cards':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-3xl font-bold mb-8 text-center">{title}</h3>
          )}
          {content?.cards && Array.isArray(content.cards) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.cards.map((card: any, index: number) => (
                <Card key={index} className="overflow-hidden">
                  {card.image && (
                    <img 
                      src={card.image} 
                      alt={card.title || `Card ${index + 1}`} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">{card.title || `Card ${index + 1}`}</h4>
                    <p className="text-muted-foreground mb-4">{card.description || 'Card description'}</p>
                    {card.link && (
                      <a 
                        href={card.link} 
                        className="text-primary hover:underline font-semibold"
                      >
                        Learn More →
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      );

    case 'testimonials':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-3xl font-bold mb-8 text-center">{title}</h3>
          )}
          {content?.testimonials && Array.isArray(content.testimonials) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.testimonials.map((testimonial: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={testimonial.avatar || 'https://placehold.co/100x100'} 
                        alt={testimonial.author || 'Customer'} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.author || 'Anonymous'}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role || 'Customer'}</p>
                      </div>
                    </div>
                    <blockquote className="text-lg italic text-muted-foreground">
                      "{testimonial.quote || 'Great service!'}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      );

    case 'steps':
      return (
        <div style={blockStyle}>
          {title && (
            <h3 className="text-3xl font-bold mb-8 text-center">{title}</h3>
          )}
          {content?.steps && Array.isArray(content.steps) && (
            <div className="space-y-6">
              {content.steps.map((step: any, index: number) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    {step.number || index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">{step.title || `Step ${index + 1}`}</h4>
                    <p className="text-muted-foreground">{step.description || 'Step description'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'divider':
      return <hr className="my-8 border-border" style={blockStyle} />;

    case 'spacer':
      return (
        <div
          style={{
            height: content?.height || '2rem',
            ...blockStyle,
          }}
        />
      );

    default:
      // Fallback for unknown block types
      return (
        <Card>
          <CardContent className="p-6" style={blockStyle}>
            {title && (
              <h3 className="text-xl font-semibold mb-4">{title}</h3>
            )}
            <div className="prose max-w-none">
              <pre className="text-sm bg-muted p-4 rounded overflow-auto">
                {JSON.stringify(content, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      );
  }
}
