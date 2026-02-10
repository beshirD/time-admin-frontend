import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Time Delivery Dashboard",
  description: "Sign in to access the food delivery admin dashboard",
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900/[3%] dark:bg-gradient-to-br from-black to-background">
      <SignInForm />
    </div>
  );
}
