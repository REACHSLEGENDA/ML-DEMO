import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Product } from '@/services/mercadoLibreService';
import { toast } from 'sonner';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          toast.info(`"${existingItem.title}" ya está en el carrito. Cantidad actualizada.`);
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          toast.success(`"${action.payload.title}" añadido al carrito.`);
          return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
          };
        }
      }
    case 'REMOVE_ITEM':
      toast.warning("Producto eliminado del carrito.");
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      {
        const { id, quantity } = action.payload;
        if (quantity <= 0) {
          toast.warning("Producto eliminado del carrito.");
          return {
            ...state,
            items: state.items.filter(item => item.id !== id),
          };
        }
        return {
          ...state,
          items: state.items.map(item =>
            item.id === id
              ? { ...item, quantity }
              : item
          ),
        };
      }
    case 'CLEAR_CART':
      toast.success("Carrito vaciado.");
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};