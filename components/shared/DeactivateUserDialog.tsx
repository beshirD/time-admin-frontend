"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";

interface DeactivateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm?: (data: DeactivateUserData) => void;
}

export interface DeactivateUserData {
  reason: string;
  notifyUser: boolean;
  notificationMessage: string;
}

export function DeactivateUserDialog({
  isOpen,
  onClose,
  userName,
  onConfirm,
}: DeactivateUserDialogProps) {
  const [reason, setReason] = useState("");
  const [notifyUser, setNotifyUser] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleSubmit = () => {
    const data: DeactivateUserData = {
      reason,
      notifyUser,
      notificationMessage,
    };
    onConfirm?.(data);
    console.log("Deactivate user data:", data);
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setReason("");
    setNotifyUser(true);
    setNotificationMessage("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Deactivate User"
      hideTitle={true}
      className="max-w-[600px] m-4">
      <div className="no-scrollbar relative border w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Deactivate User
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Deactivate <span className="font-semibold">{userName}</span>&apos;s
            account. The user will not be able to access the platform until
            reactivated.
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="custom-scrollbar h-auto max-h-[450px] overflow-y-auto px-2 pb-3">
            <div className="space-y-5">
              {/* Reason */}
              <div>
                <Label>Reason for Deactivation *</Label>
                <Textarea
                  placeholder="Enter the reason for deactivating this user..."
                  value={reason}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setReason(e.target.value)
                  }
                  rows={4}
                  required
                />
              </div>

              {/* Notify User */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="notifyUserDeactivate"
                  checked={notifyUser}
                  onChange={(checked: boolean) => setNotifyUser(checked)}
                />
                <Label
                  htmlFor="notifyUserDeactivate"
                  className="cursor-pointer">
                  Notify user about this action
                </Label>
              </div>

              {/* Notification Message */}
              {notifyUser && (
                <div>
                  <Label>Notification Message</Label>
                  <Textarea
                    placeholder="Enter a custom message for the user..."
                    value={notificationMessage}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setNotificationMessage(e.target.value)
                    }
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!reason}
              className="bg-warning-500 hover:bg-warning-600">
              Deactivate User
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
