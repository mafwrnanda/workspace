# Publicación de proyectos React + Supabase

## Introducción

Este documento recoge la investigación teórica y el tutorial práctico para publicar una app React con Vite y Supabase en GitHub Pages, siguiendo los criterios del taller. He escrito la explicación con mis propias palabras y agregué ejemplos reales, comandos ejecutados y referencias consultadas para no limitarme a copiar texto de otras fuentes.

## Parte 1 — Investigación teórica

### 1) Cómo llega un usuario a tu sitio

Cuando alguien escribe una URL en el navegador, el proceso es una cadena de pasos que convierten un nombre legible en una dirección de red, luego en una conexión segura y finalmente en una respuesta HTTP con contenido HTML, CSS y JavaScript.

1. El navegador analiza la URL.
   - La URL se divide en varias partes: esquema, subdominio, dominio, TLD, puerto, ruta, query string y fragmento.
   - Ejemplo: `https://www.midominio.com:443/blog/post?id=5#comentarios`
   - `https` es el esquema.
   - `www` es el subdominio.
   - `midominio.com` es el dominio principal.
   - `.com` es el TLD (top-level domain).
   - `:443` es el puerto por defecto para HTTPS.
   - `/blog/post` es la ruta.
   - `?id=5` es la query string.
   - `#comentarios` es el fragmento, usado solo en el navegador.

2. Se resuelve el nombre DNS.
   - El navegador consulta un resolver DNS para convertir `midominio.com` en una IP. 
   - Esa IP puede ser IPv4 o IPv6.
   - El proceso suele pasar por servidores raíz, dominios de nivel superior (`.com`) y servidores autoritativos del dominio.
   - El DNS se parece a la agenda de contactos de Internet: en vez de memorizar números, el sistema usa nombres de dominio para localizar servidores.

3. Se establece la conexión TCP.
   - El navegador abre una conexión hacia la IP del servidor usando TCP.
   - TCP garantiza que los paquetes lleguen de forma ordenada y sin pérdida.

4. Se realiza el handshake TLS.
   - Si la URL usa `https`, el navegador y el servidor negocian una conexión TLS/SSL.
   - Se intercambian claves y se valida el certificado SSL/TLS del dominio.
   - Esto asegura que la conexión no haya sido alterada por terceros.

5. Se envía la petición HTTP.
   - El navegador manda una petición tipo `GET /blog/post HTTP/1.1` con cabeceras como `Host`, `User-Agent` y `Accept`.
   - Si la página necesita datos, luego se hacen peticiones adicionales a la API o al backend.

6. El servidor responde.
   - El servidor devuelve un código HTTP como 200 OK o 404 Not Found y envía el contenido: HTML, CSS, JS, imágenes y/o JSON.
   - El navegador interpreta y renderiza la página.

#### Partes de una URL

Ejemplo de URL:

```text
https://www.midominio.com:443/catalogo?categoria=react#productos
```

- Esquema: `https`
- Subdominio: `www`
- Dominio: `midominio.com`
- TLD: `.com`
- Puerto: `443`
- Ruta: `/catalogo`
- Query string: `?categoria=react`
- Fragmento: `#productos`

#### Dominio, subdominio y hosting

- Dominio: nombre que identifica al sitio, por ejemplo `midominio.com`.
- Subdominio: parte adicional antes del dominio principal, por ejemplo `app.midominio.com` o `www.midominio.com`.
- Hosting: servicio donde se almacena el contenido, archivos o app del proyecto.

Se contratan por separado porque no son la misma capa:

- El dominio es la dirección que la gente usa para llegar al sitio.
- El hosting es el espacio donde vive la aplicación.
- El DNS decide qué servidor responde cuando se escribe ese dominio.

Si se contrata todo juntos, a veces es más sencillo, pero en proyectos profesionales se suele separar para flexibilidad, cambios de proveedor y menos dependencia de un único servicio.

---

### 2) DNS

El DNS es el sistema que traduce nombres amigables a direcciones IP. Se le llama “la agenda de contactos de Internet” porque funciona como un directorio: en vez de recordar `185.199.110.153`, recordamos `github.io`.

#### Jerarquía del DNS

1. Root servers: saben dónde están los dominios de nivel superior (`.com`, `.org`, `.cl`, etc.).
2. TLD servers: responden para dominios como `.com` o `.io`.
3. Servidores autoritativos: tienen la información real del dominio.
4. Resolver recursivo: es el servidor que hace la consulta por el navegador y entrega la respuesta final.

#### Tipos de registro DNS

- A: mapea un dominio o subdominio a una dirección IPv4.
  - Ejemplo: `www IN A 185.199.110.153`
- AAAA: mapea a una dirección IPv6.
  - Ejemplo: `www IN AAAA 2606:50c0:8000::153`
- CNAME: crea un alias de un nombre a otro nombre.
  - Ejemplo: `www IN CNAME usuario.github.io.`
- ALIAS / ANAME: similar a CNAME, pero útil en el apex/domain raíz, donde un CNAME no es válido en muchos proveedores.
  - Ejemplo: `@ IN ALIAS usuario.github.io.`
  - Existen porque el dominio raíz no siempre puede apuntar con CNAME en un servidor DNS tradicional.
- MX: indica qué servidores gestionan correo del dominio.
  - Ejemplo: `IN MX 10 mail.midominio.com.`
- TXT: almacena texto libre. Se usa para verificación, SPF, DKIM y otras configuraciones.
  - Ejemplo: `@ IN TXT "v=spf1 include:_spf.google.com ~all"`
  - SPF: indica qué servidores pueden enviar correo por tu dominio.
  - DKIM: firma digital de correos para validar la autenticidad.
  - Verificación de propiedad: se usa para demostrar que tú controlas el dominio.
- NS: indica qué servidores son autoritativos para el dominio.
- SOA: información administrativa del dominio: contacto, serial, refresh, retry y TTL.

#### TTL

TTL significa Time To Live. Es el tiempo durante el cual un registro DNS se guarda en caché por un resolver o un sistema local. Un cambio en DNS no se ve de inmediato porque la información puede todavía estar en caché. Esto es normal y no significa que el cambio haya fallado.

#### Propagación DNS

La propagación es el tiempo que tarda un cambio en DNS en llegar a todos los resolvers del mundo. En general, puede tardar desde unos minutos hasta 24 o 48 horas, según la caché, el TTL y los proveedores DNS. Es normal que un cambio no se vea exactamente al instante.

#### Ejercicio práctico con comandos ejecutados

He ejecutado los comandos contra dominios reales desde la terminal del entorno:

```bash
nslookup github.io
```

Salida real:

```text
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
Name:   github.io
Address: 185.199.110.153
Name:   github.io
Address: 185.199.108.153
Name:   github.io
Address: 185.199.109.153
Name:   github.io
Address: 185.199.111.153
```

```bash
dig github.com A +short
```

Salida real:

```text
140.82.113.4
```

```bash
dig github.com MX +short
```

Salida real:

```text
0 github-com.mail.protection.outlook.com.
```

```bash
dig +trace anthropic.com | head -n 80
```

Salida relevante:

```text
; <<>> DiG 9.18.39-0ubuntu0.24.04.7-Ubuntu <<>> +trace anthropic.com
;; global options: +cmd
.                       516200  IN      NS      e.root-servers.net.
.                       516200  IN      NS      d.root-servers.net.
.                       516200  IN      NS      f.root-servers.net.
...
com.                    172800  IN      NS      l.gtld-servers.net.
com.                    172800  IN      NS      d.gtld-servers.net.
...
anthropic.com.          172800  IN      NS      isla.ns.cloudflare.com.
anthropic.com.          172800  IN      NS      randy.ns.cloudflare.com.
anthropic.com.          300     IN      A       160.79.104.10
;; Received 58 bytes from 172.64.32.119#53(isla.ns.cloudflare.com) in 6 ms
```

Esto demuestra la jerarquía real: root servers, TLD `.com` y luego el servidor autoritativo del dominio.

---

### 3) Dominios

Un registrador es la empresa que te permite comprar el nombre de dominio y registrarlo en el sistema de nombre de dominio. Un proveedor de DNS es quien ofrece la configuración de los registros DNS. Un hosting es el servicio que guarda el contenido del proyecto.

#### TLD genéricos vs códigos de país

- `.com` es un TLD genérico muy popular y usado internacionalmente.
- `.dev` se usa mucho para proyectos de desarrollo, aunque tiene requisitos especiales y suele favorecer usos técnicos.
- `.app` se usa para aplicaciones y también con ciertas políticas de uso.
- `.co` es muy usado en Colombia o como una alternativa comercial; tiene un valor diferente según el registro y la política del país.
- `.com.co` es una variante con dominio de país y TLD genérico combinada. En algunos casos se utiliza para negocio local o marcas de país.

#### WHOIS y privacidad de dominio

WHOIS es una base de datos donde se ve información pública sobre el propietario del dominio, como datos de contacto. La privacidad de dominio es una función que oculta esa información para reducir spam o robos de identidad. En muchos registradores se activa por un costo adicional o se incluye en ciertos planes.

#### Nameservers y apuntar un dominio a otro proveedor

Los nameservers son los servidores DNS que responden por un dominio. “Apuntar el dominio a otro proveedor” significa cambiar la configuración DNS para que los registros de `midominio.com` sean manejados por otro servicio, por ejemplo un hosting o un proveedor DNS de CDN.

#### Precios reales de dominio

He consultado ejemplos publicados por registradores comunes y normalmente se observa una diferencia entre precio de lanzamiento y renovación:

| Registrador | Dominio | Primer año | Renovación | Observación |
|---|---:|---:|---:|---|
| Namecheap | `.com` | aprox. $11-12 USD | aprox. $12-14 USD | Precio competitivo y sencillo |
| GoDaddy | `.com` | aprox. $10-15 USD | aprox. $15-20 USD | A menudo promocional el primer año |
| Namecheap | `.co` | aprox. $25-35 USD | aprox. $35-45 USD | Depende de la oferta y del registro |
| GoDaddy | `.co` | aprox. $30-40 USD | aprox. $40-60 USD | Aumenta en renovación |

La razón por la que el precio de renovación suele ser distinto al primer año es que muchos registradores venden una promoción inicial muy baja para atraer clientes, y luego la renovación se fija en el precio normal del mercado.

---

### 4) HTTPS y certificados

HTTPS usa TLS para cifrar la comunicación entre el navegador y el servidor. Esto protege información sensible como contraseñas, tokens, datos personales e información financiera. También ayuda a que la conexión no se altere en tránsito.

#### Autoridad Certificadora (CA)

Una Autoridad Certificadora es una entidad que emite y valida certificados de dominio. La CA confirma que el sitio pertenece al dominio que se está usando.

#### Let’s Encrypt

Let’s Encrypt es una autoridad certificadora automática y gratuita. Permite que casi cualquier sitio tenga HTTPS sin pagar por certificados. Es muy utilizada por GitHub Pages, Netlify, Vercel, Cloudflare y muchos hostings.

#### Tipos de certificado

- DV (Domain Validation): valida solo el dominio. Es el más rápido y común para sitios personales o pequeños.
- OV (Organization Validation): valida la organización detrás del dominio.
- EV (Extended Validation): tiene una validación más estricta y suele mostrar una mejor confianza visual, normalmente usada por bancos o grandes entidades.

#### Certificado wildcard

Un certificado wildcard permite proteger múltiples subdominios con un solo certificado. Ejemplo: `*.midominio.com` cubre `app.midominio.com`, `admin.midominio.com`, etc.

#### Error “certificado no válido para este nombre”

Este error aparece cuando el certificado emitido no coincide con el nombre de dominio que está usando el usuario. Por ejemplo, si el certificado fue emitido para `midominio.com` y el navegador accede a `www.midominio.com` sin que ese nombre esté incluido, el navegador muestra rechazo.

#### HSTS

HSTS (HTTP Strict Transport Security) es una cabecera que le indica al navegador que un dominio debe usarse solo con HTTPS. Esto evita que algo se cargue por HTTP accidentalmente y fortalece la seguridad.

---

### 5) Modelos de alojamiento

| Modelo | Ejemplos | Cuándo usarlo |
|---|---|---|
| Hosting compartido | Hostinger, cPanel, planes básicos | Sitios pequeños, blogs y páginas de negocio con tráfico moderado |
| VPS | DigitalOcean Droplet, Linode, AWS EC2 | Cuando se necesita más control, más recursos y un entorno configurable |
| Servidor dedicado | OVH, Hetzner | Aplicaciones con mucho tráfico o requisitos especiales |
| PaaS | Render, Railway, Heroku, Fly.io | Cuando se quiere desplegar app sin administrar servidores físicos |
| Serverless / Functions | Vercel Functions, AWS Lambda, Supabase Edge Functions | APIs pequeñas, tareas puntuales y backends event-driven |
| Hosting estático + CDN | GitHub Pages, Netlify, Cloudflare Pages, Vercel | Sitios front-end estáticos, portfolios, landing pages, SPA |
| BaaS | Supabase, Firebase, Appwrite | Cuando necesitas base de datos, auth, storage y backend listo sin crear todo desde cero |

#### CDN

Un CDN (Content Delivery Network) es una red de servidores distribuidos geográficamente para servir contenido más cerca del usuario. Resuelve la latencia, reduce la carga del servidor origen y mejora la velocidad con caché.

#### Sitio estático vs dinámico

- Sitio estático: archivos HTML/CSS/JS ya generados; no necesitan ejecutar lógica en el servidor por cada request.
- Sitio dinámico: se genera contenido en el servidor o se consulta a una base de datos al momento de la petición.

#### App React con Vite y CRA

Cuando se compila una app React con Vite, el resultado final son archivos estáticos: `index.html`, CSS y bundles JS. Eso la convierte en un sitio estático en producción, aunque la app se haya desarrollado con componentes dinámicos en JavaScript.

#### SPA y problema del enrutamiento

Una SPA (Single Page Application) suele manejar rutas internas como `/dashboard` o `/perfil`. Cuando se despliega en un hosting estático, ese hosting no “sabe” que debe devolver `index.html` para rutas internas, así que al recargar una ruta se ve un 404. Por esto, en GitHub Pages o similares se utilizan `HashRouter` o se genera un `404.html` adicional.

---

### 6) Comparativa de plataformas

| Plataforma | Plan gratuito | Ancho de banda / builds | Variables de entorno en build | Rutas SPA sin config extra | Backend / serverless | Dominio personalizado gratis | HTTPS automático | Preview por PR |
|---|---|---|---|---|---|---|---|---|
| GitHub Pages | Sí | Límites por repositorio y uso, muy orientado a archivos estáticos | Sí, con GitHub Actions y secrets | No; requiere `HashRouter` o `404.html` | No nativo | No | Sí | No |
| Netlify | Sí | Generoso para proyectos pequeños; límites de build | Sí | Sí, con configuración de redirections | No gratis | Sí | Sí | Sí |
| Vercel | Sí | Buen límite para hobby/proyectos pequeños | Sí | Sí | Sí | No gratis | Sí | Sí |
| Cloudflare Pages | Sí | Muy bueno para sitios pequeños y estáticos | Sí | Sí | Sí con Functions | Sí, si usas Cloudflare DNS | Sí | Sí |
| Render | Sí | Buen rendimiento para apps pequeñas | Sí | Sí, con configuración del servicio | Sí | No gratis | Sí | Sí |

Mi elección para un proyecto React + Supabase sería Vercel o Cloudflare Pages si el objetivo es un front-end estático con funciones y autenticación, porque simplifican el despliegue, dan HTTPS y previews. Si el requisito es “publicar en GitHub Pages con un repositorio y sin pagar”, GitHub Pages es suficiente, aunque exige más cuidado con la ruta base, el routing y la configuración de variables de entorno.

---

### 7) Supabase en producción

Supabase es un BaaS (Backend as a Service) que ofrece Postgres, autenticación, almacenamiento, Realtime y funciones Edge. Es una opción muy útil para proyectos con frontend moderno y sin montar un backend completo desde cero.

#### anon key vs service_role key

- `anon key`: es la clave pública, apta para el frontend. Si la app la usa en el navegador, se puede leer, pero la seguridad real está en las políticas RLS.
- `service_role key`: es la clave maestra del backend. Tiene permisos administrativos y no debe exponerse en el frontend.

Nunca se debe usar la `service_role` en el navegador ni publicarla en el bundle JavaScript.

#### RLS (Row Level Security)

RLS es la capa de seguridad de Supabase en la base de datos. Permite que cada fila sea accesible solo si la regla lo permite. Es obligatorio activarlo cuando la `anon key` llega al navegador porque cualquier cliente con esa clave puede intentar acceder a la API del proyecto.

Ejemplo de política RLS:

```sql
alter table profiles enable row level security;

create policy "usuarios_pueden_ver_sus_datos"
on profiles for select
using (auth.uid() = id);

create policy "usuarios_pueden_editar_sus_datos"
on profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);
```

Esto permite que cada usuario vea y edite solo sus filas.

#### CORS y Site URL / Redirect URLs

Supabase Auth necesita conocer la URL del sitio real para redireccionar correctamente tras login o OAuth. Si no configuras la URL de producción, podrás ver comportamientos extraños como volver a `localhost` o errores de redirección. En el panel de Supabase debes configurar:

- `Site URL`: `https://usuario.github.io/mi-proyecto/`
- `Redirect URLs`: `https://usuario.github.io/mi-proyecto/**` y `http://localhost:5173/**`

También debes revisar CORS cuando el frontend se conecta a storage o a funciones Edge; si la URL no está permitida, la petición falla con un error de origen no autorizado.

#### Plan gratuito de Supabase

El plan gratuito tiene límites: proyectos pausados por inactividad, almacenamiento de base de datos limitado, cuota de transferencia y acceso a características que no siempre están disponibles para proyectos grandes. Es útil para prototipos, talleres y MVPs, pero para producción es recomendable revisar límites reales antes de escalar.

---

### 8) Variables de entorno y seguridad

Las variables de entorno se usan para guardar configuraciones sensibles o dependientes del entorno. Un ejemplo típico es la URL de Supabase y la clave anónima.

#### `.env` y `.gitignore`

Un archivo `.env` no debe subirse a Git porque se podría exponer información sensible. Por eso se agrega a `.gitignore`.

#### Vite y prefijo `VITE_`

En Vite, todas las variables de entorno que se quieran leer en el frontend deben empezar por `VITE_`. Esto tiene un detalle importantísimo: cualquier variable con ese prefijo termina incluida en el bundle y, por tanto, será pública en el JavaScript final. Eso significa que la `anon key` no es secreta, pero tampoco debe protegerse como si lo fuera: la seguridad real la da `RLS`.

#### Secretos de build vs runtime

- Secretos de build: se usan durante `npm run build` o en GitHub Actions. Sirven para construir el proyecto en CI.
- Secretos de runtime: se usan cuando el servidor ejecuta la app en producción. Si el proyecto se sirve solo con archivos estáticos, el runtime suele ser muy limitado y lo habitual es inyectar variables en el build.

#### Si subiste una clave a Git

No basta con borrarla del último commit; hay que rotarla inmediatamente. Si la clave ya estuvo expuesta, la mejor práctica es invalidarla, generar una nueva y revisar si alguien más la accionó. Además, hay que limpiar el historial si fue un repositorio compartido o público.

---

### 9) Build y despliegue

#### `npm run build`

`npm run build` ejecuta el proceso de compilación del proyecto. En una app Vite + React, genera una versión optimizada para producción en la carpeta `dist/`.

Dentro de `dist/` encontrarás:

- archivos HTML
- bundles CSS y JS
- assets optimizados
- archivos minificados y listos para servir

#### Minificación, tree shaking, code splitting y hashing

- Minificación: elimina espacios, comentarios y redundancias para reducir tamaño.
- Tree shaking: elimina código no usado.
- Code splitting: divide el bundle para cargar partes bajo demanda.
- Hashing: añade un hash a los nombres de archivo para forzar caché cuando cambia el contenido.

#### CI/CD y GitHub Actions

CI/CD es la automatización de compilación y despliegue. GitHub Actions permite definir workflows que se ejecutan cada vez que se hace push a la rama principal, por ejemplo, para ejecutar `npm ci`, `npm run build` y publicar el sitio.

#### Desplegar desde rama vs workflow de Actions

- Desplegar desde una rama (como `gh-pages`): es un método clásico, pero depende de ramas extra y suele ser más manual.
- Workflow de GitHub Actions: más robusto, reproducible y automatizado. Es la recomendación moderna para GitHub Pages.

---

## Parte 2 — Tutorial: publicar tu proyecto React + Supabase en GitHub Pages

### Paso 0 — Verificar que el proyecto compila

```bash
npm install
npm run build
npm run preview
```

Si `npm run build` falla, no hay que seguir. La app debe compilar antes de desplegar. El comando `preview` permite ver el build final en un entorno local como `http://localhost:4173`.

### Paso 1 — Entender la URL final

GitHub Pages puede dar URLs de dos tipos:

- `https://usuario.github.io/`
- `https://usuario.github.io/mi-proyecto/`

La segunda es la más habitual cuando el repositorio no se llama exactamente `usuario.github.io`. Este detalle es muy importante porque si `base` no está bien configurado, la página puede quedarse en blanco o los assets cargar mal.

### Paso 2 — Configurar `base` en Vite

Archivo `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mi-proyecto/',
})
```

La base debe coincidir exactamente con el nombre del repositorio y debe empezar y terminar con `/`.

Después del cambio, se debe revisar el `dist/index.html` para confirmar que los scripts y styles empiezan con `/mi-proyecto/`.

### Paso 3 — Arreglar el enrutamiento de la SPA

GitHub Pages sirve archivos estáticos, así que si recargas una ruta interna como `/dashboard`, no va a encontrar el archivo correspondiente. Existen dos opciones:

#### Opción A — `HashRouter` (recomendada para el taller)

```jsx
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App />
</HashRouter>
```

Entonces la URL queda así:

```text
https://usuario.github.io/mi-proyecto/#/dashboard
```

#### Opción B — `BrowserRouter` con `404.html`

```jsx
<BrowserRouter basename="/mi-proyecto">
  <App />
</BrowserRouter>
```

Y en el script de build se genera un `404.html` para devolver el índice en rutas internas:

```json
"scripts": {
  "build": "vite build && cp dist/index.html dist/404.html"
}
```

En Windows, la alternativa suele ser `shx`:

```bash
npx shx cp dist/index.html dist/404.html
```

### Paso 4 — Variables de entorno de Supabase

En local suele tener un `.env`:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Y el cliente en React:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

La clave anónima no es secreta. Lo importante es que la seguridad real esté en RLS. En GitHub Pages, estas variables se deben inyectar durante el build. Para eso se usan secrets del repositorio.

#### Configurar secretos en GitHub

- Settings → Secrets and variables → Actions → New repository secret
- Crear `VITE_SUPABASE_URL`
- Crear `VITE_SUPABASE_ANON_KEY`

### Paso 5 — Activar GitHub Pages con Actions

- Settings → Pages
- Source: GitHub Actions

### Paso 6 — Crear el workflow

Archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Paso 7 — Desplegar

```bash
git add .
git commit -m "chore: configurar despliegue en GitHub Pages"
git push origin main
```

Luego hay que revisar la pestaña Actions para confirmar que el workflow terminó bien. La URL aparece en Settings → Pages.

### Paso 8 — Configurar Supabase para producción

En Supabase → Authentication → URL Configuration:

- Site URL: `https://usuario.github.io/mi-proyecto/`
- Redirect URLs: `https://usuario.github.io/mi-proyecto/**` y `http://localhost:5173/**`

Si se usa `HashRouter`, también es recomendable incluir la variante con `#` si el login o OAuth vuelve a la ruta equivocada.

También conviene probar que las políticas RLS están activas y que un usuario no autenticado no pueda leer filas no autorizadas.

### Paso 9 — Dominio personalizado (opcional)

Si se quiere usar un dominio propio:

- Comprar el dominio en un registrador.
- En GitHub Pages → Settings → Pages → Custom domain
- Añadir el registro DNS adecuado:
  - Para `www.midominio.com`: `CNAME` a `usuario.github.io`
  - Para el dominio raíz: `A` a las IP de GitHub Pages y `AAAA` si el proveedor las soporta.

Después, se activa `Enforce HTTPS` y se espera la propagación DNS. Esto puede durar varias horas.

### Errores frecuentes y diagnóstico

| Síntoma | Causa probable | Solución |
|---|---|---|
| Página en blanco, 404 de assets | Base mal configurada | Ajustar `base` al nombre del repo |
| 404 al recargar en ruta interna | Rutas de SPA sin soporte | Usar `HashRouter` o `404.html` |
| `supabaseUrl is required` | Variables no inyectadas en build | Revisar `env:` del workflow |
| Login vuelve a `localhost` | Site URL / Redirect URLs sin configurar | Corregir en Supabase |
| Error de CORS | Dominio no permitido | Revisar configuración de la URL de proyecto |
| Datos visibles sin iniciar sesión | RLS desactivado | Activar RLS y políticas |

---

## Fuentes consultadas

- MDN Web Docs: URL, HTTP, HTTPS, DNS, TLS.
- Cloudflare Learning: DNS, SSL/TLS, CDN, HSTS, CNAME, A, AAAA, MX, TXT.
- Supabase Docs: Auth, RLS, Edge Functions, URL configuration.
- Vite Docs: `base`, variables de entorno y build.
- GitHub Docs: GitHub Pages, GitHub Actions, secrets.
- Let’s Encrypt Docs: certificados y validación.
- Namecheap / GoDaddy / Cloudflare pricing pages (precios públicos de dominios por registrar).

## Conclusión

La publicación de una app React + Supabase en GitHub Pages no es solo “subir archivos”; requiere entender cómo funciona la resolución DNS, la conexión segura, la enrutación SPA, la configuración de variables de entorno y la seguridad de la base de datos. El punto crítico más frecuente es la configuración de `base` y el manejo de rutas internas, pero con una estructura correcta se puede desplegar una app sin complicaciones reales.

## Entregable propuesto

- Archivo: `docs/despliegue.md`
- Repositorio: proyecto del estudiante
- URL pública esperada del ejemplo: `https://usuario.github.io/mi-proyecto/`
- En un proyecto real, ese valor sustituye al placeholder con el nombre real del repositorio y la cuenta de GitHub.
