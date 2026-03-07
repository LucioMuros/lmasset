import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockBookings, mockProperties } from "@/data/mockData";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, parseISO, isWithinInterval, isSameDay } from "date-fns";

const bookingColors = [
  'bg-primary/80 text-primary-foreground',
  'bg-info/80 text-info-foreground',
  'bg-success/80 text-success-foreground',
  'bg-warning/80 text-warning-foreground',
];

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1)); // March 2025

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const activeBookings = useMemo(() =>
    mockBookings.filter(b => b.status !== 'Cancelled').map((b, i) => ({
      ...b,
      propertyName: mockProperties.find(p => p.id === b.property_id)?.name || 'Unknown',
      color: bookingColors[i % bookingColors.length],
    })),
  []);

  const getBookingsForDay = (day: Date) =>
    activeBookings.filter(b => {
      const checkIn = parseISO(b.check_in);
      const checkOut = parseISO(b.check_out);
      return isWithinInterval(day, { start: checkIn, end: checkOut }) || isSameDay(day, checkIn);
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground mt-1">Visual reservation overview</p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl">{format(currentMonth, 'MMMM yyyy')}</CardTitle>
            <Button variant="outline" size="icon" onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
            ))}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-card p-2 min-h-[100px]" />
            ))}
            {days.map(day => {
              const dayBookings = getBookingsForDay(day);
              return (
                <div key={day.toISOString()} className="bg-card p-2 min-h-[100px] border-t">
                  <span className="text-sm font-medium text-foreground">{format(day, 'd')}</span>
                  <div className="mt-1 space-y-1">
                    {dayBookings.map(b => {
                      const isCheckIn = isSameDay(day, parseISO(b.check_in));
                      const isCheckOut = isSameDay(day, parseISO(b.check_out));
                      return (
                        <div
                          key={b.id}
                          className={`${b.color} rounded px-1.5 py-0.5 text-[10px] font-medium truncate cursor-pointer hover:opacity-90`}
                          title={`${b.guest_name} - ${b.propertyName}`}
                        >
                          {isCheckIn ? '→ ' : isCheckOut ? '← ' : ''}{b.guest_name.split(' ')[0]}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {activeBookings.map(b => (
              <div key={b.id} className="flex items-center gap-2 text-sm">
                <div className={`${b.color} w-3 h-3 rounded`} />
                <span className="text-muted-foreground">{b.guest_name} — {b.propertyName}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
