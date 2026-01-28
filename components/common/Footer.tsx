import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full px-6">
      <div className="w-full flex justify-between items-center p-10 rounded-t-2xl border bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900">
        <p className="opacity-75">
          Time Delivery Management © {new Date().getFullYear()} All rights
          reserved.
        </p>
        <div className="flex gap-5">
          <Link
            href={"/support"}
            className="py-1 px-5 rounded-full border border-primary">
            Support
          </Link>
          <Link
            href={"/contact"}
            className="py-1 px-5 rounded-full border border-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
