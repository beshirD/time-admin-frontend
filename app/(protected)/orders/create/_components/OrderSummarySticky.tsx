"use client";

import { CartItem } from "./CreateOrderContent";
import {
  Plus,
  Minus,
  ReceiptText,
  Truck,
  Landmark,
  Wallet,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { PaymentMethod, PaymentStatus } from "@/types/entities";
import Label from "@/components/ui/Label";

interface OrderSummaryStickyProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, delta: number) => void;
  specialInstructions: string;
  onInstructionsChange: (val: string) => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  paymentStatus: PaymentStatus;
  onPaymentStatusChange: (status: PaymentStatus) => void;
  onSubmit: () => void;
  selectedRestaurantId: number | null;
  isSubmitting?: boolean;
}

export default function OrderSummarySticky({
  cartItems,
  onUpdateQuantity,
  specialInstructions,
  onInstructionsChange,
  paymentMethod,
  onPaymentMethodChange,
  paymentStatus,
  onPaymentStatusChange,
  onSubmit,
  selectedRestaurantId,
  isSubmitting = false,
}: OrderSummaryStickyProps) {
  const subtotal = cartItems.reduce((acc, item) => {
    // Find the selected price variant
    const selectedPrice = item.prices?.find(
      (p) => p.id === item.selectedPriceId,
    );
    const itemPrice = selectedPrice?.price || 0;
    return acc + itemPrice * item.quantity;
  }, 0);
  const deliveryFee = selectedRestaurantId ? 50 : 0; // Mock delivery fee
  const platformFee = subtotal * 0.05; // 5% platform fee
  const total = subtotal + deliveryFee + platformFee;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
      <div className="p-4 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <ReceiptText className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-gray-800 dark:text-white">
          Order Summary
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {cartItems.length > 0 ? (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-4 pb-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    ETB {item.basePrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md p-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    ETB {(item.basePrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-32 flex flex-col items-center justify-center text-center space-y-2 text-gray-400">
            <p className="text-sm">Your cart is empty</p>
            <p className="text-xs opacity-60">
              Add some yummy items to continue
            </p>
          </div>
        )}

        <div className="pt-4 space-y-3">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Payment Method *
            </Label>
            <select
              value={paymentMethod}
              onChange={(e) =>
                onPaymentMethodChange(e.target.value as PaymentMethod)
              }
              className="w-full h-10 px-3 border-2 border-gray-100 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-sm focus:border-primary focus:outline-none">
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="online">Online</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Payment Status *
            </Label>
            <select
              value={paymentStatus}
              onChange={(e) =>
                onPaymentStatusChange(e.target.value as PaymentStatus)
              }
              className="w-full h-10 px-3 border-2 border-gray-100 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-sm focus:border-primary focus:outline-none">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Special Instructions
            </label>
            <Textarea
              placeholder="Enter Special Instructions (e.g. no onions, extra spicy...)"
              value={specialInstructions}
              onChange={(e) => onInstructionsChange(e.target.value)}
              className="text-xs min-h-[80px] bg-gray-50/50 dark:bg-gray-800/30"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 space-y-3 border-t border-gray-100 dark:border-gray-800">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>ETB {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              <span>Delivery Fee</span>
            </div>
            <span>ETB {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Landmark className="h-3 w-3" />
              <span>Platform Fee (5%)</span>
            </div>
            <span>ETB {platformFee.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Total Amount
            </span>
            <span className="text-xl font-black text-primary">
              ETB {total.toFixed(2)}
            </span>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
        </div>

        <Button
          usage="create"
          className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
          onClick={onSubmit}
          disabled={isSubmitting}>
          {isSubmitting ? "Creating Order..." : "Create Order"}
        </Button>
      </div>
    </div>
  );
}
