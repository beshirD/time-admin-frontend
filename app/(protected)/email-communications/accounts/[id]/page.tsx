import { EmailAccountDetail } from "./_components/EmailAccountDetail";
import type { EmailAccount } from "@/types/entities";

// Mock function to get account by ID - replace with actual API call
function getAccountById(id: string): EmailAccount {
  return {
    id: parseInt(id),
    title: "test account",
    email: "admin@solviatechnology.com",
    password: "Admin@2025",
    server: "mail.solviatechnology.com",
    port: 465,
    encryption: "SSL",
    limitPerEmail: null,
    state: "Active",
    type: "SMTP",
    createdOn: "2025-06-12T17:19:30Z",
    updatedOn: "2025-06-12T17:19:30Z",
    createdBy: "Admin",
  };
}

export default function EmailAccountDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const account = getAccountById(params.id);

  return (
    <div className="flex flex-col min-w-full gap-5 mb-7">
      <EmailAccountDetail account={account} />
    </div>
  );
}
