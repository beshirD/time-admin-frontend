"use client";

import {
  PackageCheckIcon,
  TruckIcon,
  XCircleIcon,
  ClockIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Bar, BarChart, Label, Pie, PieChart } from "recharts";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const orderCompletionRate = 78;
const totalBars = 24;
const filledBars = Math.round((orderCompletionRate * totalBars) / 100);

// Order completion chart data (last 24 hours)
const orderChartData = Array.from({ length: totalBars }, (_, index) => {
  return {
    hour: `${index}:00`,
    orders: index < filledBars ? 45 : 0,
  };
});

const orderChartConfig = {
  orders: {
    label: "Orders",
  },
} satisfies ChartConfig;

const MetricsData = [
  {
    icons: <ShoppingBagIcon className="size-5" />,
    title: "Total orders",
    value: "2,376",
  },
  {
    icons: <PackageCheckIcon className="size-5" />,
    title: "Completed",
    value: "1,854",
  },
  {
    icons: <TruckIcon className="size-5" />,
    title: "In delivery",
    value: "342",
  },
  {
    icons: <XCircleIcon className="size-5" />,
    title: "Cancelled",
    value: "180",
  },
];

// Order status distribution
const orderStatusData = [
  { status: "delivered", count: 1854, fill: "var(--color-delivered)" },
  { status: "in-transit", count: 342, fill: "var(--color-in-transit)" },
  { status: "cancelled", count: 180, fill: "var(--color-cancelled)" },
];

const orderStatusConfig = {
  count: {
    label: "Orders",
  },
  delivered: {
    label: "Delivered",
    color: "color-mix(in oklab, var(--primary) 100%, transparent)",
  },
  "in-transit": {
    label: "In Transit",
    color: "color-mix(in oklab, var(--primary) 60%, transparent)",
  },
  cancelled: {
    label: "Cancelled",
    color: "color-mix(in oklab, var(--primary) 30%, transparent)",
  },
} satisfies ChartConfig;

const SalesMetricsCard = ({ className }: { className?: string }) => {
  const totalOrders = orderStatusData.reduce(
    (sum, item) => sum + item.count,
    0,
  );
  const deliverySuccessRate = Math.round(
    (orderStatusData[0].count / totalOrders) * 100,
  );

  return (
    <Card
      className={cn(
        "bg-white border-gray-200 z-0 dark:border-gray-800 dark:bg-gray-900",
        className,
      )}>
      <CardContent className="space-y-4">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="flex flex-col gap-7 lg:col-span-3">
            <span className="text-lg font-semibold">Order Analytics</span>
            <div className="flex items-center gap-3">
              <div className="size-10.5 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBagIcon className="size-6 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-medium">Time Delivery</span>
                <span className="text-muted-foreground text-sm">
                  Order Management Dashboard
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {MetricsData.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-100/60 dark:bg-background/30 rounded-md border px-4 py-2">
                  <Avatar className="size-8.5 rounded-sm">
                    <AvatarFallback className="bg-primary/10 text-primary shrink-0 rounded-sm">
                      {metric.icons}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-muted-foreground text-sm font-medium">
                      {metric.title}
                    </span>
                    <span className="text-lg font-medium">{metric.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="gap-4 py-4 shadow-none bg-gray-100/60 dark:bg-background/30 lg:col-span-2">
            <CardHeader className="gap-1">
              <CardTitle className="text-lg font-semibold">
                Order Status Distribution
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <ChartContainer
                config={orderStatusConfig}
                className="h-38.5 w-full">
                <PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={orderStatusData}
                    dataKey="count"
                    nameKey="status"
                    startAngle={300}
                    endAngle={660}
                    innerRadius={58}
                    outerRadius={75}
                    paddingAngle={2}>
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle">
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 12}
                                className="fill-card-foreground text-lg font-medium">
                                {totalOrders.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 19}
                                className="fill-muted-foreground text-sm">
                                Total Orders
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>

            <CardFooter className="justify-between">
              <span className="text-xl">Success Rate</span>
              <span className="text-2xl font-medium">
                {deliverySuccessRate}%
              </span>
            </CardFooter>
          </Card>
        </div>
        <Card className="shadow-none bg-gray-100/60 dark:bg-background/30">
          <CardContent className="grid gap-4 px-4 lg:grid-cols-5">
            <div className="flex flex-col justify-center gap-6">
              <span className="text-lg font-semibold">
                Delivery Performance
              </span>
              <span className="max-lg:5xl text-6xl text-primary">
                {orderCompletionRate}%
              </span>
              <span className="text-muted-foreground text-sm">
                On-time delivery rate this week
              </span>
            </div>
            <div className="flex flex-col gap-6 text-lg md:col-span-4">
              <span className="font-medium">Order Flow Analysis</span>
              <span className="text-muted-foreground text-wrap">
                Track order completion patterns and delivery efficiency across
                different time periods to optimize operations and improve
                customer satisfaction.
              </span>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <ClockIcon className="size-6" />
                  <span className="text-lg font-medium">
                    Avg. Delivery Time: 28 min
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUpIcon className="size-6" />
                  <span className="text-lg font-medium">+12% vs Last Week</span>
                </div>
              </div>

              <ChartContainer
                config={orderChartConfig}
                className="h-7.75 w-full">
                <BarChart
                  accessibilityLayer
                  data={orderChartData}
                  margin={{
                    left: 0,
                    right: 0,
                  }}
                  maxBarSize={16}>
                  <Bar
                    dataKey="orders"
                    fill="var(--primary)"
                    background={{
                      fill: "color-mix(in oklab, var(--primary) 10%, transparent)",
                      radius: 12,
                    }}
                    radius={12}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SalesMetricsCard;
