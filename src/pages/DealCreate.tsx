import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const stages = [
  "Initial Review",
  "Due Diligence",
  "Contract Negotiation",
  "Completed",
];

export default function DealCreate() {
  const [property, setProperty] = useState({
    name: "",
    value: "",
    address: "",
    description: "",
    stage: stages[0],
    closeDate: "",
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [stakeholders, setStakeholders] = useState([
    { name: "", role: "", email: "", phone: "" },
  ]);
  const [tasks, setTasks] = useState([
    { title: "", assignee: "", due: "", priority: "Medium" },
  ]);
  const navigate = useNavigate();

  function handleFileChange(e) {
    setDocuments(Array.from(e.target.files));
  }

  function handleStakeholderChange(i, field, value) {
    setStakeholders((prev) => {
      const copy = [...prev];
      copy[i][field] = value;
      return copy;
    });
  }
  function addStakeholder() {
    setStakeholders((prev) => [...prev, { name: "", role: "", email: "", phone: "" }]);
  }
  function removeStakeholder(i) {
    setStakeholders((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleTaskChange(i, field, value) {
    setTasks((prev) => {
      const copy = [...prev];
      copy[i][field] = value;
      return copy;
    });
  }
  function addTask() {
    setTasks((prev) => [...prev, { title: "", assignee: "", due: "", priority: "Medium" }]);
  }
  function removeTask(i) {
    setTasks((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Save to backend or local state
    navigate("/deals");
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <CardTitle className="mb-6">Create New Deal Room</CardTitle>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Information */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Property Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input required placeholder="Property Name *" value={property.name} onChange={e => setProperty(p => ({ ...p, name: e.target.value }))} />
                  <Input placeholder="Property Value" value={property.value} onChange={e => setProperty(p => ({ ...p, value: e.target.value }))} />
                  <Input required placeholder="Address *" value={property.address} onChange={e => setProperty(p => ({ ...p, address: e.target.value }))} />
                  <Input placeholder="Expected Close Date" type="date" value={property.closeDate} onChange={e => setProperty(p => ({ ...p, closeDate: e.target.value }))} />
                </div>
                <Textarea placeholder="Description (optional)" value={property.description} onChange={e => setProperty(p => ({ ...p, description: e.target.value }))} className="mt-2" />
                <div className="mt-2">
                  <label className="block text-sm font-medium mb-1">Current Stage</label>
                  <select className="border rounded-md px-3 py-2 w-full" value={property.stage} onChange={e => setProperty(p => ({ ...p, stage: e.target.value }))}>
                    {stages.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {/* Initial Documents */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Initial Documents</h2>
                <label className="block w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer bg-white hover:bg-slate-100">
                  <input type="file" multiple className="hidden" onChange={handleFileChange} />
                  <span className="block text-slate-500">Drop files here or click to upload</span>
                  <span className="block text-xs text-slate-400 mt-2">We'll automatically extract property information from contracts and agreements</span>
                </label>
                {documents.length > 0 && (
                  <ul className="mt-2 text-sm text-slate-700">
                    {documents.map((file, i) => (
                      <li key={i}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Initial Stakeholders */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Initial Stakeholders</h2>
                {stakeholders.map((s, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 items-end">
                    <Input required placeholder="Full Name" value={s.name} onChange={e => handleStakeholderChange(i, "name", e.target.value)} />
                    <Input placeholder="Role" value={s.role} onChange={e => handleStakeholderChange(i, "role", e.target.value)} />
                    <Input placeholder="Email" value={s.email} onChange={e => handleStakeholderChange(i, "email", e.target.value)} />
                    <Input placeholder="Phone Number" value={s.phone} onChange={e => handleStakeholderChange(i, "phone", e.target.value)} />
                    {stakeholders.length > 1 && <Button type="button" variant="outline" size="sm" onClick={() => removeStakeholder(i)}>Remove</Button>}
                  </div>
                ))}
                <Button type="button" variant="secondary" size="sm" onClick={addStakeholder}>+ Add Stakeholder</Button>
              </div>
              {/* Initial Tasks */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Initial Tasks</h2>
                {tasks.map((t, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 items-end">
                    <Input required placeholder="Task Title" value={t.title} onChange={e => handleTaskChange(i, "title", e.target.value)} />
                    <Input placeholder="Assignee" value={t.assignee} onChange={e => handleTaskChange(i, "assignee", e.target.value)} />
                    <Input type="date" placeholder="Due Date" value={t.due} onChange={e => handleTaskChange(i, "due", e.target.value)} />
                    <select className="border rounded-md px-3 py-2" value={t.priority} onChange={e => handleTaskChange(i, "priority", e.target.value)}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    {tasks.length > 1 && <Button type="button" variant="outline" size="sm" onClick={() => removeTask(i)}>Remove</Button>}
                  </div>
                ))}
                <Button type="button" variant="secondary" size="sm" onClick={addTask}>+ Add Task</Button>
              </div>
              {/* Actions */}
              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={() => navigate("/deals")}>Cancel</Button>
                <Button type="submit" className="bg-black text-white hover:bg-neutral-800">Create Deal Room</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 