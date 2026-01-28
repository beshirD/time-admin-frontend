"use client";
import React from "react";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Facebook, Linkedin, Instagram, Twitter, Pencil } from "lucide-react";

interface UserProfileCustomer {
  fullName: string;
  role?: string;
  profileImage?: string | null;
}

interface UserProfileCardProps {
  customer: UserProfileCustomer;
}

export default function UserProfileCard({ customer }: UserProfileCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4 lg:gap-5">
          {/* Profile Image */}
          <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
            {customer.profileImage ? (
              <Image
                src={customer.profileImage}
                alt={customer.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                <svg
                  className="w-8 h-8 lg:w-10 lg:h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>

          {/* Name and Role */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-1">
              {customer.fullName}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">
                {customer.role || "Team Manager"}
              </span>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-600"></span>
              <span>Arizona, United States</span>
            </div>
          </div>
        </div>

        {/* Actions and Socials */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-2 lg:gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-brand-500 hover:border-brand-500 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
              <Facebook className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-brand-500 hover:border-brand-500 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-brand-500 hover:border-brand-500 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-brand-500 hover:border-brand-500 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
              <Instagram className="w-4 h-4" />
            </button>
          </div>

          {/* Edit Button */}
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Edit Profile"
        hideTitle={true}
        className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Profile
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg: ">
              Update your profile details and social links.
            </p>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      defaultValue="https://www.facebook.com/"
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input
                      type="text"
                      defaultValue="https://x.com/"
                    />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      defaultValue="https://www.linkedin.com/"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input
                      type="text"
                      defaultValue="https://instagram.com/"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Profile Details
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      defaultValue={customer.fullName}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Role</Label>
                    <Input
                      type="text"
                      defaultValue={customer.role}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Location</Label>
                    <Input
                      type="text"
                      defaultValue="Arizona, United States"
                    />
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
                onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
