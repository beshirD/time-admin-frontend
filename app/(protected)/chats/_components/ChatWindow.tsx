"use client";

import { useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import type { ChatUser, ChatMessage } from "@/types/entities";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWindowProps {
  selectedUser: ChatUser | null;
  messages: ChatMessage[];
  currentUserId: number;
  onSendMessage: (message: string) => void;
}

export function ChatWindow({
  selectedUser,
  messages,
  currentUserId,
  onSendMessage,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FEF7ED] dark:bg-gray-900">
        <div className="text-center">
          <h3 className="text-xl font-semibold  mb-2">Select a conversation</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Choose a user from the list to start chatting
          </p>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { date: string; messages: ChatMessage[] }[] = [];
  messages.forEach((message) => {
    const date = new Date(message.timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const existingGroup = groupedMessages.find((g) => g.date === date);
    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groupedMessages.push({ date, messages: [message] });
    }
  });

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 h-full overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b  bg-white dark:bg-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-orange-800 dark:text-orange-200 font-semibold">
              {selectedUser.avatar ||
                selectedUser.name.substring(0, 2).toUpperCase()}
            </div>
            {selectedUser.status === "online" && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            )}
          </div>
          <div>
            <h2 className="font-semibold ">{selectedUser.name}</h2>
            <p className="text-xs text-green-600 dark:text-green-400">
              {selectedUser.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 h-0 min-h-0">
        <div className="p-4">
          {messages.length === 0 ? (
            // Empty state when no messages
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold  mb-2">No chat history</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
                Start the conversation by saying hi to {selectedUser.name}!
              </p>
            </div>
          ) : (
            // Messages list
            groupedMessages.map((group, index) => (
              <div key={index}>
                {/* Date Separator */}
                <div className="flex items-center justify-center my-4">
                  <div className="px-3 pb-1 bg-primary/80 dark:bg-primary/50  rounded-full">
                    <span className="text-xs text-white ">{group.date}</span>
                  </div>
                </div>

                {/* Messages */}
                {group.messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isSentByMe={message.senderId === currentUserId}
                  />
                ))}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}
