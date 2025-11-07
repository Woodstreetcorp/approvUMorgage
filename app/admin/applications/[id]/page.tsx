'use client';

import { use, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  ArrowLeft,
  User,
  Home,
  DollarSign,
  Briefcase,
  CreditCard,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Application {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_first_name: string;
  applicant_last_name: string;
  status: string;
  application_type: string;
  property_address: string;
  property_city: string;
  property_province: string;
  property_postal_code: string;
  property_value: number | null;
  down_payment: number | null;
  credit_score: number | null;
  annual_income: number | null;
  employment_status: string | null;
  notes: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const STATUS_COLORS: Record<string, string> = {
  submitted: 'bg-blue-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
};

const STATUS_ICONS: Record<string, any> = {
  submitted: FileText,
  approved: CheckCircle,
  rejected: XCircle,
};

// Inner component that uses React Query hooks
function ApplicationViewerContent({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch application
  const { data, isLoading, error } = useQuery<{ application: Application }>({
    queryKey: ['application', id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/applications/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch application');
      }
      return response.json();
    },
  });

  const application = data?.application;

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ status, notes }: { status: string; notes: string }) => {
      const response = await fetch(`/api/admin/applications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes }),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Application status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['application', id] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      setIsEditingStatus(false);
      setStatusNotes('');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/admin/applications?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete application');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Application deleted successfully');
      router.push('/admin/applications');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleStatusUpdate = () => {
    if (!newStatus) {
      toast.error('Please select a status');
      return;
    }
    updateStatusMutation.mutate({ status: newStatus, notes: statusNotes });
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    const Icon = STATUS_ICONS[status] || Clock;
    return <Icon className="h-5 w-5" />;
  };

  const calculateLoanAmount = () => {
    if (!application?.property_value || !application?.down_payment) return null;
    return application.property_value - application.down_payment;
  };

  const calculateLTV = () => {
    if (!application?.property_value || !application?.down_payment) return null;
    const loanAmount = application.property_value - application.down_payment;
    return ((loanAmount / application.property_value) * 100).toFixed(2);
  };

  const calculateDownPaymentPercent = () => {
    if (!application?.property_value || !application?.down_payment) return null;
    return ((application.down_payment / application.property_value) * 100).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Clock className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
        <XCircle className="h-12 w-12 mb-4" />
        <p>Application not found</p>
        <Button asChild className="mt-4">
          <Link href="/admin/applications">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/applications">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Application Details</h1>
              <p className="text-muted-foreground mt-1">
                Application ID: {application.id.slice(0, 8)}...
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditingStatus(true);
                setNewStatus(application.status);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Update Status
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Current Status:
                </div>
                <Badge
                  className={`${STATUS_COLORS[application.status] || 'bg-gray-500'} text-white flex items-center gap-2 text-base px-4 py-2`}
                >
                  {getStatusIcon(application.status)}
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {formatDate(application.updated_at)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Applicant Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Applicant Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Full Name</div>
                <div className="text-base font-medium">{application.applicant_name}</div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Email</div>
                <div className="text-base">{application.applicant_email}</div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Phone</div>
                <div className="text-base">{application.applicant_phone || 'N/A'}</div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Application Type</div>
                <div className="text-base capitalize">{application.application_type}</div>
              </div>
            </CardContent>
          </Card>

          {/* Property Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Address</div>
                <div className="text-base">{application.property_address || 'N/A'}</div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">City</div>
                <div className="text-base">{application.property_city || 'N/A'}</div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Province</div>
                  <div className="text-base">{application.property_province || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Postal Code</div>
                  <div className="text-base">{application.property_postal_code || 'N/A'}</div>
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Property Value</div>
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(application.property_value)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Down Payment</div>
                <div className="text-xl font-bold text-blue-600">
                  {formatCurrency(application.down_payment)}
                </div>
                {calculateDownPaymentPercent() && (
                  <div className="text-sm text-muted-foreground">
                    ({calculateDownPaymentPercent()}% of property value)
                  </div>
                )}
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Loan Amount</div>
                <div className="text-xl font-bold text-purple-600">
                  {formatCurrency(calculateLoanAmount())}
                </div>
                {calculateLTV() && (
                  <div className="text-sm text-muted-foreground">
                    LTV: {calculateLTV()}%
                  </div>
                )}
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Annual Income</div>
                <div className="text-base font-medium">
                  {formatCurrency(application.annual_income)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit & Employment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Credit & Employment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Credit Score</div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {application.credit_score || 'N/A'}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Employment Status</div>
                <div className="text-base capitalize">
                  {application.employment_status || 'N/A'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Application Created</div>
                    <div className="text-sm text-muted-foreground">
                      Initial application submission
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(application.created_at)}
                </div>
              </div>

              {application.submitted_at && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium">Application Submitted</div>
                      <div className="text-sm text-muted-foreground">
                        Ready for review
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(application.submitted_at)}
                  </div>
                </div>
              )}

              {application.approved_at && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Application Approved</div>
                      <div className="text-sm text-muted-foreground">
                        Mortgage approved
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(application.approved_at)}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Edit className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">Last Updated</div>
                    <div className="text-sm text-muted-foreground">
                      Most recent modification
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(application.updated_at)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {application.notes && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                {application.notes}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Status Update Dialog */}
      <Dialog open={isEditingStatus} onOpenChange={setIsEditingStatus}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>
              Change the status of this application and optionally add notes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">New Status</label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Notes (Optional)
              </label>
              <Textarea
                placeholder="Add any notes about this status change..."
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingStatus(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate} disabled={updateStatusMutation.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Application?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              application and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Main page component that provides the AdminLayout wrapper
export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return (
    <AdminLayout>
      <ApplicationViewerContent id={id} />
    </AdminLayout>
  );
}
