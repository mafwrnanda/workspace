# Taller: cookies en aplicaciones web

**Proyecto práctico:** `9-06`, una SPA de React + Vite. En esta copia local no hay dependencia ni inicialización de Supabase Auth; por eso no atribuyo a este proyecto una sesión o un token que no existe en su código. Las comprobaciones de una sesión desplegada y las capturas reales de DevTools se deben completar en el navegador indicado en cada ejercicio.

## Parte 1 — Investigación

### 1. Qué es una cookie

Una cookie es un dato pequeño que un sitio pide al navegador que conserve. Cuando una petición posterior coincide con su dominio, ruta y reglas de seguridad, el navegador puede adjuntarla automáticamente. Se usa, por ejemplo, para recordar una sesión o una preferencia. No conviene guardar en ella información grande ni secretos que JavaScript pueda leer.

| | Cookie | `localStorage` | `sessionStorage` |
|---|---|---|---|
| ¿Se envía automáticamente al servidor? | Sí, en peticiones que coinciden con su ámbito y atributos. | No; la aplicación tendría que leerla y enviarla. | No; la aplicación tendría que leerla y enviarla. |
| ¿Sobrevive a cerrar el navegador? | Si tiene `Expires` o `Max-Age`, normalmente sí; una cookie de sesión no está pensada para sobrevivir. | Sí, hasta que el usuario o la aplicación la borre. | No normalmente: queda ligada a esa pestaña o sesión de navegación. |
| ¿Tiene expiración configurable? | Sí, con `Expires` o `Max-Age`. | No tiene vencimiento automático; se elimina explícitamente. | Termina al cerrar la pestaña/sesión; no acepta una fecha de expiración propia. |
| ¿Tamaño máximo aproximado? | Unos 4 KiB por cookie; el navegador también limita el número total por sitio. | Varios MiB por origen, a menudo alrededor de 5 MiB, según el navegador. | Varios MiB por origen, con límites que dependen del navegador. |
| ¿Accesible desde JavaScript? | Sí, salvo que lleve `HttpOnly`; `document.cookie` solo muestra las cookies permitidas a ese script. | Sí, desde scripts del mismo origen. | Sí, desde scripts del mismo origen y contexto de pestaña. |

Los límites son aproximados, no una cuota garantizada. Las cookies además viajan en muchas peticiones, por lo que llenarlas de datos aumenta el tráfico.

HTTP es *stateless* porque una petición no trae por sí sola una memoria confiable de las peticiones anteriores: el servidor puede tratarlas como intercambios independientes. Una cookie permite que el navegador presente un identificador o preferencia en la siguiente petición. En una sesión típica, ese valor identifica estado que el servidor conserva; la cookie no convierte HTTP en un protocolo con memoria propia.

### 2. Cómo se crea una cookie

El servidor solicita guardar una cookie con `Set-Cookie` en la respuesta. En una petición posterior el navegador puede enviarla en `Cookie`, con pares `nombre=valor`. `Set-Cookie` es una cabecera de respuesta y normalmente se envía una línea por cookie; `Cookie` es la cabecera de petición.

JavaScript puede crear una cookie visible para él asignando una cadena a `document.cookie`:

```js
document.cookie = 'tema=oscuro; Path=/; Max-Age=3600; SameSite=Lax';
```

La API es incómoda porque asignar no reemplaza una colección completa: cada asignación agrega o actualiza una cookie según su nombre, dominio y ruta. Leer `document.cookie` devuelve una cadena con los pares visibles, no atributos como `Path` o `Expires`; hay que dividirla y decodificarla con cuidado. Tampoco permite establecer `HttpOnly`.

La diferencia relevante no es que una cookie del servidor tenga una forma distinta: ambos casos terminan en una cookie del navegador. El servidor la crea enviando `Set-Cookie` y puede marcarla `HttpOnly`; JavaScript la crea con `document.cookie`, por lo que no puede hacerla `HttpOnly`. La cookie creada en el navegador tampoco se guarda automáticamente en el servidor.

### 3. Atributos

Ejemplo de respuesta con varios atributos:

```http
Set-Cookie: sid=abc123; Max-Age=1800; Path=/; Secure; HttpOnly; SameSite=Lax
```

- **`Expires` y `Max-Age`:** definen cuándo deja de ser válida. `Expires` lleva una fecha HTTP; `Max-Age` una duración en segundos y, si ambos aparecen, normalmente prevalece `Max-Age`. Si no se especifica ninguno, es una cookie de sesión: el navegador la conserva en el contexto de sesión y la elimina al terminarlo, aunque la restauración de sesión del navegador puede hacer que una sesión parezca continuar. Ejemplos: `Set-Cookie: aviso=leido; Expires=Wed, 21 Oct 2026 07:28:00 GMT; Path=/` y `Set-Cookie: sid=abc123; Max-Age=1800; Path=/`.
- **`Domain` y `Path`:** acotan dónde se envía. Si se omite `Domain`, queda limitada al host que la creó (*host-only*); no se comparte con subdominios. Un `Domain=ejemplo.com` explícito suele permitir también subdominios de ese dominio, lo que amplía quién recibe la cookie. `Path` limita las rutas; si se omite, el navegador calcula una ruta predeterminada basada en la URL que la creó, no necesariamente `/`. Ejemplo: `Set-Cookie: preferencia=compacta; Domain=ejemplo.com; Path=/cuenta`.
- **`Secure`:** solicita que la cookie se envíe solo por una conexión segura HTTPS. Omitirlo permite que pueda viajar por HTTP. En una web HTTP normal no se debe depender de una cookie `Secure`: los navegadores pueden rechazarla o no enviarla; localhost tiene excepciones de desarrollo. Ejemplo: `Set-Cookie: sid=abc123; Secure; Path=/`.
- **`HttpOnly`:** impide que JavaScript del sitio lea el valor mediante `document.cookie`. Reduce el robo directo de una cookie de sesión si hay XSS, aunque el script inyectado aún podría hacer peticiones como el usuario o alterar la página. Si se omite, una cookie compatible con el dominio/ruta queda disponible a JavaScript. Ejemplo: `Set-Cookie: sid=abc123; HttpOnly; Secure; Path=/`. Solo el servidor puede establecer este atributo.
- **`SameSite`:** controla el envío en contextos entre sitios. “Sitio” no equivale exactamente a origen: se tiene en cuenta el sitio registrable y, en navegadores modernos, el esquema.
  - `Strict`: el navegador no adjunta la cookie en una navegación que llega desde otro sitio. Si alguien sigue un enlace externo hacia la cuenta, normalmente tendrá que cargar primero la página sin esa cookie y navegar dentro del sitio para recuperarla. Tampoco se envía en un `<iframe>` embebido desde otro sitio.
  - `Lax`: se envía en navegación principal entre sitios con método seguro, como seguir un enlace que hace `GET`; normalmente no se envía en un `POST` entre sitios ni en un iframe de otro sitio. Suele ser el equilibrio práctico para cookies de sesión.
  - `None`: permite el envío en contextos entre sitios, por ejemplo un iframe de un proveedor integrado, sujeto a las políticas de bloqueo/partición del navegador. Requiere `Secure` en navegadores modernos.

  Ejemplos: `Set-Cookie: sid=1; SameSite=Strict; Secure; Path=/`, `Set-Cookie: sid=1; SameSite=Lax; Secure; Path=/` y `Set-Cookie: widget=1; SameSite=None; Secure; Path=/`.
- **`Partitioned` (CHIPS):** permite una cookie de terceros particionada por el sitio de nivel superior que la contiene. Así, un servicio embebido puede recordar estado separado en cada sitio que lo integra, sin usar una única cookie compartida para rastrear a la persona a través de todos ellos. No es una forma de recuperar el rastreo transversal. Ejemplo: `Set-Cookie: widget=preferencia; Secure; SameSite=None; Partitioned; Path=/`.

### 4. Primera parte y terceros

Una cookie de **primera parte** pertenece al sitio que la persona está visitando. Una cookie de **terceros** pertenece a otro sitio cuyo contenido se carga dentro de esa página, como un iframe, una imagen o un script. La clasificación depende del contexto de navegación, no solo del nombre de la cookie.

Los navegadores han limitado las cookies de terceros porque permitían que una red externa reconociera el mismo navegador al visitar muchos sitios, construyendo perfiles sin una relación directa con cada página. Safari limita el rastreo con Intelligent Tracking Prevention; Firefox particiona almacenamiento con Total Cookie Protection; Chrome combina controles y cambios de privacidad. La política concreta depende de la versión, configuración, modo y tipo de cookie, así que no es correcto asumir que toda cookie de terceros se comporta igual en todos los navegadores.

Un uso legítimo puede ser que un proveedor de identidad mantenga la sesión de inicio de sesión dentro de un iframe de una aplicación que lo integra, o que un servicio de pago mantenga un flujo de pago embebido. Un uso de rastreo es que una red publicitaria reconozca un identificador en páginas de noticias, tiendas y blogs distintos para unir visitas y elegir anuncios. Si el navegador bloquea esa cookie, el servicio legítimo debe ofrecer un flujo alternativo; CHIPS puede servir cuando solo necesita estado aislado por sitio.

### 5. Sesiones y autenticación

Una **sesión de servidor** es estado guardado por el backend, normalmente asociado a un identificador aleatorio. El navegador recibe ese ID como cookie y lo devuelve en las peticiones que correspondan. El ID no debería contener los datos completos de la sesión ni ser predecible.

Con **sesión y cookie**, el servidor busca la sesión asociada al identificador; puede invalidarla centralmente. Con un **JWT**, el emisor firma un conjunto de declaraciones y un servicio puede verificarlo sin buscar una sesión en cada petición, aunque revocarlo antes de su vencimiento requiere medidas adicionales. JWT describe el formato del token, no dónde debe guardarse: puede ir en una cookie, en `localStorage` o solo en memoria.

`localStorage` es cómodo, pero cualquier JavaScript que se ejecute con el origen de la aplicación puede leer un JWT guardado allí. Un XSS podría copiarlo y enviarlo a un atacante. Una cookie `HttpOnly` evita ese acceso directo desde JavaScript; en cambio, el navegador la adjunta automáticamente a peticiones coincidentes y eso crea el riesgo de CSRF. `localStorage` no se adjunta automáticamente a una petición de otro sitio: el código de la aplicación debe leerlo y agregarlo, por ejemplo como `Authorization: Bearer ...`, así que no tiene ese mismo mecanismo de CSRF. XSS sigue siendo peligroso en ambos diseños.

Un **refresh token** permite obtener nuevos tokens de acceso cuando estos expiran. Suele durar más y por eso es más valioso para un atacante; se restringe, rota y guarda con más protección, por ejemplo en una cookie `HttpOnly` cuando la arquitectura usa cookies, en lugar de exponerlo innecesariamente al código de la página.

### 6. XSS y CSRF

**XSS (Cross-Site Scripting):** si una página inserta contenido no confiable como HTML ejecutable, un atacante podría lograr que el navegador ejecute un script con el origen del sitio. Sin `HttpOnly`, podría leer `document.cookie` y transmitir la cookie de sesión. Con `HttpOnly`, ese valor no aparece en `document.cookie`; el script todavía podría realizar acciones dentro de la página, por lo que también hay que prevenir XSS.

**CSRF (Cross-Site Request Forgery):** el navegador adjunta cookies automáticamente, aunque el usuario no haya escrito el valor. Ejemplo conceptual: la víctima inició sesión en `banco.example`; después visita un sitio malicioso; ese sitio intenta enviar un formulario a `banco.example`; si el navegador incluye la cookie de sesión y el banco acepta la petición sin comprobar la intención del usuario, el banco podría procesar la acción como autenticada. El origen atacante no necesita leer la respuesta para intentar provocar el envío.

`SameSite=Lax` suele bloquear cookies en `POST` de origen cruzado y `Strict` es más restrictivo, por eso reducen muchos CSRF. No son una defensa completa: las reglas dependen del flujo, algunos ataques pueden aprovechar navegación segura, subdominios o endpoints mal diseñados, y otros mecanismos de autenticación cambian el análisis. Para acciones sensibles se complementa con un **CSRF token** impredecible asociado a la sesión, verificación del origen cuando corresponda y métodos HTTP/controles de autorización correctos.

### 7. Privacidad y consentimiento

En la Unión Europea, la regla de privacidad de comunicaciones electrónicas (ePrivacy, aplicada por cada país) generalmente exige consentimiento previo para almacenar o leer información en el dispositivo, salvo lo estrictamente necesario para transmitir una comunicación o prestar un servicio solicitado. Cuando hay datos personales también aplican las obligaciones del RGPD: informar con claridad, tener base jurídica, limitar el propósito y permitir retirar el consentimiento con facilidad. Consentir debe ser una elección afirmativa, informada y específica; navegar o dejar seleccionado todo por defecto no equivale por sí solo a consentimiento válido.

En Colombia, la Ley 1581 de 2012 y su reglamentación exigen, en términos generales, autorización previa e informada para tratar datos personales cuando esa sea la base aplicable, además de informar finalidades y respetar derechos del titular. No toda cookie implica automáticamente el mismo tratamiento ni todas las obligaciones son idénticas a las europeas; depende de qué dato recolecta, para qué se usa y de la norma aplicable. La excepción para lo técnicamente necesario debe justificarse, no usarse como etiqueta para analítica o publicidad.

Las cookies **estrictamente necesarias** pueden mantener una sesión solicitada, recordar el carrito durante la compra o balancear una conexión; bajo las excepciones aplicables no requieren consentimiento de cookies, aunque sí deben explicarse cuando corresponda. Las de **analítica no esencial** o **marketing/publicidad** normalmente requieren consentimiento previo donde aplica esa regla y deben permanecer desactivadas hasta que la persona elija.

Un **banner o gestor de consentimiento** presenta información comprensible y permite, como mínimo, aceptar o rechazar de forma comparable, elegir categorías (por ejemplo, necesarias, analítica y marketing), cambiar la decisión después y retirar el consentimiento sin obstáculos. Debe registrar la elección de forma razonable y no disparar categorías no esenciales antes de obtener permiso.

### 8. Supabase Auth

En una aplicación de navegador que usa `@supabase/supabase-js`, Auth persiste la sesión en `localStorage` por defecto si la persistencia está habilitada. La clave se puede ver en DevTools bajo el almacenamiento local del origen; su nombre suele derivarse del ref del proyecto (`sb-<project-ref>-auth-token`), aunque puede personalizarse. Para frameworks con renderizado del lado servidor está `@supabase/ssr`, con clientes de servidor/navegador y adaptadores de cookies para intercambiar la sesión entre ambos entornos.

Una SPA estática de React no tiene un servidor propio que responda al navegador con `Set-Cookie: HttpOnly`. El SDK se ejecuta en el navegador y JavaScript no puede marcar `HttpOnly`, por eso `localStorage` es la opción por defecto habitual de `supabase-js`. Para cookies `HttpOnly` suele hacer falta una capa servidor o un framework SSR que administre y actualice las cookies.

En CORS, el servidor debe responder con `Access-Control-Allow-Origin` cuyo valor permita el origen exacto de la web, por ejemplo `https://usuario.github.io` (el origen no incluye la ruta del proyecto). Para solicitudes con credenciales también se configuran `Access-Control-Allow-Credentials: true` y las reglas pertinentes; no se combina credenciales con `Access-Control-Allow-Origin: *`. El navegador envía `Origin` automáticamente y el servidor decide si autoriza ese origen. En Supabase, las APIs gestionadas suelen resolver sus propios encabezados; en una Edge Function hay que devolver los encabezados CORS apropiados. `Site URL` y `Redirect URLs` de Auth sirven para redirecciones de autenticación, no sustituyen a CORS. Un error de CORS no se arregla añadiendo una cabecera desde JavaScript del cliente.

### 9. DevTools

- **Chrome:** abrir DevTools → **Application** → **Storage** → **Cookies** → elegir el origen.
- **Firefox:** abrir DevTools → **Storage** → **Cookies** → elegir el origen.

La tabla suele incluir `Name` (nombre), `Value` (contenido, a veces oculto o redactado), `Domain` (hosts permitidos), `Path` (rutas), `Expires / Max-Age` (fecha o `Session`), `Size` (tamaño aproximado), `HttpOnly` (inaccesible a JavaScript), `Secure` (solo transporte seguro) y `SameSite` (regla entre sitios). Chrome puede mostrar también `Priority`, `SameParty` o información de partición; las columnas varían por navegador y versión.

Para borrar solo una cookie, selecciona el origen y la fila concreta en esa tabla y usa **Delete**/la tecla Supr o el menú contextual de esa fila. No uses “Clear site data” si quieres conservar las demás.

## Parte 2 — Ejercicios

### A. Inspeccionar cookies reales

**Evidencia que falta completar en tu navegador:** abre tu sitio desplegado o `https://github.com`, entra en DevTools → Application/Storage → Cookies y toma una captura propia donde se lean las columnas pedidas. No adjunto una captura simulada: este entorno de edición no tiene acceso a tu navegador autenticado ni a tus datos de DevTools.

Pega aquí el archivo de imagen de tu captura y completa las observaciones según lo que realmente aparezca:

> **Captura A:** insertar aquí la captura propia de DevTools.
>
> - Cookie con `Expires = Session`: `[nombre observado o “ninguna”]`.
> - Cookie con fecha fija: `[nombre y fecha observados o “ninguna”]`.
> - `HttpOnly`: `[nombres marcados o “ninguna”]`.
> - Resultado de `document.cookie`: `[pegar el resultado real de la consola]`.
> - Comparación: `[indicar si una cookie con HttpOnly aparece; no debería aparecer en document.cookie]`.

Prueba en la consola:

```js
document.cookie
```

`document.cookie` no es un inventario de todas las cookies del navegador. En particular, omite las `HttpOnly` y solo incluye las que coinciden con el documento actual.

### B. Crear y leer cookies con JavaScript

Ejecutando las instrucciones del enunciado, la cookie de prueba se puede comprobar así:

```js
document.cookie = 'tema=oscuro; path=/; max-age=3600';
console.log(document.cookie);
// Si no hay otras cookies visibles: tema=oscuro

document.cookie = 'tema=; path=/; max-age=0';
console.log(document.cookie);
// Si no hay otras cookies visibles: cadena vacía
```

En una página real pueden aparecer otros pares en ambos resultados; anota la salida real de tu consola. `document.cookie = ''` no borra todo porque la asignación crea/actualiza una sola cookie identificada por nombre, dominio y ruta. Para borrar una cookie se escribe otra con ese mismo ámbito y una expiración pasada o `Max-Age=0`. Se repite `path=/` para que coincida con la ruta de la cookie original; si cambia el `Path` o el `Domain`, se puede estar intentando borrar otra cookie distinta y la original permanece.

### C. Helper propio y selector React

El helper completo también está en [cookies.js](../9-06/src/utils/cookies.js). No utiliza librerías. `setCookie` admite los días de expiración y las opciones `secure`, `sameSite`, `path` y `domain`; si no se pasan días, queda como cookie de sesión. `getCookie` devuelve `null` si no encuentra una cookie visible. `deleteCookie` reutiliza `setCookie` con duración negativa. Ninguna implementación JavaScript puede asignar `HttpOnly`.

Código final:

```js
/**
 * Crea una cookie accesible desde JavaScript.
 * @param {string} nombre Nombre de la cookie.
 * @param {string} valor Valor que se guardara.
 * @param {number} [diasExpiracion] Dias hasta que expire; si se omite, sera de sesion.
 * @param {{secure?: boolean, sameSite?: 'Strict'|'Lax'|'None', path?: string, domain?: string}} [opciones]
 * Atributos opcionales: Secure, SameSite, Path y Domain. HttpOnly no puede
 * configurarse desde JavaScript; debe establecerlo el servidor.
 */
export function setCookie(nombre, valor, diasExpiracion, opciones = {}) {
  const atributos = [
    `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}`,
    `Path=${opciones.path ?? '/'}`,
  ];

  if (Number.isFinite(diasExpiracion)) {
    atributos.push(`Max-Age=${Math.floor(diasExpiracion * 24 * 60 * 60)}`);
  }
  if (opciones.domain) atributos.push(`Domain=${opciones.domain}`);
  if (opciones.sameSite) atributos.push(`SameSite=${opciones.sameSite}`);
  if (opciones.secure) atributos.push('Secure');

  document.cookie = atributos.join('; ');
}

/**
 * Lee una cookie visible para JavaScript.
 * @param {string} nombre Nombre exacto de la cookie.
 * @returns {string|null} Valor decodificado o null si no existe/no es visible.
 */
export function getCookie(nombre) {
  const prefijo = `${encodeURIComponent(nombre)}=`;
  const cookie = document.cookie
    .split('; ')
    .find((elemento) => elemento.startsWith(prefijo));

  if (!cookie) return null;

  try {
    return decodeURIComponent(cookie.slice(prefijo.length));
  } catch {
    return cookie.slice(prefijo.length);
  }
}

/**
 * Expira una cookie usando el mismo Path y Domain con que fue creada.
 * @param {string} nombre Nombre de la cookie.
 * @param {{path?: string, domain?: string}} [opciones] Path/Domain originales.
 */
export function deleteCookie(nombre, opciones = {}) {
  setCookie(nombre, '', -1, opciones);
}
```

En [App.jsx](../9-06/src/App.jsx) el estado inicial se carga desde `tema`; el botón cambia entre `claro` y `oscuro`; un efecto actualiza el atributo `data-theme` y guarda la preferencia por 365 días. La opción `Secure` se activa automáticamente al servir la app por HTTPS y el atributo `SameSite=Lax` limita envíos entre sitios.

**Captura C pendiente:** inicia `9-06`, cambia el tema y recarga la página. Comprueba que conserva el tema; abre DevTools → Application/Storage → Cookies y captura la fila `tema` junto al selector visible. Inserta aquí esa imagen propia. En desarrollo local por HTTP, `Secure` estará desmarcado; al desplegar con HTTPS estará marcado.

### D. Simulación conceptual de CSRF

Este HTML hipotético usa un dominio reservado `.example`; no apunta a un servicio real y no debe enviarse contra ningún banco. Representa un formulario que se intentaría cargar desde un sitio atacante:

```html
<form action="https://banco.example/api/transferir-dinero" method="POST">
  <input type="hidden" name="destino" value="cuenta-controlada-por-atacante">
  <input type="hidden" name="monto" value="500">
</form>
<script>
  document.forms[0].submit();
</script>
```

Si el endpoint confía solo en una cookie de sesión y el navegador la adjunta, el servidor podría confundir esta petición con una acción de la persona autenticada. No se ejecutó este formulario.

Con `SameSite=Strict`, una cookie de sesión no se enviaría en este contexto entre sitios, así que el ejemplo no autenticaría la petición. Con `SameSite=Lax`, normalmente tampoco se envía en una petición `POST` entre sitios: `Lax` permite principalmente navegaciones de nivel superior con método seguro, como `GET`. El endpoint aún debe usar un token CSRF y verificar correctamente la acción; `SameSite` es una capa adicional, no la única.

### E. Auditoría del proyecto React + Supabase

En la copia de trabajo revisada, `9-06/package.json` no incluye `@supabase/supabase-js` y el código de `9-06/src` no crea un cliente ni una sesión de Supabase. Por tanto, no hay un token de Supabase de este proyecto local que se pueda encontrar en Local Storage o Cookies. La cookie `tema` añadida por este taller es una preferencia visual, no un token de autenticación. Si el taller anterior corresponde a otro despliegue, abre ese origen en DevTools → Application → Local Storage y Cookies y reemplaza esta observación con el resultado real; no copies tokens ni valores secretos al informe.

Si un XSS se ejecutara en una aplicación que guarda el token en `localStorage`, el script podría leerlo y exfiltrarlo, y un atacante podría reutilizarlo hasta su vencimiento o revocación. No he encontrado integración de autenticación en `9-06`, así que no puedo afirmar que esta SPA tenga hoy un token expuesto; eso no demuestra que toda la app sea inmune a XSS. Mitigaría XSS evitando HTML no confiable, escapando/sanitizando contenido cuando haya que renderizarlo, manteniendo dependencias al día y definiendo una Content-Security-Policy restrictiva (idealmente con nonces/hash, sin `unsafe-inline`). También limitaría permisos y duración de tokens, habilitaría RLS en Supabase y nunca pondría una `service_role` key en el cliente.

### Tabla resumen

| Atributo/concepto | ¿Lo usa este proyecto? | ¿Dónde se verificó? |
|---|---|---|
| `Secure` | Sí en `tema` cuando se ejecuta en HTTPS; no en el servidor de desarrollo HTTP. | Opciones de `setCookie` en `9-06/src/App.jsx`; confirmar la marca en DevTools del origen desplegado. |
| `HttpOnly` | No para `tema`; JavaScript no puede establecerlo. | Implementación de `9-06/src/utils/cookies.js`; fila `tema` en Cookies. |
| `SameSite` | Sí, `Lax` para `tema`. | Llamada a `setCookie` en `9-06/src/App.jsx`; columna SameSite de DevTools. |
| Cookies de terceros | No se implementan en el código del proyecto. | Revisión del código de `9-06`; la página cargada puede incluir recursos externos, comprobar DevTools. |
| Banner de consentimiento | No. La cookie `tema` solo guarda una preferencia local no esencial; no es un gestor de consentimiento. | Código actual de `9-06/src/App.jsx`. |
| Token de Supabase: ¿cookie o localStorage? | No hay integración/token Supabase en esta copia local; en un proyecto estándar `supabase-js` lo guarda en `localStorage` por defecto. | `9-06/package.json` y código fuente; verificar el proyecto anterior en DevTools antes de cerrar la auditoría. |

## Fuentes consultadas

- [MDN: HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [MDN: `Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
- [MDN: `document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
- [Chrome for Developers: CHIPS](https://developer.chrome.com/docs/privacy-sandbox/chips/)
- [Chrome DevTools: inspeccionar y borrar cookies](https://developer.chrome.com/docs/devtools/application/cookies/)
- [Firefox: Storage Inspector](https://firefox-source-docs.mozilla.org/devtools-user/storage_inspector/)
- [Supabase Auth: sesiones](https://supabase.com/docs/guides/auth/sessions)
- [Supabase: SSR](https://supabase.com/docs/guides/auth/server-side)
- [Supabase Edge Functions: CORS](https://supabase.com/docs/guides/functions/cors)
- [Unión Europea: cookies y privacidad](https://europa.eu/youreurope/business/dealing-with-customers/data-protection/online-privacy/index_es.htm)
- [Colombia: Ley 1581 de 2012](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981)
