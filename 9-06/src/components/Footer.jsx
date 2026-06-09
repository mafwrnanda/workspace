// ============================================================
//  ✅ COMPONENTE ENTREGADO — NO MODIFICAR
//  Footer.jsx
//
//  OBJETIVO DE APRENDIZAJE:
//  Observa cómo se divide el footer en columnas con Bootstrap
//  y cómo se separa la lógica de datos del HTML (JSX).
// ============================================================

const serviciosFooter = [
  'Instalaciones residenciales',
  'Instalaciones comerciales',
  'Mantenimiento preventivo',
  'Tableros eléctricos',
  'Iluminación LED',
  'Plantas eléctricas',
];

const linksRapidos = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer-principal pt-5 pb-0">
      <div className="container">
        <div className="row g-4 pb-4">

          {/* Columna 1: Logo y descripción */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="logo-icono">⚡</span>
              <span className="logo-texto">
                <span className="logo-principal">VOLT</span>
                <span className="logo-secundario text-warning">TEC</span>
              </span>
            </div>
            <p className="text-light opacity-75 mb-3">
              Empresa certificada en instalaciones eléctricas residenciales
              y comerciales. Más de 15 años brindando seguridad y confianza
              a hogares y empresas de Medellín.
            </p>
            <div className="d-flex gap-2">
              {['Facebook', 'Instagram', 'WhatsApp'].map((red) => (
                <a key={red} href="#" className="btn btn-sm btn-outline-light">
                  {red === 'WhatsApp' ? '💬' : red === 'Instagram' ? '📸' : '👥'}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Links rápidos */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-titulo mb-3">Navegación</h6>
            <ul className="list-unstyled">
              {linksRapidos.map((link) => (
                <li key={link.label} className="mb-2">
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="footer-titulo mb-3">Servicios</h6>
            <ul className="list-unstyled">
              {serviciosFooter.map((servicio) => (
                <li key={servicio} className="mb-2">
                  <a href="#servicios" className="footer-link">
                    {servicio}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-titulo mb-3">Contacto</h6>
            <ul className="list-unstyled">
              <li className="mb-2 text-light opacity-75">
                📍 Calle 10 # 43A-15, El Poblado, Medellín
              </li>
              <li className="mb-2">
                <a href="tel:+573001234567" className="footer-link">
                  📞 (300) 123-4567
                </a>
              </li>
              <li className="mb-2">
                <a href="mailto:info@volttec.com.co" className="footer-link">
                  📧 info@volttec.com.co
                </a>
              </li>
              <li className="mb-2 text-light opacity-75">
                🕐 Lun–Vie 7am–6pm · Sáb 8am–2pm
              </li>
              <li className="mt-3">
                <span className="badge bg-success">✅ Certificado RETIE</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom text-center py-3 mt-2">
        <small className="text-light opacity-50">
          © {anioActual} VoltTec Servicios Eléctricos S.A.S. — Todos los derechos reservados.
          &nbsp;·&nbsp; NIT 900.123.456-7
        </small>
      </div>
    </footer>
  );
}

export default Footer;