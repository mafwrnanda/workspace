const servicios = [
  {
    icono: "bi-house-fill",
    titulo: "Instalaciones residenciales",
    descripcion: "Instalación completa de sistemas eléctricos para casas y apartamentos, cumpliendo normas NTC.",
  },
  {
    icono: "bi-building",
    titulo: "Instalaciones industriales",
    descripcion: "Montaje y cableado de tableros, motores y maquinaria de alta potencia.",
  },
  {
    icono: "bi-sun-fill",
    titulo: "Paneles solares",
    descripcion: "Diseño e instalación de sistemas fotovoltaicos on-grid y off-grid para reducir tu factura.",
  },
  {
    icono: "bi-exclamation-triangle-fill",
    titulo: "Emergencias 24/7",
    descripcion: "Atención inmediata ante cortocircuitos, apagones o cualquier falla eléctrica urgente.",
  },
  {
    icono: "bi-graph-up-arrow",
    titulo: "Diagnóstico energético",
    descripcion: "Auditoría del consumo para identificar desperdicios y optimizar costos.",
  },
  {
    icono: "bi-plug-fill",
    titulo: "Redes y tomas especiales",
    descripcion: "Instalación de tomacorrientes 220V y circuitos para equipos sensibles.",
  },
];

function Servicios() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Nuestros servicios</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {servicios.map((servicio, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <i className={`bi ${servicio.icono} fs-2 text-warning mb-3 d-block`}></i>
                <h5 className="card-title">{servicio.titulo}</h5>
                <p className="card-text text-muted">{servicio.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}