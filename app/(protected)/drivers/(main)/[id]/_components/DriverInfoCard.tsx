"use client";

import { Driver } from "@/types/entities";
import Image from "next/image";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";

interface DriverInfoCardProps {
  driverData: Driver;
}

export default function DriverInfoCard({ driverData }: DriverInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    contactNo: driverData.contactNo,
    email: driverData.email,
    profilePicture: driverData.profilePicture || "",
  });

  const handleSave = () => {
    console.log("Saving driver info:", formData);
    closeModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real implementation, upload file and get URL
      console.log("File selected:", file.name);
      // For now, just log it
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border text-gray-800 dark:text-white/90 p-5 space-y-4 rounded-lg">
      {/* Driver Information Card */}
      <div className="p-2">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {driverData.profilePicture ? (
              <Image
                src={driverData.profilePicture || "/images/demo-user.png"}
                alt={driverData.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                {driverData.firstName?.[0] || driverData.fullName[0]}
                {driverData.lastName?.[0] || driverData.fullName[1] || ""}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {driverData.fullName}
            </h3>
            <p className="text-base text-gray-500 dark:text-gray-400">
              {driverData.role || "Driver"}
            </p>
          </div>
        </div>

        {/* Driver Information */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mt-6">
          <div className="w-full">
            <h4 className="text-lg font-semibold  mb-6">Driver Information</h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Id
                </p>
                <p className="text-base font-medium ">{driverData.id}</p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-base font-medium ">{driverData.email}</p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-base font-medium ">
                  {driverData.firstName || "N/A"}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="text-base font-medium ">
                  {driverData.lastName || "N/A"}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Is Email Verified
                </p>
                <p className="text-base font-medium ">
                  {driverData.isEmailVerified || "Email not verify"}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Is approve
                </p>
                <p className="text-base font-medium ">
                  {driverData.isApprove || "Pending"}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Rider ID
                </p>
                <p className="text-base font-medium ">
                  {driverData.riderId || "N/A"}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Status
                </p>
                <p className="text-base font-medium ">
                  {driverData.status || "Offline"}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Contact No
                </p>
                <p className="text-base font-medium ">{driverData.contactNo}</p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Role
                </p>
                <p className="text-base font-medium ">
                  {driverData.role || "Driver"}
                </p>
              </div>

              <div className="">
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Created On
                </p>
                <p className="text-base font-medium ">{driverData.createdOn}</p>
              </div>

              <div>
                <p className="mb-1.5 text-sm leading-normal text-gray-500 dark:text-gray-400">
                  Created By
                </p>
                <p className="text-base font-medium ">
                  {driverData.createdById}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 lg:inline-flex lg:w-auto shrink-0">
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
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[100px] m-1">
        <div className="no-scrollbar relative border w-full lg:w-[650px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Driver
            </h4>
            <p className="mb-6 text-base text-gray-500 dark:text-gray-400">
              Update driver contact information and profile picture.
            </p>
          </div>
          <form
            className="flex flex-col w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}>
            <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Driver Details
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div>
                    <Label htmlFor="contactNo">Contact No</Label>
                    <Input
                      id="contactNo"
                      type="text"
                      value={formData.contactNo}
                      onChange={(e) =>
                        setFormData({ ...formData, contactNo: e.target.value })
                      }
                      placeholder="+93 71 199 9000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="driver@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-base text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-base file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 dark:file:bg-primary/20 dark:hover:file:bg-primary/30"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Upload a new profile picture (JPG, PNG, max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}>
                Close
              </Button>
              <Button
                size="sm"
                type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
