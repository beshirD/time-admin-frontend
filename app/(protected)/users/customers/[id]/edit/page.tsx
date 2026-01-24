"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

// Mock customer data
const mockCustomer = {
  id: 820,
  fullName: "John Doe",
  firstName: "John&",
  lastName: "Doe&",
  email: "john.doe@example.com",
  gender: "Male",
  profileImage: null,
};

export default function EditCustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const [formData, setFormData] = useState({
    firstName: mockCustomer.firstName,
    lastName: mockCustomer.lastName,
    email: mockCustomer.email,
    gender: mockCustomer.gender,
    profileFile: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your update logic here
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
            href={`/users/customers/${params.id}`}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {mockCustomer.fullName}
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400">
              Active
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
              Not Started Id
            </span>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Orange Header */}
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">Customer</h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
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

              {/* Gender */}
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Profile File */}
              <div>
                <Label htmlFor="profileFile">Profile File</Label>
                <input
                  id="profileFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-900/20 dark:file:text-brand-400"
                />
              </div>
            </div>

            {/* Update Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors duration-200 font-medium">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
