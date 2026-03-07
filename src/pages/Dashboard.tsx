import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CalendarDays, DollarSign, TrendingUp, Percent, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { mockProperties, mockBookings, mockExpenses, monthlyRevenueData, occupancyData, revenueByProperty } from "@/data/mockData";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();

  const stats = [
    { title: t.dashboard.totalProperties, value: mockProperties.length.toString(), icon: Building2, change: `+1 ${t.dashboard.thisMonth}`, trend: 'up' as const },
    { title: t.dashboard.totalReservations, value: mockBookings.filter(b => b.status !== 'Cancelled').length.toString(), icon: CalendarDays, change: `+3 ${t.dashboard.thisMonth}`, trend: 'up' as const },
    { title: t.dashboard.monthlyRevenue, value: `$${mockBookings.filter(b => b.status === 'Confirmed').reduce((sum, b) => sum + b.total_value, 0).toLocaleString()}`, icon: DollarSign, change: `+12% ${t.dashboard.vsLastMonth}`, trend: 'up' as const },
    { title: t.dashboard.monthlyExpenses, value: `$${mockExpenses.reduce((sum, e) => sum + e.value, 0).toLocaleString()}`, icon: TrendingUp, change: `-5% ${t.dashboard.vsLastMonth}`, trend: 'down' as const },
    { title: t.dashboard.netProfit, value: `$${(mockBookings.filter(b => b.status === 'Confirmed').reduce((sum, b) => sum + b.net_revenue, 0) - mockExpenses.reduce((sum, e) => sum + e.value, 0)).toLocaleString()}`, icon: DollarSign, change: `+18% ${t.dashboard.vsLastMonth}`, trend: 'up' as const },
    { title: t.dashboard.occupancyRate, value: '68%', icon: Percent, change: `-7% ${t.dashboard.vsLastMonth}`, trend: 'down' as const },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.dashboard.title}</h1>
        <p className="text-muted-foreground mt-1">{t.dashboard.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 text-success" /> : <ArrowDownRight className="h-3 w-3 text-destructive" />}
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>{stat.change}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader><CardTitle className="text-lg">{t.dashboard.revenueVsExpenses}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(234, 89%, 63%)" radius={[4, 4, 0, 0]} name={t.dashboard.revenue} />
                <Bar dataKey="expenses" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} name={t.dashboard.expenses} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader><CardTitle className="text-lg">{t.dashboard.occupancyRateChart}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="hsl(234, 89%, 63%)" strokeWidth={2} dot={{ fill: 'hsl(234, 89%, 63%)' }} name={t.dashboard.occupancy} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">{t.dashboard.revenueByProperty}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByProperty} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="name" type="category" className="text-xs" width={160} />
                <Tooltip />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]} name={t.dashboard.revenueUsd}>
                  {revenueByProperty.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
