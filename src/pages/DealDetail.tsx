import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(deal?.messages || []);

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

  function handleSendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "You", text: newMessage, time: "just now" },
    ]);
    setNewMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
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
        {/* Task Management */}
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
        {/* Communication Management */}
        <Card>
          <CardContent className="p-6">
            <div className="font-semibold mb-4">Messages</div>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {messages.length > 0 ? (
                messages.map((msg, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-slate-700">{msg.sender}:</span>
                    <span>{msg.text}</span>
                    <span className="text-xs text-slate-400 ml-2">{msg.time}</span>
                  </div>
                ))
              ) : (
                <div className="text-slate-400">No messages yet.</div>
              )}
            </div>
            <form className="flex gap-2" onSubmit={handleSendMessage}>
              <Input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" className="bg-black text-white">Send</Button>
            </form>
          </CardContent>
        </Card>
        <Button variant="outline" onClick={() => navigate("/deals")}>Back to Dashboard</Button>
      </div>
    </div>
  );
} 