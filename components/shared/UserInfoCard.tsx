"use client";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useUpdateUser } from "@/hooks/useUpdateUser";
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

interface UserInfoCustomer {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNo?: string;
  phoneNumber?: string;
  countryCode?: string;
  dateOfBirth?: string;
  gender?: string;
  timezone?: string;
  language?: string;
  status?: string;
  role?: string;
}

interface UserInfoCardProps {
  customer: UserInfoCustomer;
}

export default function UserInfoCard({ customer }: UserInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    email: customer.email || "",
    phoneNumber: customer.phoneNumber || customer.contactNo || "",
    countryCode: customer.countryCode || "",
    dateOfBirth: customer.dateOfBirth
      ? new Date(customer.dateOfBirth)
      : (undefined as Date | undefined),
    gender: customer.gender || "",
    timezone: customer.timezone || "",
    language: customer.language || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: date }));
    setIsCalendarOpen(false);
  };

  const handleSave = () => {
    // Only send fields that have values
    const updateData: any = {};

    if (formData.firstName) updateData.firstName = formData.firstName;
    if (formData.lastName) updateData.lastName = formData.lastName;
    if (formData.email) updateData.email = formData.email;
    if (formData.phoneNumber) updateData.phoneNumber = formData.phoneNumber;
    if (formData.countryCode) updateData.countryCode = formData.countryCode;
    if (formData.dateOfBirth)
      updateData.dateOfBirth = formData.dateOfBirth.toISOString();
    if (formData.gender) updateData.gender = formData.gender;
    if (formData.timezone) updateData.timezone = formData.timezone;
    if (formData.language) updateData.language = formData.language;

    updateUser(
      { userId: customer.id, data: updateData },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.firstName || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.lastName || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.email || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone Number
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.phoneNumber || customer.contactNo || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Country Code
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.countryCode || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Date of Birth
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.dateOfBirth
                  ? new Date(customer.dateOfBirth).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Gender
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.gender || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Timezone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.timezone || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Language
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.language || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Role
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {customer.role || "-"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto shrink-0">
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] m-4">
        <div className="no-scrollbar relative border w-[650px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg: ">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone Number</Label>
                    <Input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Country Code</Label>
                    <Input
                      type="text"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      placeholder="+1"
                      disabled={isPending}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Date of Birth</Label>
                    <div className="mt-2 relative">
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        disabled={isPending}
                        className="w-full inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        <CalendarIcon className="h-4 w-4" />
                        {formData.dateOfBirth ? (
                          <span>
                            {format(formData.dateOfBirth, "MMM dd, yyyy")}
                          </span>
                        ) : (
                          <span>Select date</span>
                        )}
                      </button>

                      {isCalendarOpen && (
                        <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                          <Calendar
                            mode="single"
                            selected={formData.dateOfBirth}
                            onSelect={handleDateChange}
                            className="rounded-md"
                            disabled={isPending}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={handleGenderChange}
                      disabled={isPending}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Timezone</Label>
                    <Input
                      type="text"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      placeholder="UTC, EST, PST, etc."
                      disabled={isPending}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Language</Label>
                    <Input
                      type="text"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      placeholder="en, es, fr, etc."
                      disabled={isPending}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Role</Label>
                    <Input
                      type="text"
                      value={customer.role || "-"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}
                disabled={isPending}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
