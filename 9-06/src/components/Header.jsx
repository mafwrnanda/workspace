// ============================================================
//  ✅ COMPONENTE ENTREGADO — NO MODIFICAR
//  Header.jsx  (Jumbotron / Hero)
//
//  OBJETIVO DE APRENDIZAJE:
//  Observa cómo se estructuran los datos como un array
//  de objetos y se renderizan con .map() en JSX.
// ============================================================

const estadisticas = [
  { numero: '15+', etiqueta: 'Años de experiencia' },
  { numero: '3.200', etiqueta: 'Proyectos completados' },
  { numero: '98%', etiqueta: 'Clientes satisfechos' },
  { numero: '24/7', etiqueta: 'Soporte disponible' },
];

function Header() {
  return (
    <header id="inicio" className="header-hero">
      <div className="hero-overlay"></div>

      <div className="container position-relative">
        <div className="row min-vh-100 align-items-center">
          <div className="col-lg-7 text-white py-5">

            <div className="hero-badge mb-3">
              <span>⚡ Certificados RETIE · Colombia</span>
            </div>

            <h1 className="hero-titulo display-3 fw-bold mb-3">
              Soluciones eléctricas
              <span className="hero-titulo-acento d-block">
                para tu hogar y empresa
              </span>
            </h1>

            <p className="hero-descripcion lead mb-4">
              Instalaciones, mantenimiento y modernización eléctrica con
              los más altos estándares de seguridad. Atendemos Medellín y el
              Área Metropolitana.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-5">
              <a href="#servicios" className="btn btn-voltec btn-lg px-5">
                Ver servicios
              </a>
              <a href="#contacto" className="btn btn-outline-light btn-lg px-5">
                Solicitar cotización
              </a>
            </div>

            <div className="row g-3">
              {estadisticas.map((stat, index) => (
                <div key={index} className="col-6 col-sm-3">
                  <div className="stat-card text-center p-3">
                    <div className="stat-numero">{stat.numero}</div>
                    <div className="stat-etiqueta">{stat.etiqueta}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;