import { SubscriptionQueue } from "@/types/entities";

interface QueueInfoCardProps {
  queueData: SubscriptionQueue;
}

export default function QueueInfoCard({ queueData }: QueueInfoCardProps) {
  return (
    <div className="p-6">
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-6">
        Request Information
      </h4>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-12">
        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            ID
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.id}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Restaurant
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.restaurant}
          </p>
        </div>

        <div className="">
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Package
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.package}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Payment Method
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.paymentMethod}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Amount
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            ${queueData.amount.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Merchant
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.merchant}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Merchant Email
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.merchantEmail || "N/A"}
          </p>
        </div>

        <div className="">
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Payment Notes
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.paymentNotes || "No notes provided"}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Start Date
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.startDate || "N/A"}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            End Date
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.endDate || "N/A"}
          </p>
        </div>

        <div>
          <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
            Requested On
          </p>
          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {queueData.requestedOn}
          </p>
        </div>
      </div>
    </div>
  );
}
