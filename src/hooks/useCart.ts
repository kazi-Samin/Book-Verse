import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getTotals: () => { totalItems: number; totalPrice: number };
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item._id === newItem._id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === newItem._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
            isOpen: true,
          };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      setIsOpen: (isOpen) => set({ isOpen }),
      
      getTotals: () => {
        const { items } = get();
        return items.reduce(
          (totals, item) => ({
            totalItems: totals.totalItems + item.quantity,
            totalPrice: totals.totalPrice + item.price * item.quantity,
          }),
          { totalItems: 0, totalPrice: 0 }
        );
      },
    }),
    {
      name: 'bookverse-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
