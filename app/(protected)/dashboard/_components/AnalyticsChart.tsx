"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart data for weekly revenue
const chartData = [
  { day: "Sun", revenue: 12000 },
  { day: "Mon", revenue: 10000 },
  { day: "Tue", revenue: 12000 },
  { day: "Wed", revenue: 17000 },
  { day: "Thu", revenue: 17000 },
  { day: "Fri", revenue: 12000 },
  { day: "Sat", revenue: 15000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#ff7801",
  },
} satisfies ChartConfig;

type TimeFrame = "Weekly" | "Monthly" | "Yearly";

export function AnalyticsChart() {
  const [selectedMetric, setSelectedMetric] = useState<"Revenue" | "Sales">(
    "Revenue",
  );
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("Weekly");

  return (
    <Card className="w-full bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Weekly Analytics
        </CardTitle>
        <div className="flex items-center gap-3">
          {/* Metric Toggle */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff7801]"></div>
            <button
              onClick={() =>
                setSelectedMetric(
                  selectedMetric === "Revenue" ? "Sales" : "Revenue",
                )
              }
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#ff7801] transition-colors">
              {selectedMetric}
            </button>
          </div>

          {/* Time Frame Dropdown */}
          <div className="relative">
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7801]/20 transition-colors cursor-pointer">
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
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
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}>
            <defs>
              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1">
                <stop
                  offset="5%"
                  stopColor="#ff7801"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="#ff7801"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
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
              ticks={[0, 5000, 8000, 12000, 15000, 18000]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  labelFormatter={(value) => `${value}`}
                  formatter={(value) => [
                    `$${Number(value).toLocaleString()}`,
                    selectedMetric,
                  ]}
                />
              }
            />
            <Area
              type="linear"
              dataKey="revenue"
              stroke="#ff7801"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
              fillOpacity={1}
              dot={{
                fill: "#ff7801",
                strokeWidth: 2,
                r: 4,
                stroke: "#fff",
              }}
              activeDot={{
                r: 6,
                fill: "#ff7801",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
