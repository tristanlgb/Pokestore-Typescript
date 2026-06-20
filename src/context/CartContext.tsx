import { createContext, useContext, useState } from "react";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, cartQuantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, cartQuantity: number) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + cartQuantity,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          cartQuantity,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.cartQuantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
};