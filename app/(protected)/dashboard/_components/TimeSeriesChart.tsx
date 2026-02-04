"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// import { useIsMobile } from '@/hooks/use-mobile'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/useMobile";

export const description = "An interactive area chart";

// Consistent number formatter to avoid hydration errors
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Consistent date formatter to avoid hydration errors
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
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
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

// Seeded random number generator for consistent server/client rendering
const seededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

// Generate realistic data for the last 90 days
const generateChartData = () => {
  const data = [];
  const endDate = new Date("2024-06-30");
  const random = seededRandom(12345); // Fixed seed for consistent results

  for (let i = 89; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);

    // Customers: 50-80 daily with some variation
    const baseCustomers = 65;
    const customerVariation = Math.floor(random() * 30) - 15; // -15 to +15
    const customers = Math.max(
      50,
      Math.min(80, baseCustomers + customerVariation),
    );

    // Drivers: 20-30 daily with some variation
    const baseDrivers = 25;
    const driverVariation = Math.floor(random() * 10) - 5; // -5 to +5
    const drivers = Math.max(20, Math.min(30, baseDrivers + driverVariation));

    data.push({
      date: date.toISOString().split("T")[0],
      customers,
      drivers,
    });
  }

  return data;
};

const chartData = generateChartData();

const chartConfig = {
  registrations: {
    label: "Registrations",
  },
  customers: {
    label: "Customers",
    color: "var(--primary)",
  },
  drivers: {
    label: "Drivers",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function TimeSeriesChart() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  // Calculate totals for the selected time range
  const totals = React.useMemo(() => {
    return filteredData.reduce(
      (acc, item) => ({
        customers: acc.customers + item.customers,
        drivers: acc.drivers + item.drivers,
      }),
      { customers: 0, drivers: 0 },
    );
  }, [filteredData]);

  return (
    <Card className="bg-white border-gray-200 z-0 dark:border-gray-800 dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Customer and Drivers Analysis</CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-1">
            <span className="hidden @[540px]/card:block">
              Total for the last {timeRange}
            </span>
            <span className="@[540px]/card:hidden">
              {timeRange === "90d"
                ? "Last 3 months"
                : timeRange === "30d"
                  ? "Last 30 days"
                  : "Last 7 days"}
            </span>
            <div className="flex gap-4 mt-2 text-sm font-medium">
              <span className="text-primary">
                👥 {formatNumber(totals.customers)} Customers
              </span>
              <span className="text-primary">
                🚗 {formatNumber(totals.drivers)} Drivers
              </span>
            </div>
          </div>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="*:data-[slot=toggle-group-item]:px-3">
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 ">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient
                id="fillCustomers"
                x1="0"
                y1="0"
                x2="0"
                y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-customers)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-customers)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillDrivers"
                x1="0"
                y1="0"
                x2="0"
                y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-drivers)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-drivers)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => formatDate(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => formatDate(value as string)}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="drivers"
              type="natural"
              fill="url(#fillDrivers)"
              stroke="var(--color-drivers)"
              stackId="a"
            />
            <Area
              dataKey="customers"
              type="natural"
              fill="url(#fillCustomers)"
              stroke="var(--color-customers)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
