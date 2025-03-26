"use client";

import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: ({ title, description, variant = "default", ...props }) => {
      // Map our variant names to sonner methods
      if (variant === "destructive") {
        return sonnerToast.error(title, {
          description,
          ...props,
        });
      }

      return sonnerToast(title, {
        description,
        ...props,
      });
    },
  };
}
