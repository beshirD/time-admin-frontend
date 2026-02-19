"use client";

import { useState } from "react";
import { Copy, X } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import type { EmailTemplate, TemplateFeed } from "@/types/entities";

// Mock feeds data
const mockFeeds: TemplateFeed[] = [
  {
    id: 263958,
    content: "Created new Template",
    createdOn: "2026-02-16T15:15:37Z",
    createdBy: "Admins",
  },
];

interface ViewTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: EmailTemplate | null;
  onClone: (template: EmailTemplate) => void;
}

export function ViewTemplateModal({
  isOpen,
  onClose,
  template,
  onClone,
}: ViewTemplateModalProps) {
  if (!template) return null;

  const getStateColor = (state: string) => {
    switch (state) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Deleted":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[900px] m-4">
      <div className="relative border w-[900px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 p-6 lg:p-8 no-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {template.title}
            </h2>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStateColor(
                  template.state,
                )}`}>
                {template.state}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Not Starred
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                onClone(template);
                onClose();
              }}
              className="gap-2">
              <Copy className="w-4 h-4" />
              Clone
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Template Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Template Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                ID
              </span>
              <span className="text-gray-900 dark:text-white">
                {template.id}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Type
              </span>
              <span className="text-gray-900 dark:text-white">
                {template.type}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Created On
              </span>
              <span className="text-gray-900 dark:text-white">
                {new Date(template.createdOn).toLocaleString("en-US", {
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
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Created By
              </span>
              <span className="text-gray-900 dark:text-white">
                {template.createdBy}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Description
          </h3>
          <div
            className="prose prose-sm dark:prose-invert max-w-none p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
            dangerouslySetInnerHTML={{ __html: template.description }}
          />
        </div>

        {/* Feeds Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Feeds
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing 1-{mockFeeds.length} of {mockFeeds.length} item
              {mockFeeds.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Created On
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Created By
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {mockFeeds.map((feed) => (
                  <tr key={feed.id}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {feed.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {feed.content}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(feed.createdOn).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {feed.createdBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
