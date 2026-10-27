# Login y CRUD de productos con Supabase + React

Práctica del 27 de octubre de 2026: autenticación y catálogo privado de productos con React, Vite y Supabase.

## Requisitos

- Node.js 20 o superior.
- Un proyecto activo en Supabase con el proveedor **Email** habilitado.
- La migración `create_productos_crud` aplicada en el proyecto Supabase.

## Configuración local

1. Copia `.env.example` como `.env`.
2. En el panel de Supabase, abre **Project Settings → API** y completa:

   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
   ```

   Usa únicamente la clave pública `anon`/publishable en el frontend. Nunca uses `service_role`.

3. En **Authentication → URL Configuration**, registra `http://localhost:5173` como URL del sitio o redirect permitido. Si ejecutas la app en Codespaces, agrega también la URL pública del puerto 5173.
4. En **Authentication → Providers**, verifica que **Email** esté habilitado. Si quieres entrar inmediatamente después de registrarte durante la práctica, desactiva temporalmente la confirmación de email.

## Ejecutar

```bash
npm install
npm run dev -- --host
```

Abre la URL que muestre Vite. La pantalla permite cambiar entre **Iniciar sesión** y **Crear cuenta**. Después de autenticarte aparece el catálogo privado, donde puedes crear, consultar, editar y eliminar tus productos.

## Base de datos y seguridad

La tabla `public.productos` se creó con estas columnas: `id`, `user_id`, `nombre`, `descripcion`, `precio` y `created_at`. Tiene una referencia a `auth.users`, un índice por `user_id` y Row Level Security activado.

Las cuatro políticas RLS garantizan que un usuario solo pueda consultar, crear, actualizar o eliminar filas cuyo `user_id` coincida con su sesión. La aplicación también filtra por `user_id` en las lecturas, actualizaciones y eliminaciones como defensa adicional.

La migración aplicada es:

```text
create_productos_crud
```

Su definición queda versionada en `supabase/migrations/20261027192657_create_productos_crud.sql`.

## Validar

```bash
npm run lint
npm run build
```

Prueba el flujo con un usuario autenticado: crea un producto, edítalo, actualiza la lista y elimínalo. Para comprobar RLS completamente, utiliza dos usuarios distintos y verifica que cada uno solo vea sus propios registros.

No se versiona `.env`; solo `.env.example` forma parte del repositorio.
