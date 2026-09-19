import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../data/sampleHomepageData';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (listingId: string, quantityKg: number) => void;
  removeFromCart: (listingId: string) => void;
  clearCart: () => void;
  totalAmount: number;
  totalWeightKg: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    listingId: 'lot-101',
    crop: 'Tomato',
    variety: 'Desi Hybrid (Shivam)',
    farmerName: 'Ramesh Reddy',
    village: 'Chevella',
    pricePerKg: 32,
    quantityKg: 5,
    photoUrl: '/farmer_hands_produce.jpg',
  },
  {
    listingId: 'lot-102',
    crop: 'Onion',
    variety: 'Nashik Red Semi-Pungent',
    farmerName: 'Balaji Kulkarni',
    village: 'Lasalgaon Outskirts',
    pricePerKg: 28,
    quantityKg: 5,
    photoUrl: '/wholesale_produce_dock.jpg',
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('farmchain_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_CART_ITEMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('farmchain_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.listingId === newItem.listingId);
      if (existing) {
        return prev.map((item) =>
          item.listingId === newItem.listingId
            ? { ...item, quantityKg: item.quantityKg + newItem.quantityKg }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const updateQuantity = (listingId: string, quantityKg: number) => {
    if (quantityKg <= 0) {
      removeFromCart(listingId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.listingId === listingId ? { ...item, quantityKg } : item
      )
    );
  };

  const removeFromCart = (listingId: string) => {
    setItems((prev) => prev.filter((item) => item.listingId !== listingId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.pricePerKg * item.quantityKg, 0);
  const totalWeightKg = items.reduce((sum, item) => sum + item.quantityKg, 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
        totalWeightKg,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
