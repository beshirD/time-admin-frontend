"use client";

import type { ChatMessage } from "@/types/entities";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
  isSentByMe: boolean;
}

export function MessageBubble({ message, isSentByMe }: MessageBubbleProps) {
  const time = new Date(message.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`flex ${isSentByMe ? "justify-end" : "justify-start"} mb-3`}>
      <div className="flex flex-col max-w-[70%]">
        <div
          className={`px-4 py-2 rounded-2xl ${
            isSentByMe
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
          }`}>
          <p className="text-sm">{message.content}</p>
        </div>
        <div
          className={`flex items-center gap-1 mt-1 ${isSentByMe ? "justify-end" : "justify-start"}`}>
          {isSentByMe && (
            <span className="text-blue-500">
              {message.isRead ? (
                <CheckCheck className="w-3 h-3" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </span>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}
