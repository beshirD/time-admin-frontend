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

const metricsData = [
  {
    title: "Customers",
    value: "313",
    trend: "+8.2%",
    isPositive: true,
    footerTitle: "Growing customer base",
    footerDescription: "Active users this month",
  },
  {
    title: "Drivers",
    value: "114",
    trend: "+15.3%",
    isPositive: true,
    footerTitle: "Driver network expanding",
    footerDescription: "Available for deliveries",
  },
  {
    title: "Merchants",
    value: "113",
    trend: "+12.1%",
    isPositive: false,
    footerTitle: "Partner merchants growing",
    footerDescription: "Registered and active",
  },
  {
    title: "Orders",
    value: "2,376",
    trend: "+23.5%",
    isPositive: true,
    footerTitle: "Order volume increasing",
    footerDescription: "Total orders processed",
  },
];

export function MetricsCards() {
  return (
    <div className=" grid grid-cols-1 gap-4 @xl/main:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric, index) => (
        <Card
          key={index}
          className=" bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900">
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
