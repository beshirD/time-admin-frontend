import * as React from "react";
import { SubAdminDetailsContent } from "../_components/SubAdminDetailsContent";

export default async function SubAdminDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SubAdminDetailsContent adminId={id} />;
}
