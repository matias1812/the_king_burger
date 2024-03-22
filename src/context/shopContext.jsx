import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  orders: JSON.parse(localStorage.getItem('orders')) || [],
  addProductToOrder: (product) => {
    console.log('Añadiendo producto al carrito:', product);
    set((state) => {
      const updatedOrders = [...state.orders, product];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return { orders: updatedOrders };
    });
  },
  removeProductFromOrder: (productId) => {
    console.log('Eliminando producto del carrito:', productId);
    set((state) => {
      const updatedOrders = state.orders.filter((product) => product.id !== productId);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return { orders: updatedOrders };
    });
  },
  clearOrders: () => {
    console.log('Limpiando carrito');
    localStorage.removeItem('orders');
    set({ orders: [] });
  },
  getOrders: (state) => {
    const orders = state?.orders || [];
    console.log('Productos en el carrito:', orders);
    return orders;
  },
}));
