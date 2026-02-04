import { RestaurantTransaction } from "@/types/entities";
import { TransactionsContent } from "./_components/TransactionsContent";

async function getData(): Promise<RestaurantTransaction[]> {
  // Mock data for transactions
  return [
    {
      id: 6185,
      orderId: 6571,
      user: "eth",
      restaurant: "Desalech ktfo",
      amount: "480.00",
      reference: "SELF-1760821128-8011",
      status: "pending",
      gateway: "self_order",
    },
    {
      id: 6186,
      orderId: 6572,
      user: "Mahmod Ahmad",
      restaurant: "mihabat",
      amount: "250.00",
      reference: "COD-1760932820-6443",
      status: "completed",
      gateway: "cash_on_delivery",
    },
    {
      id: 6187,
      orderId: 6573,
      user: "Mahmod Ahmad",
      restaurant: "mihabat",
      amount: "250.00",
      reference: "COD-1760932864-1436",
      status: "completed",
      gateway: "cash_on_delivery",
    },
    {
      id: 6188,
      orderId: 6574,
      user: "Mahmod Ahmad",
      restaurant: "mihabat",
      amount: "250.00",
      reference: "COD-1760932909-4406",
      status: "completed",
      gateway: "cash_on_delivery",
    },
  ];
}

export default async function TransactionsPage() {
  const data = await getData();

  return (
    <div className="w-full space-y-5 mb-7">
      <TransactionsContent initialData={data} />
    </div>
  );
}
