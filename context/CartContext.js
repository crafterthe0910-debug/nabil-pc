"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize and isolate local state sync strictly post-mounting
  useEffect(() => {
    try {
      const persistedState = localStorage.getItem("nabil-pc-cart");
      if (persistedState) {
        setCart(JSON.parse(persistedState));
      }
    } catch (error) {
      console.error("Failed parsing storage buffer:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Update transactional records upon state mutations
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("nabil-pc-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed sync operation:", error);
    }
  }, [cart, isHydrated]);

  const addToCart = (product) => {
    setCart((currentItems) => {
      const matchIndex = currentItems.findIndex((item) => item._id === product._id);
      if (matchIndex > -1) {
        return currentItems.map((item, idx) =>
          idx === matchIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
    setShowNotification(true);
  };

  const removeFromCart = (productId) => {
    setCart((currentItems) => currentItems.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, count) => {
    if (count <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((currentItems) =>
      currentItems.map((item) => (item._id === productId ? { ...item, quantity: count } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Suppress server-client element content mismatches by returning loading state prior to hydration completion
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        showNotification,
        setShowNotification,
        totalItems: isHydrated ? totalItems : 0,
        totalPrice: isHydrated ? totalPrice : 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart context consumer out of context provider bounds.");
  }
  return context;
}