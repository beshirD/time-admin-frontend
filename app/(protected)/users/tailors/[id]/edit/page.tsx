"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock data fetcher
const getTailor = (id: string) => {
  return {
    id,
    firstName: "eyob",
    lastName: "tariku",
    email: "",
    contactNo: "+251123456744",
    profileFile: null,
  };
};

export default function EditTailorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    profileFile: null as File | null,
  });

  useEffect(() => {
    // Simulate fetching data
    const data = getTailor(id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((prev) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contactNo: data.contactNo,
    }));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Tailor updated successfully");
    router.push("/users/tailors");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profileFile: e.target.files[0] });
    }
  };

  return (
    <div className="p-6 w-full bg-white dark:bg-gray-900 space-y-4 rounded-lg mb-7">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/users/tailors"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Tailors
          </h1>
        </div>

        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Contact No */}
              <div>
                <Label htmlFor="contactNo">
                  Contact No <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactNo"
                  type="text"
                  required
                  value={formData.contactNo}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNo: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Profile File */}
              <div className="md:col-span-2">
                <Label htmlFor="profileFile">Profile File</Label>
                <div className="mt-1 flex items-center gap-2">
                  <label
                    htmlFor="profileFile"
                    className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    Choose File
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.profileFile
                      ? formData.profileFile.name
                      : "No file chosen"}
                  </span>
                  <input
                    id="profileFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors duration-200 font-medium">
                Update Tailor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
