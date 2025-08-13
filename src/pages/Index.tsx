import { MadeWithDyad } from "@/components/made-with-dyad";
import ProductSearch from "@/components/ProductSearch";
import { Button } from "@/components/ui/button";
import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full p-4 bg-white shadow-sm flex justify-end items-center">
        <Link to="/cart">
          <Button variant="outline" className="relative">
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Carrito
          </Button>
        </Link>
      </header>
      <main className="flex-grow">
        <ProductSearch />
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;