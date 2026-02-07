import PageTitle from "@/components/common/PageTitle";
import Button from "@/components/ui/Button";

interface OrdersHeaderProps {
  onAddOrderManual: () => void;
}

export default function OrdersHeader({ onAddOrderManual }: OrdersHeaderProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 px-5 py-2 border rounded-lg gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PageTitle title="Orders Management" />
      <Button
        usage="create"
        onClick={onAddOrderManual}>
        Add order manually
      </Button>
    </div>
  );
}
