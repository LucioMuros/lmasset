// ...conteúdo original de index.ts...export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  neighborhood: string;
  property_type: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  cleaning_fee: number;
  management_fee_pct: number;
  owner_name: string;
  created_at: string;
}

export interface Booking {
  id: string;
  property_id: string;
  guest_name: string;
  platform: 'Airbnb' | 'Booking' | 'Direct';
  check_in: string;
  check_out: string;
  nights: number;
  total_value: number;
  platform_fee: number;
  cleaning_fee: number;
  net_revenue: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  created_at: string;
  property?: Property;
}

export interface Expense {
  id: string;
  property_id: string;
  category: 'Cleaning' | 'Laundry' | 'Maintenance' | 'Electricity' | 'Internet' | 'Condominium' | 'Supplies';
  description: string;
  value: number;
  date: string;
  created_at: string;
  property?: Property;
}

export interface CleaningTask {
  id: string;
  property_id: string;
  date: string;
  assigned_cleaner: string;
  status: 'Pending' | 'Done';
  booking_id?: string;
  created_at: string;
  property?: Property;
}

export interface MaintenanceTask {
  id: string;
  property_id: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  assigned_technician: string;
  created_at: string;
  property?: Property;
}

export type UserRole = 'Admin' | 'Manager' | 'Owner';

export interface FinancialReport {
  property_id: string;
  property_name: string;
  month: string;
  gross_revenue: number;
  platform_fees: number;
  cleaning_costs: number;
  operational_expenses: number;
  management_fee: number;
  net_profit_owner: number;
  management_profit: number;
}
