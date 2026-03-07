import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, CalendarDays, Calendar, DollarSign,
  SprayCan, Wrench, FileText, Users, Settings, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Properties', path: '/properties' },
  { icon: CalendarDays, label: 'Reservations', path: '/reservations' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: DollarSign, label: 'Expenses', path: '/expenses' },
  { icon: SprayCan, label: 'Cleaning', path: '/cleaning' },
  { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
  { icon: FileText, label: 'Reports', path: '/reports' },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold tracking-tight">PropertyHub</h1>
        <p className="text-xs mt-1 opacity-70">Management System</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs opacity-60">admin@propertyhub.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
