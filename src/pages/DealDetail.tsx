import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Search, Filter, Pin, MoreVertical, Paperclip, Send, ThumbsUp, Check, AlertTriangle, X, MessageSquare, Users, Bell, Eye, EyeOff } from "lucide-react";

const mockDeals = [
  {
    id: 1,
    propertyName: "Downtown Office Complex",
    status: "Active",
    value: "$2.5M",
    stage: "Due Diligence",
    days: 45,
    people: 8,
    lastUpdated: "2 hours ago",
    unreadMessages: 3,
    tasks: [
      { title: "Review contract", assignee: "Alice", due: "2024-07-01", priority: "High", completed: false },
      { title: "Schedule inspection", assignee: "Bob", due: "2024-07-03", priority: "Medium", completed: true },
    ],
    messages: [
      { sender: "Alice", text: "Contract draft uploaded.", time: "1 hour ago" },
      { sender: "Bob", text: "Inspection scheduled for next week.", time: "30 min ago" },
    ],
  },
  {
    id: 2,
    propertyName: "Lakeside Apartments",
    status: "Pending",
    value: "$1.1M",
    stage: "Initial Review",
    days: 12,
    people: 5,
    lastUpdated: "1 day ago",
    unreadMessages: 0,
    tasks: [],
    messages: [],
  },
  {
    id: 3,
    propertyName: "Sunset Retail Plaza",
    status: "Closed",
    value: "$3.8M",
    stage: "Completed",
    days: 90,
    people: 12,
    lastUpdated: "3 days ago",
    unreadMessages: 1,
    tasks: [],
    messages: [],
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Closed: "bg-gray-200 text-gray-700",
};

// Communication Hub Component
function DealCommunicationHub() {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterLabel, setFilterLabel] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [showNewThread, setShowNewThread] = useState(false);

  // Mock data for communication
  const mockThreads = [
    {
      id: "1",
      title: "Next Steps Before Closing",
      label: "Closing Docs",
      pinned: true,
      visibility: "Internal",
      participants: ["Alice", "Bob", "Carol"],
      lastMessage: "Updated purchase agreement ready for review",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      resolved: false
    },
    {
      id: "2", 
      title: "DD Questions",
      label: "Due Diligence",
      pinned: false,
      visibility: "Legal",
      participants: ["Alice", "David"],
      lastMessage: "Environmental report findings attached",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      resolved: false
    },
    {
      id: "3",
      title: "Lender Coordination",
      label: "Financing",
      pinned: false,
      visibility: "External",
      participants: ["Bob", "External Lender"],
      lastMessage: "Term sheet approved",
      lastMessageTime: "3 hours ago",
      unreadCount: 1,
      resolved: true
    }
  ];

  const mockMessages = [
    {
      id: "1",
      threadId: "1",
      sender: "Alice Johnson",
      avatar: "AJ",
      content: "Updated purchase agreement ready for review. Please check the revised terms in section 4.",
      timestamp: "2024-01-28 14:30",
      linkedItems: [{ type: "file", name: "Purchase_Agreement_v2.pdf" }],
      reactions: [{ emoji: "👍", count: 2, users: ["Bob", "Carol"] }],
      mentions: ["@Bob", "@Carol"]
    },
    {
      id: "2",
      threadId: "1", 
      sender: "Bob Smith",
      avatar: "BS",
      content: "Thanks @Alice! I'll review this today. Do we need to coordinate with legal on the new clauses?",
      timestamp: "2024-01-28 14:35",
      linkedItems: [{ type: "task", name: "Legal Review - Section 4" }],
      reactions: [],
      mentions: ["@Alice"]
    },
    {
      id: "3",
      threadId: "2",
      sender: "David Wilson", 
      avatar: "DW",
      content: "Environmental report findings attached. There are some concerns we need to address.",
      timestamp: "2024-01-28 13:15",
      linkedItems: [{ type: "file", name: "Environmental_Report.pdf" }],
      reactions: [{ emoji: "⚠️", count: 1, users: ["Alice"] }],
      mentions: []
    }
  ];

  const filteredThreads = mockThreads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = !filterUser || thread.participants.some(p => p.toLowerCase().includes(filterUser.toLowerCase()));
    const matchesLabel = !filterLabel || thread.label === filterLabel;
    return matchesSearch && matchesUser && matchesLabel;
  });

  const activeThreadMessages = mockMessages.filter(msg => msg.threadId === activeThread);

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "Internal": return <Users className="w-4 h-4" />;
      case "Legal": return <AlertTriangle className="w-4 h-4" />;
      case "External": return <Eye className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case "Internal": return "bg-blue-100 text-blue-800";
      case "Legal": return "bg-yellow-100 text-yellow-800";
      case "External": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
      {/* Thread Sidebar */}
      <div className="lg:col-span-1 border border-slate-200 rounded-lg bg-white">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Message Threads</h3>
            <Button 
              size="sm" 
              onClick={() => setShowNewThread(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              New Thread
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Filter by user"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="text-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterLabel("")}>All Labels</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLabel("Closing Docs")}>Closing Docs</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLabel("Due Diligence")}>Due Diligence</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterLabel("Financing")}>Financing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Thread List */}
        <div className="overflow-y-auto max-h-[500px]">
          {filteredThreads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 ${
                activeThread === thread.id ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {thread.pinned && <Pin className="w-4 h-4 text-blue-600" />}
                  <span className="font-medium text-slate-900">{thread.title}</span>
                  {thread.resolved && <Check className="w-4 h-4 text-green-600" />}
                </div>
                {thread.unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white text-xs">{thread.unreadCount}</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`text-xs ${getVisibilityColor(thread.visibility)}`}>
                  <div className="flex items-center gap-1">
                    {getVisibilityIcon(thread.visibility)}
                    {thread.visibility}
                  </div>
                </Badge>
                <Badge variant="outline" className="text-xs">{thread.label}</Badge>
              </div>
              
              <p className="text-sm text-slate-600 mb-1">{thread.lastMessage}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{thread.lastMessageTime}</span>
                <span className="text-xs text-slate-400">{thread.participants.length} participants</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div className="lg:col-span-2 border border-slate-200 rounded-lg bg-white flex flex-col">
        {activeThread ? (
          <>
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {filteredThreads.find(t => t.id === activeThread)?.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-xs ${getVisibilityColor(filteredThreads.find(t => t.id === activeThread)?.visibility || "")}`}>
                      {filteredThreads.find(t => t.id === activeThread)?.visibility}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {activeThreadMessages.length} messages
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-1" />
                    Mark as Read
                  </Button>
                  <Button variant="outline" size="sm">
                    <Check className="w-4 h-4 mr-1" />
                    Resolve
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Pin Thread</DropdownMenuItem>
                      <DropdownMenuItem>Change Visibility</DropdownMenuItem>
                      <DropdownMenuItem>Archive Thread</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeThreadMessages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{message.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900">{message.sender}</span>
                      <span className="text-sm text-slate-500">{message.timestamp}</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 mb-2">
                      <p className="text-slate-700">{message.content}</p>
                    </div>
                    
                    {/* Linked Items */}
                    {message.linkedItems.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {message.linkedItems.map((item, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <Paperclip className="w-3 h-3 mr-1" />
                            {item.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Reactions */}
                    {message.reactions.length > 0 && (
                      <div className="flex gap-2">
                        {message.reactions.map((reaction, i) => (
                          <Button key={i} variant="outline" size="sm" className="h-6 px-2">
                            {reaction.emoji} {reaction.count}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Composer */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message... Use @username to mention someone"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[60px]"
                />
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">Link to Task</Button>
                <Button variant="outline" size="sm">Link to File</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <EyeOff className="w-4 h-4 mr-1" />
                      Visibility
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Internal Only</DropdownMenuItem>
                    <DropdownMenuItem>Legal Team</DropdownMenuItem>
                    <DropdownMenuItem>External Visible</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Select a thread to view messages</p>
              <p className="text-sm">Choose from the threads on the left or create a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* New Thread Dialog */}
      {showNewThread && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="font-semibold text-lg mb-4">Create New Thread</h3>
            <div className="space-y-4">
              <Input
                placeholder="Thread title"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewThread(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    setShowNewThread(false);
                    setNewThreadTitle("");
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deal = mockDeals.find((d) => String(d.id) === String(id));

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardTitle>Deal not found</CardTitle>
          <Button className="mt-4" onClick={() => navigate("/deals")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-2">
              <CardTitle>{deal.propertyName}</CardTitle>
              <Badge className={statusColors[deal.status] + " px-3 py-1"}>{deal.status}</Badge>
            </div>
            <div className="text-slate-700 mb-2">{deal.value}</div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-2">
              <span>Stage: <span className="font-medium text-slate-700">{deal.stage}</span></span>
              <span>Days: <span className="font-medium text-slate-700">{deal.days}</span></span>
              <span>People: <span className="font-medium text-slate-700">{deal.people}</span></span>
            </div>
            <div className="text-xs text-slate-400 mb-4">Updated {deal.lastUpdated}</div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="communicate">Communicate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Deal Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-slate-500">Property Value</span>
                    <p className="font-semibold">{deal.value}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Current Stage</span>
                    <p className="font-semibold">{deal.stage}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Days in Process</span>
                    <p className="font-semibold">{deal.days}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Team Members</span>
                    <p className="font-semibold">{deal.people}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="font-semibold mb-4">Tasks</div>
                {deal.tasks && deal.tasks.length > 0 ? (
                  <ul className="space-y-2">
                    {deal.tasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <span className={task.completed ? "line-through text-slate-400" : ""}>{task.title}</span>
                        <span className="text-xs text-slate-500">{task.assignee}</span>
                        <span className="text-xs text-slate-500">Due: {task.due}</span>
                        <span className="text-xs text-slate-500">Priority: {task.priority}</span>
                        {task.completed && <span className="text-green-600 text-xs">Done</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-slate-400">No tasks yet.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Deal Documents</h3>
                <div className="text-slate-400">No files uploaded yet.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Deal Timeline</h3>
                <div className="text-slate-400">Timeline will show deal milestones and activities.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communicate" className="space-y-4">
            <DealCommunicationHub />
          </TabsContent>
        </Tabs>

        <Button variant="outline" onClick={() => navigate("/deals")}>Back to Dashboard</Button>
      </div>
    </div>
  );
} 