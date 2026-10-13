import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getCookie, setCookie } from './utils/cookies';

function App() {
  const [tema, setTema] = useState(() => {
    const preferencia = getCookie('tema');
    return preferencia === 'oscuro' ? 'oscuro' : 'claro';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    setCookie('tema', tema, 365, {
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:',
    });
  }, [tema]);

  return (
    <>
      <button
        className="selector-tema"
        type="button"
        aria-pressed={tema === 'oscuro'}
        onClick={() => setTema((actual) => actual === 'oscuro' ? 'claro' : 'oscuro')}
      >
        {tema === 'oscuro' ? '☀ Tema claro' : '☾ Tema oscuro'}
      </button>
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