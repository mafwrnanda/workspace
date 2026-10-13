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
