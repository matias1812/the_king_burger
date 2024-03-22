import CardEat from "../components/Card"
import CardPicoteo from "../components/CardPicoteo"
import { hamburguesasDeCarne } from "../menu/hamburgesas"
import { hamburguesasDePollo } from "../menu/hamburgesas_de _pollo"
import { opcionesDeHotDogs } from "../menu/hotdog"
import { opcionesDePapitas } from "../menu/papas"
import { picoteos } from "../menu/picoteos"
function Home() {

  return (
    <>
    <h1 className="text-5xl sm:text-7xl mt-15 ml-4">Carta:</h1>
      <CardEat
        hamburguesasDeCarne={hamburguesasDeCarne}
        hamburguesasDePollo={hamburguesasDePollo}
        opcionesDeHotDogs={opcionesDeHotDogs}
        opcionesDePapitas={opcionesDePapitas}
      />
      <CardPicoteo picoteos={picoteos} />
    </>
  )
}

export default Home
