'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  GripVertical,
  Edit,
  Trash2,
  Copy,
  Settings,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ContentBlock } from './ContentBuilder';
import { useState } from 'react';

interface SortableBlockProps {
  id: string;
  block: ContentBlock;
  icon: string;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  isSelected?: boolean;
}

export function SortableBlock({
  id,
  block,
  icon,
  onEdit,
  onDelete,
  onDuplicate,
  isSelected,
}: SortableBlockProps) {
  const [isVisible, setIsVisible] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`group relative ${
        isSelected ? 'ring-2 ring-primary' : ''
      } ${isDragging ? 'cursor-grabbing' : ''}`}
    >
      <div className="flex items-center gap-3 p-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none hover:bg-muted rounded p-1 -m-1"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Block Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-2xl">
          {icon}
        </div>

        {/* Block Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium truncate">{block.title}</h4>
            <Badge variant="secondary" className="capitalize text-xs">
              {block.type}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Order: {block.order + 1}</span>
            {block.settings?.backgroundColor && (
              <span className="flex items-center gap-1">
                <div
                  className="h-3 w-3 rounded-full border"
                  style={{ backgroundColor: block.settings.backgroundColor }}
                />
                {block.settings.backgroundColor}
              </span>
            )}
            {block.settings?.padding && (
              <span>Padding: {block.settings.padding}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            title={isVisible ? 'Hide block' : 'Show block'}
          >
            {isVisible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            title="Edit block"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDuplicate}
            title="Duplicate block"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            title="Delete block"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      {/* Block Preview/Settings (collapsed by default) */}
      {isSelected && (
        <div className="border-t bg-muted/30 p-4">
          <div className="text-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Block Settings</span>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <span className="font-medium">Type:</span> {block.type}
              </div>
              <div>
                <span className="font-medium">ID:</span> {block.id}
              </div>
              {block.settings && Object.keys(block.settings).length > 0 && (
                <div className="col-span-2">
                  <span className="font-medium">Custom Settings:</span>
                  <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-auto">
                    {JSON.stringify(block.settings, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Block Preview Section (toggle with eye icon) */}
      {isVisible && (
        <div className="border-t bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Block Preview
            </span>
          </div>
          <div 
            className="rounded-lg border p-4"
            style={{
              backgroundColor: block.settings?.backgroundColor || 'transparent',
              padding: block.settings?.padding || '1rem',
            }}
          >
            {block.type === 'hero' && (
              <div className={`text-${block.settings?.alignment || 'left'}`}>
                <h1 className="text-3xl font-bold mb-3">{block.content?.headline || 'Hero Headline'}</h1>
                <p className="text-lg mb-4">{block.content?.subtitle || 'Hero subtitle text'}</p>
                {block.content?.ctaText && (
                  <Button size="sm">{block.content.ctaText}</Button>
                )}
              </div>
            )}
            {block.type === 'text' && (
              <div className={`text-${block.settings?.alignment || 'left'}`}>
                {block.content?.heading && (
                  <h2 className="text-xl font-bold mb-3">{block.content.heading}</h2>
                )}
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: block.content?.body || 'Text content' }} />
              </div>
            )}
            {block.type === 'cta' && (
              <div className={`text-${block.settings?.alignment || 'center'}`}>
                <h2 className="text-2xl font-bold mb-3">{block.content?.heading || 'Call to Action'}</h2>
                <p className="text-base mb-4">{block.content?.description || 'CTA description'}</p>
                <Button size="sm">{block.content?.buttonText || 'Click Here'}</Button>
              </div>
            )}
            {block.type === 'features' && (
              <div>
                {block.content?.heading && (
                  <h2 className="text-2xl font-bold mb-6 text-center">{block.content.heading}</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(block.content?.features || [{}, {}, {}]).map((feature: any, idx: number) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl mb-2">{feature.icon || '✨'}</div>
                      <h3 className="font-semibold mb-1">{feature.title || `Feature ${idx + 1}`}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description || 'Feature description'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* {block.type === 'content' && (
              <div className={`text-${block.settings?.alignment || 'left'}`}>
                {block.content?.imageUrl && (
                  <div className={`mb-3 ${block.content.imagePosition === 'right' ? 'float-right ml-3' : block.content.imagePosition === 'left' ? 'float-left mr-3' : ''}`}>
                    <img src={block.content.imageUrl} alt="Content" className="rounded-lg max-w-xs" />
                  </div>
                )}
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: block.content?.html || '<p>Start writing your content here...</p>' }} />
              </div>
            )} */}
            {block.type === 'cards' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(block.content?.cards || [{}, {}, {}]).map((card: any, idx: number) => (
                    <Card key={idx} className="overflow-hidden">
                      {card.image && (
                        <img src={card.image} alt={card.title || `Card ${idx + 1}`} className="w-full h-32 object-cover" />
                      )}
                      <div className="p-3">
                        <h3 className="font-semibold text-sm mb-1">{card.title || `Card Title ${idx + 1}`}</h3>
                        <p className="text-xs text-muted-foreground">{card.description || 'Card description'}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {block.type === 'faq' && (
              <div className="space-y-2">
                {(block.content?.faqs || [{}, {}, {}]).map((faq: any, idx: number) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm pr-4">{faq.question || `Question ${idx + 1}?`}</h3>
                      <Badge variant="outline" className="text-xs">▼</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{faq.answer || 'Sample answer'}</p>
                  </div>
                ))}
              </div>
            )}
            {block.type === 'testimonials' && (
              <div className="space-y-3">
                {(block.content?.testimonials || [{}, {}]).map((testimonial: any, idx: number) => (
                  <Card key={idx} className="p-3">
                    <div className="flex items-start gap-3">
                      <img 
                        src={testimonial.avatar || 'https://placehold.co/100x100'} 
                        alt={testimonial.author || 'Author'} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm mb-2 italic">"{testimonial.quote || 'Testimonial quote'}"</p>
                        <div className="text-xs">
                          <div className="font-semibold">{testimonial.author || 'John Doe'}</div>
                          <div className="text-muted-foreground">{testimonial.role || 'Customer'}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            {block.type === 'steps' && (
              <div className="space-y-3">
                {(block.content?.steps || [{}, {}, {}]).map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {step.number || idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{step.title || `Step ${idx + 1}`}</h3>
                      <p className="text-xs text-muted-foreground">{step.description || 'Step description'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {block.type === 'video' && (
              <div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-2">
                  <div className="text-center">
                    <div className="text-4xl mb-1">🎥</div>
                    <p className="text-xs text-muted-foreground px-2 break-all">{block.content?.videoUrl || 'No URL'}</p>
                  </div>
                </div>
                {block.content?.caption && (
                  <p className="text-xs text-muted-foreground text-center">{block.content.caption}</p>
                )}
              </div>
            )}
            {block.type === 'image' && (
              <div className="grid grid-cols-3 gap-2">
                {(block.content?.images || [{}, {}, {}]).map((img: any, idx: number) => (
                  <div key={idx} className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={img.url || 'https://placehold.co/400x300'} 
                      alt={img.alt || `Image ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            {!['hero', 'text', 'cta', 'features', 'cards', 'faq', 'testimonials', 'steps', 'video', 'image'].includes(block.type) && (
              <div className="text-center text-muted-foreground">
                <p className="text-xs mb-2">Preview not available for {block.type} block</p>
                <pre className="text-xs text-left bg-muted p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(block.content, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
