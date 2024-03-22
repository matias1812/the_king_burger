import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Nosotros from "./views/Nosotros";
import Navegador from "../src/components/Navbar"
import Carousel from "../src/components/Slider"
import ZonaDeDespacho from "./views/ZonaDeDespacho";

function App() {

  return (
    <>
      <Navegador/>
      <Carousel /> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/nosotros" element={<Nosotros />}/>
        <Route path="/zonadedespacho" element={<ZonaDeDespacho />}/>
      </Routes>
    </>
  )
}

export default App
