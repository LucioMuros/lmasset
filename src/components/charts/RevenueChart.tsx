import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", revenue: 40000 },
  { month: "Fev", revenue: 52000 },
  { month: "Mar", revenue: 61000 }
];

export default function RevenueChart() {
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
    </LineChart>
  );
}
