"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
}

// Mock data
const mockFoodItems: FoodItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 250,
    description: "Classic pizza with tomato sauce and mozzarella",
    available: true,
  },
  {
    id: 2,
    name: "Cheeseburger",
    category: "Burger",
    price: 180,
    description: "Beef patty with cheese, lettuce, and tomato",
    available: true,
  },
  {
    id: 3,
    name: "Vanilla Ice Cream",
    category: "Ice cream",
    price: 80,
    description: "Creamy vanilla ice cream",
    available: false,
  },
];

export function FoodItemsTable() {
  const [foodItems] = useState<FoodItem[]>(mockFoodItems);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Food Items
        </h3>
        <Button usage="create">Add Item</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {foodItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {item.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {item.category}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  AFN {item.price.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                  {item.description}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.available
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Button usage="edit">Edit</Button>
                    <Button usage="delete">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {foodItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No food items added yet
          </p>
        </div>
      )}
    </div>
  );
}
