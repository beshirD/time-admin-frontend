import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Time Delivery Dashboard",
  description: "Sign in to access the food delivery admin dashboard",
};

export default function LoginPage() {
  return <SignInForm />;
}

