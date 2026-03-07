import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle } from "lucide-react";
import { mockCleanings, mockProperties } from "@/data/mockData";
import { CleaningTask } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Cleaning() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<CleaningTask[]>(mockCleanings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({ property_id: '', date: '', assigned_cleaner: '' });

  const handleSave = () => {
    const task: CleaningTask = { ...form, id: Date.now().toString(), status: 'Pending', created_at: new Date().toISOString() };
    setTasks(prev => [...prev, task]);
    setForm({ property_id: '', date: '', assigned_cleaner: '' });
    setIsDialogOpen(false);
  };

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Pending' ? 'Done' : 'Pending' } : t));
  };

  const getPropertyName = (id: string) => mockProperties.find(p => p.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.cleaning.title}</h1>
          <p className="text-muted-foreground mt-1">{t.cleaning.subtitle}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />{t.cleaning.addTask}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{t.cleaning.addCleaningTask}</DialogTitle></DialogHeader>
            <div className="grid gap-4 pt-4">
              <div>
                <Label>{t.cleaning.property}</Label>
                <Select value={form.property_id} onValueChange={v => setForm(f => ({ ...f, property_id: v }))}>
                  <SelectTrigger><SelectValue placeholder={t.cleaning.selectProperty} /></SelectTrigger>
                  <SelectContent>{mockProperties.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>{t.cleaning.date}</Label><Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
              <div><Label>{t.cleaning.assignedCleaner}</Label><Input value={form.assigned_cleaner} onChange={e => setForm(f => ({ ...f, assigned_cleaner: e.target.value }))} /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t.cleaning.cancel}</Button>
                <Button onClick={handleSave}>{t.cleaning.addTask}</Button>
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
                <TableHead>{t.cleaning.property}</TableHead>
                <TableHead>{t.cleaning.date}</TableHead>
                <TableHead>{t.cleaning.assignedCleaner}</TableHead>
                <TableHead>{t.cleaning.status}</TableHead>
                <TableHead className="text-right">{t.cleaning.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{getPropertyName(task.property_id)}</TableCell>
                  <TableCell>{task.date}</TableCell>
                  <TableCell>{task.assigned_cleaner}</TableCell>
                  <TableCell><Badge variant={task.status === 'Done' ? 'default' : 'secondary'}>{task.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => toggleStatus(task.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {task.status === 'Pending' ? t.cleaning.markDone : t.cleaning.reopen}
                    </Button>
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
