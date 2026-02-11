import OrdersContent from "./_components/OrdersContent";
import { cookies } from "next/headers";

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const adminUserId = userId ? parseInt(userId, 10) : undefined;

  return <OrdersContent initialAdminUserId={adminUserId} />;
}
