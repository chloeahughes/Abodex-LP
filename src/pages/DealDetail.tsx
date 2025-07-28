import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommunicationHub from "@/components/CommunicationHub";

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
            <TabsTrigger value="messages">Messages</TabsTrigger>
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

          <TabsContent value="messages" className="space-y-4">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <CommunicationHub />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button variant="outline" onClick={() => navigate("/deals")}>Back to Dashboard</Button>
      </div>
    </div>
  );
} 