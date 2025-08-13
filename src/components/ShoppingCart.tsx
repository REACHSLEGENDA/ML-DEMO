import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';

const ShoppingCart: React.FC = () => {
  const { state, dispatch } = useCart();

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Tu Carrito de Compras</h2>

      {state.items.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="mb-4">Tu carrito está vacío.</p>
          <Link to="/">
            <Button>Volver a la búsqueda</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center border rounded-lg p-4 shadow-sm bg-white">
              <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-contain mr-4 rounded-md" />
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-700">{item.currency_id} {item.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="flex items-center gap-2 mr-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                  className="w-16 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <h3 className="text-xl font-bold">Total: {state.items[0]?.currency_id || 'ARS'} {total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</h3>
            <Link to="/checkout">
              <Button size="lg">Proceder al Pago</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;