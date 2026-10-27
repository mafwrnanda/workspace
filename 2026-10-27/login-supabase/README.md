# Login con Supabase + React

Práctica del 27 de octubre de 2026: formulario de registro e inicio de sesión conectado a Supabase Auth.

## Requisitos

- Node.js 20 o superior.
- Un proyecto activo en Supabase con el proveedor **Email** habilitado.

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

Abre la URL que muestre Vite. La pantalla permite cambiar entre **Iniciar sesión** y **Crear cuenta**; después de entrar se muestra el correo de la sesión activa y el botón **Cerrar sesión**.

## Validar

```bash
npm run lint
npm run build
```

No se versiona `.env`; solo `.env.example` forma parte del repositorio.
