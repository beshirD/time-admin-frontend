import * as React from "react";
import { CustomerDetailsContent } from "./_components/CustomerDetailsContent";

export default async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CustomerDetailsContent customerId={id} />;
}
