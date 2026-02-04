"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { RestaurantOffer } from "@/types/entities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

interface OfferFormProps {
  offer?: RestaurantOffer;
  mode: "create" | "edit";
}

export function OfferForm({ offer, mode }: OfferFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(offer?.title || "");
  const [code, setCode] = useState(offer?.code || "");
  const [discountType, setDiscountType] = useState<"amount" | "percentage">(
    offer?.discountType || "amount",
  );
  const [discount, setDiscount] = useState(offer?.discount?.toString() || "");
  const [minimumAmount, setMinimumAmount] = useState(
    offer?.minimumAmount?.toString() || "",
  );
  const [endTime, setEndTime] = useState<Date | undefined>(
    offer?.endTime ? new Date(offer.endTime) : undefined,
  );
  const [description, setDescription] = useState(offer?.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(offer?.image || "");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting offer:", {
      title,
      code,
      discountType,
      discount,
      minimumAmount,
      endTime,
      description,
      imageFile,
    });
    // TODO: Implement API call
    router.push("/restaurants/offers");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <Label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter offer title"
          />
        </div>

        {/* Code */}
        <div>
          <Label htmlFor="code">
            Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="code"
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter offer code"
          />
        </div>

        {/* Discount Type */}
        <div>
          <Label htmlFor="discountType">
            Discount Type <span className="text-red-500">*</span>
          </Label>
          <Select
            value={discountType}
            onValueChange={(value) =>
              setDiscountType(value as "amount" | "percentage")
            }>
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select discount type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amount">Amount (AFN)</SelectItem>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Discount */}
        <div>
          <Label htmlFor="discount">
            Discount ({discountType === "amount" ? "AFN" : "%"}){" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="discount"
            type="number"
            required
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder={
              discountType === "percentage"
                ? "Enter value between 1 and 100"
                : "Enter AFN value"
            }
            min={discountType === "percentage" ? "1" : "0"}
            max={discountType === "percentage" ? "100" : undefined}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {discountType === "percentage"
              ? "For percentage, enter value between 1 and 100."
              : "For amount, enter AFN value."}
          </p>
        </div>

        {/* Minimum Amount */}
        <div>
          <Label htmlFor="minimumAmount">Minimum Amount (AFN)</Label>
          <Input
            id="minimumAmount"
            type="number"
            value={minimumAmount}
            onChange={(e) => setMinimumAmount(e.target.value)}
            placeholder="Enter minimum amount"
            min="0"
          />
        </div>

        {/* End Time */}
        <div>
          <Label htmlFor="endTime">
            End Time <span className="text-red-500">*</span>
          </Label>
          <div
            className="relative"
            ref={calendarRef}>
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full h-11 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-left flex items-center justify-between hover:border-primary transition">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                {endTime ? (
                  <span className="text-gray-900 dark:text-white">
                    {format(endTime, "PPP")}
                  </span>
                ) : (
                  <span className="text-gray-500">Select end date...</span>
                )}
              </span>
            </button>

            {isCalendarOpen && (
              <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Select End Date
                  </h3>
                  {endTime && (
                    <button
                      type="button"
                      onClick={() => setEndTime(undefined)}
                      className="text-xs text-primary hover:underline">
                      Clear
                    </button>
                  )}
                </div>
                <Calendar
                  mode="single"
                  selected={endTime}
                  onSelect={setEndTime}
                  className="rounded-md"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <Label htmlFor="image">Offer Image</Label>
        <div className="mt-2">
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            {imagePreview ? (
              <div className="relative w-full h-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
              </div>
            )}
            <input
              id="image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">
          Description <span className="text-red-500">*</span>
        </Label>
        <RichTextEditor
          value={description}
          onChange={setDescription}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 justify-end pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/restaurants/offers")}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === "create" ? "Create Offer" : "Update Offer"}
        </Button>
      </div>
    </form>
  );
}
