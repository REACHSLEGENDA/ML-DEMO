import React from 'react';
import { Product } from '@/services/mercadoLibreService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <Card className="w-full max-w-xs flex flex-col justify-between">
      <CardHeader className="p-4 pb-2">
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-contain mb-2 rounded-md" />
        <CardTitle className="text-lg font-semibold line-clamp-2">{product.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {product.currency_id} {product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <a href={product.permalink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
          Ver en Mercado Libre
        </a>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;