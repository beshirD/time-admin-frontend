"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface ManagerMetricsProps {
  metrics: {
    assignedDrivers: number;
    totalDrivers: number;
    activeDrivers: number;
    recentDrivers: number;
    percentageOfTotal: string;
  };
}

export default function ManagerMetrics({ metrics }: ManagerMetricsProps) {
  const metricsData = [
    {
      title: "Assigned Drivers",
      value: metrics.assignedDrivers,
      footerTitle: "Currently assigned",
      footerDescription: "Total drivers assigned",
      isPositive: true,
    },
    {
      title: "Total Drivers",
      value: metrics.totalDrivers,
      footerTitle: "Total count",
      footerDescription: "All drivers under management",
      isPositive: true,
    },
    {
      title: "Active Drivers",
      value: metrics.activeDrivers,
      footerTitle: "Active status",
      footerDescription: "Drivers currently active",
      isPositive: true,
    },
    {
      title: "Recent (30 days)",
      value: metrics.recentDrivers,
      footerTitle: "Newly joined",
      footerDescription: "Last 30 days",
      isPositive: true,
    },
    {
      title: "Of Total Drivers",
      value: metrics.percentageOfTotal,
      footerTitle: "Market share",
      footerDescription: "Percentage of total fleet",
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {metricsData.map((metric, index) => (
        <Card
          key={index}
          className="bg-white border-gray-200 z-0 dark:border-gray-800 dark:bg-gray-900">
          <CardHeader className="pb-2">
            <CardDescription>{metric.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {metric.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm pt-0">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {metric.footerTitle}
            </div>
            <div className="text-muted-foreground text-xs">
              {metric.footerDescription}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
