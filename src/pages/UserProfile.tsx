import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Edit, Camera, Shield, Bell, Activity, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const recentActivity = [
    { action: "Uploaded Title Report to Deal A", time: "2 hours ago", type: "upload" },
    { action: "Marked Due Diligence as Complete", time: "4 hours ago", type: "task" },
    { action: "Commented on PSA Draft", time: "1 day ago", type: "comment" },
    { action: "Created new task: Review Financials", time: "2 days ago", type: "task" },
    { action: "Assigned Legal Review to Jamie", time: "3 days ago", type: "assign" },
    { action: "Downloaded LOI for Property B", time: "4 days ago", type: "download" },
    { action: "Updated Deal Stage to Underwriting", time: "5 days ago", type: "update" },
    { action: "Added comment to Due Diligence", time: "1 week ago", type: "comment" }
  ];

  const activeSessions = [
    { device: "Chrome on Windows", location: "New York, NY", lastActive: "Active now" },
    { device: "Safari on iPhone", location: "New York, NY", lastActive: "2 hours ago" },
    { device: "Chrome on MacBook", location: "New York, NY", lastActive: "1 day ago" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return '📁';
      case 'task': return '✅';
      case 'comment': return '💬';
      case 'assign': return '👤';
      case 'download': return '⬇️';
      case 'update': return '🔄';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Home</span>
              <span className="text-gray-300">→</span>
              <span className="text-gray-500">Profile</span>
              <span className="text-gray-300">→</span>
              <span className="font-medium">Alex Chen</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Banner for incomplete profiles */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Complete your profile</h3>
              <p className="text-sm text-blue-700">Add your role and preferences to get the most out of AbodexOS</p>
            </div>
            <Button size="sm">Complete Profile</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Header Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl">AC</AvatarFallback>
                    </Avatar>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="absolute -bottom-1 -right-1 rounded-full h-8 w-8 p-0"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change Profile Picture</DialogTitle>
                          <DialogDescription>Upload a new profile picture</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Button className="w-full">Upload New Image</Button>
                          <Button variant="outline" className="w-full">Remove Current Image</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Alex Chen</h2>
                    <p className="text-gray-600">Senior Analyst</p>
                    <p className="text-sm text-gray-500">alex@abodex.com</p>
                    <Badge variant="secondary">Admin</Badge>
                    <p className="text-sm text-gray-500 mt-2">Abodex Real Estate</p>
                  </div>

                  <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-4 w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Update your profile information</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="Alex Chen" />
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" defaultValue="Senior Analyst" />
                        </div>
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" defaultValue="Abodex Real Estate" />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsEditingProfile(false)}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activity">
                  <Activity className="w-4 h-4 mr-2" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>📊 Recent Activity</CardTitle>
                    <CardDescription>Your recent actions across all deals and tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <span className="text-lg">{getActivityIcon(activity.type)}</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>🏢 Role & Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Current Role</Label>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-sm">Admin</Badge>
                        </div>
                      </div>
                      <div>
                        <Label>Access Permissions</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Deals</span>
                            <Badge variant="outline">Full Access</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Financials</span>
                            <Badge variant="outline">Full Access</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Documents</span>
                            <Badge variant="outline">Full Access</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Team Management</span>
                            <Badge variant="outline">Full Access</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Request More Access
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>🔔 Notification Preferences</CardTitle>
                    <CardDescription>Customize how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Alerts</Label>
                          <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Reminders</Label>
                          <p className="text-sm text-gray-500">Get text reminders for deadlines</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Slack Mentions</Label>
                          <p className="text-sm text-gray-500">Notifications when mentioned in Slack</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Daily Digest</Label>
                          <p className="text-sm text-gray-500">Receive a daily summary of activity</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="reminderDays">Reminder Days Before Deadline</Label>
                      <Input 
                        id="reminderDays" 
                        type="number" 
                        defaultValue="3" 
                        className="mt-2 w-24" 
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="onlyAssigned" defaultChecked />
                      <Label htmlFor="onlyAssigned" className="text-sm">
                        Only notify for tasks assigned to me
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>🔐 Security & Access</CardTitle>
                    <CardDescription>Manage your account security and session activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">Add an extra layer of security</span>
                        <Switch />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label>Active Sessions</Label>
                      <div className="mt-2 space-y-2">
                        {activeSessions.map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <p className="text-sm font-medium">{session.device}</p>
                              <p className="text-xs text-gray-500">{session.location} • {session.lastActive}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              End Session
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Current Workspace</Label>
                      <div className="mt-2 p-3 border rounded">
                        <p className="text-sm font-medium">Abodex Real Estate</p>
                        <p className="text-xs text-gray-500">Member since January 2024</p>
                      </div>
                    </div>

                    <Button variant="destructive" className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out of all devices
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;