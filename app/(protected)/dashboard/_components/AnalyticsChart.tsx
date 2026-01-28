"use client";

import { useState, useMemo, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Value",
    color: "#ff7801",
  },
} satisfies ChartConfig;

type TimeFrame = "Weekly" | "Monthly" | "Yearly";
type MetricType = "Revenue" | "Orders";

// Generate dynamic data based on timeframe
const generateData = (timeFrame: TimeFrame, metric: MetricType) => {
  if (timeFrame === "Weekly") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day) => ({
      label: day,
      value:
        metric === "Revenue"
          ? Math.floor(Math.random() * 8000) + 10000 // 10k-18k for revenue
          : Math.floor(Math.random() * 50) + 80, // 80-130 for orders
    }));
  } else if (timeFrame === "Monthly") {
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
    return weeks.map((week) => ({
      label: week,
      value:
        metric === "Revenue"
          ? Math.floor(Math.random() * 30000) + 50000 // 50k-80k for revenue
          : Math.floor(Math.random() * 200) + 400, // 400-600 for orders
    }));
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month) => ({
      label: month,
      value:
        metric === "Revenue"
          ? Math.floor(Math.random() * 100000) + 200000 // 200k-300k for revenue
          : Math.floor(Math.random() * 800) + 1500, // 1500-2300 for orders
    }));
  }
};

export function AnalyticsChart() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("Revenue");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("Weekly");
  const [mounted, setMounted] = useState(false);

  // Only run on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate data dynamically when metric or timeframe changes
  const chartData = useMemo(() => {
    if (!mounted) {
      // Return empty/placeholder data during SSR
      return [];
    }
    return generateData(timeFrame, selectedMetric);
  }, [timeFrame, selectedMetric, mounted]);

  // Calculate total for display
  const total = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  // Format value based on metric type
  const formatValue = (value: number) => {
    if (selectedMetric === "Revenue") {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <Card className="w-full bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {timeFrame} Analytics
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Total {selectedMetric}:{" "}
            {selectedMetric === "Revenue"
              ? `$${total.toLocaleString()}`
              : total.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Metric Toggle */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff7801]"></div>
            <button
              onClick={() =>
                setSelectedMetric(
                  selectedMetric === "Revenue" ? "Orders" : "Revenue",
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
                id="colorValue"
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
              dataKey="label"
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
              tickFormatter={formatValue}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  labelFormatter={(value) => `${value}`}
                  formatter={(value) => [
                    selectedMetric === "Revenue"
                      ? `$${Number(value).toLocaleString()}`
                      : Number(value).toLocaleString(),
                    selectedMetric,
                  ]}
                />
              }
            />
            <Area
              type="linear"
              dataKey="value"
              stroke="#ff7801"
              strokeWidth={2.5}
              fill="url(#colorValue)"
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
