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
import { Restaurant } from "@/types/entities";

interface RestaurantsMetricsProps {
  restaurants: Restaurant[];
  totalCount: number;
}

export function RestaurantsMetrics({
  restaurants,
  totalCount,
}: RestaurantsMetricsProps) {
  // Calculate metrics from actual data for all status types
  const activeCount = restaurants.filter((r) => r.status === "active").length;
  const inactiveCount = restaurants.filter(
    (r) => r.status === "inactive",
  ).length;
  const pendingCount = restaurants.filter((r) => r.status === "pending").length;

  const metricsData = [
    {
      title: "Total Restaurants",
      value: totalCount.toString(),
      trend: "+15.2%",
      isPositive: true,
      footerTitle: "Growing restaurant network",
      footerDescription: "All registered restaurants",
    },

    {
      title: "Active",
      value: activeCount.toString(),
      trend: "+10.5%",
      isPositive: true,
      footerTitle: "Currently active",
      footerDescription: "Operating now",
    },
    {
      title: "Pending Approval",
      value: pendingCount.toString(),
      trend: pendingCount > 5 ? "+2.0%" : "-1.5%",
      isPositive: pendingCount <= 5,
      footerTitle: "Awaiting verification",
      footerDescription: "Needs admin review",
    },
    {
      title: "Inactive",
      value: inactiveCount.toString(),
      trend: inactiveCount > 3 ? "+1.2%" : "-0.8%",
      isPositive: inactiveCount <= 3,
      footerTitle: "Temporarily inactive",
      footerDescription: "Not currently operating",
    },
  ];

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
