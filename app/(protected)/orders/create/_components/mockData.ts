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

export const MENU_ITEMS: Record<string, MenuItem[]> = {
  "1": [
    {
      id: 101,
      name: "Fresh Garden Salad",
      category: "Salad",
      type: "Food",
      description: "A healthy mix of fresh vegetables, often with dressing, nuts, or protein toppings.",
      price: 230.00,
    },
    {
      id: 102,
      name: "Greek Salad",
      category: "Salad",
      type: "Food",
      description: "Classic Greek salad with olives, feta cheese, and cucumber.",
      price: 280.00,
    },
    {
      id: 103,
      name: "Grilled Chicken Burger",
      category: "Food",
      type: "Food",
      description: "Succulent grilled chicken with fresh lettuce and tomato.",
      price: 450.00,
    },
    {
      id: 104,
      name: "Mango Smoothie",
      category: "Drinks",
      type: "Drink",
      description: "Fresh mango blended with yogurt and honey.",
      price: 150.00,
    },
  ],
  "2": [
    {
      id: 201,
      name: "Traditional Doro Wat",
      category: "Food",
      type: "Food",
      description: "Spicy chicken stew with boiled eggs, served with injera.",
      price: 650.00,
    },
    {
      id: 202,
      name: "Beyaynetu",
      category: "Food",
      type: "Food",
      description: "A platter of various vegetarian stews on injera.",
      price: 400.00,
    },
  ],
};
