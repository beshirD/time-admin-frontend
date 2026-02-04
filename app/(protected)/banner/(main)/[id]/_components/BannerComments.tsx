"use client";

import React, { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import Image from "next/image";

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "John Admin",
    text: "This banner looks great! The colors are vibrant and eye-catching. Let's schedule this for the weekend promotion.",
    timestamp: "Jan 29, 2026",
  },
  {
    id: 2,
    author: "Sarah Manager",
    text: "Agreed! I think we should also consider adding a call-to-action button. What do you think about changing the end date?",
    timestamp: "1 hour ago",
  },
];

export default function BannerComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: "Current User",
        text: newComment,
        timestamp: "Just now",
      };
      setComments([...comments, comment]);
      setNewComment("");
      setSelectedFile(null);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-5">
        Comments
      </h4>

      {/* Comments List */}
      <div className="space-y-2 mb-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {comment.author.charAt(0)}
                </span>
              </div>

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form - Telegram Style */}
      <form
        onSubmit={handleSubmit}
        className="relative">
        <div className="relative flex items-end gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-900 focus-within:border-primary dark:focus-within:border-primary transition-colors">
          {/* Textarea */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none h-full max-h-80 overflow-y-auto"
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 128) + "px";
            }}
          />

          {/* File Upload Button */}
          <label
            htmlFor="comment-file"
            className="flex-shrink-0 p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary cursor-pointer transition-colors">
            <Paperclip className="w-5 h-5" />
            <input
              id="comment-file"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="flex-shrink-0 p-2 text-white bg-primary hover:bg-primary/90 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Selected File Preview */}
        {selectedFile && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Paperclip className="w-4 h-4" />
            <span>{selectedFile.name}</span>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="text-red-500 hover:text-red-600 ml-2">
              Remove
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
