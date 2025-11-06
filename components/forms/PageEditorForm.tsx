'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentBuilder, ContentBlock } from '@/components/sections/ContentBuilder';
import Link from 'next/link';

// Validation schema
const pageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(200, 'Slug too long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  meta_description: z.string().max(160, 'Meta description should be under 160 characters').optional(),
  meta_keywords: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  vertical: z.string().min(1, 'Vertical is required'),
  page_type: z.string().min(1, 'Page type is required'),
  parent_page_id: z.string().nullable().optional(),
  content: z.any().optional(),
  seo_title: z.string().max(60, 'SEO title should be under 60 characters').optional(),
  canonical_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  og_image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type PageFormData = z.infer<typeof pageSchema>;

interface PageEditorFormProps {
  initialData?: Partial<PageFormData> & { id?: string };
  isNew?: boolean;
}

export function PageEditorForm({ initialData, isNew = false }: PageEditorFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [parentPages, setParentPages] = useState<Array<{ id: string; title: string }>>([]);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [activeTab, setActiveTab] = useState('details');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      meta_description: initialData?.meta_description || '',
      meta_keywords: initialData?.meta_keywords || '',
      status: initialData?.status || 'draft',
      vertical: initialData?.vertical || 'general',
      page_type: initialData?.page_type || 'article',
      parent_page_id: initialData?.parent_page_id || null,
      seo_title: initialData?.seo_title || '',
      canonical_url: initialData?.canonical_url || '',
      og_image: initialData?.og_image || '',
    },
  });

  const title = watch('title');
  const slug = watch('slug');
  const status = watch('status');
  const vertical = watch('vertical');
  const pageType = watch('page_type');
  const parentPageId = watch('parent_page_id');

  // Fetch parent pages for dropdown
  useEffect(() => {
    const fetchParentPages = async () => {
      try {
        const response = await fetch('/api/admin/pages?status=published&limit=100');
        if (response.ok) {
          const data = await response.json();
          setParentPages(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch parent pages:', error);
      }
    };
    fetchParentPages();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && title && !slug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [title, isNew, slug, setValue]);

  // Auto-save functionality (every 10 seconds if dirty and not new)
  useEffect(() => {
    if (!isNew && isDirty && initialData?.id) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
      const timeout = setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 10000); // Auto-save after 10 seconds of inactivity
      setAutoSaveTimeout(timeout);
    }
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [isDirty, isNew, initialData?.id]);

  const onSubmit = async (data: PageFormData) => {
    setIsSaving(true);
    try {
      const url = isNew ? '/api/admin/pages' : `/api/admin/pages?id=${initialData?.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save page');
      }

      const result = await response.json();
      toast.success(isNew ? 'Page created successfully!' : 'Page updated successfully!');

      if (isNew) {
        router.push(`/admin/pages/${result.data.id}`);
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save page');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        router.push('/admin/pages');
      }
    } else {
      router.push('/admin/pages');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancel}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isNew ? 'Create New Page' : 'Edit Page'}
            </h1>
            {!isNew && (
              <p className="text-sm text-muted-foreground">
                Last saved: {new Date().toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && slug && (
            <Button
              type="button"
              variant="outline"
              asChild
            >
              <Link href={`/${slug}`} target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Link>
            </Button>
          )}
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isNew ? 'Create Page' : 'Save Changes'}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">Page Title *</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Enter page title"
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  {...register('slug')}
                  placeholder="url-friendly-slug"
                  className={errors.slug ? 'border-destructive' : ''}
                />
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  Preview: /{slug || 'your-slug'}
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  {...register('meta_description')}
                  placeholder="Brief description for search engines (160 chars max)"
                  rows={3}
                  className={errors.meta_description ? 'border-destructive' : ''}
                />
                {errors.meta_description && (
                  <p className="text-sm text-destructive mt-1">{errors.meta_description.message}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {watch('meta_description')?.length || 0}/160 characters
                </p>
              </div>
            </div>
          </Card>

          {/* SEO Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">SEO Settings</h2>
            <div className="space-y-4">
              {/* SEO Title */}
              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  {...register('seo_title')}
                  placeholder="Override default title for search engines"
                  className={errors.seo_title ? 'border-destructive' : ''}
                />
                {errors.seo_title && (
                  <p className="text-sm text-destructive mt-1">{errors.seo_title.message}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {watch('seo_title')?.length || 0}/60 characters
                </p>
              </div>

              {/* Meta Keywords */}
              <div>
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input
                  id="meta_keywords"
                  {...register('meta_keywords')}
                  placeholder="mortgage, home loan, refinance (comma-separated)"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Comma-separated keywords for SEO
                </p>
              </div>

              {/* Canonical URL */}
              <div>
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input
                  id="canonical_url"
                  {...register('canonical_url')}
                  placeholder="https://example.com/canonical-page"
                  className={errors.canonical_url ? 'border-destructive' : ''}
                />
                {errors.canonical_url && (
                  <p className="text-sm text-destructive mt-1">{errors.canonical_url.message}</p>
                )}
              </div>

              {/* OG Image */}
              <div>
                <Label htmlFor="og_image">Open Graph Image</Label>
                <Input
                  id="og_image"
                  {...register('og_image')}
                  placeholder="https://example.com/image.jpg"
                  className={errors.og_image ? 'border-destructive' : ''}
                />
                {errors.og_image && (
                  <p className="text-sm text-destructive mt-1">{errors.og_image.message}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  Image for social media sharing (1200x630px recommended)
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Publish Settings</h2>
            <div className="space-y-4">
              {/* Status */}
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={status} onValueChange={(value) => setValue('status', value as any, { shouldValidate: true })}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vertical */}
              <div>
                <Label htmlFor="vertical">Vertical *</Label>
                <Select value={vertical} onValueChange={(value) => setValue('vertical', value, { shouldValidate: true })}>
                  <SelectTrigger id="vertical">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="about">About</SelectItem>
                    <SelectItem value="resources">Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Page Type */}
              <div>
                <Label htmlFor="page_type">Page Type *</Label>
                <Select value={pageType} onValueChange={(value) => setValue('page_type', value, { shouldValidate: true })}>
                  <SelectTrigger id="page_type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hub">Hub Page</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="calculator">Calculator</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="province">Province Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Parent Page */}
              <div>
                <Label htmlFor="parent_page_id">Parent Page</Label>
                <Select 
                  value={parentPageId || 'none'} 
                  onValueChange={(value) => setValue('parent_page_id', value === 'none' ? null : value, { shouldValidate: true })}
                >
                  <SelectTrigger id="parent_page_id">
                    <SelectValue placeholder="Select parent page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Parent (Top Level)</SelectItem>
                    {parentPages.map((page) => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  For building page hierarchy
                </p>
              </div>
            </div>
          </Card>

          {/* Help Card */}
          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn more about creating effective pages in our documentation.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use clear, descriptive titles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Keep slugs short and keyword-rich</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Write compelling meta descriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Set proper page hierarchy for SEO</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Content Builder Section */}
      {!isNew && initialData?.id && (
        <div className="mt-8">
          <ContentBuilder
            pageId={initialData.id}
            initialBlocks={contentBlocks}
            onSave={async (blocks) => {
              // Save content blocks to the page's content_blocks field
              try {
                const response = await fetch(`/api/admin/pages?id=${initialData.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    content_blocks: blocks 
                  }),
                });
                if (!response.ok) throw new Error('Failed to save content blocks');
                setContentBlocks(blocks);
              } catch (error) {
                throw error;
              }
            }}
          />
        </div>
      )}

      {isNew && (
        <Card className="p-6 bg-muted/50">
          <p className="text-sm text-muted-foreground text-center">
            💡 <strong>Note:</strong> Save the page first to unlock the Content Builder where you can add and arrange content blocks.
          </p>
        </Card>
      )}
    </form>
  );
}
