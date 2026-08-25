# Documentación de código frontend, backend, CSS, JavaScript y React

## 1. ¿Qué significa documentar código?

Documentar código consiste en explicar su propósito, las decisiones importantes y la forma correcta de utilizarlo. Una buena documentación debe ayudar a otra persona, o a nosotros mismos dentro de unos meses, a entender y mantener el proyecto.

La documentación debe ser:

- **Clara:** usa palabras sencillas y evita ambigüedades.
- **Concreta:** explica lo necesario sin repetir lo que ya es evidente en el código.
- **Actualizada:** debe cambiar cuando cambia el comportamiento del programa.
- **Útil:** incluye ejemplos, parámetros, valores de retorno, errores y restricciones cuando corresponda.

No se debe comentar cada línea. Por ejemplo, este comentario no aporta información:

```javascript
// Suma uno a contador
contador++;
```

Es más útil explicar una decisión o una regla del negocio:

```javascript
// El contador empieza en cero porque representa intentos usados, no el número de turno.
contador++;
```

## 2. Documentación de código frontend

El **frontend** es la parte de la aplicación que se ejecuta en el navegador y con la que interactúa la persona usuaria. Incluye HTML, CSS, JavaScript, React y otras tecnologías de interfaz.

Al documentar frontend conviene explicar:

- Qué pantalla, componente o funcionalidad resuelve.
- Qué datos recibe y qué eventos produce.
- Cómo se comporta en estados de carga, vacío, error y éxito.
- Qué validaciones y reglas de accesibilidad aplica.
- Qué tamaños de pantalla y navegadores son compatibles.
- Cómo ejecutar la aplicación y cómo probar la interfaz.

La documentación general suele estar en un `README.md`. La documentación cercana al código puede estar en comentarios, JSDoc, historias de Storybook o documentación de componentes.

Ejemplo de documentación de una función de frontend:

```javascript
/**
 * Muestra el precio con el formato monetario de España.
 * @param {number} amount - Importe en euros.
 * @returns {string} Importe formateado, por ejemplo, "12,50 €".
 */
function formatPrice(amount) {
	return new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currency: 'EUR'
	}).format(amount);
}
```

## 3. Diferencias entre frontend y backend

El **backend** se ejecuta en el servidor. Gestiona reglas de negocio, autenticación, bases de datos, archivos, servicios y APIs. El frontend normalmente consume esos servicios y presenta sus resultados.

| Aspecto | Frontend | Backend |
| --- | --- | --- |
| Lugar de ejecución | Navegador o dispositivo cliente | Servidor |
| Documenta principalmente | Pantallas, componentes, estados, eventos y estilos | Endpoints, modelos, reglas, permisos, errores y dependencias |
| Público principal | Personas usuarias y desarrolladores frontend | Desarrolladores, administradores y otros servicios |
| Aspectos importantes | Accesibilidad, responsive design y compatibilidad | Seguridad, rendimiento, validación y disponibilidad |
| Ejemplos de documentación | Guía de componentes, capturas y flujos de interfaz | Contrato de API, esquema de datos y variables de entorno |

Una diferencia importante es que la documentación del frontend describe la experiencia y la interacción, mientras que la del backend describe contratos, procesamiento y datos. Ambos lados deben documentar los contratos compartidos: nombres de campos, tipos, estados HTTP, errores y autenticación.

## 4. ¿Cómo se documenta CSS?

CSS se documenta explicando la intención visual y las reglas que no son obvias. El propio selector suele describir qué elemento se modifica, por lo que no hace falta comentar cada propiedad.

Se recomienda documentar:

- El propósito de un componente visual o de una sección.
- Variables de color, tipografía, espaciado y puntos de ruptura.
- Convenciones de nombres, como BEM o nombres basados en componentes.
- Estados especiales: `:hover`, `:focus`, deshabilitado, error o cargando.
- Excepciones relacionadas con compatibilidad o superposición de capas.

Ejemplo:

```css
:root {
	/* Tokens compartidos para mantener consistencia visual. */
	--color-primary: #1769aa;
	--space-md: 1rem;
}

/* Estado de error usado después de una validación fallida. */
.form-control--error {
	border-color: #b42318;
}

.form-control--error:focus {
	outline: 3px solid rgb(180 35 24 / 25%);
}
```

Para proyectos grandes, además de comentarios, es útil mantener una guía de estilos con ejemplos de botones, formularios, colores, espaciados y estados accesibles. Los comentarios CSS deben explicar **por qué** existe una regla cuando el motivo no se deduce del selector.

## 5. ¿Cómo se documenta JavaScript?

JavaScript puede documentarse con comentarios normales para decisiones internas y con **JSDoc** para funciones, clases, módulos y APIs públicas. JSDoc permite que editores y herramientas muestren tipos y descripciones mediante IntelliSense.

Ejemplo de una función:

```javascript
/**
 * Busca un usuario por su identificador.
 * @param {number} userId - Identificador único del usuario.
 * @returns {Promise<{id: number, name: string} | null>} Usuario o null si no existe.
 * @throws {Error} Si la respuesta del servidor no es correcta.
 */
async function getUser(userId) {
	const response = await fetch(`/api/users/${userId}`);

	if (!response.ok) {
		throw new Error('No se pudo obtener el usuario');
	}

	return response.json();
}
```

Etiquetas JSDoc habituales:

- `@param`: describe un parámetro.
- `@returns`: describe el valor devuelto.
- `@throws`: documenta errores que puede lanzar.
- `@example`: muestra un uso real.
- `@deprecated`: indica que una API ya no debe utilizarse.
- `@typedef`: define la forma de un objeto.

Buenas prácticas para JavaScript:

- Usa nombres descriptivos para que el código se explique por sí mismo.
- Documenta entradas, salidas, efectos secundarios y errores.
- Indica si una función modifica datos externos, el DOM o el estado global.
- Documenta formatos de fecha, unidades, valores permitidos y casos límite.
- Mantén la documentación sincronizada con las pruebas.

## 6. ¿Cómo se documenta React?

En React se documentan principalmente los componentes, sus props, el estado, los eventos y los estados visuales. Un componente debería dejar claro qué recibe, qué muestra y qué comportamiento ofrece.

Ejemplo con JSDoc y PropTypes:

```jsx
import PropTypes from 'prop-types';

/**
 * Muestra una alerta y permite cerrarla.
 * @param {object} props - Propiedades del componente.
 * @param {'info'|'error'} props.type - Tipo visual de la alerta.
 * @param {string} props.message - Mensaje que se mostrará.
 * @param {() => void} props.onClose - Función ejecutada al cerrar.
 */
function Alert({ type, message, onClose }) {
	return (
		<div role="alert" className={`alert alert--${type}`}>
			<span>{message}</span>
			<button type="button" onClick={onClose} aria-label="Cerrar alerta">
				Cerrar
			</button>
		</div>
	);
}

Alert.propTypes = {
	type: PropTypes.oneOf(['info', 'error']).isRequired,
	message: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
};
```

En proyectos que usan TypeScript, las interfaces o tipos sustituyen a `PropTypes` para describir las props. También conviene documentar explícitamente:

- Props obligatorias y opcionales, con sus valores permitidos.
- Qué eventos disparan los callbacks y qué argumentos reciben.
- Estados de carga, error, vacío y contenido.
- Dependencias importantes de `useEffect` y efectos secundarios.
- Reglas de accesibilidad, como roles, etiquetas y navegación con teclado.
- Composición: qué elementos hijos acepta y dónde se renderizan.

Para componentes reutilizables, una tabla de props resulta fácil de consultar:

| Prop | Tipo | Obligatoria | Descripción |
| --- | --- | --- | --- |
| `type` | `'info' \| 'error'` | Sí | Define el estilo de la alerta. |
| `message` | `string` | Sí | Texto que se muestra. |
| `onClose` | `() => void` | Sí | Callback al pulsar el botón de cierre. |

## 7. Documentación mínima recomendada para un proyecto

Un proyecto frontend o full stack debería incluir, como mínimo:

1. `README.md` con objetivo, requisitos, instalación, comandos y estructura principal.
2. Variables de entorno documentadas en un archivo de ejemplo, sin incluir secretos reales.
3. Contratos de API con endpoints, parámetros, respuestas y errores.
4. Documentación de componentes reutilizables y sus estados.
5. Instrucciones para ejecutar pruebas, lint y build.
6. Registro de decisiones técnicas relevantes cuando una elección pueda parecer extraña.

La mejor documentación combina un README breve para empezar, documentación específica junto al código y pruebas que funcionen como ejemplos ejecutables.
