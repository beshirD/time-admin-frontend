"use client";

import { useState, useMemo } from "react";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import { RESTAURANTS, CATEGORIES, MENU_ITEMS } from "./mockData";
import { MenuItem } from "@/types/entities";
import Input from "@/components/ui/Input";
import { Search, Plus, Minus } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CartItem } from "./CreateOrderContent";

interface RestaurantMenuSectionProps {
  selectedRestaurantId: number | null;
  onRestaurantChange: (id: number | null) => void;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: number) => void;
  onUpdateQuantity: (itemId: number, delta: number) => void;
}

export default function RestaurantMenuSection({
  selectedRestaurantId,
  onRestaurantChange,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
}: RestaurantMenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const currentMenuItems = useMemo(() => {
    if (!selectedRestaurantId) return [];
    return MENU_ITEMS[selectedRestaurantId] || [];
  }, [selectedRestaurantId]);

  const filteredItems = useMemo(() => {
    return currentMenuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        item.category === selectedCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [currentMenuItems, selectedCategory, searchQuery]);

  const getItemQuantity = (itemId: number) => {
    return cartItems.find((i) => i.id === itemId)?.quantity || 0;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Restaurant
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Restaurant
          </label>
          <SearchableSelect
            options={RESTAURANTS}
            value={selectedRestaurantId}
            onChange={onRestaurantChange}
            placeholder="Select Restaurant"
            searchPlaceholder="Search restaurant..."
          />
          <p className="text-xs text-gray-500">
            Select the restaurant to prepare this order
          </p>
        </div>
      </div>

      {selectedRestaurantId ? (
        <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Categories */}
            <div className="flex gap-2 p-1 bg-gray-100 border dark:bg-gray-800 rounded-lg overflow-x-auto no-scrollbar w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all",
                    selectedCategory === cat
                      ? "bg-primary/30 text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                  )}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-6 h-10 border-primary dark:border-primary/60"
              />
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const quantity = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-primary/30 transition-colors bg-gray-50/30 dark:bg-gray-800/20">
                    <div className="flex justify-between items-start gap-3">
                      <div className="space-y-1">
                        <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {item.category}
                        </span>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <span className="font-bold text-primary whitespace-nowrap">
                        ETB {item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                        {item.type}
                      </span>

                      {quantity > 0 ? (
                        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-primary rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                            <Minus className="h-4 w-4 text-primary" />
                          </button>
                          <span className="font-bold text-sm min-w-[20px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                            <Plus className="h-4 w-4 text-primary" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => onAddToCart(item)}
                          className="rounded-lg px-4 h-9">
                          Add Item
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 space-y-2">
                <Search className="h-8 w-8 opacity-20" />
                <p>No menu items found</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 font-medium">
            Please select a restaurant to view its menu items
          </p>
        </div>
      )}
    </div>
  );
}
