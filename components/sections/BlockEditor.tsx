'use client';

import { useState, useEffect } from 'react';
import { ContentBlock } from './ContentBuilder';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from '@/components/ui/color-picker';
import { Save, X } from 'lucide-react';

interface BlockEditorProps {
  block: ContentBlock | null;
  open: boolean;
  onClose: () => void;
  onSave: (updatedBlock: ContentBlock) => void;
}

export function BlockEditor({ block, open, onClose, onSave }: BlockEditorProps) {
  const [editedBlock, setEditedBlock] = useState<ContentBlock | null>(null);

  useEffect(() => {
    if (block) {
      setEditedBlock(JSON.parse(JSON.stringify(block))); // Deep clone
    }
  }, [block]);

  if (!editedBlock) return null;

  const handleContentChange = (key: string, value: any) => {
    setEditedBlock({
      ...editedBlock,
      content: {
        ...editedBlock.content,
        [key]: value,
      },
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setEditedBlock({
      ...editedBlock,
      settings: {
        ...editedBlock.settings,
        [key]: value,
      },
    });
  };

  const handleSave = () => {
    onSave(editedBlock);
    onClose();
  };

  const renderContentFields = () => {
    const { type, content } = editedBlock;

    switch (type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={content.headline || ''}
                onChange={(e) => handleContentChange('headline', e.target.value)}
                placeholder="Enter headline"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                placeholder="Enter subtitle"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="ctaText">Button Text</Label>
              <Input
                id="ctaText"
                value={content.ctaText || ''}
                onChange={(e) => handleContentChange('ctaText', e.target.value)}
                placeholder="Get Started"
              />
            </div>
            <div>
              <Label htmlFor="ctaLink">Button Link</Label>
              <Input
                id="ctaLink"
                value={content.ctaLink || ''}
                onChange={(e) => handleContentChange('ctaLink', e.target.value)}
                placeholder="/contact"
              />
            </div>
            {content.backgroundImage !== undefined && (
              <div>
                <Label htmlFor="backgroundImage">Background Image URL</Label>
                <Input
                  id="backgroundImage"
                  value={content.backgroundImage || ''}
                  onChange={(e) => handleContentChange('backgroundImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={content.headline || ''}
                onChange={(e) => handleContentChange('headline', e.target.value)}
                placeholder="Ready to get started?"
              />
            </div>
            {content.subtitle !== undefined && (
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={content.subtitle || ''}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  placeholder="Join us today"
                />
              </div>
            )}
            {content.description !== undefined && (
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={content.description || ''}
                  onChange={(e) => handleContentChange('description', e.target.value)}
                  rows={3}
                />
              </div>
            )}
            {content.primaryButtonText !== undefined && (
              <>
                <div>
                  <Label htmlFor="primaryButtonText">Primary Button Text</Label>
                  <Input
                    id="primaryButtonText"
                    value={content.primaryButtonText || ''}
                    onChange={(e) => handleContentChange('primaryButtonText', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="primaryButtonLink">Primary Button Link</Label>
                  <Input
                    id="primaryButtonLink"
                    value={content.primaryButtonLink || ''}
                    onChange={(e) => handleContentChange('primaryButtonLink', e.target.value)}
                  />
                </div>
              </>
            )}
            {content.buttonText !== undefined && (
              <>
                <div>
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={content.buttonText || ''}
                    onChange={(e) => handleContentChange('buttonText', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={content.buttonLink || ''}
                    onChange={(e) => handleContentChange('buttonLink', e.target.value)}
                  />
                </div>
              </>
            )}
            {content.secondaryButtonText !== undefined && (
              <>
                <div>
                  <Label htmlFor="secondaryButtonText">Secondary Button Text</Label>
                  <Input
                    id="secondaryButtonText"
                    value={content.secondaryButtonText || ''}
                    onChange={(e) => handleContentChange('secondaryButtonText', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryButtonLink">Secondary Button Link</Label>
                  <Input
                    id="secondaryButtonLink"
                    value={content.secondaryButtonLink || ''}
                    onChange={(e) => handleContentChange('secondaryButtonLink', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        );

      case 'content':
        return (
          <div className="space-y-4">
            {content.title !== undefined && (
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={content.title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  placeholder="Section Title"
                />
              </div>
            )}
            <div>
              <Label htmlFor="html">Content (HTML)</Label>
              <Textarea
                id="html"
                value={content.html || ''}
                onChange={(e) => handleContentChange('html', e.target.value)}
                placeholder="<p>Your content here...</p>"
                rows={10}
                className="font-mono text-sm"
              />
            </div>
            {content.imageUrl !== undefined && (
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={content.imageUrl || ''}
                  onChange={(e) => handleContentChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
            {content.imagePosition !== undefined && (
              <div>
                <Label htmlFor="imagePosition">Image Position</Label>
                <select
                  id="imagePosition"
                  value={content.imagePosition || 'left'}
                  onChange={(e) => handleContentChange('imagePosition', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Image URL</Label>
              <Input
                id="url"
                value={content.url || ''}
                onChange={(e) => handleContentChange('url', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {content.alt !== undefined && (
              <div>
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={content.alt || ''}
                  onChange={(e) => handleContentChange('alt', e.target.value)}
                  placeholder="Image description"
                />
              </div>
            )}
            {content.caption !== undefined && (
              <div>
                <Label htmlFor="caption">Caption</Label>
                <Input
                  id="caption"
                  value={content.caption || ''}
                  onChange={(e) => handleContentChange('caption', e.target.value)}
                  placeholder="Image caption"
                />
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Video URL</Label>
              <Input
                id="url"
                value={content.url || ''}
                onChange={(e) => handleContentChange('url', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            {content.provider !== undefined && (
              <div>
                <Label htmlFor="provider">Provider</Label>
                <select
                  id="provider"
                  value={content.provider || 'youtube'}
                  onChange={(e) => handleContentChange('provider', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                </select>
              </div>
            )}
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={content.question || ''}
                onChange={(e) => handleContentChange('question', e.target.value)}
                placeholder="What is your question?"
              />
            </div>
            <div>
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                value={content.answer || ''}
                onChange={(e) => handleContentChange('answer', e.target.value)}
                placeholder="Your answer here..."
                rows={5}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label>Content (JSON)</Label>
              <Textarea
                value={JSON.stringify(content, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setEditedBlock({ ...editedBlock, content: parsed });
                  } catch (error) {
                    // Invalid JSON, don't update
                  }
                }}
                rows={15}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Edit the JSON directly for this block type
              </p>
            </div>
          </div>
        );
    }
  };

  const renderSettingsFields = () => {
    const { settings } = editedBlock;

    return (
      <div className="space-y-4">
        <ColorPicker
          label="Background Color"
          value={settings?.backgroundColor || '#ffffff'}
          onChange={(color) => handleSettingChange('backgroundColor', color)}
        />
        <ColorPicker
          label="Text Color"
          value={settings?.textColor || '#000000'}
          onChange={(color) => handleSettingChange('textColor', color)}
        />
        <div>
          <Label htmlFor="padding">Padding</Label>
          <select
            id="padding"
            value={settings?.padding || 'medium'}
            onChange={(e) => handleSettingChange('padding', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="none">None</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div>
          <Label htmlFor="alignment">Alignment</Label>
          <select
            id="alignment"
            value={settings?.alignment || 'left'}
            onChange={(e) => handleSettingChange('alignment', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            Edit Block: {editedBlock.title}
          </DialogTitle>
          <DialogDescription>
            Customize the content and appearance of this block
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="content" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px] mt-4">
            <TabsContent value="content" className="mt-0 space-y-4">
              {renderContentFields()}
            </TabsContent>

            <TabsContent value="settings" className="mt-0 space-y-4">
              {renderSettingsFields()}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
