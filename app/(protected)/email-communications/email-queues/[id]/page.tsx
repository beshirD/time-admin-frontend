import { EmailQueueDetail } from "./_components/EmailQueueDetail";
import type { EmailQueue } from "@/types/entities";

// Mock function to get email by ID - replace with actual API call
function getEmailById(id: string): EmailQueue {
  return {
    id: parseInt(id),
    subject: "New Restaurant Registerd Successfully",
    from: "amar.muni@gmail.com",
    to: "admin@gmail.com",
    cc: "",
    bcc: "",
    state: "Sent",
    sentOn: "2026-02-15T15:20:04Z",
    createdOn: "2026-02-15T15:12:14Z",
    attempts: 0,
    model: "",
    modelType: "",
    smtpAccount: "",
    message: "6382bad661df85b692a101bd23c41192@solviatechnology.com",
    reMessage: "",
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
          New Restaurant Registration
        </h1>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Dear Admin,
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          A new restaurant has been successfully registered on the platform.
        </p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0;">Restaurant Details:</h2>
          <ul style="color: #666; line-height: 1.8;">
            <li><strong>Restaurant Name:</strong> Sample Restaurant</li>
            <li><strong>Owner Email:</strong> amar.muni@gmail.com</li>
            <li><strong>Registration Date:</strong> February 15, 2026</li>
          </ul>
        </div>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Please review the registration and take necessary actions.
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Best regards,<br>
          <strong>Time Delivery System</strong>
        </p>
      </div>
    `,
  };
}

export default function EmailQueueDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const email = getEmailById(params.id);

  return (
    <div className="flex flex-col min-w-full gap-5 mb-7">
      <EmailQueueDetail email={email} />
    </div>
  );
}
