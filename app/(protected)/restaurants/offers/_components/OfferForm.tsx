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
import { useCreateOffer } from "@/hooks/useCreateOffer";
import { useRestaurants } from "@/hooks/useRestaurants";

interface OfferFormProps {
  offer?: RestaurantOffer;
  mode: "create" | "edit";
}

export function OfferForm({ offer, mode }: OfferFormProps) {
  const router = useRouter();
  const createOffer = useCreateOffer();
  const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants({
    page: 0,
    size: 100,
  });

  const [restaurantId, setRestaurantId] = useState(
    offer?.restaurantId?.toString() || "",
  );
  const [title, setTitle] = useState(offer?.title || "");
  const [couponCode, setCouponCode] = useState(offer?.couponCode || "");
  const [discountType, setDiscountType] = useState<
    "percentage" | "fixed_amount"
  >(offer?.discountType || "fixed_amount");
  const [discountValue, setDiscountValue] = useState(
    offer?.discountValue?.toString() || "",
  );
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(
    offer?.maxDiscountAmount?.toString() || "0",
  );
  const [minOrderAmount, setMinOrderAmount] = useState(
    offer?.minOrderAmount?.toString() || "0",
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    offer?.startDate ? new Date(offer.startDate) : undefined,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    offer?.endDate ? new Date(offer.endDate) : undefined,
  );
  const [status, setStatus] = useState<"active" | "inactive">(
    offer?.status || "active",
  );
  const [usageLimitPerUser, setUsageLimitPerUser] = useState(
    offer?.usageLimitPerUser?.toString() || "1",
  );
  const [totalUsageLimit, setTotalUsageLimit] = useState(
    offer?.totalUsageLimit?.toString() || "100",
  );
  const [description, setDescription] = useState(offer?.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    offer?.imageUrl || "",
  );
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
  const startCalendarRef = useRef<HTMLDivElement>(null);
  const endCalendarRef = useRef<HTMLDivElement>(null);

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startCalendarRef.current &&
        !startCalendarRef.current.contains(event.target as Node)
      ) {
        setIsStartCalendarOpen(false);
      }
      if (
        endCalendarRef.current &&
        !endCalendarRef.current.contains(event.target as Node)
      ) {
        setIsEndCalendarOpen(false);
      }
    };

    if (isStartCalendarOpen || isEndCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStartCalendarOpen, isEndCalendarOpen]);

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

    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    const data = {
      restaurantId: parseInt(restaurantId),
      title,
      description,
      couponCode,
      discountType,
      discountValue: parseFloat(discountValue),
      maxDiscountAmount: parseFloat(maxDiscountAmount),
      minOrderAmount: parseFloat(minOrderAmount),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status,
      usageLimitPerUser: parseInt(usageLimitPerUser),
      totalUsageLimit: parseInt(totalUsageLimit),
    };

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
      "data.json",
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    createOffer.mutate(formData, {
      onSuccess: () => {
        router.push("/restaurants/offers");
      },
    });
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
        {/* Restaurant */}
        <div>
          <Label htmlFor="restaurantId">
            Restaurant <span className="text-red-500">*</span>
          </Label>
          <Select
            required
            value={restaurantId}
            onValueChange={setRestaurantId}>
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select restaurant" />
            </SelectTrigger>
            <SelectContent>
              {restaurantsLoading ? (
                <SelectItem
                  value="loading"
                  disabled>
                  Loading restaurants...
                </SelectItem>
              ) : !restaurants || restaurants.length === 0 ? (
                <SelectItem
                  value="no-data"
                  disabled>
                  No restaurants available
                </SelectItem>
              ) : (
                restaurants.map((restaurant) => (
                  <SelectItem
                    key={restaurant.id}
                    value={restaurant.id.toString()}>
                    {restaurant.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        {/* Coupon Code */}
        <div>
          <Label htmlFor="couponCode">
            Coupon Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="couponCode"
            type="text"
            required
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="font-mono"
          />
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status">
            Status <span className="text-red-500">*</span>
          </Label>
          <Select
            value={status}
            onValueChange={(value: "active" | "inactive") => setStatus(value)}>
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Discount Type */}
        <div>
          <Label htmlFor="discountType">
            Discount Type <span className="text-red-500">*</span>
          </Label>
          <Select
            value={discountType}
            onValueChange={(value: "percentage" | "fixed_amount") =>
              setDiscountType(value)
            }>
            <SelectTrigger className="w-full h-11">
              <SelectValue placeholder="Select discount type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="fixed_amount">Amount (AFN)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Discount Value */}
        <div>
          <Label htmlFor="discountValue">
            Discount Value ({discountType === "fixed_amount" ? "AFN" : "%"}){" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="discountValue"
            type="number"
            step="0.01"
            required
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            placeholder={
              discountType === "percentage"
                ? "Enter value between 1 and 100"
                : "Enter AFN value"
            }
            min={discountType === "percentage" ? "1" : "0"}
            max={discountType === "percentage" ? "100" : undefined}
          />
        </div>

        {/* Max Discount Amount */}
        <div>
          <Label htmlFor="maxDiscountAmount">Max Discount Amount (AFN)</Label>
          <Input
            id="maxDiscountAmount"
            type="number"
            step="0.01"
            value={maxDiscountAmount}
            onChange={(e) => setMaxDiscountAmount(e.target.value)}
            placeholder="Enter max discount"
            min="0"
          />
        </div>

        {/* Min Order Amount */}
        <div>
          <Label htmlFor="minOrderAmount">
            Min Order Amount (AFN) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="minOrderAmount"
            type="number"
            step="0.01"
            required
            value={minOrderAmount}
            onChange={(e) => setMinOrderAmount(e.target.value)}
            placeholder="Enter minimum order amount"
            min="0"
          />
        </div>

        {/* Start Date */}
        <div>
          <Label htmlFor="startDate">
            Start Date <span className="text-red-500">*</span>
          </Label>
          <div
            className="relative"
            ref={startCalendarRef}>
            <button
              type="button"
              onClick={() => setIsStartCalendarOpen(!isStartCalendarOpen)}
              className="w-full h-11 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-left flex items-center justify-between hover:border-primary transition">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                {startDate ? (
                  <span className="text-gray-900 dark:text-white">
                    {format(startDate, "PPP")}
                  </span>
                ) : (
                  <span className="text-gray-500">Select start date...</span>
                )}
              </span>
            </button>

            {isStartCalendarOpen && (
              <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  className="rounded-md"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsStartCalendarOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* End Date */}
        <div>
          <Label htmlFor="endDate">
            End Date <span className="text-red-500">*</span>
          </Label>
          <div
            className="relative"
            ref={endCalendarRef}>
            <button
              type="button"
              onClick={() => setIsEndCalendarOpen(!isEndCalendarOpen)}
              className="w-full h-11 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-left flex items-center justify-between hover:border-primary transition">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                {endDate ? (
                  <span className="text-gray-900 dark:text-white">
                    {format(endDate, "PPP")}
                  </span>
                ) : (
                  <span className="text-gray-500">Select end date...</span>
                )}
              </span>
            </button>

            {isEndCalendarOpen && (
              <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="rounded-md"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEndCalendarOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Usage Limit Per User */}
        <div>
          <Label htmlFor="usageLimitPerUser">
            Usage Limit Per User <span className="text-red-500">*</span>
          </Label>
          <Input
            id="usageLimitPerUser"
            type="number"
            required
            value={usageLimitPerUser}
            onChange={(e) => setUsageLimitPerUser(e.target.value)}
            placeholder="Enter usage limit per user"
            min="1"
          />
        </div>

        {/* Total Usage Limit */}
        <div>
          <Label htmlFor="totalUsageLimit">
            Total Usage Limit <span className="text-red-500">*</span>
          </Label>
          <Input
            id="totalUsageLimit"
            type="number"
            required
            value={totalUsageLimit}
            onChange={(e) => setTotalUsageLimit(e.target.value)}
            placeholder="Enter total usage limit"
            min="1"
          />
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
          onClick={() => router.push("/restaurants/offers")}
          disabled={createOffer.isPending}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createOffer.isPending}>
          {createOffer.isPending
            ? "Creating..."
            : mode === "create"
              ? "Create Offer"
              : "Update Offer"}
        </Button>
      </div>
    </form>
  );
}
