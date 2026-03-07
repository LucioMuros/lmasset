import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { mockMaintenance, mockProperties } from "@/data/mockData";
import { MaintenanceTask } from "@/types";

const priorities = ['Low', 'Medium', 'High'] as const;
const maintenanceStatuses = ['Open', 'In Progress', 'Resolved'] as const;

const priorityColors: Record<string, string> = {
  Low: 'bg-info/10 text-info border-info/20',
  Medium: 'bg-warning/10 text-warning border-warning/20',
  High: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusColors: Record<string, string> = {
  Open: 'bg-destructive/10 text-destructive',
  'In Progress': 'bg-warning/10 text-warning',
  Resolved: 'bg-success/10 text-success',
};

export default function Maintenance() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(mockMaintenance);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    property_id: '', description: '', priority: 'Medium' as MaintenanceTask['priority'],
    assigned_technician: '',
  });

  const handleSave = () => {
    const task: MaintenanceTask = {
      ...form, id: Date.now().toString(), status: 'Open', created_at: new Date().toISOString(),
    };
    setTasks(prev => [...prev, task]);
    setForm({ property_id: '', description: '', priority: 'Medium', assigned_technician: '' });
    setIsDialogOpen(false);
  };

  const updateStatus = (id: string, status: MaintenanceTask['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const getPropertyName = (id: string) => mockProperties.find(p => p.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maintenance</h1>
          <p className="text-muted-foreground mt-1">Track and resolve property issues</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Report Issue</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Report Maintenance Issue</DialogTitle></DialogHeader>
            <div className="grid gap-4 pt-4">
              <div>
                <Label>Property</Label>
                <Select value={form.property_id} onValueChange={v => setForm(f => ({ ...f, property_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                  <SelectContent>{mockProperties.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Issue Description</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v as MaintenanceTask['priority'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{priorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Assigned Technician</Label><Input value={form.assigned_technician} onChange={e => setForm(f => ({ ...f, assigned_technician: e.target.value }))} /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Report Issue</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{getPropertyName(task.property_id)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{task.description}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </TableCell>
                  <TableCell>{task.assigned_technician}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select value={task.status} onValueChange={v => updateStatus(task.id, v as MaintenanceTask['status'])}>
                      <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
                      <SelectContent>{maintenanceStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
