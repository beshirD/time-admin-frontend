"use client";

import { useState } from "react";
import DeliveryAddressSection from "./DeliveryAddressSection";
import RestaurantMenuSection from "./RestaurantMenuSection";
import OrderSummarySticky from "./OrderSummarySticky";
import { MenuItem, PaymentMethod, PaymentStatus } from "@/types/entities";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CustomerInfoSection from "./CustomerInfoSection";
import { useCreateManualOrder } from "@/hooks/useCreateManualOrder";

export interface CartItem extends MenuItem {
  quantity: number;
  selectedPriceId?: number; // Track which price variant is selected
}

interface CreateOrderContentProps {
  initialAdminUserId?: number;
}

export default function CreateOrderContent({
  initialAdminUserId,
}: CreateOrderContentProps) {
  const router = useRouter();
  const [adminUserId] = useState<number | undefined>(initialAdminUserId);

  const { createOrderAsync, isLoading } = useCreateManualOrder(
    adminUserId || undefined,
  );

  // State for Customer Info
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [, setCustomerInfo] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // State for Address
  const [addressId, setAddressId] = useState<number | null>(null);
  const [address, setAddress] = useState("");

  // State for Restaurant and Cart
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // State for Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending");

  // Handlers
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      // Use the first price variant by default, or base price
      const selectedPriceId =
        item.prices && item.prices.length > 0 ? item.prices[0].id : 0;
      return [...prev, { ...item, quantity: 1, selectedPriceId }];
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

  const handleSubmitOrder = async () => {
    // Validation
    if (!customerId) {
      toast.error("Please select a customer.");
      return;
    }
    if (!selectedRestaurantId) {
      toast.error("Please select a restaurant.");
      return;
    }
    if (!addressId && !address.trim()) {
      toast.error("Please provide a delivery address.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Please add at least one item to the order.");
      return;
    }

    // Check if we have admin user ID
    if (!adminUserId) {
      toast.error(
        "Session expired. Please log out and log back in to continue.",
      );
      return;
    }

    try {
      // Format items for API
      const items = cartItems.map((item) => ({
        itemId: item.id,
        priceId: item.selectedPriceId || 0,
        quantity: item.quantity,
        addons: [], // TODO: Add support for addons if needed
      }));

      await createOrderAsync({
        customerId,
        restaurantId: selectedRestaurantId,
        addressId: addressId || undefined,
        address: address || undefined,
        items,
        paymentMethod,
        paymentStatus,
        specialInstructions: specialInstructions || undefined,
        skipApproval: true, // Auto-approve manual orders
      });

      toast.success("Order created successfully!");
      router.push("/orders");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create order. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start relative">
      {/* Main Content Area (70%) */}
      <div className="flex-1 w-full lg:w-[70%] space-y-5">
        <CustomerInfoSection
          customerId={customerId}
          onCustomerIdChange={setCustomerId}
          onCustomerDataChange={(data) => setCustomerInfo(data)}
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
          customerId={customerId}
          addressId={addressId}
          address={address}
          onAddressIdChange={setAddressId}
          onAddressChange={setAddress}
        />
      </div>

      {/* Sticky Order Summary Sidebar (30%) */}
      <div className="w-full lg:w-[30%] lg:sticky lg:top-24">
        <OrderSummarySticky
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          specialInstructions={specialInstructions}
          onInstructionsChange={setSpecialInstructions}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          paymentStatus={paymentStatus}
          onPaymentStatusChange={setPaymentStatus}
          onSubmit={handleSubmitOrder}
          selectedRestaurantId={selectedRestaurantId}
          isSubmitting={isLoading}
        />
      </div>
    </div>
  );
}
