"use client";

import { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/ui/modal";
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useRestaurants } from "@/hooks/useRestaurants";

interface EditBasicInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  offer: RestaurantOffer;
  onSave: (data: {
    restaurantId: number;
    title: string;
    couponCode: string;
    status: "active" | "inactive";
    startDate: string;
    endDate: string;
    usageLimitPerUser: number;
    totalUsageLimit: number;
  }) => void;
}

export function EditBasicInfoDialog({
  isOpen,
  onClose,
  offer,
  onSave,
}: EditBasicInfoDialogProps) {
  const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants({
    page: 0,
    size: 100,
  });

  const [restaurantId, setRestaurantId] = useState(
    offer.restaurantId.toString(),
  );
  const [title, setTitle] = useState(offer.title);
  const [couponCode, setCouponCode] = useState(offer.couponCode);
  const [status, setStatus] = useState<"active" | "inactive">(offer.status);
  const [startDate, setStartDate] = useState<Date>(new Date(offer.startDate));
  const [endDate, setEndDate] = useState<Date>(new Date(offer.endDate));
  const [usageLimitPerUser, setUsageLimitPerUser] = useState(
    offer.usageLimitPerUser.toString(),
  );
  const [totalUsageLimit, setTotalUsageLimit] = useState(
    offer.totalUsageLimit.toString(),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      restaurantId: parseInt(restaurantId),
      title,
      couponCode,
      status,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      usageLimitPerUser: parseInt(usageLimitPerUser),
      totalUsageLimit: parseInt(totalUsageLimit),
    });
    onClose();
  };

  const handleClose = () => {
    setRestaurantId(offer.restaurantId.toString());
    setTitle(offer.title);
    setCouponCode(offer.couponCode);
    setStatus(offer.status);
    setStartDate(new Date(offer.startDate));
    setEndDate(new Date(offer.endDate));
    setUsageLimitPerUser(offer.usageLimitPerUser.toString());
    setTotalUsageLimit(offer.totalUsageLimit.toString());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[100px] m-1">
      <div className="no-scrollbar relative border w-full lg:w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Basic Information
          </h4>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-4">
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
                onValueChange={(value: "active" | "inactive") =>
                  setStatus(value)
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
                    <span className="text-gray-900 dark:text-white">
                      {format(startDate, "PPP")}
                    </span>
                  </span>
                </button>

                {isStartCalendarOpen && (
                  <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
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
                    <span className="text-gray-900 dark:text-white">
                      {format(endDate, "PPP")}
                    </span>
                  </span>
                </button>

                {isEndCalendarOpen && (
                  <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
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

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
