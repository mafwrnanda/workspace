// ============================================================
//  ✅ COMPONENTE ENTREGADO — NO MODIFICAR
//  Navbar.jsx
//
//  OBJETIVO DE APRENDIZAJE:
//  Observa cómo se usa el estado (useState) para controlar
//  el menú móvil, y cómo se manejan eventos en React.
// ============================================================

import { useState, useEffect } from 'react';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const manejarScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition-all ${
        scrolled ? 'navbar-scrolled shadow' : 'navbar-transparente'
      }`}
    >
      <div className="container">

        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
          <span className="logo-icono">⚡</span>
          <span className="logo-texto">
            <span className="logo-principal">VOLT</span>
            <span className="logo-secundario">TEC</span>
          </span>
        </a>

        {/* Botón hamburguesa para móvil */}
        <button
          className={`navbar-toggler border-0 ${menuAbierto ? '' : 'collapsed'}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span className="toggler-icono">
            {menuAbierto ? '✕' : '☰'}
          </span>
        </button>

        {/* Links de navegación */}
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto gap-1">
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="#inicio" onClick={cerrarMenu}>
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="#servicios" onClick={cerrarMenu}>
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="#nosotros" onClick={cerrarMenu}>
                Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="#contacto" onClick={cerrarMenu}>
                Contacto
              </a>
            </li>
            <li className="nav-item ms-lg-2">
              <a
                className="btn btn-voltec px-4"
                href="tel:+573001234567"
                onClick={cerrarMenu}
              >
                📞 Llamar ahora
              </a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;