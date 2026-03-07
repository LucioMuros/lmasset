import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, CalendarDays, Calendar, DollarSign,
  SprayCan, Wrench, FileText, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { Locale, localeLabels } from "@/i18n/translations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AppSidebar() {
  const location = useLocation();
  const { locale, setLocale, t } = useLanguage();

  const menuItems = [
    { icon: LayoutDashboard, label: t.sidebar.dashboard, path: '/' },
    { icon: Building2, label: t.sidebar.properties, path: '/properties' },
    { icon: CalendarDays, label: t.sidebar.reservations, path: '/reservations' },
    { icon: Calendar, label: t.sidebar.calendar, path: '/calendar' },
    { icon: DollarSign, label: t.sidebar.expenses, path: '/expenses' },
    { icon: SprayCan, label: t.sidebar.cleaning, path: '/cleaning' },
    { icon: Wrench, label: t.sidebar.maintenance, path: '/maintenance' },
    { icon: FileText, label: t.sidebar.reports, path: '/reports' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold tracking-tight">PropertyHub</h1>
        <p className="text-xs mt-1 opacity-70">{t.sidebar.managementSystem}</p>
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

      <div className="p-3 border-t border-sidebar-border space-y-3">
        <div className="px-2">
          <div className="flex items-center gap-2 mb-2 text-xs opacity-60">
            <Globe className="h-3 w-3" />
            <span>Language</span>
          </div>
          <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
            <SelectTrigger className="w-full bg-sidebar-accent/30 border-sidebar-border text-sidebar-foreground text-sm h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(localeLabels) as Locale[]).map(loc => (
                <SelectItem key={loc} value={loc}>{localeLabels[loc]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
