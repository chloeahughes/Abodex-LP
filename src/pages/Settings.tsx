import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Download, BarChart3, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

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
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="workspace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="workspace" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>🏢 Workspace Settings</CardTitle>
                <CardDescription>Configure your workspace and default settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="workspaceName">Workspace Name</Label>
                  <Input id="workspaceName" defaultValue="Abodex Real Estate" />
                </div>

                <div>
                  <Label>Company Logo</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <Button variant="outline">Upload Logo</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="dealTemplate">Default Deal Stage Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="multifamily">Multifamily</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Default Task Assignees</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Legal Tasks</span>
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Assign to..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Doe (Legal)</SelectItem>
                          <SelectItem value="jane">Jane Smith (Legal)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Survey Tasks</span>
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Assign to..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bob">Bob Wilson (Survey)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>👥 Team Management</CardTitle>
                <CardDescription>Manage team members and their roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Invite New Members</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="Email or phone number" />
                    <Button>Send Invite</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Team Members</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      { name: "Alex Chen", email: "alex@abodex.com", role: "Admin" },
                      { name: "Jamie Wilson", email: "jamie@abodex.com", role: "Analyst" },
                      { name: "Ryan Torres", email: "ryan@abodex.com", role: "Legal" }
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select defaultValue={member.role.toLowerCase()}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="analyst">Analyst</SelectItem>
                              <SelectItem value="legal">Legal</SelectItem>
                              <SelectItem value="external">External</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Custom Roles</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="e.g., Lender, Title Agent, LP" />
                    <Button variant="outline">Create Role</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>🕐 Notifications & Reminders</CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Notification Preferences</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SMS Reminders</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Slack Mentions</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Alert Frequency</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time Alerts</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reminderDays">Reminder Days Before Deadline</Label>
                  <Input id="reminderDays" type="number" defaultValue="3" className="mt-2" />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="onlyMyTasks" className="rounded" />
                  <Label htmlFor="onlyMyTasks" className="text-sm">Only notify for tasks assigned to me</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>🔐 Access & Security</CardTitle>
                <CardDescription>Manage security settings and access logs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">Enable 2FA for enhanced security</span>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Deal Room Access Logs</Label>
                  <div className="mt-2 space-y-2">
                    {[
                      { user: "Alex Chen", action: "Accessed Deal A", time: "2 hours ago" },
                      { user: "Jamie Wilson", action: "Downloaded LOI", time: "1 day ago" },
                      { user: "Ryan Torres", action: "Viewed Financials", time: "2 days ago" }
                    ].map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded text-sm">
                        <span>{log.user} - {log.action}</span>
                        <span className="text-gray-500">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="ipWhitelist">IP Whitelisting</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="192.168.1.1" />
                    <Button variant="outline" size="sm">Add IP</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>🔄 Integrations</CardTitle>
                <CardDescription>Connect with external tools and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Calendar Sync</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Google Calendar</span>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Outlook Calendar</span>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>CRM & Data Room Integrations</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      { name: "Salesforce", connected: false },
                      { name: "Box", connected: true },
                      { name: "Dropbox", connected: false }
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">{integration.name}</span>
                        <Button 
                          variant={integration.connected ? "secondary" : "outline"} 
                          size="sm"
                        >
                          {integration.connected ? "Connected" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="mt-2">
                    Request New Integration
                  </Button>
                </div>

                <Separator />

                <div>
                  <Label>Analytics & Export</Label>
                  <div className="space-y-2 mt-2">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Deal Data (CSV/XLSX)
                    </Button>
                    <Button variant="outline" className="w-full">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Generate Usage Report
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Branding / White-Label</Label>
                  <div className="space-y-3 mt-2">
                    <div>
                      <Label htmlFor="subdomain" className="text-sm">Custom Subdomain</Label>
                      <Input id="subdomain" placeholder="deals.mycompany.com" />
                    </div>
                    <div>
                      <Label htmlFor="brandColor" className="text-sm">Primary Brand Color</Label>
                      <Input id="brandColor" type="color" defaultValue="#3b82f6" className="w-20 h-10" />
                    </div>
                    <div>
                      <Label className="text-sm">Email Sender Setup</Label>
                      <Input placeholder="notifications@mycompany.com" className="mt-1" />
                    </div>
                    <Badge variant="outline" className="text-xs">Premium Feature</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;