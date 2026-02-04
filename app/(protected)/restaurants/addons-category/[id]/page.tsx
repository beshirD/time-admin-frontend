import { AddOnCategory, Feed } from "@/types/entities";
import { AddOnsCategoryHeader } from "./_components/AddOnsCategoryHeader";
import { FeedsSection } from "./_components/FeedsSection";
import BannerComments from "@/app/(protected)/banner/(main)/[id]/_components/BannerComments";
// import BannerComments from "../../banner/(main)/[id]/_components/BannerComments";

// Mock data - in real app, fetch from API
const categories = [
  {
    id: 3,
    title: "check",
    createdOn: "Feb 3, 2026, 12:49:13 PM",
    createdBy: "Admins",
  },
  {
    id: 2,
    title: "Drink",
    createdOn: "Jan 6, 2026, 8:40:18 PM",
    createdBy: "Admins",
  },
  {
    id: 1,
    title: "Fresh (fast serve)",
    createdOn: "May 10, 2025, 9:14:59 AM",
    createdBy: "Admins",
  },
];

const feeds = [
  {
    id: 1,
    content: "Created new Add Ons Category",
    createdOn: new Date().toLocaleString(),
    createdBy: "Admins",
  },
  {
    id: 2,
    content: "Updated Add Ons Category",
    createdOn: new Date().toLocaleString(),
    createdBy: "Admins",
  },
  {
    id: 3,
    content: "Deleted Add Ons Category",
    createdOn: new Date().toLocaleString(),
    createdBy: "Admins",
  },
];

export default async function AddOnsCategoryDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // const category = await getCategoryData(params.id);
  // const feeds = getFeedsData(params.id);

  return (
    <div className="w-full space-y-5 mb-7">
      {/* Category Header */}
      <AddOnsCategoryHeader category={categories[0]} />

      {/* Feeds Section */}
      <FeedsSection feeds={feeds} />

      {/* Comments Section */}
      <BannerComments />
    </div>
  );
}
