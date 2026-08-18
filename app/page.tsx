import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Marcas from "@/components/Marcas";
import Stats from "@/components/Stats";
import Nosotros from "@/components/Nosotros";
import Productos from "@/components/Productos";
import Ubicacion from "@/components/Ubicacion";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Servicios />
      <Marcas />
      <Stats />
      <Nosotros />
      <Productos />
      <Ubicacion />
      <Contacto />
      <Footer />
    </>
  );
}
