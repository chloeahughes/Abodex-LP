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
import { Calendar } from "@/components/ui/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { 
  LayoutDashboard, 
  Building2, 
  CheckSquare, 
  Calendar as CalendarIcon, 
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
  Save,
  X,
  MessageSquare
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [propertyView, setPropertyView] = useState("table"); // table or kanban
  const [taskView, setTaskView] = useState("list");
  const [calendarView, setCalendarView] = useState("monthly");
  
  // Modal states
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddLease, setShowAddLease] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: CalendarIcon },
    { id: "communication", label: "Communication Hub", icon: MessageSquare },
    { id: "team", label: "Team Activity", icon: Users },
    { id: "files", label: "Files", icon: FileText },
    { id: "leases", label: "Lease Management", icon: Home },
    { id: "rentroll", label: "Rent Roll", icon: DollarSign },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Modal component for Add Property
  const AddPropertyModal = () => (
    <Dialog open={showAddProperty} onOpenChange={setShowAddProperty}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>Create a new property in the system</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="propertyName">Property Name</Label>
            <Input id="propertyName" placeholder="e.g., 123 Main Street" />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Full property address" />
          </div>
          <div>
            <Label htmlFor="stage">Stage</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owned">Owned</SelectItem>
                <SelectItem value="duediligence">Due Diligence</SelectItem>
                <SelectItem value="escrow">Escrow</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="leadContact">Lead Contact/Team</Label>
            <Input id="leadContact" placeholder="Team member name" />
          </div>
          <div>
            <Label htmlFor="occupancy">Occupancy %</Label>
            <Input id="occupancy" type="number" placeholder="95" />
          </div>
          <div>
            <Label htmlFor="rentMtd">Rent MTD</Label>
            <Input id="rentMtd" type="number" placeholder="25000" />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowAddProperty(false)} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Create Property
            </Button>
            <Button variant="outline" onClick={() => setShowAddProperty(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Modal component for Add Task
  const AddTaskModal = () => (
    <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Create a new task</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="taskTitle">Title</Label>
            <Input id="taskTitle" placeholder="Task description" />
          </div>
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alex">Alex Chen</SelectItem>
                <SelectItem value="jamie">Jamie Wilson</SelectItem>
                <SelectItem value="ryan">Ryan Torres</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="taskProperty">Property</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="123main">123 Main St</SelectItem>
                <SelectItem value="456market">456 Market Ave</SelectItem>
                <SelectItem value="789broadway">789 Broadway</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" />
          </div>
          <div>
            <Label htmlFor="progress">Progress</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="notstarted">Not Started</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="inreview">In Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="taskDescription">Description</Label>
            <Textarea id="taskDescription" placeholder="Task details..." />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowAddTask(false)} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Create Task
            </Button>
            <Button variant="outline" onClick={() => setShowAddTask(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Modal component for Add Lease
  const AddLeaseModal = () => (
    <Dialog open={showAddLease} onOpenChange={setShowAddLease}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Lease</DialogTitle>
          <DialogDescription>Create a new lease agreement</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="tenantName">Tenant Name</Label>
            <Input id="tenantName" placeholder="Company or individual name" />
          </div>
          <div>
            <Label htmlFor="leaseProperty">Property</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="123main">123 Main St</SelectItem>
                <SelectItem value="456market">456 Market Ave</SelectItem>
                <SelectItem value="789broadway">789 Broadway</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input id="unit" placeholder="Unit number or description" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
          </div>
          <div>
            <Label htmlFor="monthlyRent">Monthly Rent</Label>
            <Input id="monthlyRent" type="number" placeholder="3000" />
          </div>
          <div>
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowAddLease(false)} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Create Lease
            </Button>
            <Button variant="outline" onClick={() => setShowAddLease(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Modal component for Add Payment
  const AddPaymentModal = () => (
    <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
          <DialogDescription>Record a rent payment</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="paymentProperty">Property</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="123main">123 Main St</SelectItem>
                <SelectItem value="456market">456 Market Ave</SelectItem>
                <SelectItem value="789broadway">789 Broadway</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="paymentUnit">Unit</Label>
            <Input id="paymentUnit" placeholder="Unit number" />
          </div>
          <div>
            <Label htmlFor="tenant">Tenant</Label>
            <Input id="tenant" placeholder="Tenant name" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="rentDue">Rent Due</Label>
              <Input id="rentDue" type="number" placeholder="2500" />
            </div>
            <div>
              <Label htmlFor="rentPaid">Rent Paid</Label>
              <Input id="rentPaid" type="number" placeholder="2500" />
            </div>
          </div>
          <div>
            <Label htmlFor="paymentStatus">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Payment notes..." />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowAddPayment(false)} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
            <Button variant="outline" onClick={() => setShowAddPayment(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Modal component for Create Ticket
  const CreateTicketModal = () => (
    <Dialog open={showCreateTicket} onOpenChange={setShowCreateTicket}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Maintenance Ticket</DialogTitle>
          <DialogDescription>Report a maintenance issue</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ticketTitle">Title</Label>
            <Input id="ticketTitle" placeholder="Brief description of issue" />
          </div>
          <div>
            <Label htmlFor="ticketProperty">Property Address</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="123main">123 Main St</SelectItem>
                <SelectItem value="456market">456 Market Ave</SelectItem>
                <SelectItem value="789broadway">789 Broadway</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="part">Part/System</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select part" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="appliances">Appliances</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cost">Estimated Cost</Label>
            <Input id="cost" type="number" placeholder="250" />
          </div>
          <div>
            <Label htmlFor="ticketAssignee">Assignee</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mike">Mike Johnson</SelectItem>
                <SelectItem value="sarah">Sarah Wilson</SelectItem>
                <SelectItem value="contractor">External Contractor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="scheduledDate">Date Scheduled</Label>
            <Input id="scheduledDate" type="date" />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowCreateTicket(false)} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
            <Button variant="outline" onClick={() => setShowCreateTicket(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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
          <Button onClick={() => setShowAddProperty(true)}>
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
          <Button onClick={() => setShowAddTask(true)}>
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

  const renderCommunicationHub = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Communication Hub</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Thread
        </Button>
      </div>
      
      <Card className="h-[700px]">
        <CardContent className="p-0 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-6">
            {/* Thread Sidebar */}
            <div className="lg:col-span-1 border border-slate-200 rounded-lg bg-white">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Active Conversations</h3>
                <div className="relative mb-4">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </div>

              <div className="overflow-y-auto max-h-[500px]">
                {[
                  { id: 1, title: "Downtown Office Complex", lastMessage: "Contract ready for review", time: "2 min ago", unread: 2, participants: 4 },
                  { id: 2, title: "Lakeside Apartments", lastMessage: "Environmental report uploaded", time: "1 hour ago", unread: 0, participants: 3 },
                  { id: 3, title: "Sunset Retail Plaza", lastMessage: "Legal team feedback", time: "3 hours ago", unread: 1, participants: 6 }
                ].map((thread) => (
                  <div key={thread.id} className="p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-slate-900">{thread.title}</span>
                      {thread.unread > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">{thread.unread}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{thread.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{thread.time}</span>
                      <span className="text-xs text-slate-400">{thread.participants} participants</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="lg:col-span-2 border border-slate-200 rounded-lg bg-white flex flex-col">
              <div className="flex-1 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Select a conversation to view messages</p>
                  <p className="text-sm">Choose from the conversations on the left or create a new one</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
          <Button onClick={() => setShowAddTask(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
      
      {calendarView === "monthly" ? (
        <Card>
          <CardContent className="p-6">
            <Calendar className="w-full pointer-events-auto" />
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium">Upcoming Events:</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Review Appraisal Report - Today</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Coffee Corner LLC Lease Renewal - Jan 15</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Property Inspection - Jan 18</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="p-2 text-center font-medium text-sm border-b">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="min-h-[120px] p-2 border rounded-lg">
                  <div className="font-medium text-sm mb-2">{13 + i}</div>
                  {i === 0 && (
                    <div className="space-y-1">
                      <div className="text-xs p-1 bg-blue-100 text-blue-800 rounded">
                        Review Appraisal
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="space-y-1">
                      <div className="text-xs p-1 bg-green-100 text-green-800 rounded">
                        Lease Renewal
                      </div>
                    </div>
                  )}
                  {i === 5 && (
                    <div className="space-y-1">
                      <div className="text-xs p-1 bg-red-100 text-red-800 rounded">
                        Property Inspection
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
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
        <Button onClick={() => setShowAddLease(true)}>
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
          <Button onClick={() => setShowAddPayment(true)}>
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
        <Button onClick={() => setShowCreateTicket(true)}>
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
      
      <Tabs defaultValue="workspace" className="w-full">
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="workspaceName">Workspace Name</Label>
                <Input id="workspaceName" defaultValue="AbodexOS Demo" />
              </div>
              <div>
                <Label htmlFor="companyLogo">Company Logo</Label>
                <div className="flex items-center gap-3">
                  <Input type="file" accept="image/*" />
                  <Button variant="outline" size="sm">Upload</Button>
                </div>
              </div>
              <div>
                <Label htmlFor="dealTemplate">Default Deal Stage Template</Label>
                <Select defaultValue="office">
                  <SelectTrigger>
                    <SelectValue />
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
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Legal Tasks</span>
                    <Select defaultValue="alex">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alex">Alex Chen</SelectItem>
                        <SelectItem value="jamie">Jamie Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Survey Tasks</span>
                    <Select defaultValue="jamie">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alex">Alex Chen</SelectItem>
                        <SelectItem value="jamie">Jamie Wilson</SelectItem>
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Email or phone number" className="flex-1" />
                <Button>Invite Member</Button>
              </div>
              
              <Separator />
              
              <div>
                <Label>Team Members</Label>
                <div className="space-y-2 mt-2">
                  {[
                    { name: "Alex Chen", email: "alex@company.com", role: "Admin" },
                    { name: "Jamie Wilson", email: "jamie@company.com", role: "Viewer" },
                    { name: "Ryan Torres", email: "ryan@company.com", role: "External Collaborator" }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                      <Select defaultValue={member.role.toLowerCase().replace(' ', '')}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="externalcollaborator">External Collaborator</SelectItem>
                          <SelectItem value="lender">Lender</SelectItem>
                          <SelectItem value="titleagent">Title Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Role Permissions</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["Financials", "Documents", "Comments", "Task Creation"].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox id={permission} defaultChecked />
                      <Label htmlFor={permission} className="text-sm">{permission}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🕐 Notifications & Reminders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { label: "Email Notifications", id: "email" },
                  { label: "SMS Notifications", id: "sms" },
                  { label: "Slack Integration", id: "slack" }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Label htmlFor={item.id}>{item.label}</Label>
                    <Switch id={item.id} defaultChecked={item.id === "email"} />
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div>
                <Label>Reminder Preferences</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily Digest</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-Time Alerts</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="reminderDays">Remind me X days before critical date</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔐 Access & Security</CardTitle>
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
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return renderDashboard();
      case "properties": return renderProperties();
      case "tasks": return renderTasks();
      case "calendar": return renderCalendar();
      case "communication": return renderCommunicationHub();
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
        You are viewing a live demo of AbodexOS. Join early access to deploy a full workspace for your team.
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 fixed left-0 top-0 bottom-0 z-40 flex flex-col`}>
        <div className="pt-12 pb-4 px-4 flex-1">
          <a href="/" className="flex items-center space-x-3 mb-8">
            <img src="/lovable-uploads/899b7d53-4900-45b1-a75f-b55c92ff10b6.png" alt="AbodexOS" className="w-8 h-8 rounded-lg object-cover" />
            {sidebarOpen && <span className="font-bold text-lg">AbodexOS</span>}
          </a>
          
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
        
        {/* Join Early Access Button */}
        <div className="p-4">
          <Button 
            onClick={() => window.open('https://lovable.dev', '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
            size="sm"
          >
            {sidebarOpen ? 'Join Early Access' : '🚀'}
          </Button>
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
                  <DropdownMenuItem onClick={() => window.location.href = '/profile'}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/settings'}>Settings</DropdownMenuItem>
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

      {/* Modal Components */}
      <AddPropertyModal />
      <AddTaskModal />
      <AddLeaseModal />
      <AddPaymentModal />
      <CreateTicketModal />
    </div>
  );
};

export default Dashboard;