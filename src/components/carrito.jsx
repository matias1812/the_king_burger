import React from "react";
import { useOrderStore } from '../context/shopContext';
import { Button, Card, Image } from "@nextui-org/react";
import { IconTrash } from "@tabler/icons-react";
import { extras } from "../menu/extras";

const Cart = () => {
  const orderStore = useOrderStore();
  const { orders, addProductToOrder } = orderStore;

  React.useEffect(() => {
    console.log("Productos en el carrito:", orders);
  }, [orders]);

  // Obtener productos desde el almacenamiento
  const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

  // Calcular el total de la compra
  const totalAmount = storedOrders.reduce((total, order) => total + order.selectedPrice, 0);

  // Formatear el total con un punto como separador de miles
  const formattedTotal = totalAmount.toLocaleString();

  const handleAddToCart = (producto, categoria) => {
    // Agregar el producto al carrito con categoría y precio
    addProductToOrder({ ...producto, selectedType: categoria.categoria, selectedPrice: producto.precio });
  };

  return (
    <div className="mt-5 text-white">
      <h1 className="text-xl mb-2">Carrito de Compras</h1>
      <div className="overflow-y-auto max-h-64">
        <ul>
          {storedOrders.map((order, index) => (
            <li key={order} className="mt-2">
              <p>{order.nombre}</p>
              <p>Tipo: {order.selectedType}</p>
              <p>Precio: ${order.selectedPrice}</p>
              <Button className="bg-red-700 mt-1" onClick={() => orderStore.removeProductFromOrder(order.id)}>
                <IconTrash/>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-4xl">Total: ${formattedTotal}</div>
      <div className="mt-2">
        <h2 className="text-2xl mb-2">Productos Extras</h2>
        <div className="overflow-y-auto max-h-96">
          {extras.map((categoria, index) => (
            <Card key={categoria} shadow className="text-center p-4 mt-2">
              <h3 className="text-xl mb-2">{categoria.categoria}</h3>
              <ul>
                {categoria.productos.map((producto, productoIndex) => (
                  <li key={producto} className="mt-2">
                    <p>{producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <Button onClick={() => handleAddToCart(producto, categoria)} className="bg-yellow-600 mt-1">
                      Agregar al Carrito
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
