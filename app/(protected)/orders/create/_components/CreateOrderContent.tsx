"use client";

import { useState } from "react";
// import CustomerInfoSection from "./CustomerInfoSection";
import DeliveryAddressSection from "./DeliveryAddressSection";
import RestaurantMenuSection from "./RestaurantMenuSection";
import OrderSummarySticky from "./OrderSummarySticky";
import { MenuItem } from "@/types/entities";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CustomerInfoSection from "./CustomerInfoSection";

export interface CartItem extends MenuItem {
  quantity: number;
}

export default function CreateOrderContent() {
  const router = useRouter();

  // State for Customer Info
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  // State for Restaurant and Cart
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Handlers
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const handleUpdateQuantity = (itemId: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleSubmitOrder = () => {
    if (!customerInfo.name || !customerInfo.mobile || !customerInfo.address) {
      toast.error("Please fill in all required customer information.");
      return;
    }
    if (!selectedRestaurantId) {
      toast.error("Please select a restaurant.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Please add at least one item to the order.");
      return;
    }

    toast.success("Order created successfully!");
    router.push("/orders");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start relative">
      {/* Main Content Area (70%) */}
      <div className="flex-1 w-full lg:w-[70%] space-y-5">
        <CustomerInfoSection
          data={customerInfo}
          onChange={(field: string, value: string) =>
            setCustomerInfo((prev) => ({ ...prev, [field]: value }))
          }
        />

        <RestaurantMenuSection
          selectedRestaurantId={selectedRestaurantId}
          onRestaurantChange={(id) => {
            setSelectedRestaurantId(id);
            setCartItems([]); // Clear cart when restaurant changes
          }}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
        <DeliveryAddressSection
          address={customerInfo.address}
          onChange={(value: string) =>
            setCustomerInfo((prev) => ({ ...prev, address: value }))
          }
        />
      </div>

      {/* Sticky Order Summary Sidebar (30%) */}
      <div className="w-full lg:w-[30%] lg:sticky lg:top-24">
        <OrderSummarySticky
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          specialInstructions={specialInstructions}
          onInstructionsChange={setSpecialInstructions}
          onSubmit={handleSubmitOrder}
          selectedRestaurantId={selectedRestaurantId}
        />
      </div>
    </div>
  );
}
