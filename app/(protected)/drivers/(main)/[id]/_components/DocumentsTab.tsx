"use client";

import { Download, Printer, Eye, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/ui/modal/Modal";
import Button from "@/components/ui/Button";

type Document = {
  id: number;
  key: string;
  documentType: string;
  name: string;
  uploaded: boolean;
};

const mockDocuments: Document[] = [
  {
    id: 2099,
    key: "1000015896.jpg",
    documentType: "Government ID",
    name: "1000015896.jpg",
    uploaded: true,
  },
  {
    id: 2098,
    key: "1000015896.jpg",
    documentType: "Driver's License",
    name: "1000015896.jpg",
    uploaded: true,
  },
  {
    id: 2097,
    key: "",
    documentType: "Vehicle License Plate",
    name: "License Plate",
    uploaded: false,
  },
  {
    id: 2096,
    key: "",
    documentType: "RC of Vehicle",
    name: "Not uploaded",
    uploaded: false,
  },
];

export default function DocumentsTab() {
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const handleDownload = (doc: Document) => {
    // Simulate download
    console.log("Downloading:", doc.name);
    // In real implementation: window.open(doc.key, '_blank');
  };

  const handlePrint = (doc: Document) => {
    // Simulate print
    console.log("Printing:", doc.name);
    // In real implementation: window.print();
  };

  const handleShare = (doc: Document) => {
    // Simulate share
    console.log("Sharing:", doc.name);
    // In real implementation: navigator.share() or copy link
  };

  const handlePreview = (doc: Document) => {
    if (doc.uploaded) {
      setPreviewDocument(doc);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
        Driver Documents
      </h4>

      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Key
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Document Type
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockDocuments.map((doc) => (
              <tr
                key={doc.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                  {doc.id}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                  {doc.key || "—"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                  {doc.documentType}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                  {doc.name}
                </td>
                <td className="py-3 px-4">
                  {doc.uploaded ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePreview(doc)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                        title="View">
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                        title="Download">
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                      <button
                        onClick={() => handlePrint(doc)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                        title="Print">
                        <Printer className="h-4 w-4" />
                        Print
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                      Not uploaded
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <Modal
          isOpen={!!previewDocument}
          onClose={() => setPreviewDocument(null)}
          title={previewDocument.documentType}
          className="max-w-4xl">
          <div className="space-y-4">
            {/* File Name */}
            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                File Name
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {previewDocument.name}
              </p>
            </div>

            {/* Image Preview - Using demo document */}
            <div className="relative w-full h-[500px] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Demo Document Preview */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-gray-300 dark:border-gray-600">
                  {/* Document Header */}
                  <div className="text-center mb-6 pb-4 border-b-2 border-gray-300 dark:border-gray-600">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {previewDocument.documentType}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Official Document
                    </p>
                  </div>

                  {/* Document Content */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Document ID:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {previewDocument.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        File Name:
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {previewDocument.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Status:
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Document Footer */}
                  <div className="mt-6 pt-4 border-t-2 border-gray-300 dark:border-gray-600 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      This is a demo preview
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <Button
                onClick={() => handleDownload(previewDocument)}
                className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                onClick={() => handleShare(previewDocument)}
                variant="outline"
                className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
