import { MenuItem } from "@/types/entities";

export interface RestaurantOption {
  value: string;
  label: string;
  description?: string;
}

export const RESTAURANTS: RestaurantOption[] = [
  { value: "1", label: "Ahmed x diner restaurant", description: "Select the restaurant to prepare this order" },
  { value: "2", label: "Habibi's Kitchen", description: "Tradition food and drinks" },
  { value: "3", label: "Abu's Kitchen", description: "Quick bites and snacks" },
  { value: "4", label: "Golden Palace", description: "Fine dining experience" },
];

export const CATEGORIES = [
  "All Categories",
  "Salad",
  "Food",
  "Drinks",
  "Desserts",
];

export const MENU_ITEMS: Record<string, any[]> = {
  "1": [
    {
      id: 101,
      title: "Fresh Garden Salad",
      category: { id: 1, title: "Salad", description: "Salads", status: "active" },
      itemType: "VEG",
      description: "A healthy mix of fresh vegetables, often with dressing, nuts, or protein toppings.",
      basePrice: 230.00,
    },
    {
      id: 102,
      title: "Greek Salad",
      category: { id: 1, title: "Salad", description: "Salads", status: "active" },
      itemType: "VEG",
      description: "Classic Greek salad with olives, feta cheese, and cucumber.",
      basePrice: 280.00,
    },
    {
      id: 103,
      title: "Grilled Chicken Burger",
      category: { id: 2, title: "Food", description: "Food", status: "active" },
      itemType: "NON_VEG",
      description: "Succulent grilled chicken with fresh lettuce and tomato.",
      basePrice: 450.00,
    },
    {
      id: 104,
      title: "Mango Smoothie",
      category: { id: 3, title: "Drinks", description: "Drinks", status: "active" },
      itemType: "VEGAN",
      description: "Fresh mango blended with yogurt and honey.",
      basePrice: 150.00,
    },
  ],
  "2": [
    {
      id: 201,
      title: "Traditional Doro Wat",
      category: { id: 2, title: "Food", description: "Food", status: "active" },
      itemType: "NON_VEG",
      description: "Spicy chicken stew with boiled eggs, served with injera.",
      basePrice: 650.00,
    },
    {
      id: 202,
      title: "Beyaynetu",
      category: { id: 2, title: "Food", description: "Food", status: "active" },
      itemType: "VEGAN",
      description: "A platter of various vegetarian stews on injera.",
      basePrice: 400.00,
    },
  ],
};
