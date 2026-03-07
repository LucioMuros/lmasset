import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { mockProperties } from "@/data/mockData";
import { Property } from "@/types";

const propertyTypes = ['Apartment', 'House', 'Loft', 'Studio', 'Villa', 'Condo'];

const emptyProperty: Omit<Property, 'id' | 'created_at'> = {
  name: '', address: '', city: '', neighborhood: '', property_type: '',
  max_guests: 1, bedrooms: 1, bathrooms: 1, cleaning_fee: 0, management_fee_pct: 20, owner_name: ''
};

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [form, setForm] = useState(emptyProperty);

  const handleSave = () => {
    if (editingProperty) {
      setProperties(prev => prev.map(p => p.id === editingProperty.id ? { ...p, ...form } : p));
    } else {
      const newProperty: Property = { ...form, id: Date.now().toString(), created_at: new Date().toISOString() };
      setProperties(prev => [...prev, newProperty]);
    }
    resetForm();
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setForm(property);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const resetForm = () => {
    setForm(emptyProperty);
    setEditingProperty(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground mt-1">Manage your rental portfolio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setIsDialogOpen(open); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Property</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="col-span-2">
                <Label>Property Name</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ocean View Penthouse" />
              </div>
              <div className="col-span-2">
                <Label>Address</Label>
                <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="123 Beach Road" />
              </div>
              <div>
                <Label>City</Label>
                <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              </div>
              <div>
                <Label>Neighborhood</Label>
                <Input value={form.neighborhood} onChange={e => setForm(f => ({ ...f, neighborhood: e.target.value }))} />
              </div>
              <div>
                <Label>Property Type</Label>
                <Select value={form.property_type} onValueChange={v => setForm(f => ({ ...f, property_type: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Max Guests</Label>
                <Input type="number" value={form.max_guests} onChange={e => setForm(f => ({ ...f, max_guests: +e.target.value }))} />
              </div>
              <div>
                <Label>Bedrooms</Label>
                <Input type="number" value={form.bedrooms} onChange={e => setForm(f => ({ ...f, bedrooms: +e.target.value }))} />
              </div>
              <div>
                <Label>Bathrooms</Label>
                <Input type="number" value={form.bathrooms} onChange={e => setForm(f => ({ ...f, bathrooms: +e.target.value }))} />
              </div>
              <div>
                <Label>Cleaning Fee ($)</Label>
                <Input type="number" value={form.cleaning_fee} onChange={e => setForm(f => ({ ...f, cleaning_fee: +e.target.value }))} />
              </div>
              <div>
                <Label>Management Fee (%)</Label>
                <Input type="number" value={form.management_fee_pct} onChange={e => setForm(f => ({ ...f, management_fee_pct: +e.target.value }))} />
              </div>
              <div className="col-span-2">
                <Label>Owner Name</Label>
                <Input value={form.owner_name} onChange={e => setForm(f => ({ ...f, owner_name: e.target.value }))} />
              </div>
              <div className="col-span-2 flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button onClick={handleSave}>{editingProperty ? 'Save Changes' : 'Add Property'}</Button>
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
                <TableHead>City</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Beds/Baths</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Mgmt Fee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map(property => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.city}</TableCell>
                  <TableCell><Badge variant="secondary">{property.property_type}</Badge></TableCell>
                  <TableCell>{property.max_guests}</TableCell>
                  <TableCell>{property.bedrooms}/{property.bathrooms}</TableCell>
                  <TableCell>{property.owner_name}</TableCell>
                  <TableCell>{property.management_fee_pct}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(property)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)}>
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
