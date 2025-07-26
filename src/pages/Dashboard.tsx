import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Building2, 
  CheckSquare, 
  Calendar, 
  Users, 
  FileText, 
  Settings,
  Bell,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  ChevronDown,
  DollarSign,
  Wrench,
  BarChart3,
  Home,
  ClipboardList,
  Upload,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
  Eye,
  CalendarIcon
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [propertyView, setPropertyView] = useState("table"); // table or kanban
  const [taskView, setTaskView] = useState("list");
  const [calendarView, setCalendarView] = useState("monthly");

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "team", label: "Team Activity", icon: Users },
    { id: "files", label: "Files", icon: FileText },
    { id: "leases", label: "Lease Management", icon: Home },
    { id: "rentroll", label: "Rent Roll", icon: DollarSign },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Enhanced Demo Data
  const demoStats = {
    activeProperties: 15,
    totalRentThisMonth: 248750,
    openTasks: 32,
    maintenanceTickets: 8
  };

  const demoProperties = [
    {
      id: 1,
      name: "123 Main St",
      address: "123 Main Street, San Francisco, CA 94102",
      stage: "Owned",
      leadContact: "Alex Chen",
      occupancy: 95,
      rentCollectedMTD: 28500,
      tasks: 8,
      attachments: 12,
      lastUpdated: "2 hours ago",
      type: "Multifamily",
      units: 8
    },
    {
      id: 2,
      name: "456 Market Ave",
      address: "456 Market Avenue, Oakland, CA 94607",
      stage: "Due Diligence",
      leadContact: "Jamie Wilson",
      occupancy: 87,
      rentCollectedMTD: 45200,
      tasks: 5,
      attachments: 7,
      lastUpdated: "1 day ago",
      type: "Office",
      units: 0
    },
    {
      id: 3,
      name: "789 Broadway",
      address: "789 Broadway, New York, NY 10003",
      stage: "Escrow",
      leadContact: "Ryan Torres",
      occupancy: 100,
      rentCollectedMTD: 12800,
      tasks: 12,
      attachments: 18,
      lastUpdated: "3 hours ago",
      type: "Retail",
      units: 1
    }
  ];

  const demoTasks = [
    {
      id: 1,
      name: "Review Appraisal Report",
      assignee: "Alex Chen",
      dueDate: "Today",
      property: "123 Main St",
      status: "In Progress",
      section: "Today",
      description: "Complete review of third-party appraisal",
      platformTag: "Email"
    },
    {
      id: 2,
      name: "Send LOI to Seller",
      assignee: "Jamie Wilson",
      dueDate: "Tomorrow",
      property: "456 Market Ave",
      status: "Not Started",
      section: "Upcoming",
      description: "Draft and send letter of intent",
      platformTag: "DocuSign"
    },
    {
      id: 3,
      name: "Upload Rent Roll",
      assignee: "Ryan Torres",
      dueDate: "Yesterday",
      property: "789 Broadway",
      status: "Overdue",
      section: "Overdue",
      description: "Upload Q4 rent roll data",
      platformTag: "Excel"
    },
    {
      id: 4,
      name: "Schedule Property Tour",
      assignee: "Jamie Wilson",
      dueDate: "Next Week",
      property: "123 Main St",
      status: "Not Started",
      section: "Upcoming",
      description: "Coordinate buyer walkthrough",
      platformTag: "Email"
    },
    {
      id: 5,
      name: "Review Environmental Report",
      assignee: "Alex Chen",
      dueDate: "Completed",
      property: "456 Market Ave",
      status: "Complete",
      section: "Completed",
      description: "Phase I environmental assessment review",
      platformTag: "Email"
    }
  ];

  const demoLeases = [
    {
      id: 1,
      tenantName: "Tech Startup Inc.",
      property: "456 Market Ave",
      unit: "Suite 200",
      startDate: "2024-01-01",
      endDate: "2026-12-31",
      monthlyRent: 4520,
      paymentStatus: "Paid"
    },
    {
      id: 2,
      tenantName: "Coffee Corner LLC",
      property: "789 Broadway",
      unit: "Ground Floor",
      startDate: "2023-06-01",
      endDate: "2028-05-31",
      monthlyRent: 3200,
      paymentStatus: "Late"
    },
    {
      id: 3,
      tenantName: "Johnson Family",
      property: "123 Main St",
      unit: "Unit 3A",
      startDate: "2023-09-01",
      endDate: "2024-08-31",
      monthlyRent: 2850,
      paymentStatus: "Paid"
    }
  ];

  const demoRentRoll = [
    {
      property: "123 Main St",
      unit: "Unit 1A",
      tenant: "Smith Family",
      rentDue: 2400,
      rentPaid: 2400,
      status: "Paid"
    },
    {
      property: "123 Main St",
      unit: "Unit 2B",
      tenant: "Davis LLC",
      rentDue: 2600,
      rentPaid: 2600,
      status: "Paid"
    },
    {
      property: "456 Market Ave",
      unit: "Suite 200",
      tenant: "Tech Startup Inc.",
      rentDue: 4520,
      rentPaid: 0,
      status: "Late"
    },
    {
      property: "789 Broadway",
      unit: "Ground Floor",
      tenant: "Coffee Corner LLC",
      rentDue: 3200,
      rentPaid: 1600,
      status: "Partial"
    }
  ];

  const demoMaintenance = [
    {
      id: 1,
      property: "123 Main St",
      unit: "Unit 2A",
      issueType: "HVAC",
      priority: "High",
      status: "Open",
      description: "Air conditioning not working",
      assignee: "Mike Johnson",
      estimatedCost: 450,
      scheduledDate: "2024-01-15"
    },
    {
      id: 2,
      property: "456 Market Ave",
      unit: "Common Area",
      issueType: "Plumbing",
      priority: "Medium",
      status: "In Progress",
      description: "Leaky faucet in lobby restroom",
      assignee: "Sarah Wilson",
      estimatedCost: 125,
      scheduledDate: "2024-01-12"
    },
    {
      id: 3,
      property: "789 Broadway",
      unit: "Ground Floor",
      issueType: "Electrical",
      priority: "Low",
      status: "Resolved",
      description: "Replace burnt out LED fixtures",
      assignee: "Mike Johnson",
      estimatedCost: 85,
      scheduledDate: "2024-01-10"
    }
  ];

  const demoActivity = [
    { user: "Alex Chen", action: "updated task", item: "Review Appraisal Report", time: "10 minutes ago" },
    { user: "Jamie Wilson", action: "added property", item: "789 Broadway", time: "2 hours ago" },
    { user: "Ryan Torres", action: "completed task", item: "Review Environmental Report", time: "4 hours ago" },
    { user: "Mike Johnson", action: "resolved maintenance ticket", item: "HVAC Repair - Unit 2A", time: "6 hours ago" },
    { user: "Sarah Wilson", action: "uploaded file", item: "LOI_456Market.pdf", time: "1 day ago" },
    { user: "Alex Chen", action: "created lease", item: "Coffee Corner LLC - 789 Broadway", time: "2 days ago" }
  ];

  const demoFiles = [
    { name: "LOI_123Main.pdf", property: "123 Main St", type: "PDF", uploadedBy: "Alex Chen", date: "Today" },
    { name: "RentRoll_456Market.xlsx", property: "456 Market Ave", type: "Excel", uploadedBy: "Jamie Wilson", date: "Yesterday" },
    { name: "Appraisal_789Broadway.pdf", property: "789 Broadway", type: "PDF", uploadedBy: "Ryan Torres", date: "2 days ago" },
    { name: "SitePlan_123Main.png", property: "123 Main St", type: "Image", uploadedBy: "Sarah Wilson", date: "3 days ago" },
    { name: "Lease_Agreement_TechStartup.pdf", property: "456 Market Ave", type: "PDF", uploadedBy: "Alex Chen", date: "1 week ago" }
  ];

  const reports = [
    { name: "Property Performance", description: "Monthly performance metrics by property" },
    { name: "Rent Collection Summary", description: "Rent collection status and trends" },
    { name: "Task Completion by Team", description: "Team productivity and task completion rates" },
    { name: "Maintenance Cost Summary", description: "Maintenance expenses by property and category" },
    { name: "Occupancy Rate Trends", description: "Historical occupancy data and projections" }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Quick Create CTAs */}
      <div className="flex gap-3 mb-6">
        <Button onClick={() => setActiveTab("properties")}>
          <Plus className="w-4 h-4 mr-2" />
          New Property
        </Button>
        <Button variant="outline" onClick={() => setActiveTab("tasks")}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
        <Button variant="outline" onClick={() => setActiveTab("leases")}>
          <Plus className="w-4 h-4 mr-2" />
          New Lease
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Properties</CardDescription>
            <CardTitle className="text-3xl font-bold text-blue-600">{demoStats.activeProperties}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Rent This Month</CardDescription>
            <CardTitle className="text-3xl font-bold text-green-600">
              ${demoStats.totalRentThisMonth.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open Tasks</CardDescription>
            <CardTitle className="text-3xl font-bold text-orange-600">{demoStats.openTasks}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Maintenance Tickets</CardDescription>
            <CardTitle className="text-3xl font-bold text-red-600">{demoStats.maintenanceTickets}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoActivity.slice(0, 8).map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                    <span className="font-medium text-blue-600">"{activity.item}"</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Properties</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPropertyView(propertyView === "table" ? "kanban" : "table")}>
            {propertyView === "table" ? "Kanban View" : "Table View"}
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Lead Contact</TableHead>
                  <TableHead>Occupancy %</TableHead>
                  <TableHead>Rent MTD</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoProperties.map((property) => (
                  <TableRow key={property.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{property.name}</TableCell>
                    <TableCell className="text-sm text-gray-600">{property.address}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={property.stage === "Owned" ? "default" : 
                               property.stage === "Due Diligence" ? "secondary" : "outline"}
                      >
                        {property.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>{property.leadContact}</TableCell>
                    <TableCell>{property.occupancy}%</TableCell>
                    <TableCell>${property.rentCollectedMTD.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{property.tasks}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{property.attachments}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{property.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Task Sections */}
      {["Today", "Upcoming", "Overdue", "Completed"].map((section) => {
        const sectionTasks = demoTasks.filter(task => task.section === section);
        return (
          <Card key={section}>
            <CardHeader>
              <CardTitle className="text-lg">{section} ({sectionTasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sectionTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Checkbox checked={task.status === "Complete"} />
                      <div className="flex-1">
                        <p className="font-medium">{task.name}</p>
                        <p className="text-sm text-gray-600">
                          {task.assignee} • {task.property} • {task.dueDate}
                        </p>
                        {task.description && (
                          <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">{task.platformTag}</Badge>
                      <Badge 
                        variant={task.status === "Complete" ? "default" : 
                               task.status === "In Progress" ? "secondary" : 
                               task.status === "Overdue" ? "destructive" : "outline"}
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setCalendarView(calendarView === "monthly" ? "weekly" : "monthly")}>
            {calendarView === "monthly" ? "Weekly View" : "Monthly View"}
          </Button>
          <Badge variant="outline">Sync with Google Calendar (Coming Soon)</Badge>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500 py-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Calendar view coming soon</p>
            <p className="text-sm">Tasks with due dates and lease milestones will appear here</p>
            <p className="text-xs mt-2">Color-coded by status and event type</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeamActivity = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Activity</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter by User
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Type
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {demoActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                    <span className="font-medium text-blue-600">"{activity.item}"</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Files</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Type
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoFiles.map((file, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>{file.property}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{file.type}</Badge>
                    </TableCell>
                    <TableCell>{file.uploadedBy}</TableCell>
                    <TableCell className="text-sm text-gray-600">{file.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLeases = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lease Management</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Lease
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant Name</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoLeases.map((lease) => (
                  <TableRow key={lease.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{lease.tenantName}</TableCell>
                    <TableCell>{lease.property}</TableCell>
                    <TableCell>{lease.unit}</TableCell>
                    <TableCell>{lease.startDate}</TableCell>
                    <TableCell>{lease.endDate}</TableCell>
                    <TableCell>${lease.monthlyRent.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={lease.paymentStatus === "Paid" ? "default" : 
                               lease.paymentStatus === "Late" ? "destructive" : "secondary"}
                      >
                        {lease.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRentRoll = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rent Roll</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Property
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Payment
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Rent Due</TableHead>
                  <TableHead>Rent Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoRentRoll.map((rent, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{rent.property}</TableCell>
                    <TableCell>{rent.unit}</TableCell>
                    <TableCell>{rent.tenant}</TableCell>
                    <TableCell>${rent.rentDue.toLocaleString()}</TableCell>
                    <TableCell>${rent.rentPaid.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={rent.status === "Paid" ? "default" : 
                               rent.status === "Late" ? "destructive" : "secondary"}
                      >
                        {rent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Due</p>
              <p className="text-xl font-bold">${demoRentRoll.reduce((sum, rent) => sum + rent.rentDue, 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Collected</p>
              <p className="text-xl font-bold text-green-600">${demoRentRoll.reduce((sum, rent) => sum + rent.rentPaid, 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Collection Rate</p>
              <p className="text-xl font-bold">
                {Math.round((demoRentRoll.reduce((sum, rent) => sum + rent.rentPaid, 0) / demoRentRoll.reduce((sum, rent) => sum + rent.rentDue, 0)) * 100)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Ticket
        </Button>
      </div>

      {/* Status Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Open", "In Progress", "Resolved"].map((status) => {
          const statusTickets = demoMaintenance.filter(ticket => ticket.status === status);
          return (
            <Card key={status}>
              <CardHeader>
                <CardTitle className="text-lg">{status} ({statusTickets.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statusTickets.map((ticket) => (
                    <div key={ticket.id} className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm">{ticket.description}</p>
                        <Badge 
                          variant={ticket.priority === "High" ? "destructive" : 
                                 ticket.priority === "Medium" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{ticket.property} - {ticket.unit}</p>
                      <p className="text-xs text-gray-600">{ticket.issueType} • ${ticket.estimatedCost}</p>
                      <p className="text-xs text-gray-600">Assigned to: {ticket.assignee}</p>
                      <p className="text-xs text-gray-600">Scheduled: {ticket.scheduledDate}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports</h2>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell className="text-sm text-gray-600">{report.description}</TableCell>
                    <TableCell>
                      <Select defaultValue="last30">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last30">Last 30 Days</SelectItem>
                          <SelectItem value="last90">Last 90 Days</SelectItem>
                          <SelectItem value="lastyear">Last Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Generate PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          Generate CSV
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500 py-12">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Settings panel coming soon</p>
            <p className="text-sm">Configure your workspace preferences here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return renderDashboard();
      case "properties": return renderProperties();
      case "tasks": return renderTasks();
      case "calendar": return renderCalendar();
      case "team": return renderTeamActivity();
      case "files": return renderFiles();
      case "leases": return renderLeases();
      case "rentroll": return renderRentRoll();
      case "maintenance": return renderMaintenance();
      case "reports": return renderReports();
      case "settings": return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Demo Banner */}
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm z-50">
        🎯 You are viewing a live demo of AbodexOS. Join early access to deploy a full workspace for your team.
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 fixed left-0 top-0 bottom-0 z-40`}>
        <div className="pt-12 pb-4 px-4">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            {sidebarOpen && <span className="font-bold text-lg">AbodexOS</span>}
          </div>
          
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <IconComponent className="w-5 h-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search properties, tasks, leases..."
                  className="pl-10 w-80"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">alex@abodex.com</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Floating Action Button */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        onClick={() => setActiveTab("tasks")}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Dashboard;