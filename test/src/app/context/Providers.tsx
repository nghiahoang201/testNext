"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./CartContext";
import { TooltipProvider } from "../component/ui/tooltip";
import { queryClient } from "../lib/queryClient";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </CartProvider>
  );
}
