import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { mockProperties, mockBookings, mockExpenses } from "@/data/mockData";
import { FinancialReport } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Reports() {
  const reports: FinancialReport[] = useMemo(() => {
    return mockProperties.map(property => {
      const propertyBookings = mockBookings.filter(b => b.property_id === property.id && b.status === 'Confirmed');
      const propertyExpenses = mockExpenses.filter(e => e.property_id === property.id);
      const grossRevenue = propertyBookings.reduce((s, b) => s + b.total_value, 0);
      const platformFees = propertyBookings.reduce((s, b) => s + b.platform_fee, 0);
      const cleaningCosts = propertyBookings.reduce((s, b) => s + b.cleaning_fee, 0);
      const operationalExpenses = propertyExpenses.reduce((s, e) => s + e.value, 0);
      const netAfterCosts = grossRevenue - platformFees - cleaningCosts - operationalExpenses;
      const managementFee = netAfterCosts * (property.management_fee_pct / 100);
      const netProfitOwner = netAfterCosts - managementFee;

      return {
        property_id: property.id,
        property_name: property.name,
        month: 'March 2025',
        gross_revenue: grossRevenue,
        platform_fees: platformFees,
        cleaning_costs: cleaningCosts,
        operational_expenses: operationalExpenses,
        management_fee: managementFee,
        net_profit_owner: netProfitOwner,
        management_profit: managementFee,
      };
    });
  }, []);

  const totals = useMemo(() => ({
    gross: reports.reduce((s, r) => s + r.gross_revenue, 0),
    platformFees: reports.reduce((s, r) => s + r.platform_fees, 0),
    cleaning: reports.reduce((s, r) => s + r.cleaning_costs, 0),
    operational: reports.reduce((s, r) => s + r.operational_expenses, 0),
    mgmtFee: reports.reduce((s, r) => s + r.management_fee, 0),
    netOwner: reports.reduce((s, r) => s + r.net_profit_owner, 0),
    mgmtProfit: reports.reduce((s, r) => s + r.management_profit, 0),
  }), [reports]);

  const chartData = reports.map(r => ({
    name: r.property_name.split(' ').slice(0, 2).join(' '),
    revenue: r.gross_revenue,
    expenses: r.platform_fees + r.cleaning_costs + r.operational_expenses,
    profit: r.net_profit_owner,
  }));

  const handleExportCSV = () => {
    const headers = ['Property', 'Gross Revenue', 'Platform Fees', 'Cleaning', 'Expenses', 'Mgmt Fee', 'Owner Profit', 'Mgmt Profit'];
    const rows = reports.map(r => [r.property_name, r.gross_revenue, r.platform_fees, r.cleaning_costs, r.operational_expenses, r.management_fee.toFixed(2), r.net_profit_owner.toFixed(2), r.management_profit.toFixed(2)]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-report-march-2025.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
          <p className="text-muted-foreground mt-1">Monthly financial breakdown — March 2025</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />Export CSV
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <FileText className="h-4 w-4 mr-2" />Print Report
          </Button>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader><CardTitle className="text-lg">Profit by Property</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(234, 89%, 63%)" name="Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(0, 84%, 60%)" name="Expenses" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="hsl(142, 76%, 36%)" name="Owner Profit" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {reports.map(report => (
        <Card key={report.property_id} className="border shadow-sm print:break-inside-avoid">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg">{report.property_name}</CardTitle>
            <p className="text-sm text-muted-foreground">{report.month} — Investor Statement</p>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                <TableRow><TableCell className="font-medium">Gross Revenue</TableCell><TableCell className="text-right font-bold text-success">${report.gross_revenue.toLocaleString()}</TableCell></TableRow>
                <TableRow><TableCell className="font-medium text-destructive">(-) Platform Fees</TableCell><TableCell className="text-right text-destructive">${report.platform_fees.toLocaleString()}</TableCell></TableRow>
                <TableRow><TableCell className="font-medium text-destructive">(-) Cleaning Costs</TableCell><TableCell className="text-right text-destructive">${report.cleaning_costs.toLocaleString()}</TableCell></TableRow>
                <TableRow><TableCell className="font-medium text-destructive">(-) Operational Expenses</TableCell><TableCell className="text-right text-destructive">${report.operational_expenses.toLocaleString()}</TableCell></TableRow>
                <TableRow><TableCell className="font-medium text-destructive">(-) Management Fee ({mockProperties.find(p => p.id === report.property_id)?.management_fee_pct}%)</TableCell><TableCell className="text-right text-destructive">${report.management_fee.toFixed(2)}</TableCell></TableRow>
                <TableRow className="bg-muted/30"><TableCell className="font-bold text-lg">Net Profit (Owner)</TableCell><TableCell className="text-right font-bold text-lg text-success">${report.net_profit_owner.toFixed(2)}</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Management Profit</TableCell><TableCell className="text-right font-medium text-primary">${report.management_profit.toFixed(2)}</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      <Card className="border-2 border-primary shadow-sm">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-lg">Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableBody>
              <TableRow><TableCell className="font-medium">Total Gross Revenue</TableCell><TableCell className="text-right font-bold">${totals.gross.toLocaleString()}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Total Platform Fees</TableCell><TableCell className="text-right text-destructive">${totals.platformFees.toLocaleString()}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Total Cleaning Costs</TableCell><TableCell className="text-right text-destructive">${totals.cleaning.toLocaleString()}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Total Operational Expenses</TableCell><TableCell className="text-right text-destructive">${totals.operational.toLocaleString()}</TableCell></TableRow>
              <TableRow><TableCell className="font-medium">Total Management Fees</TableCell><TableCell className="text-right text-primary">${totals.mgmtFee.toFixed(2)}</TableCell></TableRow>
              <TableRow className="bg-primary/5"><TableCell className="font-bold text-lg">Total Owner Profits</TableCell><TableCell className="text-right font-bold text-lg text-success">${totals.netOwner.toFixed(2)}</TableCell></TableRow>
              <TableRow><TableCell className="font-bold">Total Management Profit</TableCell><TableCell className="text-right font-bold text-primary">${totals.mgmtProfit.toFixed(2)}</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
