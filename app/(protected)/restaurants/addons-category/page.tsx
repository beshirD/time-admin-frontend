import { AddOnCategory } from "@/types/entities";
import { CategoriesTabs } from "./_components/CategoriesTabs";

async function getAddOnCategoriesData(): Promise<AddOnCategory[]> {
  // Mock data for add-on categories (TODO: Replace with API call when available)
  return [
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
}

export default async function AddOnsCategoryPage() {
  const addOnCategoriesData = await getAddOnCategoriesData();

  return <CategoriesTabs addOnCategoriesData={addOnCategoriesData} />;
}
