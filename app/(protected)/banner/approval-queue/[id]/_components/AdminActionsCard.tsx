"use client";

import { useState } from "react";
import { FileText, CheckCircle, XCircle } from "lucide-react";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

interface AdminActionsCardProps {
  paymentProof: string;
  restaurantName: string;
}

export default function AdminActionsCard({
  paymentProof,
  restaurantName,
}: AdminActionsCardProps) {
  const [actionNote, setActionNote] = useState("");

  const handleAccept = () => {
    toast.success(
      `Subscription request for ${restaurantName} has been accepted!`,
      {
        description: actionNote || "No notes provided",
      },
    );
    // Reset form
    setActionNote("");
  };

  const handleReject = () => {
    toast.error(
      `Subscription request for ${restaurantName} has been rejected!`,
      {
        description: actionNote || "No notes provided",
      },
    );
    // Reset form
    setActionNote("");
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-lg border space-y-6">
      {/* Payment Proof Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
          Payment Proof
        </h4>
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {paymentProof}
          </span>
        </div>
      </div>

      {/* Admin Actions Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
          Admin Actions
        </h4>

        {/* Action Note */}
        <div className="mb-6">
          <Label htmlFor="actionNote">Action Note (Optional)</Label>
          <Textarea
            id="actionNote"
            rows={4}
            value={actionNote}
            onChange={(e) => setActionNote(e.target.value)}
            placeholder="Add notes for your decision (accept or reject)..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleAccept}
            className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Accept
          </Button>
          <Button
            onClick={handleReject}
            variant="outline"
            className="flex-1 border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-900/20 flex items-center justify-center gap-2">
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
