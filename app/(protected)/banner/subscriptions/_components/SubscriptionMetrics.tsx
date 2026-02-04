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
    title: "Active Subscriptions",
    value: "112",
    trend: "+8.2%",
    isPositive: true,
    footerTitle: "Growing subscriptions",
    footerDescription: "Currently active",
  },
  {
    title: "Expiring Soon",
    value: "22",
    trend: "+5.3%",
    isPositive: false,
    footerTitle: "Renewal needed",
    footerDescription: "Within 7 days",
  },
  {
    title: "Expired",
    value: "30",
    trend: "-12.1%",
    isPositive: true,
    footerTitle: "Decreased from last month",
    footerDescription: "Needs reactivation",
  },
  {
    title: "Total Revenue",
    value: "$1,214.00",
    trend: "+23.5%",
    isPositive: true,
    footerTitle: "Revenue increasing",
    footerDescription: "From subscriptions",
  },
];

export function SubscriptionMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 lg:grid-cols-4">
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
