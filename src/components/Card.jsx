import React from "react";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import slider from '../assets/slider.jpg';
import { useOrderStore } from '../context/shopContext';

export default function CardEat({
  hamburguesasDeCarne,
  hamburguesasDePollo,
  opcionesDeHotDogs,
  opcionesDePapitas,
}) {
  const orderStore = useOrderStore();
  const [selectedPrices, setSelectedPrices] = React.useState({});

  const renderFoodCard = (foodItem) => {
    const [quantity, setQuantity] = React.useState(1);

    const handleAddToOrder = () => {
      const selectedPrice = selectedPrices[foodItem.id];
      const selectedType = Object.keys(foodItem.prices).find(
        (type) => foodItem.prices[type] === selectedPrice
      );
    
      if (selectedPrice !== undefined && selectedType !== undefined) {
        for (let i = 0; i < quantity; i++) {
          orderStore.addProductToOrder({
            ...foodItem,
            id: foodItem.id + i,
            selectedPrice,
            selectedType,
          });
        }
        setQuantity(1);
        // Restablecer el precio seleccionado a null o undefined
        setSelectedPrices((prevSelectedPrices) => ({
          ...prevSelectedPrices,
          [foodItem.id]: null,
        }));
      } else {
        alert("Por favor, selecciona un precio antes de agregar al pedido.");
      }
    };
        
    const handlePriceSelection = (price) => {
      console.log('Precio seleccionado:', price);
      setSelectedPrices((prevSelectedPrices) => ({
        ...prevSelectedPrices,
        [foodItem.id]: prevSelectedPrices[foodItem.id] === price ? null : price,
      }));
    };
    
    const handleIncrement = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };
  
    const handleDecrement = () => {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
      <Card
        key={foodItem.id}
        isFooterBlurred
        radius="lg"
        className="border-none mt-10 ml-8 mr-8 flex flex-col sm:flex sm:flex-row p-4 w-120 h-90 sm:w-400 sm:h-200"
      >
        <Image
          alt={foodItem.nombre}
          className="object-cover"
          height={400}
          src={slider}
          width={400}
        />
        <CardBody className="w-80 h-90 sm:w-200 sm:h-100">
          <div className="flex flex-col mr-4">
            <h2 className="text-xl sm:text-2xl sm:ml-4">{foodItem.nombre}</h2>
            <p className="text-sm sm:text-2xl mt-1 sm:mt-4 ml-0 sm:ml-4">Descripción:</p>
            <p className="ml-0 sm:ml-4 text-xs sm:text-lg">{foodItem.description}</p>
            <p className="ml-2 sm:ml-4 text-sm sm:text-2xl mt-2 sm:mt-4">Precios:</p>
            <div className="">
              <p className="ml-2 sm:ml-4 text-sm sm:text-xl">
                {Object.entries(foodItem.prices).map(([type, price]) => (
                  <Button
                    key={type}
                    className={`ml-0 mt-2 sm:ml-4 text-xs sm:text-xl flex flex-row ${selectedPrices[foodItem.id] === price ? 'bg-yellow-600 text-white' : ''}`}
                    onClick={() => handlePriceSelection(price)}
                  >
                    {`${type}: $${price} `}
                  </Button>
                ))}
              </p>
            </div>
            <div className="ml-2 sm:ml-4 mt-2 sm:mt-4 flex flex-row items-center">
              <button className="border w-5 rounded-md p-1" onClick={handleDecrement}>
                -
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded-md p-1 w-10 mx-2"
              />
              <button className="border w-5 rounded-md p-1" onClick={handleIncrement}>
                +
              </button>            
            </div>
            <Button className="w-[10rem] ml-2 sm:ml-4 mt-2 sm:mt-4 bg-yellow-600 text-white border rounded-lg" onClick={handleAddToOrder}>
              Agregar al Pedido
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  };

  const renderCategoryCards = (categoryId, categoryName, categoryItems) => {
    console.log(categoryName, 'lol');
    return (
      <div>
        <h1 className="mt-10 text-3xl sm:text-4xl ml-8">{categoryName}</h1>
        {categoryItems && categoryItems.map && categoryItems.map((foodItem) => renderFoodCard(foodItem))}
      </div>
    );
  };

  return (
    <div>
      {/* Mapear las hamburguesas de pollo */}
      {renderCategoryCards("pollo", "Hamburguesas de Pollo", hamburguesasDePollo)}

      {/* Mapear las hamburguesas de carne */}
      {renderCategoryCards("carne", "Hamburguesas de Carne", hamburguesasDeCarne)}

      {/* Mapear los hot dogs */}
      {renderCategoryCards("hotdogs", "Hot Dogs", Object.values(opcionesDeHotDogs))}

      {renderCategoryCards("papitas", "Papas fritas", opcionesDePapitas)}

    </div>
  );
}
