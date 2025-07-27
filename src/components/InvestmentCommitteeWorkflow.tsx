import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  DollarSign, 
  MessageCircle, 
  Calendar, 
  User, 
  ArrowRight, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp
} from 'lucide-react';

interface Deal {
  id: string;
  propertyName: string;
  address: string;
  price: string;
  capRate: number;
  stage: 'underwriting' | 'legal' | 'ic_review' | 'approved' | 'rejected';
  owner: string;
  assignedTo: string;
  dueDate: string;
  commentsCount: number;
  unreadComments: number;
  image?: string;
  flags: string[];
  subtasks: {
    name: string;
    completed: boolean;
    assignee: string;
  }[];
  documents: string[];
  createdDate: string;
  lastUpdated: string;
}

const STAGE_CONFIG = {
  underwriting: {
    name: 'Underwriting',
    color: 'bg-blue-100 text-blue-800',
    icon: <TrendingUp className="h-4 w-4" />
  },
  legal: {
    name: 'Legal Review',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <FileText className="h-4 w-4" />
  },
  ic_review: {
    name: 'IC Review',
    color: 'bg-purple-100 text-purple-800',
    icon: <Clock className="h-4 w-4" />
  },
  approved: {
    name: 'Approved',
    color: 'bg-green-100 text-green-800',
    icon: <CheckCircle2 className="h-4 w-4" />
  },
  rejected: {
    name: 'Rejected',
    color: 'bg-red-100 text-red-800',
    icon: <AlertTriangle className="h-4 w-4" />
  }
};

export const InvestmentCommitteeWorkflow: React.FC = () => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [newComment, setNewComment] = useState('');
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      propertyName: 'Metro Tower Office Building',
      address: '123 Financial District, Downtown',
      price: '$24,500,000',
      capRate: 6.8,
      stage: 'ic_review',
      owner: 'Alex Rodriguez',
      assignedTo: 'IC Committee',
      dueDate: '2024-01-25',
      commentsCount: 8,
      unreadComments: 3,
      flags: ['High Cap Rate Risk', 'Market Analysis Pending'],
      subtasks: [
        { name: 'Financial Model Review', completed: true, assignee: 'Sarah Kim' },
        { name: 'Market Analysis', completed: false, assignee: 'Mike Chen' },
        { name: 'Legal Documentation', completed: true, assignee: 'Legal Team' },
      ],
      documents: ['OM_Metro_Tower.pdf', 'Financial_Model.xlsx', 'Market_Report.pdf'],
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      propertyName: 'Gateway Retail Plaza',
      address: '456 Shopping Center Dr',
      price: '$12,800,000',
      capRate: 7.2,
      stage: 'underwriting',
      owner: 'Jamie Liu',
      assignedTo: 'Underwriting Team',
      dueDate: '2024-01-30',
      commentsCount: 4,
      unreadComments: 1,
      flags: [],
      subtasks: [
        { name: 'Rent Roll Analysis', completed: true, assignee: 'Jamie Liu' },
        { name: 'Comp Analysis', completed: false, assignee: 'Research Team' },
      ],
      documents: ['OM_Gateway_Plaza.pdf', 'Rent_Roll.xlsx'],
      createdDate: '2024-01-15',
      lastUpdated: '2024-01-19'
    },
    {
      id: '3',
      propertyName: 'Industrial Park 789',
      address: '789 Industrial Blvd',
      price: '$8,900,000',
      capRate: 8.1,
      stage: 'legal',
      owner: 'Ryan Park',
      assignedTo: 'Legal Team',
      dueDate: '2024-01-28',
      commentsCount: 12,
      unreadComments: 0,
      flags: ['Environmental Review Required'],
      subtasks: [
        { name: 'Environmental Assessment', completed: false, assignee: 'Environmental Consultant' },
        { name: 'Title Review', completed: true, assignee: 'Legal Team' },
      ],
      documents: ['OM_Industrial_789.pdf', 'Environmental_Report.pdf', 'Title_Report.pdf'],
      createdDate: '2024-01-08',
      lastUpdated: '2024-01-18'
    },
    {
      id: '4',
      propertyName: 'Downtown Lofts',
      address: '321 Urban Ave',
      price: '$18,200,000',
      capRate: 5.9,
      stage: 'approved',
      owner: 'Sarah Kim',
      assignedTo: 'Closing Team',
      dueDate: '2024-02-05',
      commentsCount: 15,
      unreadComments: 0,
      flags: [],
      subtasks: [
        { name: 'IC Approval', completed: true, assignee: 'IC Committee' },
        { name: 'Financing Secured', completed: true, assignee: 'Finance Team' },
      ],
      documents: ['OM_Downtown_Lofts.pdf', 'IC_Approval.pdf', 'Financing_Terms.pdf'],
      createdDate: '2024-01-05',
      lastUpdated: '2024-01-22'
    }
  ]);

  const handleStageChange = (dealId: string, newStage: Deal['stage']) => {
    setDeals(deals.map(deal => 
      deal.id === dealId ? { ...deal, stage: newStage, lastUpdated: new Date().toISOString().split('T')[0] } : deal
    ));
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedDeal) {
      // In a real app, this would add to a comments system
      setNewComment('');
      setDeals(deals.map(deal => 
        deal.id === selectedDeal.id 
          ? { ...deal, commentsCount: deal.commentsCount + 1, lastUpdated: new Date().toISOString().split('T')[0] }
          : deal
      ));
    }
  };

  const getDealsByStage = (stage: Deal['stage']) => {
    return deals.filter(deal => deal.stage === stage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const DealCard: React.FC<{ deal: Deal }> = ({ deal }) => (
    <Card 
      className="mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedDeal(deal)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">{deal.propertyName}</h4>
              <p className="text-xs text-muted-foreground">{deal.address}</p>
            </div>
            <div className="text-right space-y-1">
              <div className="font-medium text-sm">{deal.price}</div>
              <div className="text-xs text-muted-foreground">{deal.capRate}% Cap</div>
            </div>
          </div>

          {/* Flags */}
          {deal.flags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {deal.flags.map((flag, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {flag}
                </Badge>
              ))}
            </div>
          )}

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Subtasks</span>
              <span>{deal.subtasks.filter(t => t.completed).length}/{deal.subtasks.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ 
                  width: `${(deal.subtasks.filter(t => t.completed).length / deal.subtasks.length) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {deal.owner.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{deal.owner}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {deal.unreadComments > 0 && (
                <Badge variant="secondary" className="text-xs">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {deal.unreadComments}
                </Badge>
              )}
              <div className={`flex items-center gap-1 ${isOverdue(deal.dueDate) ? 'text-red-600' : ''}`}>
                <Calendar className="h-3 w-3" />
                {formatDate(deal.dueDate)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-6">
      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Object.entries(STAGE_CONFIG).map(([stage, config]) => (
          <div key={stage} className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={config.color}>
                {config.icon}
                <span className="ml-2">{config.name}</span>
              </Badge>
              <span className="text-sm text-muted-foreground">
                {getDealsByStage(stage as Deal['stage']).length}
              </span>
            </div>
            
            <div className="space-y-3">
              {getDealsByStage(stage as Deal['stage']).map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Deal Detail Panel */}
      {selectedDeal && (
        <Card className="fixed inset-y-0 right-0 w-96 shadow-lg z-50 overflow-auto">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{selectedDeal.propertyName}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDeal(null)}>
                ×
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{selectedDeal.address}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Stage Management */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Stage</label>
              <Select 
                value={selectedDeal.stage} 
                onValueChange={(value) => handleStageChange(selectedDeal.id, value as Deal['stage'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STAGE_CONFIG).map(([stage, config]) => (
                    <SelectItem key={stage} value={stage}>
                      {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Deal Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Price</div>
                <div className="font-medium">{selectedDeal.price}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Cap Rate</div>
                <div className="font-medium">{selectedDeal.capRate}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Owner</div>
                <div className="font-medium">{selectedDeal.owner}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Due Date</div>
                <div className={`font-medium ${isOverdue(selectedDeal.dueDate) ? 'text-red-600' : ''}`}>
                  {formatDate(selectedDeal.dueDate)}
                </div>
              </div>
            </div>

            {/* Flags */}
            {selectedDeal.flags.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Alerts</label>
                <div className="space-y-1">
                  {selectedDeal.flags.map((flag, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subtasks */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtasks</label>
              <div className="space-y-2">
                {selectedDeal.subtasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`h-4 w-4 ${task.completed ? 'text-green-600' : 'text-gray-300'}`} />
                      <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{task.assignee}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Documents</label>
              <div className="space-y-1">
                {selectedDeal.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Comments ({selectedDeal.commentsCount})
              </label>
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  Add Comment
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t space-y-2">
              <Button className="w-full">
                <ArrowRight className="h-4 w-4 mr-2" />
                Move to Next Stage
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  View Documents
                </Button>
                <Button variant="outline" size="sm">
                  Add Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};