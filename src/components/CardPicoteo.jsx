import React from "react";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import slider from '../assets/slider.jpg';
import { useOrderStore } from '../context/shopContext';

export default function CardPicoteo({
  picoteos
}) {
  const orderStore = useOrderStore();
  const [selectedPrices, setSelectedPrices] = React.useState({});

  const renderPicoteoCard = (picoteo) => {
    const [selectedOption, setSelectedOption] = React.useState(picoteo.opciones[0]);
  
    const handleAddToOrder = () => {
      if (!selectedOption) {
        alert("Por favor, selecciona una opción antes de agregar al pedido.");
        return;
      }
  
      orderStore.addProductToOrder({
        ...picoteo,
        id: picoteo.id,
        selectedPrice: selectedOption.prices,
        selectedType: `${selectedOption.cantidad} Unidades`,
      });
  
      // Restablecer la opción seleccionada a la primera opción
      setSelectedOption(picoteo.opciones[0]);
    };
    
    return (
      <Card
        key={picoteo.id}
        isFooterBlurred
        radius="lg"
        className="border-none mt-10 ml-8 mr-8 flex flex-col sm:flex sm:flex-row p-4 w-120 h-90 sm:w-400 sm:h-200"
      >
        <Image
          alt={picoteo.nombre}
          className="object-cover"
          height={400}
          src={slider}
          width={400}
        />
        <CardBody className="w-80 h-90 sm:w-200 sm:h-100">
          <div className="flex flex-col mr-4">
            <h2 className="text-xl sm:text-2xl sm:ml-4">{picoteo.nombre}</h2>
            <p className="ml-0 sm:ml-4 text-xs sm:text-lg">Opciones:</p>
            <div className="">
              <p className="ml-2 sm:ml-4 text-sm sm:text-xl">
              {picoteo.opciones.map((option) => (
            <Button
              key={option.cantidad}
              className={`ml-0 mt-8 sm:ml-4 text-xs sm:text-xl flex flex-row ${selectedOption === option ? 'bg-yellow-600 text-white' : ''}`}
              onClick={() => setSelectedOption(option)}
            >
              {`${option.cantidad} Unidades: $${option.prices} `}
            </Button>
          ))}
              </p>
            </div>
            <Button className="w-[10rem] ml-2 sm:ml-4 mt-8 sm:mt-4 bg-yellow-600 text-white border rounded-lg" onClick={handleAddToOrder}>
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
        {categoryItems && categoryItems.map && categoryItems.map((item) => renderFoodCard(item))}
      </div>
    );
  };

  const renderPicoteosCategory = () => {
    return (
      <div>
        <h1 className="mt-10 text-3xl sm:text-4xl ml-8">Picoteos</h1>
        {picoteos && picoteos.map && picoteos.map((picoteo) => renderPicoteoCard(picoteo))}
      </div>
    );
  };

  return (
    <div>
      {/* Mapear los picoteos */}
      {renderPicoteosCategory()}
    </div>
  );
}
