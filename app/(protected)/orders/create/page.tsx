import CreateOrderHeader from "./_components/CreateOrderHeader";
import CreateOrderContent from "./_components/CreateOrderContent";
import { cookies } from "next/headers";

export const metadata = {
  title: "Create Order | Time Admin",
  description: "Create a new manual order",
};

export default async function CreateOrderPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const adminUserId = userId ? parseInt(userId, 10) : undefined;

  return (
    <div className="flex flex-col gap-5 w-full pb-8">
      <CreateOrderHeader />
      <CreateOrderContent initialAdminUserId={adminUserId} />
    </div>
  );
}
