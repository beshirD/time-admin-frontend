"use client";

import React from "react";
import { Dialog, DialogContent } from "../dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "max-w-[95vw] w-auto p-0 bg-transparent border-none shadow-none sm:max-w-none",
          className,
        )}
        showCloseButton={false}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
