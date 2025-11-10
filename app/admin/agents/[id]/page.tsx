'use client';

import { use, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Save,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  Star,
  Image as ImageIcon,
  Globe,
  Languages,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface AgentFormData {
  name: string;
  title: string;
  slug: string;
  email: string;
  phone: string;
  license_number: string;
  bio: string;
  location: string;
  profile_image_url: string;
  is_active: boolean;
  years_experience: number | null;
  rating: number | null;
  review_count: number | null;
  display_order: number | null;
  specialties: string;
  languages: string;
}

// Inner component that uses React Query hooks
function AgentEditorContent({ id }: { id?: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    title: '',
    slug: '',
    email: '',
    phone: '',
    license_number: '',
    bio: '',
    location: '',
    profile_image_url: '',
    is_active: true,
    years_experience: null,
    rating: null,
    review_count: null,
    display_order: null,
    specialties: '',
    languages: '',
  });

  // Fetch agent if editing
  const { data: agentData, isLoading, error } = useQuery({
    queryKey: ['agent', id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/agents?id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch agent');
      const result = await response.json();
      return result.agents?.[0];
    },
    enabled: isEditMode,
  });

  // Populate form when agent data loads
  useEffect(() => {
    if (agentData) {
      setFormData({
        name: agentData.name || '',
        title: agentData.title || '',
        slug: agentData.slug || '',
        email: agentData.email || '',
        phone: agentData.phone || '',
        license_number: agentData.license_number || '',
        bio: agentData.bio || '',
        location: agentData.location || '',
        profile_image_url: agentData.profile_image_url || '',
        is_active: agentData.is_active ?? true,
        years_experience: agentData.years_experience,
        rating: agentData.rating,
        review_count: agentData.review_count,
        display_order: agentData.display_order,
        specialties: agentData.specialties?.join(', ') || '',
        languages: agentData.languages?.join(', ') || '',
      });
    }
  }, [agentData]);

  // Save mutation (create or update)
  const saveMutation = useMutation({
    mutationFn: async (data: AgentFormData) => {
      const payload = {
        ...data,
        years_experience: data.years_experience ? Number(data.years_experience) : null,
        rating: data.rating ? Number(data.rating) : null,
        review_count: data.review_count ? Number(data.review_count) : null,
        display_order: data.display_order ? Number(data.display_order) : null,
        specialties: data.specialties 
          ? data.specialties.split(',').map(s => s.trim()).filter(s => s) 
          : null,
        languages: data.languages 
          ? data.languages.split(',').map(s => s.trim()).filter(s => s) 
          : null,
      };

      if (isEditMode) {
        // Update existing agent
        const response = await fetch(`/api/admin/agents`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...payload }),
        });
        if (!response.ok) throw new Error('Failed to update agent');
        return response.json();
      } else {
        // Create new agent
        const response = await fetch(`/api/admin/agents`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to create agent');
        return response.json();
      }
    },
    onSuccess: () => {
      toast.success(isEditMode ? 'Agent updated successfully' : 'Agent created successfully');
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      router.push('/admin/agents');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!formData.slug.trim()) {
      toast.error('Slug is required');
      return;
    }

    saveMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof AgentFormData, value: string | boolean | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-generate slug from name
  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  if (isEditMode && isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild type="button">
              <Link href="/admin/agents">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {isEditMode ? 'Edit Agent' : 'Create New Agent'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isEditMode ? 'Update agent profile information' : 'Add a new mortgage broker or agent'}
              </p>
            </div>
          </div>
          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Agent
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Senior Mortgage Broker"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">
                  URL Slug <span className="text-destructive">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    placeholder="john-doe"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateSlug}>
                    Generate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Used in the URL: /agents/{formData.slug || 'agent-name'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Brief biography and professional background..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(416) 555-0123"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Toronto, ON"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="license_number">License Number</Label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="license_number"
                    placeholder="M12345678"
                    value={formData.license_number}
                    onChange={(e) => handleInputChange('license_number', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  min="0"
                  placeholder="10"
                  value={formData.years_experience || ''}
                  onChange={(e) => handleInputChange('years_experience', e.target.value ? Number(e.target.value) : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialties">Specialties</Label>
                <Input
                  id="specialties"
                  placeholder="First-time buyers, Refinancing, Investment"
                  value={formData.specialties}
                  onChange={(e) => handleInputChange('specialties', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Comma-separated list
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages">Languages</Label>
                <div className="relative">
                  <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="languages"
                    placeholder="English, French, Spanish"
                    value={formData.languages}
                    onChange={(e) => handleInputChange('languages', e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Comma-separated list
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Image & Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Profile Image & Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile_image_url">Profile Image URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile_image_url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.profile_image_url}
                    onChange={(e) => handleInputChange('profile_image_url', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {formData.profile_image_url && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <img
                    src={formData.profile_image_url}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '';
                      toast.error('Failed to load image');
                    }}
                  />
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.display_order || ''}
                  onChange={(e) => handleInputChange('display_order', e.target.value ? Number(e.target.value) : null)}
                />
                <p className="text-sm text-muted-foreground">
                  Lower numbers appear first
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="is_active">Active Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Show this agent on the website
                  </p>
                </div>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ratings & Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Ratings & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Average Rating</Label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="4.5"
                    value={formData.rating || ''}
                    onChange={(e) => handleInputChange('rating', e.target.value ? Number(e.target.value) : null)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  0.0 to 5.0
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review_count">Review Count</Label>
                <Input
                  id="review_count"
                  type="number"
                  min="0"
                  placeholder="42"
                  value={formData.review_count || ''}
                  onChange={(e) => handleInputChange('review_count', e.target.value ? Number(e.target.value) : null)}
                />
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Rating and review count are typically managed automatically by your review system. Manual entry is for initial setup only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/agents">Cancel</Link>
          </Button>
          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Agent
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

// Main page component for editing existing agent
export default function AgentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return (
    <AdminLayout>
      <AgentEditorContent id={id} />
    </AdminLayout>
  );
}
