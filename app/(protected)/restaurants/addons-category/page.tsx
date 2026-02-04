import { AddOnCategory, FoodCategory } from "@/types/entities";
import { CategoriesTabs } from "./_components/CategoriesTabs";

async function getAddOnCategoriesData(): Promise<AddOnCategory[]> {
  // Mock data for add-on categories
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

async function getFoodCategoriesData(): Promise<FoodCategory[]> {
  // Mock data for food categories
  return [
    {
      id: 22,
      title: "test added",
      state: "Active",
      type: "Restaurant",
    },
    {
      id: 21,
      title: "rice",
      state: "Active",
      type: "Restaurant",
    },
    {
      id: 20,
      title: "soda",
      state: "Active",
      type: "Store",
    },
    {
      id: 19,
      title: "Pizza",
      state: "Active",
      type: "Restaurant",
    },
    {
      id: 18,
      title: "Hot Drinks",
      state: "Deleted",
      type: "Store",
    },
    {
      id: 17,
      title: "Coffee",
      state: "Deleted",
      type: "Restaurant",
    },
    {
      id: 16,
      title: "Juice",
      state: "Active",
      type: "Store",
    },
  ];
}

export default async function AddOnsCategoryPage() {
  const addOnCategoriesData = await getAddOnCategoriesData();
  const foodCategoriesData = await getFoodCategoriesData();

  return (
    <CategoriesTabs
      addOnCategoriesData={addOnCategoriesData}
      foodCategoriesData={foodCategoriesData}
    />
  );
}
