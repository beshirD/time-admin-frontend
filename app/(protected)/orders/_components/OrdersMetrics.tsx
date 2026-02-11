"use client";

import { Order } from "@/types/entities";
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

interface OrdersMetricsProps {
  orders: Order[];
}

export default function OrdersMetrics({ orders }: OrdersMetricsProps) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const rejectedOrders = orders.filter((o) => o.status === "cancelled").length;

  const metricsData = [
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      trend: "+12.5%",
      isPositive: true,
      footerTitle: "Growing order volume",
      footerDescription: "Total processed",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toLocaleString(),
      trend: "-5.2%",
      isPositive: true,
      footerTitle: "Orders in queue",
      footerDescription: "Awaiting action",
    },
    {
      title: "Delivered",
      value: deliveredOrders.toLocaleString(),
      trend: "+18.3%",
      isPositive: true,
      footerTitle: "Successful deliveries",
      footerDescription: "Completed orders",
    },
    {
      title: "Rejected/Cancelled",
      value: rejectedOrders.toLocaleString(),
      trend: "-2.1%",
      isPositive: true,
      footerTitle: "Unsuccessful orders",
      footerDescription: "Rejected by parties",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 @xl/main:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric, index) => (
        <Card
          key={index}
          className="bg-white border-gray-200 z-0 dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardDescription>{metric.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {metric.value}
            </CardTitle>
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
      ))}
    </div>
  );
}
