function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nombre: "", email: "", telefono: "", servicio: "", mensaje: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
    setEnviado(true);
  };

  const contactInfo = [
    { icono: "bi-telephone-fill", label: "Teléfono",   valor: "+57 (4) 312 456 7890" },
    { icono: "bi-envelope-fill",  label: "Correo",     valor: "contacto@voltajesas.com" },
    { icono: "bi-geo-alt-fill",   label: "Dirección",  valor: "Cra. 48 #19–30, El Poblado, Medellín" },
    { icono: "bi-clock-fill",     label: "Horario",    valor: "Lun–Vie 7am–6pm · Sáb 8am–2pm" },
  ];

  return (
    <section className="container py-5">
      <div className="row g-4">

        {/* Columna izquierda — información de contacto */}
        <div className="col-md-4">
          <div className="bg-primary text-white rounded-3 p-4 h-100">
            <h4 className="fw-bold mb-1">Contáctanos</h4>
            <p className="text-white-50 small mb-4">
              Un técnico te responderá en menos de 2 horas.
            </p>

            {contactInfo.map((item, i) => (
              <div key={i} className="d-flex gap-3 mb-3">
                <div className="bg-white bg-opacity-10 rounded p-2 d-flex align-items-center">
                  <i className={`bi ${item.icono} text-warning`}></i>
                </div>
                <div>
                  <p className="text-white-50 small mb-0">{item.label}</p>
                  <p className="mb-0 small">{item.valor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — formulario */}
        <div className="col-md-8">
          <div className="border rounded-3 p-4">
            <h5 className="fw-bold mb-4">¿En qué podemos ayudarte?</h5>

            {enviado ? (
              <div className="text-center py-4">
                <i className="bi bi-check-circle-fill text-success fs-1 d-block mb-3"></i>
                <h5>¡Solicitud enviada!</h5>
                <p className="text-muted">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre completo</label>
                    <input
                      name="nombre"
                      type="text"
                      className="form-control"
                      placeholder="Tu nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="correo@ejemplo.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input
                      name="telefono"
                      type="tel"
                      className="form-control"
                      placeholder="+57 300 000 0000"
                      value={form.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Tipo de servicio</label>
                    <select
                      name="servicio"
                      className="form-select"
                      value={form.servicio}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Selecciona un servicio</option>
                      <option>Instalación residencial</option>
                      <option>Instalación industrial</option>
                      <option>Paneles solares</option>
                      <option>Emergencia eléctrica</option>
                      <option>Diagnóstico energético</option>
                      <option>Redes y tomas especiales</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Mensaje</label>
                    <textarea
                      name="mensaje"
                      className="form-control"
                      rows={4}
                      placeholder="Describe brevemente el trabajo que necesitas..."
                      value={form.mensaje}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Enviar solicitud
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}