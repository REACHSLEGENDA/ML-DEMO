import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CheckoutSimulation: React.FC = () => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmPurchase = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
        <h2 className="text-4xl font-bold mb-4 text-gray-800">¡Compra Realizada con Éxito!</h2>
        <p className="text-xl text-gray-600 mb-8">Gracias por tu compra. Tu pedido ha sido procesado.</p>
        <Link to="/">
          <Button size="lg">Volver al Inicio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">Simulación de Pago</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Resumen del Pedido</h3>
        <div className="space-y-3 mb-6">
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-700">{item.title} (x{item.quantity})</span>
              <span className="font-medium">{item.currency_id} {(item.price * item.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
          <span>Total a Pagar:</span>
          <span>{state.items[0]?.currency_id || 'ARS'} {total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/cart">
          <Button variant="outline">Volver al Carrito</Button>
        </Link>
        <Button size="lg" onClick={handleConfirmPurchase}>
          Confirmar Compra
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSimulation;