const razones = [
  {
    icono: "bi-patch-check-fill",
    titulo: "Técnicos certificados RETIE",
    descripcion: "Todo nuestro personal está certificado bajo la reglamentación técnica eléctrica vigente en Colombia.",
  },
  {
    icono: "bi-clock-fill",
    titulo: "Respuesta en menos de 2 horas",
    descripcion: "Para emergencias eléctricas, garantizamos presencia en sitio en un máximo de dos horas.",
  },
  {
    icono: "bi-shield-fill-check",
    titulo: "Garantía escrita en todos los trabajos",
    descripcion: "Cada instalación incluye garantía documentada de 12 meses sobre materiales y mano de obra.",
  },
  {
    icono: "bi-cash-coin",
    titulo: "Precios transparentes sin sorpresas",
    descripcion: "Entregamos cotización detallada antes de iniciar. Sin costos ocultos ni cobros adicionales.",
  },
];

function SobreNosotros() {
  return (
    <section className="container py-5">
      <div className="row align-items-center g-5">

        {/* Columna izquierda — imagen */}
        <div className="col-md-5">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600"
            alt="Técnico eléctrico trabajando"
            className="img-fluid rounded-3"
          />
        </div>

        {/* Columna derecha — texto y razones */}
        <div className="col-md-7">
          <p className="text-uppercase text-primary fw-semibold small mb-1">¿Quiénes somos?</p>
          <h2 className="fw-bold mb-4">Más de 18 años iluminando hogares y empresas</h2>

          <p className="text-muted">
            Voltaje S.A.S nació en Medellín en 2005 con una misión clara: ofrecer soluciones
            eléctricas confiables, seguras y eficientes para hogares, comercios e industrias.
            A lo largo de casi dos décadas hemos construido una reputación sólida gracias a la
            calidad de nuestro trabajo y al compromiso con cada cliente.
          </p>

          <p className="text-muted">
            Contamos con ingenieros y técnicos certificados que se mantienen al día con las
            normativas RETIE y NTC 2050. Desde una instalación residencial hasta un proyecto
            industrial de gran escala, tratamos cada obra con el mismo nivel de rigor.
          </p>

          <hr />

          <h5 className="fw-semibold mb-3">¿Por qué elegirnos?</h5>

          <ul className="list-unstyled">
            {razones.map((razon, index) => (
              <li key={index} className="d-flex gap-3 mb-3">
                <div className="bg-primary bg-opacity-10 rounded p-2 d-flex align-items-center">
                  <i className={`bi ${razon.icono} text-primary fs-5`}></i>
                </div>
                <div>
                  <p className="fw-semibold mb-0">{razon.titulo}</p>
                  <p className="text-muted small mb-0">{razon.descripcion}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}