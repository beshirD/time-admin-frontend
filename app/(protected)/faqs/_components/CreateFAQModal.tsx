"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types/entities";

interface CreateFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<FAQ, "id" | "createdOn">) => void;
  editData?: FAQ | null;
}

export function CreateFAQModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
}: CreateFAQModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"Active" | "Inactive" | "Deleted">(
    "Active",
  );
  const [errors, setErrors] = useState<{
    question?: string;
    answer?: string;
  }>({});

  useEffect(() => {
    if (editData) {
      setQuestion(editData.question);
      setAnswer(editData.answer);
      setState(editData.state);
    } else {
      setQuestion("");
      setAnswer("");
      setState("Active");
    }
    setErrors({});
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { question?: string; answer?: string } = {};
    if (!question.trim()) {
      newErrors.question = "Question is required";
    }
    if (!answer.trim()) {
      newErrors.answer = "Answer is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ question, answer, state });
    handleClose();
  };

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    setState("Active");
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[700px] m-4">
      <div className="relative border w-[640px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {editData ? "Edit FAQ" : "Create New FAQ"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {editData
              ? "Update the FAQ information"
              : "Add a new frequently asked question"}
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3">
            <div className="grid grid-cols-1 gap-y-5">
              {/* Question Field */}
              <div>
                <Label>
                  Question <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    if (errors.question) {
                      setErrors({ ...errors, question: undefined });
                    }
                  }}
                  placeholder="Enter the question"
                  className={cn(
                    errors.question && "border-red-500 focus:ring-red-500",
                  )}
                />
                {errors.question && (
                  <p className="mt-1 text-sm text-red-500">{errors.question}</p>
                )}
              </div>

              {/* Answer Field */}
              <div>
                <Label>
                  Answer <span className="text-red-500">*</span>
                </Label>
                <textarea
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (errors.answer) {
                      setErrors({ ...errors, answer: undefined });
                    }
                  }}
                  placeholder="Enter the answer"
                  rows={6}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg text-sm",
                    "bg-white dark:bg-gray-800",
                    "border-gray-300 dark:border-gray-700",
                    "text-gray-900 dark:text-white",
                    "placeholder-gray-400 dark:placeholder-gray-500",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                    "disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed",
                    errors.answer && "border-red-500 focus:ring-red-500",
                  )}
                />
                {errors.answer && (
                  <p className="mt-1 text-sm text-red-500">{errors.answer}</p>
                )}
              </div>

              {/* Status Field */}
              <div>
                <Label>Status</Label>
                <select
                  value={state}
                  onChange={(e) =>
                    setState(
                      e.target.value as "Active" | "Inactive" | "Deleted",
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Deleted">Deleted</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClose}
              type="button">
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit">
              {editData ? "Update FAQ" : "Create FAQ"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
