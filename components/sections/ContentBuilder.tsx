'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableBlock } from '@/components/sections/SortableBlock';
import { BlockLibrary } from '@/components/sections/BlockLibrary';
import { BlockEditor } from '@/components/sections/BlockEditor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Save, 
  Eye, 
  Trash2, 
  GripVertical,
  Settings,
} from 'lucide-react';
import { toast } from 'sonner';

export interface ContentBlock {
  id: string;
  type: string;
  title: string;
  content: any;
  settings?: {
    backgroundColor?: string;
    padding?: string;
    alignment?: string;
    [key: string]: any;
  };
  order: number;
}

interface ContentBuilderProps {
  pageId?: string;
  initialBlocks?: ContentBlock[];
  onSave?: (blocks: ContentBlock[]) => Promise<void>;
  onAddBlock?: () => void;
}

export function ContentBuilder({
  pageId,
  initialBlocks = [],
  onSave,
  onAddBlock,
}: ContentBuilderProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    initialBlocks.sort((a, b) => a.order - b.order)
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Sync blocks when initialBlocks changes
  useEffect(() => {
    console.log('🔄 ContentBuilder - initialBlocks changed:', initialBlocks.length, initialBlocks);
    if (initialBlocks.length > 0) {
      const sortedBlocks = [...initialBlocks].sort((a, b) => a.order - b.order);
      setBlocks(sortedBlocks);
      console.log('✅ ContentBuilder - blocks updated:', sortedBlocks.length);
    }
  }, [initialBlocks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newBlocks = arrayMove(items, oldIndex, newIndex);
        // Update order property
        return newBlocks.map((block, index) => ({
          ...block,
          order: index,
        }));
      });
    }

    setActiveId(null);
  };

  const handleDeleteBlock = (blockId: string) => {
    if (confirm('Are you sure you want to delete this block?')) {
      setBlocks((items) =>
        items
          .filter((item) => item.id !== blockId)
          .map((block, index) => ({ ...block, order: index }))
      );
      toast.success('Block deleted');
    }
  };

  const handleDuplicateBlock = (blockId: string) => {
    const blockToDuplicate = blocks.find((b) => b.id === blockId);
    if (blockToDuplicate) {
      const newBlock: ContentBlock = {
        ...blockToDuplicate,
        id: `block-${Date.now()}`,
        title: `${blockToDuplicate.title} (Copy)`,
        order: blocks.length,
      };
      setBlocks((items) => [...items, newBlock]);
      toast.success('Block duplicated');
    }
  };

  const handleSave = async () => {
    if (!onSave) {
      toast.error('Save function not provided');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(blocks);
      toast.success('Content saved successfully!');
    } catch (error) {
      toast.error('Failed to save content');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditBlock = (blockId: string) => {
    setSelectedBlockId(blockId);
    setIsEditorOpen(true);
  };

  const handleUpdateBlock = (updatedBlock: ContentBlock) => {
    setBlocks((items) =>
      items.map((item) =>
        item.id === updatedBlock.id ? updatedBlock : item
      )
    );
    setIsEditorOpen(false);
    setSelectedBlockId(null);
    toast.success('Block updated successfully!');
  };

  const handleAddBlockFromLibrary = (newBlock: ContentBlock) => {
    const blockWithOrder = {
      ...newBlock,
      order: blocks.length,
    };
    setBlocks((items) => [...items, blockWithOrder]);
    toast.success(`${newBlock.title} added to page!`);
  };

  const activeBlock = blocks.find((block) => block.id === activeId);

  const getBlockIcon = (type: string) => {
    const icons: Record<string, string> = {
      hero: '🎯',
      features: '⭐',
      cta: '📢',
      faq: '❓',
      testimonials: '💬',
      content: '📄',
      image: '🖼️',
      video: '🎥',
      cards: '🃏',
      steps: '📝',
    };
    return icons[type] || '📦';
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Content Builder</h3>
          <span className="text-sm text-muted-foreground">
            ({blocks.length} {blocks.length === 1 ? 'block' : 'blocks'})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLibraryOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Block
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            disabled={!pageId || blocks.length === 0}
          >
            <Eye className="mr-2 h-4 w-4" />
            {isPreviewMode ? 'Exit Preview' : 'Preview'}
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving || blocks.length === 0}
          >
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Layout
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content Area */}
      {blocks.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No content blocks yet</h3>
            <p className="mb-4 text-muted-foreground">
              Start building your page by adding content blocks
            </p>
            <Button onClick={onAddBlock} disabled={!onAddBlock}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Block
            </Button>
          </div>
        </Card>
      ) : isPreviewMode ? (
        /* Preview Mode - Show rendered blocks */
        <div className="space-y-6 rounded-lg border-2 border-primary/50 bg-card p-6">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Preview Mode</h3>
              <Badge variant="secondary">{blocks.length} blocks</Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(false)}
            >
              Exit Preview
            </Button>
          </div>
          {blocks.map((block) => (
            <div key={block.id} className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="capitalize">
                  {block.type}
                </Badge>
                <span>{block.title}</span>
              </div>
              <Card 
                className="p-6"
                style={{
                  backgroundColor: block.settings?.backgroundColor || 'transparent',
                  padding: block.settings?.padding || '1.5rem',
                }}
              >
                {block.type === 'hero' && (
                  <div className={`text-${block.settings?.alignment || 'left'}`}>
                    <h1 className="text-4xl font-bold mb-4">{block.content?.headline || 'Hero Headline'}</h1>
                    <p className="text-xl mb-6">{block.content?.subtitle || 'Hero subtitle text'}</p>
                    {block.content?.ctaText && (
                      <Button>{block.content.ctaText}</Button>
                    )}
                  </div>
                )}
                {block.type === 'text' && (
                  <div className={`text-${block.settings?.alignment || 'left'}`}>
                    {block.content?.heading && (
                      <h2 className="text-2xl font-bold mb-4">{block.content.heading}</h2>
                    )}
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: block.content?.body || 'Text content' }} />
                  </div>
                )}
                {block.type === 'cta' && (
                  <div className={`text-${block.settings?.alignment || 'center'}`}>
                    <h2 className="text-3xl font-bold mb-4">{block.content?.heading || 'Call to Action'}</h2>
                    <p className="text-lg mb-6">{block.content?.description || 'CTA description'}</p>
                    <Button size="lg">{block.content?.buttonText || 'Click Here'}</Button>
                  </div>
                )}
                {block.type === 'features' && (
                  <div>
                    {block.content?.heading && (
                      <h2 className="text-3xl font-bold mb-8 text-center">{block.content.heading}</h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(block.content?.features || [{}, {}, {}]).map((feature: any, idx: number) => (
                        <div key={idx} className="text-center">
                          <div className="text-4xl mb-3">{feature.icon || '✨'}</div>
                          <h3 className="font-semibold mb-2">{feature.title || `Feature ${idx + 1}`}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description || 'Feature description'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* {block.type === 'content' && (
                  <div className={`text-${block.settings?.alignment || 'left'}`}>
                    {block.content?.imageUrl && (
                      <div className={`mb-4 ${block.content.imagePosition === 'right' ? 'float-right ml-4' : block.content.imagePosition === 'left' ? 'float-left mr-4' : ''}`}>
                        <img src={block.content.imageUrl} alt="Content" className="rounded-lg max-w-sm" />
                      </div>
                    )}
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: block.content?.html || '<p>Start writing your content here...</p>' }} />
                  </div>
                )} */}
                {block.type === 'cards' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(block.content?.cards || [{}, {}, {}]).map((card: any, idx: number) => (
                        <Card key={idx} className="overflow-hidden">
                          {card.image && (
                            <img src={card.image} alt={card.title || `Card ${idx + 1}`} className="w-full h-48 object-cover" />
                          )}
                          <div className="p-4">
                            <h3 className="font-semibold mb-2">{card.title || `Card Title ${idx + 1}`}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{card.description || 'Card description goes here'}</p>
                            {card.link && (
                              <Button variant="link" className="p-0 h-auto">Learn More →</Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                {block.type === 'faq' && (
                  <div className="space-y-3">
                    {(block.content?.faqs || [{}, {}, {}]).map((faq: any, idx: number) => (
                      <div key={idx} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold pr-8">{faq.question || `Question ${idx + 1}?`}</h3>
                          <Badge variant="outline">▼</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{faq.answer || 'This is a sample answer'}</p>
                      </div>
                    ))}
                  </div>
                )}
                {block.type === 'testimonials' && (
                  <div className="space-y-4">
                    {(block.content?.testimonials || [{}, {}]).map((testimonial: any, idx: number) => (
                      <Card key={idx} className="p-6">
                        <div className="flex items-start gap-4">
                          <img 
                            src={testimonial.avatar || 'https://placehold.co/100x100'} 
                            alt={testimonial.author || 'Author'} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-lg mb-3 italic">"{testimonial.quote || 'This is a testimonial quote'}"</p>
                            <div className="text-sm">
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
                  <div className="space-y-4">
                    {(block.content?.steps || [{}, {}, {}]).map((step: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {step.number || idx + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{step.title || `Step ${idx + 1}`}</h3>
                          <p className="text-sm text-muted-foreground">{step.description || 'Step description'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {block.type === 'video' && (
                  <div>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-2">
                      <div className="text-center">
                        <div className="text-6xl mb-2">🎥</div>
                        <p className="text-sm text-muted-foreground">Video: {block.content?.videoUrl || 'No URL'}</p>
                      </div>
                    </div>
                    {block.content?.caption && (
                      <p className="text-sm text-muted-foreground text-center">{block.content.caption}</p>
                    )}
                  </div>
                )}
                {block.type === 'image' && (
                  <div className="grid grid-cols-3 gap-3">
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
                    <p className="text-sm">Preview not available for {block.type} block</p>
                    <pre className="mt-2 text-xs text-left bg-muted p-3 rounded overflow-auto">
                      {JSON.stringify(block.content, null, 2)}
                    </pre>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      ) : (
        /* Edit Mode - Show sortable block cards */
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {blocks.map((block) => (
                <SortableBlock
                  key={block.id}
                  id={block.id}
                  block={block}
                  icon={getBlockIcon(block.type)}
                  onEdit={() => handleEditBlock(block.id)}
                  onDelete={() => handleDeleteBlock(block.id)}
                  onDuplicate={() => handleDuplicateBlock(block.id)}
                  isSelected={selectedBlockId === block.id}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeBlock ? (
              <Card className="cursor-grabbing border-2 border-primary bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl">{getBlockIcon(activeBlock.type)}</span>
                  <div className="flex-1">
                    <div className="font-medium">{activeBlock.title}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {activeBlock.type} Block
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* Help Text */}
      {blocks.length > 0 && (
        <div className="rounded-lg border border-dashed bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Drag blocks by the grip handle to reorder them. Click the
            edit button to customize content, or use the duplicate button to quickly
            create variations.
          </p>
        </div>
      )}

      {/* Block Library Modal */}
      <BlockLibrary
        open={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onAddBlock={handleAddBlockFromLibrary}
      />

      {/* Block Editor Modal */}
      {selectedBlockId && (
        <BlockEditor
          open={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setSelectedBlockId(null);
          }}
          block={blocks.find((b) => b.id === selectedBlockId)!}
          onSave={handleUpdateBlock}
        />
      )}
    </div>
  );
}
