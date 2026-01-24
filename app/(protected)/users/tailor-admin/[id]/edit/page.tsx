"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock data fetcher
const getTailorAdmin = (id: string) => {
  return {
    id,
    firstName: "test11",
    lastName: "test11",
    email: "test11@gmail.com",
    profileFile: null,
  };
};

export default function EditTailorAdminPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileFile: null as File | null,
  });

  useEffect(() => {
    // Simulate fetching data
    const data = getTailorAdmin(params.id);
    setFormData((prev) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    }));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Tailor Admin updated successfully");
    router.push("/users/tailor-admin");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profileFile: e.target.files[0] });
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/users/tailor-admin"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Tailor Admins
          </h1>
        </div>

        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Orange Header */}
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">Tailor Admin</h2>
          </div>

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
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pr-10"
                    placeholder="Leave blank to keep unchanged"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
