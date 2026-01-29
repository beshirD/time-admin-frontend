"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../dialog";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  title?: string;
  hideTitle?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className,
  children,
  title,
  hideTitle = false,
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
        <DialogTitle className="hidden">{title}</DialogTitle>

        {hideTitle && title ? (
          <VisuallyHidden.Root>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden.Root>
        ) : title ? (
          <DialogTitle className="sr-only">{title}</DialogTitle>
        ) : null}
        {children}
      </DialogContent>
    </Dialog>
  );
};
