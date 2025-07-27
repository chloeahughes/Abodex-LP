import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Upload, 
  MessageCircle, 
  Calendar,
  User,
  Eye,
  Download,
  History,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DDItem {
  id: string;
  name: string;
  category: string;
  assignee: string;
  reviewer: string;
  dueDate: string;
  status: 'pending' | 'uploaded' | 'under_review' | 'approved' | 'requires_revision' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  files: {
    name: string;
    uploadedBy: string;
    uploadedDate: string;
    size: string;
    version: number;
  }[];
  comments: {
    author: string;
    text: string;
    timestamp: string;
    type: 'comment' | 'mention';
  }[];
  description: string;
  estimatedCost?: string;
  lastModified: string;
}

const STATUS_CONFIG = {
  pending: { 
    color: 'bg-gray-100 text-gray-800', 
    icon: <Circle className="h-4 w-4" />,
    label: 'Pending'
  },
  uploaded: { 
    color: 'bg-blue-100 text-blue-800', 
    icon: <FileText className="h-4 w-4" />,
    label: 'Uploaded'
  },
  under_review: { 
    color: 'bg-yellow-100 text-yellow-800', 
    icon: <Clock className="h-4 w-4" />,
    label: 'Under Review'
  },
  approved: { 
    color: 'bg-green-100 text-green-800', 
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: 'Approved'
  },
  requires_revision: { 
    color: 'bg-orange-100 text-orange-800', 
    icon: <AlertTriangle className="h-4 w-4" />,
    label: 'Needs Revision'
  },
  overdue: { 
    color: 'bg-red-100 text-red-800', 
    icon: <AlertTriangle className="h-4 w-4" />,
    label: 'Overdue'
  }
};

export const DueDiligenceTracker: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DDItem | null>(null);
  const [filter, setFilter] = useState({
    assignee: 'all',
    status: 'all',
    category: 'all'
  });
  const [newComment, setNewComment] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const [ddItems, setDDItems] = useState<DDItem[]>([
    {
      id: '1',
      name: 'Property Title Report',
      category: 'Legal',
      assignee: 'Legal Team',
      reviewer: 'Sarah Kim',
      dueDate: '2024-01-25',
      status: 'approved',
      priority: 'high',
      files: [
        {
          name: 'Title_Report_Metro_Tower.pdf',
          uploadedBy: 'Legal Team',
          uploadedDate: '2024-01-20',
          size: '2.4 MB',
          version: 1
        }
      ],
      comments: [
        {
          author: 'Sarah Kim',
          text: 'Title is clear with no encumbrances. Approved for closing.',
          timestamp: '2024-01-21 10:30',
          type: 'comment'
        }
      ],
      description: 'Comprehensive title examination and insurance commitment',
      lastModified: '2024-01-21'
    },
    {
      id: '2',
      name: 'Property Survey',
      category: 'Technical',
      assignee: 'Survey Company',
      reviewer: 'Mike Chen',
      dueDate: '2024-01-28',
      status: 'under_review',
      priority: 'high',
      files: [
        {
          name: 'ALTA_Survey_Metro_Tower.pdf',
          uploadedBy: 'Survey Company',
          uploadedDate: '2024-01-22',
          size: '8.7 MB',
          version: 2
        }
      ],
      comments: [
        {
          author: 'Mike Chen',
          text: '@Survey Company Please clarify the setback measurements on the north side.',
          timestamp: '2024-01-23 14:15',
          type: 'mention'
        }
      ],
      description: 'ALTA/NSPS Land Title Survey with improvements and easements',
      lastModified: '2024-01-23'
    },
    {
      id: '3',
      name: 'Environmental Phase I ESA',
      category: 'Environmental',
      assignee: 'Environmental Consultant',
      reviewer: 'Ryan Park',
      dueDate: '2024-01-30',
      status: 'uploaded',
      priority: 'medium',
      files: [
        {
          name: 'Phase_I_ESA_Metro_Tower.pdf',
          uploadedBy: 'Environmental Consultant',
          uploadedDate: '2024-01-24',
          size: '12.3 MB',
          version: 1
        }
      ],
      comments: [
        {
          author: 'Environmental Consultant',
          text: 'No recognized environmental conditions identified. Ready for review.',
          timestamp: '2024-01-24 16:45',
          type: 'comment'
        }
      ],
      description: 'Phase I Environmental Site Assessment per ASTM E1527 standards',
      lastModified: '2024-01-24'
    },
    {
      id: '4',
      name: 'Lease Abstracts',
      category: 'Financial',
      assignee: 'Jamie Liu',
      reviewer: 'Alex Rodriguez',
      dueDate: '2024-01-26',
      status: 'requires_revision',
      priority: 'high',
      files: [
        {
          name: 'Lease_Abstracts_Draft.xlsx',
          uploadedBy: 'Jamie Liu',
          uploadedDate: '2024-01-23',
          size: '890 KB',
          version: 1
        }
      ],
      comments: [
        {
          author: 'Alex Rodriguez',
          text: 'Please verify the escalation clauses for tenants on floors 8-10.',
          timestamp: '2024-01-24 09:20',
          type: 'comment'
        }
      ],
      description: 'Summary of all lease terms, rates, and key provisions',
      lastModified: '2024-01-24'
    },
    {
      id: '5',
      name: 'Property Condition Assessment',
      category: 'Technical',
      assignee: 'Engineering Consultant',
      reviewer: 'Mike Chen',
      dueDate: '2024-01-27',
      status: 'overdue',
      priority: 'high',
      files: [],
      comments: [
        {
          author: 'Mike Chen',
          text: '@Engineering Consultant This is now overdue. Please provide status update.',
          timestamp: '2024-01-28 08:00',
          type: 'mention'
        }
      ],
      description: 'Engineering assessment of building systems and capital needs',
      estimatedCost: '$15,000',
      lastModified: '2024-01-28'
    },
    {
      id: '6',
      name: 'Zoning Compliance Letter',
      category: 'Legal',
      assignee: 'Zoning Consultant',
      reviewer: 'Legal Team',
      dueDate: '2024-02-01',
      status: 'pending',
      priority: 'medium',
      files: [],
      comments: [],
      description: 'Verification of current zoning compliance and permitted uses',
      lastModified: '2024-01-20'
    }
  ]);

  const handleFileUpload = (itemId: string, files: FileList) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const file = files[0];
      const newFile = {
        name: file.name,
        uploadedBy: 'Current User',
        uploadedDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        version: 1
      };

      setDDItems(items =>
        items.map(item =>
          item.id === itemId
            ? {
                ...item,
                files: [...item.files, newFile],
                status: item.status === 'pending' ? 'uploaded' : item.status,
                lastModified: new Date().toISOString().split('T')[0]
              }
            : item
        )
      );

      setIsUploading(false);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded and is ready for review.`,
      });
    }, 2000);
  };

  const handleStatusChange = (itemId: string, newStatus: DDItem['status']) => {
    setDDItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedItem) return;

    const comment = {
      author: 'Current User',
      text: newComment,
      timestamp: new Date().toLocaleString(),
      type: (newComment.includes('@') ? 'mention' : 'comment') as 'comment' | 'mention'
    };

    setDDItems(items =>
      items.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              comments: [...item.comments, comment],
              lastModified: new Date().toISOString().split('T')[0]
            }
          : item
      )
    );

    setNewComment('');
    setSelectedItem(prev => prev ? { ...prev, comments: [...prev.comments, comment] } : null);
  };

  const filteredItems = ddItems.filter(item => {
    if (filter.assignee !== 'all' && item.assignee !== filter.assignee) return false;
    if (filter.status !== 'all' && item.status !== filter.status) return false;
    if (filter.category !== 'all' && item.category !== filter.category) return false;
    return true;
  });

  const getCompletionPercentage = () => {
    const completed = ddItems.filter(item => item.status === 'approved').length;
    return Math.round((completed / ddItems.length) * 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate: string, status: DDItem['status']) => {
    return new Date(dueDate) < new Date() && status !== 'approved';
  };

  return (
    <div className="w-full space-y-6">
      {/* Header with Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Due Diligence Tracker</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{getCompletionPercentage()}% Complete</span>
            </div>
            <Progress value={getCompletionPercentage()} className="w-full" />
            <div className="grid grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-lg">{ddItems.filter(i => i.status === 'approved').length}</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="font-bold text-lg">{ddItems.filter(i => i.status === 'under_review').length}</div>
                <div className="text-muted-foreground">In Review</div>
              </div>
              <div>
                <div className="font-bold text-lg">{ddItems.filter(i => i.status === 'overdue').length}</div>
                <div className="text-muted-foreground">Overdue</div>
              </div>
              <div>
                <div className="font-bold text-lg">{ddItems.filter(i => i.status === 'pending').length}</div>
                <div className="text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label>Assignee:</Label>
              <Select value={filter.assignee} onValueChange={(value) => setFilter({...filter, assignee: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Legal Team">Legal Team</SelectItem>
                  <SelectItem value="Jamie Liu">Jamie Liu</SelectItem>
                  <SelectItem value="Survey Company">Survey Company</SelectItem>
                  <SelectItem value="Environmental Consultant">Environmental Consultant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label>Status:</Label>
              <Select value={filter.status} onValueChange={(value) => setFilter({...filter, status: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                    <SelectItem key={status} value={status}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label>Category:</Label>
              <Select value={filter.category} onValueChange={(value) => setFilter({...filter, category: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tracker Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Item</th>
                  <th className="text-left p-4 font-medium">Assignee</th>
                  <th className="text-left p-4 font-medium">Reviewer</th>
                  <th className="text-left p-4 font-medium">Due Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Files</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b hover:bg-muted/25 cursor-pointer ${
                      item.status === 'overdue' ? 'bg-red-50' : ''
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.category}</div>
                        {item.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">High Priority</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {item.assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{item.assignee}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {item.reviewer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{item.reviewer}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`text-sm ${isOverdue(item.dueDate, item.status) ? 'text-red-600 font-medium' : ''}`}>
                        {formatDate(item.dueDate)}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={STATUS_CONFIG[item.status].color}>
                        {STATUS_CONFIG[item.status].icon}
                        <span className="ml-2">{STATUS_CONFIG[item.status].label}</span>
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {item.files.length > 0 ? (
                          <div className="flex items-center gap-1 text-sm">
                            <FileText className="h-4 w-4" />
                            <span>{item.files.length}</span>
                          </div>
                        ) : (
                          <div className="relative">
                            <input
                              type="file"
                              onChange={(e) => e.target.files && handleFileUpload(item.id, e.target.files)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Button variant="outline" size="sm" disabled={isUploading}>
                              <Upload className="h-3 w-3 mr-1" />
                              Upload
                            </Button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {item.comments.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {item.comments.length}
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedItem.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column - Details */}
                <div className="space-y-4">
                  <div>
                    <Label>Description</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedItem.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <div className="mt-1">
                        <Badge variant="outline">{selectedItem.category}</Badge>
                      </div>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <div className="mt-1">
                        <Badge className={selectedItem.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                          {selectedItem.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">
                      <Select 
                        value={selectedItem.status} 
                        onValueChange={(value) => handleStatusChange(selectedItem.id, value as DDItem['status'])}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                            <SelectItem key={status} value={status}>{config.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Assignee</Label>
                      <div className="mt-1 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {selectedItem.assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedItem.assignee}
                      </div>
                    </div>
                    <div>
                      <Label>Reviewer</Label>
                      <div className="mt-1 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {selectedItem.reviewer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedItem.reviewer}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Files & Comments */}
                <div className="space-y-4">
                  <div>
                    <Label>Files ({selectedItem.files.length})</Label>
                    <div className="mt-2 space-y-2">
                      {selectedItem.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <div>
                              <div className="text-sm font-medium">{file.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {file.uploadedBy} • {formatDate(file.uploadedDate)} • {file.size}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {selectedItem.files.length === 0 && (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">No files uploaded</p>
                          <input
                            type="file"
                            onChange={(e) => e.target.files && handleFileUpload(selectedItem.id, e.target.files)}
                            className="hidden"
                            id="file-upload-modal"
                          />
                          <Button variant="outline" size="sm" asChild>
                            <label htmlFor="file-upload-modal" className="cursor-pointer">
                              Upload File
                            </label>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Comments ({selectedItem.comments.length})</Label>
                    <div className="mt-2 space-y-3 max-h-60 overflow-auto">
                      {selectedItem.comments.map((comment, index) => (
                        <div key={index} className="p-3 border rounded text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className={comment.type === 'mention' ? 'text-blue-600' : ''}>{comment.text}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <Textarea
                        placeholder="Add a comment or use @ to mention someone..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};