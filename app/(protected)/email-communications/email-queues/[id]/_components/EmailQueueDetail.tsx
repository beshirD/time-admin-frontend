"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MailX, UserX } from "lucide-react";
import Button from "@/components/ui/Button";
import type { EmailQueue } from "@/types/entities";
import PageTitle from "@/components/common/PageTitle";
import Link from "next/link";

interface EmailQueueDetailProps {
  email: EmailQueue;
}

export function EmailQueueDetail({ email }: EmailQueueDetailProps) {
  const router = useRouter();

  const getStateColor = (state: string) => {
    switch (state) {
      case "Sent":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleUnsubscribe = () => {
    console.log("Unsubscribe clicked");
    // Implement unsubscribe logic
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border dark:bg-gray-900 rounded-lg">
        <div>
          <div className="flex items-center gap-3">
            <Link
              className="p-3 rounded-full border"
              href="/email-communications/email-queues">
              <ArrowLeft className="size-5" />
            </Link>
            <PageTitle title={email.subject} />
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStateColor(
                email.state,
              )}`}>
              {email.state}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Not Starred
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="destructive"
            onClick={handleUnsubscribe}
            className="gap-2">
            <MailX className="w-4 h-4" />
            Unsubscribe
          </Button>
        </div>
      </div>

      {/* Email Details */}
      <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Email Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">ID</span>
            <span className="opacity-80">{email.id}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Subject</span>
            <span className="opacity-80">{email.subject}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">From</span>
            <span className="opacity-80">{email.from}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">To</span>
            <span className="opacity-80">{email.to}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Cc</span>
            <span className="opacity-80">{email.cc || ""}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Bcc</span>
            <span className="opacity-80">{email.bcc || ""}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Attempts</span>
            <span className="opacity-80">{email.attempts}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Sent On</span>
            <span className="opacity-80">
              {new Date(email.sentOn).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Created On</span>
            <span className="opacity-80">
              {new Date(email.createdOn).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Model</span>
            <span className="opacity-80">{email.model || ""}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Model Type</span>
            <span className="opacity-80">{email.modelType || ""}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Smtp Account</span>
            <span className="opacity-80">{email.smtpAccount || ""}</span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Message</span>
            <span className="opacity-80 text-sm break-all">
              {email.message || ""}
            </span>
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="font-medium ">Re Message</span>
            <span className="opacity-80">{email.reMessage || ""}</span>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold opacity-80 mb-4">Email Content</h2>
        <div
          className="prose prose-sm dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
          dangerouslySetInnerHTML={{ __html: email.body }}
        />
      </div>
    </div>
  );
}
