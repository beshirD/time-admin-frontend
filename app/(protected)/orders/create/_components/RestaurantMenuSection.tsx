"use client";

import { useState, useMemo } from "react";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import { MenuItem } from "@/types/entities";
import Input from "@/components/ui/Input";
import { Search, Plus, Minus } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CartItem } from "./CreateOrderContent";
import { useRestaurants } from "@/hooks/useRestaurants";
import { useMenuItems } from "@/hooks/useMenuItems";

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

  // Fetch restaurants
  const { data: restaurants, isLoading: isLoadingRestaurants } = useRestaurants(
    {
      status: "approved",
      size: 100, // Fetch more restaurants for better selection
    },
  );

  // Fetch menu items for selected restaurant
  const { menuItems, isLoading: isLoadingMenuItems } = useMenuItems({
    restaurantId: selectedRestaurantId?.toString() || "",
    size: 100, // Fetch all menu items
  });

  // Map restaurants to searchable select options
  const restaurantOptions = useMemo(() => {
    return restaurants.map((restaurant) => ({
      value: restaurant.id.toString(),
      label: restaurant.name,
      description: restaurant.cuisine || restaurant.description,
    }));
  }, [restaurants]);

  // Extract unique categories from menu items
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      menuItems.map((item) => item.category?.title).filter(Boolean),
    );
    return ["All Categories", ...Array.from(uniqueCategories)];
  }, [menuItems]);

  // Filter menu items by category and search
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        item.category?.title === selectedCategory;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

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
            Select Restaurant *
          </label>
          <SearchableSelect
            options={restaurantOptions}
            value={selectedRestaurantId?.toString() || ""}
            onChange={(value) => onRestaurantChange(parseInt(value))}
            placeholder={
              isLoadingRestaurants
                ? "Loading restaurants..."
                : "Select Restaurant"
            }
            searchPlaceholder="Search restaurant..."
            disabled={isLoadingRestaurants}
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
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedCategory === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
                  )}>
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-800 dark:text-white">
              Menu Items
            </h4>

            {isLoadingMenuItems ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium">No menu items found</p>
                <p className="text-sm mt-2">
                  {searchQuery
                    ? "Try adjusting your search or category filter"
                    : "This restaurant has no menu items yet"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                {filteredItems.map((item) => {
                  const quantity = getItemQuantity(item.id);
                  const isInCart = quantity > 0;

                  // Get the first price or default price
                  const defaultPrice = item.prices?.[0];
                  const displayPrice = defaultPrice?.price || 0;

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "p-4 border rounded-lg transition-all hover:shadow-md",
                        isInCart
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-gray-200 dark:border-gray-700",
                      )}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 dark:text-white">
                            {item.title}
                          </h5>
                          {item.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          <p className="text-sm font-bold text-primary mt-2">
                            ETB {displayPrice.toFixed(2)}
                          </p>
                          {item.prices && item.prices.length > 1 && (
                            <p className="text-xs text-gray-400 mt-1">
                              {item.prices.length} size options available
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isInCart ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="h-8 w-8 p-0">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-semibold min-w-8 text-center">
                              {quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="h-8 w-8 p-0">
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onRemoveFromCart(item.id)}
                              className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                              Remove
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAddToCart(item)}
                            className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">No restaurant selected</p>
          <p className="text-sm mt-2">
            Please select a restaurant to view menu items
          </p>
        </div>
      )}
    </div>
  );
}
