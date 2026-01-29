import React from "react";

export default function PageTitle({ title }: { title: string }) {
  return <p className="text-xl font-semibold tracking-wider">{title}</p>;
}
