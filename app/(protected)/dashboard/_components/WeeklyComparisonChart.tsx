"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart data for last 6 days with two metrics for comparison
const chartData = [
  { day: "Mon", metric1: 8500, metric2: 7200 },
  { day: "Tue", metric1: 6200, metric2: 8100 },
  { day: "Wed", metric1: 15000, metric2: 13500 },
  { day: "Thu", metric1: 9800, metric2: 11200 },
  { day: "Fri", metric1: 12500, metric2: 10800 },
  { day: "Sat", metric1: 7300, metric2: 9500 },
];

const chartConfig = {
  metric1: {
    label: "Revenue",
    color: "#ff7801",
  },
  metric2: {
    label: "Sales",
    color: "rgba(255, 120, 1, 0.5)",
  },
} satisfies ChartConfig;

type MetricOption = "Revenue" | "Sales" | "Orders" | "Profit";

export function WeeklyComparisonChart() {
  const [metric1, setMetric1] = useState<MetricOption>("Revenue");
  const [metric2, setMetric2] = useState<MetricOption>("Sales");

  return (
    <Card className="w-full bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Weekly Comparison
        </CardTitle>
        <div className="flex items-center gap-2">
          {/* First Metric Dropdown */}
          <div className="relative">
            <select
              value={metric1}
              onChange={(e) => setMetric1(e.target.value as MetricOption)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7801]/20 transition-colors cursor-pointer">
              <option value="Revenue">Revenue</option>
              <option value="Sales">Sales</option>
              <option value="Orders">Orders</option>
              <option value="Profit">Profit</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-gray-500">
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* VS Label */}
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            vs
          </span>

          {/* Second Metric Dropdown */}
          <div className="relative">
            <select
              value={metric2}
              onChange={(e) => setMetric2(e.target.value as MetricOption)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7801]/20 transition-colors cursor-pointer">
              <option value="Revenue">Revenue</option>
              <option value="Sales">Sales</option>
              <option value="Orders">Orders</option>
              <option value="Profit">Profit</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-gray-500">
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer
          config={chartConfig}
          className="h-[280px] w-full">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="hsl(var(--border))"
              strokeOpacity={0.3}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value / 1000}k`}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
              }}
              ticks={[0, 5000, 10000, 15000]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  labelFormatter={(value) => `${value}`}
                />
              }
            />
            <Bar
              dataKey="metric1"
              fill="#ff7801"
              radius={[6, 6, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="metric2"
              fill="rgba(255, 120, 1, 0.5)"
              radius={[6, 6, 0, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
