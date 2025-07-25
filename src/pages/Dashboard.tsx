import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "team", label: "Team Activity", icon: Users },
    { id: "files", label: "Files", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Demo data
  const demoStats = {
    activeDeals: 12,
    openTasks: 24,
    deadlinesThisWeek: 8,
    recentlyUpdated: 5
  };

  const demoProperties = [
    {
      id: 1,
      name: "123 Main St",
      address: "123 Main Street, San Francisco, CA",
      stage: "Due Diligence",
      leadBroker: "Alex Chen",
      tasks: 8,
      attachments: 12,
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      name: "456 Market Ave",
      address: "456 Market Avenue, Oakland, CA",
      stage: "Offer",
      leadBroker: "Jamie Wilson",
      tasks: 5,
      attachments: 7,
      lastUpdated: "1 day ago"
    },
    {
      id: 3,
      name: "789 Broadway",
      address: "789 Broadway, New York, NY",
      stage: "Escrow",
      leadBroker: "Alex Chen",
      tasks: 12,
      attachments: 18,
      lastUpdated: "3 hours ago"
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
      section: "Today"
    },
    {
      id: 2,
      name: "Send LOI to Seller",
      assignee: "Jamie Wilson",
      dueDate: "Tomorrow",
      property: "456 Market Ave",
      status: "Not Started",
      section: "Upcoming"
    },
    {
      id: 3,
      name: "Upload Rent Roll",
      assignee: "Alex Chen",
      dueDate: "Yesterday",
      property: "789 Broadway",
      status: "Overdue",
      section: "Overdue"
    },
    {
      id: 4,
      name: "Schedule Property Tour",
      assignee: "Jamie Wilson",
      dueDate: "Next Week",
      property: "123 Main St",
      status: "Not Started",
      section: "Upcoming"
    },
    {
      id: 5,
      name: "Review Environmental Report",
      assignee: "Alex Chen",
      dueDate: "Completed",
      property: "456 Market Ave",
      status: "Complete",
      section: "Completed"
    },
    {
      id: 6,
      name: "Submit Loan Application",
      assignee: "Jamie Wilson",
      dueDate: "This Week",
      property: "789 Broadway",
      status: "In Progress",
      section: "Upcoming"
    }
  ];

  const demoActivity = [
    { user: "Alex Chen", action: "updated task", item: "Review Appraisal Report", time: "10 minutes ago" },
    { user: "Jamie Wilson", action: "added property", item: "789 Broadway", time: "2 hours ago" },
    { user: "Alex Chen", action: "completed task", item: "Review Environmental Report", time: "4 hours ago" },
    { user: "Jamie Wilson", action: "uploaded file", item: "LOI_456Market.pdf", time: "1 day ago" },
    { user: "Alex Chen", action: "created task", item: "Schedule Property Tour", time: "1 day ago" }
  ];

  const demoFiles = [
    { name: "LOI_123Main.pdf", property: "123 Main St", type: "PDF", uploadedBy: "Alex Chen", date: "Today" },
    { name: "RentRoll_456Market.xlsx", property: "456 Market Ave", type: "Excel", uploadedBy: "Jamie Wilson", date: "Yesterday" },
    { name: "Appraisal_789Broadway.pdf", property: "789 Broadway", type: "PDF", uploadedBy: "Alex Chen", date: "2 days ago" },
    { name: "SitePlan_123Main.png", property: "123 Main St", type: "Image", uploadedBy: "Jamie Wilson", date: "3 days ago" }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Deals</CardDescription>
            <CardTitle className="text-3xl font-bold text-blue-600">{demoStats.activeDeals}</CardTitle>
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
            <CardDescription>Deadlines This Week</CardDescription>
            <CardTitle className="text-3xl font-bold text-red-600">{demoStats.deadlinesThisWeek}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Recently Updated</CardDescription>
            <CardTitle className="text-3xl font-bold text-green-600">{demoStats.recentlyUpdated}</CardTitle>
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
            {demoActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                    <span className="font-medium">"{activity.item}"</span>
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
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-4 font-medium">Property Name</th>
                  <th className="p-4 font-medium">Address</th>
                  <th className="p-4 font-medium">Stage</th>
                  <th className="p-4 font-medium">Lead Broker</th>
                  <th className="p-4 font-medium">Tasks</th>
                  <th className="p-4 font-medium">Files</th>
                  <th className="p-4 font-medium">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {demoProperties.map((property) => (
                  <tr key={property.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{property.name}</td>
                    <td className="p-4 text-sm text-gray-600">{property.address}</td>
                    <td className="p-4">
                      <Badge 
                        variant={property.stage === "Due Diligence" ? "default" : 
                               property.stage === "Offer" ? "secondary" : "outline"}
                      >
                        {property.stage}
                      </Badge>
                    </td>
                    <td className="p-4">{property.leadBroker}</td>
                    <td className="p-4">
                      <Badge variant="outline">{property.tasks}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{property.attachments}</Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{property.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
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
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" checked={task.status === "Complete"} readOnly />
                      <div>
                        <p className="font-medium">{task.name}</p>
                        <p className="text-sm text-gray-600">
                          {task.assignee} • {task.property} • {task.dueDate}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={task.status === "Complete" ? "default" : 
                             task.status === "In Progress" ? "secondary" : 
                             task.status === "Overdue" ? "destructive" : "outline"}
                    >
                      {task.status}
                    </Badge>
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
        <Badge variant="outline">Sync with Google Calendar (Coming Soon)</Badge>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500 py-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Calendar view coming soon</p>
            <p className="text-sm">Tasks with due dates will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeamActivity = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Team Activity</h2>
      
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
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Upload File
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="p-4 font-medium">File Name</th>
                  <th className="p-4 font-medium">Property</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Uploaded By</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demoFiles.map((file, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{file.name}</td>
                    <td className="p-4">{file.property}</td>
                    <td className="p-4">
                      <Badge variant="outline">{file.type}</Badge>
                    </td>
                    <td className="p-4">{file.uploadedBy}</td>
                    <td className="p-4 text-sm text-gray-600">{file.date}</td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <p>Settings panel coming soon</p>
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
      case "settings": return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Demo Banner */}
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm z-50">
        🎯 You're viewing the AbodexOS demo. Contact us to unlock full access.
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
                <input
                  type="text"
                  placeholder="Search properties, tasks..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
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