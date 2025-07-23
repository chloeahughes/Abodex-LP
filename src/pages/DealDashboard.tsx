import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

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
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Closed: "bg-gray-200 text-gray-700",
};

export default function DealDashboard() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const filteredDeals = mockDeals.filter(
    (deal) =>
      deal.propertyName.toLowerCase().includes(search.toLowerCase()) &&
      (stage ? deal.stage === stage : true) &&
      (status ? deal.status === status : true)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by property, address, or stakeholder"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <select
              className="border rounded-md px-3 py-2 text-sm text-slate-700 bg-white"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              <option value="">All Stages</option>
              <option>Initial Review</option>
              <option>Due Diligence</option>
              <option>Contract Negotiation</option>
              <option>Completed</option>
            </select>
            <select
              className="border rounded-md px-3 py-2 text-sm text-slate-700 bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>
          </div>
          <Button
            className="bg-black text-white hover:bg-neutral-800"
            onClick={() => navigate("/deals/new")}
          >
            + Create New Deal Room
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <Card
              key={deal.id}
              className="relative cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => navigate(`/deals/${deal.id}`)}
              tabIndex={0}
              role="button"
              aria-label={`Open deal room for ${deal.propertyName}`}
            >
              <CardContent className="pt-6 pb-4">
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
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Updated {deal.lastUpdated}</span>
                  {deal.unreadMessages > 0 && (
                    <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs font-semibold">
                      {deal.unreadMessages}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 