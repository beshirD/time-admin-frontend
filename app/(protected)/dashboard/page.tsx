import { MetricsCards } from "./_components/MetricsCard";
import MonthlyTarget from "./_components/MonthlyTarget";
import SalesMetricsCard from "./_components/SalseMetricsChart";
import { TimeSeriesChart } from "./_components/TimeSeriesChart";
import { OrderHistoryTable } from "./_components/OrderHistoryTable";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <MetricsCards />
      <TimeSeriesChart />
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="flex w-full xl:w-2/3">
          <SalesMetricsCard />
        </div>
        <div className="flex w-full xl:w-1/3">
          <MonthlyTarget />
        </div>
      </div>
      <OrderHistoryTable />
    </div>
  );
}
