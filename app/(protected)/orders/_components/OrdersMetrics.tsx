"use client";

import { OrderStatus } from "@/types/entities";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface OrdersMetricsProps {
  stats?: {
    total: number;
    pending: number;
    delivered: number;
    cancelled: number;
  };
  isLoading?: boolean;
  selectedStatus?: OrderStatus | null;
  onStatusClick?: (status: OrderStatus | null) => void;
}

export default function OrdersMetrics({
  stats = { total: 0, pending: 0, delivered: 0, cancelled: 0 },
  isLoading = false,
  selectedStatus,
  onStatusClick,
}: OrdersMetricsProps) {
  const metricsData = [
    {
      title: "Total Orders",
      value: stats.total.toLocaleString(),
      trend: "+12.5%",
      isPositive: true,
      footerTitle: "Growing order volume",
      footerDescription: "Total processed",
      status: null as OrderStatus | null,
      variant: "default" as const,
    },
    {
      title: "Pending Orders",
      value: stats.pending.toLocaleString(),
      trend: "-5.2%",
      isPositive: true,
      footerTitle: "Orders in queue",
      footerDescription: "Awaiting action",
      status: "pending" as OrderStatus,
      variant: "danger" as const,
    },
    {
      title: "Delivered",
      value: stats.delivered.toLocaleString(),
      trend: "+18.3%",
      isPositive: true,
      footerTitle: "Successful deliveries",
      footerDescription: "Completed orders",
      status: "delivered" as OrderStatus,
      variant: "default" as const,
    },
    {
      title: "Rejected/Cancelled",
      value: stats.cancelled.toLocaleString(),
      trend: "-2.1%",
      isPositive: true,
      footerTitle: "Unsuccessful orders",
      footerDescription: "Rejected by parties",
      status: "cancelled" as OrderStatus,
      variant: "default" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 @xl/main:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric, index) => {
        const isSelected = selectedStatus === metric.status;
        const isPending = metric.variant === "danger";

        return (
          <Card
            key={index}
            onClick={() => onStatusClick?.(isSelected ? null : metric.status)}
            className={cn(
              "z-0 transition-all duration-200 cursor-pointer",
              // Base styles
              isPending
                ? "border-1 bg-red-50/50 border-red-400 dark:bg-red-950/20 dark:border-red-500"
                : "bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900",
              // Hover styles
              isPending
                ? "hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-950/30 dark:hover:border-red-700"
                : "hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-700",
              // Selected styles
              isSelected &&
                (isPending
                  ? "ring-1 ring-red-500 border-red-500 dark:ring-red-500 dark:border-red-500"
                  : "ring-1 ring-primary/90 border-primary/90 dark:ring-primary/90 dark:border-primary/90"),
            )}>
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              {isLoading ? (
                <Skeleton className="h-9 w-20" />
              ) : (
                <CardTitle
                  className={cn(
                    "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl",
                    isPending && "text-red-600 dark:text-red-500",
                  )}>
                  {metric.value}
                </CardTitle>
              )}
              <CardAction>
                <Badge
                  variant="outline"
                  className={
                    metric.isPositive
                      ? "text-green-500 border-green-500"
                      : "text-red-500 border-red-500"
                  }>
                  {metric.isPositive ? <TrendingUp /> : <TrendingDown />}
                  {metric.trend}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {metric.footerTitle}{" "}
                {metric.isPositive ? (
                  <TrendingUp className="size-4" />
                ) : (
                  <TrendingDown className="size-4" />
                )}
              </div>
              <div className="text-muted-foreground">
                {metric.footerDescription}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
