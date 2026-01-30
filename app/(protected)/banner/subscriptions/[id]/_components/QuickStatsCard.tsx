import { Calendar, Image, DollarSign } from "lucide-react";

interface QuickStatsCardProps {
  daysLeft: number;
  bannersCreated: number;
  totalPaid: number;
}

export default function QuickStatsCard({
  daysLeft,
  bannersCreated,
  totalPaid,
}: QuickStatsCardProps) {
  return (
    <div className="p-7 bg-white dark:bg-gray-900 rounded-lg border ">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
        Quick Stats
      </h4>

      <div className="space-y-6">
        {/* Days Left */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {daysLeft}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Days Left
            </p>
          </div>
        </div>

        {/* Banners Created */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30">
            <Image className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {bannersCreated}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Banners Created
            </p>
          </div>
        </div>

        {/* Total Paid */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalPaid.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Paid
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
