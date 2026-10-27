import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from './supabaseClient'

const EMPTY_FORM = {
  nombre: '',
  descripcion: '',
  precio: '',
}

function Productos({ session }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)

  const userId = session.user.id
  const currency = useMemo(
    () =>
      new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 2,
      }),
    [],
  )

  const consultarProductos = useCallback(() =>
    supabase
      .from('productos')
      .select('id, user_id, nombre, descripcion, precio, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
  [userId])

  const cargarProductos = useCallback(async () => {
    setLoading(true)
    setErrorMsg('')
    const { data, error } = await consultarProductos()
    if (error) {
      setErrorMsg(error.message)
    } else {
      setProductos(data ?? [])
    }

    setLoading(false)
  }, [consultarProductos])

  useEffect(() => {
    let isMounted = true

    consultarProductos().then(({ data, error }) => {
      if (!isMounted) return
      if (error) {
        setErrorMsg(error.message)
      } else {
        setProductos(data ?? [])
      }
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [consultarProductos])

  const limpiarFormulario = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setErrorMsg('')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMsg('')
    setNotice('')

    const precio = Number.parseFloat(form.precio)
    if (!Number.isFinite(precio) || precio < 0) {
      setErrorMsg('Escribe un precio válido mayor o igual a cero.')
      return
    }

    setSaving(true)
    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim() || null,
      precio,
    }

    const response = editingId
      ? await supabase
          .from('productos')
          .update(payload)
          .eq('id', editingId)
          .eq('user_id', userId)
      : await supabase.from('productos').insert({ ...payload, user_id: userId })

    if (response.error) {
      setErrorMsg(response.error.message)
      setSaving(false)
      return
    }

    limpiarFormulario()
    setSaving(false)
    setNotice(editingId ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.')
    await cargarProductos()
  }

  const handleEditar = (producto) => {
    setEditingId(producto.id)
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion ?? '',
      precio: String(producto.precio),
    })
    setNotice('')
    setErrorMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEliminar = async (producto) => {
    const confirmar = window.confirm(`¿Seguro que deseas eliminar “${producto.nombre}”?`)
    if (!confirmar) return

    setErrorMsg('')
    setNotice('')
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', producto.id)
      .eq('user_id', userId)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    setNotice('Producto eliminado correctamente.')
    await cargarProductos()
  }

  return (
    <section className="products-panel" aria-labelledby="products-title">
      <header className="products-heading">
        <div>
          <p className="eyebrow">CATÁLOGO PRIVADO</p>
          <h1 id="products-title">Mis productos</h1>
          <p>Administra tu inventario: cada registro solo es visible para ti.</p>
        </div>
        <div className="product-count" aria-label={`${productos.length} productos`}>
          <strong>{productos.length}</strong>
          <span>{productos.length === 1 ? 'producto' : 'productos'}</span>
        </div>
      </header>

      <div className="products-grid">
        <article className="product-form-card">
          <div className="card-heading">
            <span className="card-kicker">{editingId ? 'EDITANDO' : 'NUEVO REGISTRO'}</span>
            <h2>{editingId ? 'Actualiza el producto' : 'Añade un producto'}</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej. Agenda artesanal"
                maxLength={120}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Cuenta brevemente de qué se trata"
                maxLength={500}
                rows={4}
              />
            </div>

            <div className="field-group">
              <label htmlFor="precio">Precio (COP)</label>
              <input
                id="precio"
                name="precio"
                type="number"
                min="0"
                step="0.01"
                value={form.precio}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>

            {errorMsg && (
              <p className="form-message error" role="alert">
                {errorMsg}
              </p>
            )}
            {notice && (
              <p className="form-message success" role="status">
                {notice}
              </p>
            )}

            <div className="form-actions">
              <button className="primary-button" type="submit" disabled={saving}>
                {saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear producto'}
                {!saving && <span aria-hidden="true">→</span>}
              </button>
              {editingId && (
                <button className="ghost-button" type="button" onClick={limpiarFormulario}>
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </article>

        <article className="product-list-card">
          <div className="card-heading list-heading">
            <div>
              <span className="card-kicker">REGISTROS GUARDADOS</span>
              <h2>Tu catálogo</h2>
            </div>
            <button className="refresh-button" type="button" onClick={cargarProductos} disabled={loading}>
              ↻ <span className="sr-only">Actualizar lista</span>
            </button>
          </div>

          {loading ? (
            <div className="empty-products">
              <div className="loading-orb" aria-hidden="true" />
              <p>Cargando productos…</p>
            </div>
          ) : productos.length === 0 ? (
            <div className="empty-products">
              <div className="empty-icon" aria-hidden="true">＋</div>
              <h3>Aún no hay productos</h3>
              <p>Tu primer registro aparecerá aquí cuando lo crees.</p>
            </div>
          ) : (
            <div className="product-list">
              {productos.map((producto) => (
                <div className="product-row" key={producto.id}>
                  <div className="product-info">
                    <div className="product-avatar" aria-hidden="true">
                      {producto.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3>{producto.nombre}</h3>
                      <p>{producto.descripcion || 'Sin descripción'}</p>
                    </div>
                  </div>
                  <div className="product-meta">
                    <strong>{currency.format(Number(producto.precio))}</strong>
                    <div className="row-actions">
                      <button type="button" onClick={() => handleEditar(producto)}>
                        Editar
                      </button>
                      <button type="button" onClick={() => handleEliminar(producto)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  )
}

export default Productos
