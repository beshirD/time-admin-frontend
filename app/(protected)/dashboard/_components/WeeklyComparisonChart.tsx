"use client";

import { useState, useMemo, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  metric1: {
    label: "Metric 1",
    color: "#ff7801",
  },
  metric2: {
    label: "Metric 2",
    color: "rgba(255, 120, 1, 0.5)",
  },
} satisfies ChartConfig;

type MetricOption = "Revenue" | "Orders" | "Deliveries" | "Customers";

// Generate realistic data based on metric type
const generateMetricValue = (metric: MetricOption): number => {
  switch (metric) {
    case "Revenue":
      return Math.floor(Math.random() * 8000) + 6000; // 6k-14k
    case "Orders":
      return Math.floor(Math.random() * 80) + 60; // 60-140
    case "Deliveries":
      return Math.floor(Math.random() * 70) + 50; // 50-120
    case "Customers":
      return Math.floor(Math.random() * 50) + 40; // 40-90
  }
};

// Generate chart data for the week
const generateChartData = (metric1: MetricOption, metric2: MetricOption) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    day,
    metric1: generateMetricValue(metric1),
    metric2: generateMetricValue(metric2),
  }));
};

export function WeeklyComparisonChart() {
  const [metric1, setMetric1] = useState<MetricOption>("Orders");
  const [metric2, setMetric2] = useState<MetricOption>("Deliveries");
  const [mounted, setMounted] = useState(false);

  // Only run on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate data dynamically when metrics change
  const chartData = useMemo(() => {
    if (!mounted) {
      // Return empty/placeholder data during SSR
      return [];
    }
    return generateChartData(metric1, metric2);
  }, [metric1, metric2, mounted]);

  // Calculate totals for both metrics
  const totals = useMemo(() => {
    return chartData.reduce(
      (acc, item) => ({
        metric1: acc.metric1 + item.metric1,
        metric2: acc.metric2 + item.metric2,
      }),
      { metric1: 0, metric2: 0 },
    );
  }, [chartData]);

  // Format value based on metric type
  const formatValue = (value: number, metric: MetricOption) => {
    if (metric === "Revenue") {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  // Format display value
  const formatDisplayValue = (value: number, metric: MetricOption) => {
    if (metric === "Revenue") {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  return (
    <Card className="w-full bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Weekly Comparison
          </CardTitle>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-[#ff7801] font-medium">
              {metric1}: {formatDisplayValue(totals.metric1, metric1)}
            </span>
            <span className="text-[rgba(255,120,1,0.5)] font-medium">
              {metric2}: {formatDisplayValue(totals.metric2, metric2)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* First Metric Dropdown */}
          <div className="relative">
            <select
              value={metric1}
              onChange={(e) => setMetric1(e.target.value as MetricOption)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff7801]/20 transition-colors cursor-pointer">
              <option value="Revenue">Revenue</option>
              <option value="Orders">Orders</option>
              <option value="Deliveries">Deliveries</option>
              <option value="Customers">Customers</option>
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
              <option value="Orders">Orders</option>
              <option value="Deliveries">Deliveries</option>
              <option value="Customers">Customers</option>
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
              tickFormatter={(value) => {
                // Use the first metric for Y-axis formatting
                return formatValue(value, metric1);
              }}
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
                  formatter={(value, name) => {
                    const metric = name === "metric1" ? metric1 : metric2;
                    return [formatDisplayValue(Number(value), metric), metric];
                  }}
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
