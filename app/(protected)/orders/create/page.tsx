import CreateOrderHeader from "./_components/CreateOrderHeader";
import CreateOrderContent from "./_components/CreateOrderContent";

export const metadata = {
  title: "Create Order | Time Admin",
  description: "Create a new manual order",
};

export default function CreateOrderPage() {
  return (
    <div className="flex flex-col gap-5 w-full pb-8">
      <CreateOrderHeader />
      <CreateOrderContent />
    </div>
  );
}
