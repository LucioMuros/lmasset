import { Property, Booking, Expense, CleaningTask, MaintenanceTask } from '@/types';

export const mockProperties: Property[] = [
  {
    id: '1', name: 'Ocean View Penthouse', address: '123 Beach Road', city: 'Miami',
    neighborhood: 'South Beach', property_type: 'Apartment', max_guests: 6, bedrooms: 3,
    bathrooms: 2, cleaning_fee: 150, management_fee_pct: 20, owner_name: 'John Smith', created_at: '2024-01-01'
  },
  {
    id: '2', name: 'Downtown Loft', address: '456 Main Street', city: 'Miami',
    neighborhood: 'Brickell', property_type: 'Loft', max_guests: 4, bedrooms: 2,
    bathrooms: 1, cleaning_fee: 100, management_fee_pct: 20, owner_name: 'Sarah Johnson', created_at: '2024-01-15'
  },
  {
    id: '3', name: 'Tropical Villa', address: '789 Palm Ave', city: 'Fort Lauderdale',
    neighborhood: 'Las Olas', property_type: 'House', max_guests: 8, bedrooms: 4,
    bathrooms: 3, cleaning_fee: 200, management_fee_pct: 25, owner_name: 'John Smith', created_at: '2024-02-01'
  },
];

export const mockBookings: Booking[] = [
  {
    id: '1', property_id: '1', guest_name: 'Alice Brown', platform: 'Airbnb',
    check_in: '2025-03-01', check_out: '2025-03-05', nights: 4, total_value: 1200,
    platform_fee: 36, cleaning_fee: 150, net_revenue: 1014, status: 'Confirmed', created_at: '2025-02-20'
  },
  {
    id: '2', property_id: '2', guest_name: 'Bob Wilson', platform: 'Booking',
    check_in: '2025-03-03', check_out: '2025-03-07', nights: 4, total_value: 800,
    platform_fee: 120, cleaning_fee: 100, net_revenue: 580, status: 'Confirmed', created_at: '2025-02-25'
  },
  {
    id: '3', property_id: '1', guest_name: 'Carlos Garcia', platform: 'Direct',
    check_in: '2025-03-10', check_out: '2025-03-15', nights: 5, total_value: 1500,
    platform_fee: 0, cleaning_fee: 150, net_revenue: 1350, status: 'Pending', created_at: '2025-03-01'
  },
  {
    id: '4', property_id: '3', guest_name: 'Diana Lee', platform: 'Airbnb',
    check_in: '2025-03-08', check_out: '2025-03-14', nights: 6, total_value: 2400,
    platform_fee: 72, cleaning_fee: 200, net_revenue: 2128, status: 'Confirmed', created_at: '2025-02-28'
  },
  {
    id: '5', property_id: '2', guest_name: 'Eva Martinez', platform: 'Booking',
    check_in: '2025-03-15', check_out: '2025-03-18', nights: 3, total_value: 600,
    platform_fee: 90, cleaning_fee: 100, net_revenue: 410, status: 'Confirmed', created_at: '2025-03-05'
  },
];

export const mockExpenses: Expense[] = [
  { id: '1', property_id: '1', category: 'Cleaning', description: 'Deep cleaning after checkout', value: 150, date: '2025-03-05', created_at: '2025-03-05' },
  { id: '2', property_id: '1', category: 'Electricity', description: 'Monthly bill', value: 180, date: '2025-03-01', created_at: '2025-03-01' },
  { id: '3', property_id: '2', category: 'Internet', description: 'Monthly internet', value: 80, date: '2025-03-01', created_at: '2025-03-01' },
  { id: '4', property_id: '3', category: 'Maintenance', description: 'Pool maintenance', value: 250, date: '2025-03-10', created_at: '2025-03-10' },
  { id: '5', property_id: '2', category: 'Supplies', description: 'Toiletries & towels', value: 95, date: '2025-03-08', created_at: '2025-03-08' },
  { id: '6', property_id: '3', category: 'Condominium', description: 'HOA fee', value: 450, date: '2025-03-01', created_at: '2025-03-01' },
];

export const mockCleanings: CleaningTask[] = [
  { id: '1', property_id: '1', date: '2025-03-05', assigned_cleaner: 'Maria Santos', status: 'Done', booking_id: '1', created_at: '2025-03-01' },
  { id: '2', property_id: '2', date: '2025-03-07', assigned_cleaner: 'Ana Rodriguez', status: 'Pending', booking_id: '2', created_at: '2025-03-03' },
  { id: '3', property_id: '1', date: '2025-03-15', assigned_cleaner: 'Maria Santos', status: 'Pending', booking_id: '3', created_at: '2025-03-10' },
  { id: '4', property_id: '3', date: '2025-03-14', assigned_cleaner: 'Carlos Lima', status: 'Pending', booking_id: '4', created_at: '2025-03-08' },
];

export const mockMaintenance: MaintenanceTask[] = [
  { id: '1', property_id: '1', description: 'AC not cooling properly', priority: 'High', status: 'In Progress', assigned_technician: 'Tech Solutions LLC', created_at: '2025-03-02' },
  { id: '2', property_id: '3', description: 'Leaky faucet in master bathroom', priority: 'Medium', status: 'Open', assigned_technician: 'PlumbPro Services', created_at: '2025-03-05' },
  { id: '3', property_id: '2', description: 'Replace smoke detector batteries', priority: 'Low', status: 'Resolved', assigned_technician: 'Maintenance Team', created_at: '2025-02-28' },
];

export const monthlyRevenueData = [
  { month: 'Oct', revenue: 8200, expenses: 3100 },
  { month: 'Nov', revenue: 9500, expenses: 3400 },
  { month: 'Dec', revenue: 12800, expenses: 4200 },
  { month: 'Jan', revenue: 11200, expenses: 3800 },
  { month: 'Feb', revenue: 9800, expenses: 3200 },
  { month: 'Mar', revenue: 6500, expenses: 2800 },
];

export const occupancyData = [
  { month: 'Oct', rate: 78 },
  { month: 'Nov', rate: 82 },
  { month: 'Dec', rate: 95 },
  { month: 'Jan', rate: 88 },
  { month: 'Feb', rate: 75 },
  { month: 'Mar', rate: 68 },
];

export const revenueByProperty = [
  { name: 'Ocean View Penthouse', revenue: 4200, fill: 'hsl(234, 89%, 63%)' },
  { name: 'Downtown Loft', revenue: 2100, fill: 'hsl(199, 89%, 48%)' },
  { name: 'Tropical Villa', revenue: 3600, fill: 'hsl(142, 76%, 36%)' },
];
