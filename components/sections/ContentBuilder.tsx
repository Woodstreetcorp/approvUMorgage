'use client';

import { useState } from 'react';
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
            disabled={!pageId}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
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
      ) : (
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
