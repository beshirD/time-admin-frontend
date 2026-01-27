import { MetricsCards } from "./_components/MetricsCard";
import { TimeSeriesChart } from "./_components/TimeSeriesChart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <MetricsCards />
      <TimeSeriesChart />
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Dashboard content coming soon. Backend API integration pending.
        </p>
      </div>
    </div>
  );
}
