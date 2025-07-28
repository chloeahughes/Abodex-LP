import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Link, 
  Search, 
  Filter, 
  Pin, 
  MoreHorizontal,
  ThumbsUp,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Eye,
  Reply
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  threadId: string;
  mentions: string[];
  attachments?: string[];
  linkedItems?: { type: 'task' | 'file'; name: string; id: string }[];
  reactions?: { emoji: string; count: number; users: string[] }[];
  isResolved?: boolean;
}

interface Thread {
  id: string;
  title: string;
  category: 'general' | 'legal' | 'internal' | 'lender' | 'closing';
  isPinned: boolean;
  lastMessage: string;
  lastActivity: string;
  participantCount: number;
  unreadCount: number;
  isResolved: boolean;
}

const CommunicationHub = () => {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showNewThread, setShowNewThread] = useState(false);

  const threads: Thread[] = [
    {
      id: '1',
      title: 'Closing Documents Review',
      category: 'legal',
      isPinned: true,
      lastMessage: 'All documents have been reviewed and approved',
      lastActivity: '2 hours ago',
      participantCount: 4,
      unreadCount: 2,
      isResolved: false
    },
    {
      id: '2',
      title: 'Due Diligence Questions',
      category: 'general',
      isPinned: false,
      lastMessage: 'Can you clarify the HVAC maintenance schedule?',
      lastActivity: '4 hours ago',
      participantCount: 6,
      unreadCount: 0,
      isResolved: false
    },
    {
      id: '3',
      title: 'Financing Updates',
      category: 'lender',
      isPinned: false,
      lastMessage: 'Loan approval received from Bank of America',
      lastActivity: '1 day ago',
      participantCount: 3,
      unreadCount: 1,
      isResolved: true
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Alex Chen',
      avatar: 'AC',
      content: 'I\'ve uploaded the latest PSA draft. Please review section 4.2 regarding environmental contingencies.',
      timestamp: '10:30 AM',
      threadId: '1',
      mentions: ['@jamie', '@ryan'],
      linkedItems: [{ type: 'file', name: 'PSA_Draft_v3.pdf', id: 'file1' }],
      reactions: [{ emoji: '👍', count: 2, users: ['Jamie', 'Ryan'] }]
    },
    {
      id: '2',
      sender: 'Jamie Wilson',
      avatar: 'JW',
      content: 'Thanks @alex! I\'ll review this today. The environmental language looks good from a legal perspective.',
      timestamp: '11:15 AM',
      threadId: '1',
      mentions: ['@alex'],
      reactions: [{ emoji: '✅', count: 1, users: ['Alex'] }]
    },
    {
      id: '3',
      sender: 'Ryan Torres',
      avatar: 'RT',
      content: 'Can we schedule a call to discuss the title issues? I have some concerns about the easement.',
      timestamp: '2:20 PM',
      threadId: '1',
      mentions: [],
      linkedItems: [{ type: 'task', name: 'Title Review', id: 'task1' }]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-gray-100 text-gray-800',
      legal: 'bg-blue-100 text-blue-800',
      internal: 'bg-green-100 text-green-800',
      lender: 'bg-purple-100 text-purple-800',
      closing: 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || thread.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const activeThreadMessages = messages.filter(msg => msg.threadId === activeThread);

  return (
    <div className="h-full flex">
      {/* Thread Sidebar */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Dialog open={showNewThread} onOpenChange={setShowNewThread}>
              <DialogTrigger asChild>
                <Button size="sm">New Thread</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start New Thread</DialogTitle>
                  <DialogDescription>Create a new conversation thread</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="threadTitle">Thread Title</Label>
                    <Input id="threadTitle" placeholder="e.g., Closing Coordination" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          Select category
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>General</DropdownMenuItem>
                        <DropdownMenuItem>Legal</DropdownMenuItem>
                        <DropdownMenuItem>Internal</DropdownMenuItem>
                        <DropdownMenuItem>Lender</DropdownMenuItem>
                        <DropdownMenuItem>Closing</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <Label htmlFor="initialMessage">Initial Message</Label>
                    <Textarea id="initialMessage" placeholder="Start the conversation..." />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowNewThread(false)}>Cancel</Button>
                    <Button onClick={() => setShowNewThread(false)}>Create Thread</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Search threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Filter className="w-4 h-4 mr-2" />
                  {filterCategory === 'all' ? 'All Categories' : filterCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterCategory('all')}>All Categories</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory('general')}>General</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory('legal')}>Legal</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory('internal')}>Internal</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory('lender')}>Lender</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory('closing')}>Closing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Thread List */}
        <div className="overflow-y-auto">
          {filteredThreads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                activeThread === thread.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {thread.isPinned && <Pin className="w-4 h-4 text-blue-500" />}
                  <Badge className={`text-xs ${getCategoryColor(thread.category)}`}>
                    {thread.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  {thread.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {thread.unreadCount}
                    </Badge>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        {thread.isPinned ? 'Unpin Thread' : 'Pin Thread'}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                      <DropdownMenuItem>
                        {thread.isResolved ? 'Reopen Thread' : 'Resolve Thread'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <h3 className="font-medium text-sm mb-1">{thread.title}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{thread.lastMessage}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{thread.participantCount} participants</span>
                <span>{thread.lastActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col">
        {activeThread ? (
          <>
            {/* Message Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    {threads.find(t => t.id === activeThread)?.title}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Badge className={`text-xs ${getCategoryColor(threads.find(t => t.id === activeThread)?.category || 'general')}`}>
                      {threads.find(t => t.id === activeThread)?.category}
                    </Badge>
                    <span>•</span>
                    <span>{activeThreadMessages.length} messages</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Mark as Read
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Resolve
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeThreadMessages.map((message) => (
                <div key={message.id} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      {message.content}
                    </div>
                    
                    {/* Linked Items */}
                    {message.linkedItems && message.linkedItems.length > 0 && (
                      <div className="space-y-1 mb-2">
                        {message.linkedItems.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                            <Link className="w-3 h-3" />
                            <span>{item.type === 'file' ? '📁' : '✅'} {item.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex items-center space-x-2 mb-2">
                        {message.reactions.map((reaction, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs"
                          >
                            {reaction.emoji} {reaction.count}
                          </Button>
                        ))}
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <Reply className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        React
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Composer */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message... Use @username to mention someone"
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Link className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button size="sm" disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Select a thread to start messaging</h3>
              <p className="text-sm">Choose a conversation from the sidebar or create a new thread</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationHub;