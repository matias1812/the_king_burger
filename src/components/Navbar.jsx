import React, { useEffect } from "react";import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Image
} from "@nextui-org/react";
import logo from '../assets/burgerlogo.jpg';
import { IconShoppingCart } from "@tabler/icons-react";
import useUserStore, { loginUserWithGoogle, logoutUser } from '../context/authContext';
import Cart from "./carrito";

export default function Navegador() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Nuevo estado para controlar el sidebar
  const { user } = useUserStore();

  const menuItems = [
    {
      nombre: "CARTA",
      ruta: "/"
    },
    {
      nombre: "NOSOTROS",
      ruta: "/nosotros"
    },
    {
      nombre: "ZONA DE DESPACHO",
      ruta: "/zonadedespacho"
    },
  ];

  const handleSignOut = async () => {
    await logoutUser();
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMenuOpen(false); // Cierra el menú al abrir el carrito
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSidebarOpen(false); // Cierra el carrito al abrir el menú
  };

  useEffect(() => {
    if (isMenuOpen && isSidebarOpen) {
      setIsSidebarOpen(false);
      setIsMenuOpen(false); // Cierra el menú al abrir el carrito
    }
  }, [isMenuOpen, isSidebarOpen]);

  return (
    <>
      <Navbar className="bg-black w-full h-39" onMenuOpenChange={handleToggleMenu}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-white"
          />
          <NavbarBrand>
            <Image src={logo} className="w-16" />
            <p className="font-bold text-inherit text-white">The King's <br /> Burger</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className=" hidden sm:flex gap-6" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`} isActive>
              <Link href={item.ruta} className="text-white" aria-current="page">
                {item.nombre}
              </Link>
            </NavbarItem>
          ))}
          {user ? (
            <div className="flex flex-row ml-8 gap-4">
              <h1 className="w-[12rem] text-center bg-yellow-600 text-white border rounded-lg">Hola, {user.displayName}!</h1>
              <button className="w-[7rem] bg-yellow-600 text-white border rounded-lg" onClick={handleSignOut}>Cerrar sesión</button>
            </div>
          ) : (
            <button className="w-[7rem] bg-yellow-600 text-white border rounded-lg" onClick={loginUserWithGoogle}>Iniciar sesión</button>
          )}
        </NavbarContent>
        <NavbarMenu className="bg-black">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full mb-4 mt-4 text-white"
                href={item.ruta}
                size="lg"
              >
                {item.nombre}
              </Link>
            </NavbarMenuItem>
          ))}
          {user ? (
            <>
              <h1 className="w-[12rem] text-center bg-yellow-600 text-white border rounded-lg">Hola, {user.displayName}!</h1>
              <button className="w-[7rem] mt-4 bg-yellow-600 text-white border rounded-lg" onClick={handleSignOut}>Cerrar sesión</button>
            </>
          ) : (
            <button  className="w-[7rem] bg-yellow-600 text-white border rounded-lg" onClick={loginUserWithGoogle}>Iniciar sesión</button>
          )}
        </NavbarMenu>
        <NavbarItem>
          <Button className="text-white bg-yellow-600 border border-" onClick={handleToggleSidebar} aria-current="page">
            <IconShoppingCart className="text-white bg-yellow-600" size={30} />
          </Button>
        </NavbarItem>
      </Navbar>
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-300 bg-black shadow-lg p-10 z-50">
          <Button onClick={handleToggleSidebar}>X</Button>
          <Cart/>
        </div>
      )}
    </>
  );
}
