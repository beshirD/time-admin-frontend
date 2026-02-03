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
    title: "Total Restaurants",
    value: "143",
    trend: "+15.2%",
    isPositive: true,
    footerTitle: "Growing restaurant network",
    footerDescription: "Registered restaurants",
  },
  {
    title: "Active Restaurants",
    value: "128",
    trend: "+10.5%",
    isPositive: true,
    footerTitle: "Currently active",
    footerDescription: "Available for orders",
  },
  {
    title: "Pending Approval",
    value: "8",
    trend: "+2.0%",
    isPositive: false,
    footerTitle: "Awaiting verification",
    footerDescription: "Needs admin review",
  },
  {
    title: "Total Orders",
    value: "5,234",
    trend: "+22.8%",
    isPositive: true,
    footerTitle: "Orders completed",
    footerDescription: "This month",
  },
];

export function RestaurantsMetrics() {
  return (
    <div className="grid grid-cols-1 gap-5 @xl/main:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric, index) => (
        <Card
          key={index}
          className="bg-white border border-border dark:bg-gray-900">
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
