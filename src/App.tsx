import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import ShoppingCart from "./components/ShoppingCart"; // Import ShoppingCart component
import CheckoutSimulation from "./components/CheckoutSimulation"; // Import CheckoutSimulation component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider> {/* Wrap your routes with CartProvider */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<ShoppingCart />} /> {/* New route for shopping cart */}
            <Route path="/checkout" element={<CheckoutSimulation />} /> {/* New route for checkout */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;