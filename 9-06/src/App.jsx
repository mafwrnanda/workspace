import Navbar from './components/Navbar';
import Header from './components/Header';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* ✅ ENTREGADO: Navbar con menú de navegación */}
      <Navbar />

      {/* ✅ ENTREGADO: Header / Jumbotron principal */}
      <Header />

      {/* 🛠️ TAREA: Sección de servicios - ustedes deben completar el HTML interno */}
      <Services />

      {/* 🛠️ TAREA: Sección ¿Por qué nosotros? */}
      <WhyUs />

      {/* 🛠️ TAREA: Formulario de contacto */}
      <Contact />

      {/* ✅ ENTREGADO: Footer */}
      <Footer />
    </>
  );
}

export default App;