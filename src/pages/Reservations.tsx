import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { mockBookings, mockProperties } from "@/data/mockData";
import { Booking } from "@/types";
import { differenceInDays, parseISO } from "date-fns";

const platforms = ['Airbnb', 'Booking', 'Direct'] as const;
const statuses = ['Confirmed', 'Pending', 'Cancelled'] as const;

const statusColors: Record<string, string> = {
  Confirmed: 'bg-success/10 text-success border-success/20',
  Pending: 'bg-warning/10 text-warning border-warning/20',
  Cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function Reservations() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Booking | null>(null);
  const [form, setForm] = useState({
    guest_name: '', property_id: '', platform: 'Airbnb' as Booking['platform'],
    check_in: '', check_out: '', total_value: 0, platform_fee: 0,
    cleaning_fee: 0, status: 'Pending' as Booking['status'],
  });

  const calcNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, differenceInDays(parseISO(checkOut), parseISO(checkIn)));
  };

  const handleSave = () => {
    const nights = calcNights(form.check_in, form.check_out);
    const net_revenue = form.total_value - form.platform_fee - form.cleaning_fee;
    const booking: Booking = {
      ...form, nights, net_revenue,
      id: editing?.id || Date.now().toString(),
      created_at: editing?.created_at || new Date().toISOString(),
    };
    if (editing) {
      setBookings(prev => prev.map(b => b.id === editing.id ? booking : b));
    } else {
      setBookings(prev => [...prev, booking]);
    }
    resetForm();
  };

  const handleEdit = (booking: Booking) => {
    setEditing(booking);
    setForm({
      guest_name: booking.guest_name, property_id: booking.property_id,
      platform: booking.platform, check_in: booking.check_in, check_out: booking.check_out,
      total_value: booking.total_value, platform_fee: booking.platform_fee,
      cleaning_fee: booking.cleaning_fee, status: booking.status,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setForm({ guest_name: '', property_id: '', platform: 'Airbnb', check_in: '', check_out: '', total_value: 0, platform_fee: 0, cleaning_fee: 0, status: 'Pending' });
    setEditing(null);
    setIsDialogOpen(false);
  };

  const getPropertyName = (id: string) => mockProperties.find(p => p.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reservations</h1>
          <p className="text-muted-foreground mt-1">Manage guest bookings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setIsDialogOpen(open); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />New Reservation</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Reservation' : 'New Reservation'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="col-span-2">
                <Label>Guest Name</Label>
                <Input value={form.guest_name} onChange={e => setForm(f => ({ ...f, guest_name: e.target.value }))} />
              </div>
              <div>
                <Label>Property</Label>
                <Select value={form.property_id} onValueChange={v => setForm(f => ({ ...f, property_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                  <SelectContent>
                    {mockProperties.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Platform</Label>
                <Select value={form.platform} onValueChange={v => setForm(f => ({ ...f, platform: v as Booking['platform'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Check-in</Label>
                <Input type="date" value={form.check_in} onChange={e => setForm(f => ({ ...f, check_in: e.target.value }))} />
              </div>
              <div>
                <Label>Check-out</Label>
                <Input type="date" value={form.check_out} onChange={e => setForm(f => ({ ...f, check_out: e.target.value }))} />
              </div>
              <div className="col-span-2 text-sm text-muted-foreground">
                Nights: <strong>{calcNights(form.check_in, form.check_out)}</strong>
              </div>
              <div>
                <Label>Total Value ($)</Label>
                <Input type="number" value={form.total_value} onChange={e => setForm(f => ({ ...f, total_value: +e.target.value }))} />
              </div>
              <div>
                <Label>Platform Fee ($)</Label>
                <Input type="number" value={form.platform_fee} onChange={e => setForm(f => ({ ...f, platform_fee: +e.target.value }))} />
              </div>
              <div>
                <Label>Cleaning Fee ($)</Label>
                <Input type="number" value={form.cleaning_fee} onChange={e => setForm(f => ({ ...f, cleaning_fee: +e.target.value }))} />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as Booking['status'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 text-sm text-muted-foreground">
                Net Revenue: <strong>${(form.total_value - form.platform_fee - form.cleaning_fee).toLocaleString()}</strong>
              </div>
              <div className="col-span-2 flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button onClick={handleSave}>{editing ? 'Save Changes' : 'Add Reservation'}</Button>
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
                <TableHead>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Nights</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Net Rev.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.guest_name}</TableCell>
                  <TableCell>{getPropertyName(booking.property_id)}</TableCell>
                  <TableCell><Badge variant="outline">{booking.platform}</Badge></TableCell>
                  <TableCell>{booking.check_in}</TableCell>
                  <TableCell>{booking.check_out}</TableCell>
                  <TableCell>{booking.nights}</TableCell>
                  <TableCell>${booking.total_value.toLocaleString()}</TableCell>
                  <TableCell>${booking.net_revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(booking)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setBookings(prev => prev.filter(b => b.id !== booking.id))}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
