import OrdersContent from "./_components/OrdersContent";

export const metadata = {
  title: "Orders | Time Admin",
  description: "Manage restaurant orders",
};

export default function OrdersPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <OrdersContent />
    </div>
  );
}
