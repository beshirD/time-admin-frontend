"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import type { FAQ, UpdateFAQRequest } from "@/types/entities";
import { useFAQCategories, type CreateFAQRequest } from "@/hooks/useFAQs";

interface CreateFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when creating a new FAQ — no editData provided */
  onCreate?: (payload: CreateFAQRequest) => void;
  /** Called when updating an existing FAQ — editData is provided */
  onUpdate?: (id: number, payload: UpdateFAQRequest) => void;
  editData?: FAQ | null;
  isSubmitting?: boolean;
}

export function CreateFAQModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  editData,
  isSubmitting = false,
}: CreateFAQModalProps) {
  const isEditing = !!editData;
  const { categories, isLoading: isCategoriesLoading } = useFAQCategories();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>(
    {},
  );

  useEffect(() => {
    if (editData) {
      const translation = editData.translations[0];
      setQuestion(translation?.question ?? "");
      setAnswer(translation?.answer ?? "");
      setCategory(editData.category ?? "");
      setDisplayOrder(editData.displayOrder ?? 0);
      setActive(editData.active);
    } else {
      setQuestion("");
      setAnswer("");
      setCategory("");
      setDisplayOrder(0);
      setActive(true);
    }
    setErrors({});
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!question.trim()) newErrors.question = "Question is required";
    if (!answer.trim()) newErrors.answer = "Answer is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isEditing && onUpdate) {
      const translation = editData.translations[0];
      onUpdate(editData.id, {
        category,
        displayOrder,
        active,
        translations: [
          {
            languageCode: translation?.languageCode ?? "en",
            title: translation?.title ?? question,
            description: translation?.description ?? "",
            question,
            answer,
          },
        ],
      });
    } else if (!isEditing && onCreate) {
      onCreate({
        category,
        displayOrder,
        active,
        translations: [
          {
            languageCode: "en",
            title: question,
            description: "",
            question,
            answer,
          },
        ],
      });
    }

    handleClose();
  };

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    setCategory("");
    setDisplayOrder(0);
    setActive(true);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[700px] m-4">
      <div className="relative border w-[640px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar max-h-[90vh]">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit FAQ" : "Create New FAQ"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {isEditing
              ? "Update the FAQ information"
              : "Add a new frequently asked question"}
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3">
            <div className="grid grid-cols-1 gap-y-5">
              {/* Question */}
              <div>
                <Label>
                  Question <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    if (errors.question)
                      setErrors({ ...errors, question: undefined });
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

              {/* Answer */}
              <div>
                <Label>
                  Answer <span className="text-red-500">*</span>
                </Label>
                <textarea
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (errors.answer)
                      setErrors({ ...errors, answer: undefined });
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
                    errors.answer && "border-red-500 focus:ring-red-500",
                  )}
                />
                {errors.answer && (
                  <p className="mt-1 text-sm text-red-500">{errors.answer}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isCategoriesLoading}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed">
                  <option value="">
                    {isCategoriesLoading
                      ? "Loading categories..."
                      : "Select a category"}
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display Order */}
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  placeholder="0"
                />
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <select
                  value={active ? "active" : "inactive"}
                  onChange={(e) => setActive(e.target.value === "active")}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                  ? "Update FAQ"
                  : "Create FAQ"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
