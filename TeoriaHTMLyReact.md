# Teoría básica de HTML, CSS y React

Este documento explica las bases del desarrollo web con palabras sencillas. HTML organiza el contenido, CSS cambia su apariencia y React ayuda a construir interfaces reutilizables.

## 1. HTML

HTML significa *HyperText Markup Language*. Es el lenguaje que usamos para organizar el contenido de una página web: títulos, párrafos, imágenes, enlaces, formularios y otras partes.

### 1.1 ¿Qué es una etiqueta HTML?

Una etiqueta HTML es una marca que le indica al navegador qué tipo de contenido estamos escribiendo y qué función cumple. Por ejemplo, la etiqueta `p` representa un párrafo.

Normalmente una etiqueta tiene una apertura y un cierre. La apertura se escribe con `<p>` y el cierre con `</p>`. El contenido se coloca entre ambas:

```html
<p>Hola mundo</p>
```

En este ejemplo, `<p>` abre el párrafo, `Hola mundo` es el texto que se mostrará y `</p>` indica que el párrafo termina.

Las etiquetas también pueden tener atributos. Un atributo es información adicional que se escribe dentro de la etiqueta de apertura y modifica o describe su comportamiento. En el siguiente caso, `href` indica la dirección del enlace:

```html
<a href="https://www.google.com">Ir a Google</a>
```

`<a>` crea un enlace, `href` es el nombre del atributo, `"https://www.google.com"` es su valor y `Ir a Google` es el texto visible. Al hacer clic, el navegador irá a esa dirección.

No todas las etiquetas necesitan una etiqueta de cierre. Algunas son etiquetas vacías porque no contienen texto dentro. Por ejemplo, `<br>` hace un salto de línea y `<meta>` proporciona información sobre el documento.

### 1.2 Estructura de un archivo HTML

Un archivo HTML suele tener una estructura básica. Esta estructura ayuda al navegador a entender el documento y a mostrarlo correctamente.

```html
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Mi página</title>
</head>
<body>

	<h1>Hola mundo</h1>
	<p>Esta es mi primera página web.</p>

</body>
</html>
```

- `<!DOCTYPE html>` indica que el documento usa HTML5.
- `<html lang="es">` es el elemento principal que contiene toda la página. `lang="es"` informa que el idioma es español.
- `<head>` contiene información de configuración que normalmente no aparece como contenido principal.
- `<meta charset="UTF-8">` permite mostrar correctamente letras, acentos y otros caracteres.
- `<meta name="viewport" ...>` ayuda a que la página se adapte a pantallas pequeñas, como las de los teléfonos.
- `<title>` define el título que aparece en la pestaña del navegador.
- `<body>` contiene todo lo que el usuario ve en la página, como el título y el párrafo del ejemplo.

### 1.3 Cinco etiquetas de texto en HTML

Estas etiquetas permiten organizar y dar significado al texto:

1. **`<h1>`**: representa el título principal de una página. Es el encabezado más importante.

   ```html
   <h1>Mi título</h1>
   ```

   El navegador muestra `Mi título` como un encabezado grande y destacado.

2. **`<p>`**: representa un párrafo de texto.

   ```html
   <p>Este es un párrafo.</p>
   ```

   El texto aparece separado como un bloque de lectura.

3. **`<strong>`**: indica que un texto es importante. Generalmente se muestra en negrita.

   ```html
   <strong>Texto importante</strong>
   ```

   El navegador muestra `Texto importante` con mayor énfasis visual.

4. **`<em>`**: da énfasis a un texto. Generalmente se muestra en cursiva.

   ```html
   <em>Texto destacado</em>
   ```

   El texto aparece inclinado y se entiende que debe leerse con énfasis.

5. **`<br>`**: crea un salto de línea y no necesita una etiqueta de cierre.

   ```html
   Hola<br>
   mundo
   ```

   El navegador muestra `Hola` y `mundo` en líneas diferentes.

También podemos usar varias de estas etiquetas juntas:

```html
<h1>Mi título</h1>
<p>Este es un párrafo.</p>
<strong>Texto importante</strong>
<em>Texto destacado</em>
<br>
```

Cada etiqueta organiza o destaca una parte diferente del contenido.

### 1.4 Links en HTML

Los enlaces permiten que el usuario pase de una página o ubicación a otra. Para crearlos usamos la etiqueta `<a>`, que significa *anchor* o ancla. El atributo `href` contiene la dirección que se abrirá cuando el usuario haga clic.

```html
<a href="https://www.google.com">Visitar Google</a>
```

`<a>` crea el enlace, `href` guarda la dirección de destino y `Visitar Google` es el texto que el usuario puede pulsar. Al hacer clic, el navegador abre esa dirección.

Para abrir el enlace en una nueva pestaña se utiliza `target="_blank"`:

```html
<a href="https://www.google.com" target="_blank">
	Abrir Google en otra pestaña
</a>
```

En este caso, `href` sigue indicando el destino y `target="_blank"` le pide al navegador que lo abra en una pestaña nueva.

## 2. CSS

CSS es el lenguaje que usamos para dar estilo a una página HTML. Permite cambiar colores, tamaños, espacios, posiciones y tipos de letra. Así podemos presentar el contenido de una forma más clara y agradable.

### 2.1 ¿Qué es CSS?

```css
p {
	color: blue;
	font-size: 20px;
}
```

- `p` es el selector: indica que la regla se aplicará a las etiquetas de párrafo.
- `color` es la propiedad que cambia el color del texto.
- `blue` es el valor de `color` y significa azul.
- `font-size` es la propiedad que cambia el tamaño de la letra.
- `20px` es el valor del tamaño: 20 píxeles.

Las llaves contienen las reglas y cada declaración termina normalmente con un punto y coma.

### 2.2 Selectores CSS

Los selectores CSS sirven para elegir los elementos HTML a los que queremos aplicar estilos. Los tres selectores siguientes se diferencian por la forma en que eligen esos elementos.

#### Selector por etiqueta

```css
p {
	color: blue;
}
```

Este selector elige todos los párrafos y hace que su texto sea azul.

#### Selector por clase

HTML:

```html
<p class="texto">Hola mundo</p>
```

CSS:

```css
.texto {
	color: red;
}
```

El punto delante de `texto` indica una clase. Este estilo se aplica a cualquier elemento que tenga `class="texto"`.

#### Selector por ID

HTML:

```html
<p id="titulo">Hola mundo</p>
```

CSS:

```css
#titulo {
	color: green;
}
```

El signo `#` indica un ID. Un ID identifica normalmente un elemento concreto de la página.

En resumen, el selector por etiqueta puede afectar a muchos elementos del mismo tipo, una clase puede reutilizarse en varios elementos y un ID se reserva normalmente para un elemento específico. Las clases suelen ser la opción más práctica para repetir estilos.

### 2.3 Múltiples selectores CSS

Un mismo elemento HTML puede recibir propiedades de varias reglas CSS:

```html
<p class="destacado">Hola mundo</p>
```

```css
p {
	font-size: 20px;
}

.destacado {
	color: red;
}
```

El párrafo recibe el tamaño de letra de la regla `p` y el color rojo de la regla `.destacado`. Las dos reglas trabajan sobre el mismo elemento.

Si dos reglas intentan cambiar la misma propiedad, CSS decide cuál tiene prioridad. De forma sencilla, una regla más específica suele ganar: un ID es más específico que una clase, y una clase es más específica que una etiqueta. También influyen el orden de las reglas y otras reglas especiales de CSS.

## 3. React

### 3.1 ¿Qué es un componente de React?

Un componente de React es una parte reutilizable de una interfaz. Puede mostrar HTML mediante JSX, tener lógica para tomar decisiones, recibir información de otros componentes y guardar datos que cambian usando estado.

```jsx
function Saludo() {
	return (
		<h1>Hola mundo</h1>
	);
}

export default Saludo;
```

Paso a paso:

1. `function Saludo()` crea una función llamada `Saludo`.
2. `return` indica qué debe mostrar el componente.
3. `<h1>Hola mundo</h1>` es JSX y representa un título en la interfaz.
4. `export default Saludo` permite importar y utilizar este componente en otro archivo.

### 3.2 Componentes de React y etiquetas HTML

Una etiqueta HTML representa directamente un elemento de la interfaz:

```jsx
<h1>Hola mundo</h1>
```

Un componente puede devolver esa etiqueta y darle un nombre reutilizable:

```jsx
function Saludo() {
	return <h1>Hola mundo</h1>;
}
```

Ambos ejemplos terminan mostrando un título. La diferencia es que el segundo crea un componente, y ese componente puede usarse varias veces o agrupar muchas etiquetas HTML.

JSX permite escribir una sintaxis parecida a HTML dentro de JavaScript. No es exactamente HTML: por ejemplo, un componente se escribe con una función y puede incluir variables o lógica.

| Aspecto | Etiqueta HTML | Componente React |
| --- | --- | --- |
| Qué representa | Un elemento, como un título | Una parte reutilizable de la interfaz |
| Cómo se escribe | `<h1>Hola</h1>` | `function Saludo() { ... }` |
| Puede agrupar elementos | No es su objetivo principal | Sí, puede devolver varias etiquetas |
| Se puede reutilizar | Sí, escribiéndola de nuevo | Sí, usando `<Saludo />` |

## 4. Variables en un componente de React

Dentro de un componente podemos usar variables normales y constantes para guardar datos y mostrarlos en JSX. También existen los `props` y el `state`, que tienen un comportamiento especial dentro de React.

### Variable normal con `let`

```jsx
function App() {
	let nombre = "Laura";

	return <h1>Hola {nombre}</h1>;
}
```

`let` crea una variable cuyo valor puede cambiar más adelante. Las llaves `{nombre}` permiten insertar el valor de la variable dentro del JSX. Este componente mostraría `Hola Laura`.

### Constante con `const`

```jsx
function App() {
	const edad = 20;

	return <p>Tengo {edad} años</p>;
}
```

`const` crea un valor que no se puede reasignar después de su creación. Aquí el componente mostraría `Tengo 20 años`. Usamos `let` cuando necesitamos reasignar una variable y `const` cuando su referencia no cambiará.

En React también trabajamos con:

- **Variables normales:** datos locales que sirven durante la ejecución del componente.
- **Constantes:** valores que no queremos reasignar.
- **Props:** información que llega desde un componente padre; el componente hijo la recibe y normalmente no la modifica.
- **Estado con `useState`:** información que pertenece al componente y puede cambiar; cuando cambia, React actualiza la interfaz.

Los `props` y el `state` no son exactamente lo mismo que una variable común: React los utiliza para comunicar componentes o saber cuándo debe volver a mostrar la interfaz.

## 5. Props

### 5.1 ¿Qué son los props?

Los props son datos que un componente padre envía a un componente hijo. Sirven para que un mismo componente pueda mostrar información diferente según los datos que reciba.

```jsx
function Saludo({ nombre }) {
	return <h1>Hola {nombre}</h1>;
}

function App() {
	return <Saludo nombre="Laura" />;
}

export default App;
```

`App` es el componente padre porque utiliza a `Saludo`. `Saludo` es el componente hijo. El padre envía el prop `nombre` con el valor `"Laura"`.

En `function Saludo({ nombre })`, las llaves toman el prop llamado `nombre` del objeto de props. Después, `{nombre}` inserta ese valor en el título. La aplicación mostraría `Hola Laura`.

## 6. useState

`useState` es un Hook de React que permite crear y modificar información que forma parte del estado de un componente. Un estado es un dato que puede cambiar mientras el usuario utiliza la aplicación.

```jsx
import { useState } from "react";

function Contador() {
	const [contador, setContador] = useState(0);

	return (
		<div>
			<p>Contador: {contador}</p>

			<button onClick={() => setContador(contador + 1)}>
				Aumentar
			</button>
		</div>
	);
}

export default Contador;
```

- `useState` crea un estado y una función para cambiarlo.
- `contador` contiene el valor actual.
- `setContador` es la función que actualiza ese valor.
- `useState(0)` establece `0` como valor inicial.
- Al hacer clic, `setContador(contador + 1)` aumenta el contador en uno.
- React vuelve a renderizar el componente porque el estado cambió, por lo que el nuevo número aparece en pantalla.

## 7. useEffect

`useEffect` es un Hook que permite ejecutar código después de que un componente se renderiza o como consecuencia de ciertos cambios. Se usa para efectos secundarios, como escribir en la consola, pedir datos o sincronizar información con otra parte del programa.

```jsx
import { useEffect } from "react";

function App() {

	useEffect(() => {
		console.log("El componente se ha renderizado");
	}, []);

	return (
		<h1>Hola mundo</h1>
	);
}

export default App;
```

La función que recibe `useEffect` contiene el código que queremos ejecutar. El arreglo vacío `[]` indica que este efecto no depende de ningún valor. Por eso, en este ejemplo se ejecuta una vez después del primer renderizado del componente.

También podemos indicar una dependencia:

```jsx
import { useState, useEffect } from "react";

function Contador() {

	const [contador, setContador] = useState(0);

	useEffect(() => {
		console.log("El contador cambió");
	}, [contador]);

	return (
		<button onClick={() => setContador(contador + 1)}>
			Contador: {contador}
		</button>
	);
}

export default Contador;
```

`[contador]` es la lista de dependencias. El efecto se ejecuta después del renderizado inicial y cada vez que cambia `contador`. Al pulsar el botón, el estado aumenta, React vuelve a renderizar y el efecto escribe el mensaje en la consola.

## 8. Diferencias entre useState y useEffect

| Característica | `useState` | `useEffect` |
| --- | --- | --- |
| ¿Para qué sirve? | Guardar y modificar estado | Ejecutar efectos secundarios |
| ¿Puede cambiar información? | Sí, mediante su función actualizadora | No es su función principal |
| ¿Provoca una actualización del componente? | Sí, cuando cambia el estado | Puede ejecutarse como consecuencia de cambios |
| Uso común | Contadores, formularios y datos | Peticiones, eventos y sincronización |

Dicho de forma sencilla, `useState` guarda un dato que forma parte de la interfaz y ofrece una forma de cambiarlo. `useEffect` ejecuta una acción después de un renderizado o cuando cambian determinados datos. Muchas veces se usan juntos: una acción cambia el estado y un efecto reacciona a ese cambio.

```jsx
import { useState, useEffect } from "react";

function App() {

	const [nombre, setNombre] = useState("");

	useEffect(() => {
		console.log("El nombre cambió:", nombre);
	}, [nombre]);

	return (
		<div>
			<input
				value={nombre}
				onChange={(e) => setNombre(e.target.value)}
			/>

			<p>Hola {nombre}</p>
		</div>
	);
}

export default App;
```

`useState` guarda el texto escrito y `setNombre` lo actualiza cada vez que el usuario escribe. `value={nombre}` muestra el valor actual en el campo y `onChange` detecta cada cambio. Después de cada cambio, el componente se renderiza de nuevo y `useEffect`, que depende de `nombre`, escribe el nuevo nombre en la consola.

## Resumen

- **HTML:** organiza el contenido de una página web.
- **Etiquetas HTML:** describen títulos, párrafos, enlaces y otros elementos.
- **Estructura HTML:** reúne `DOCTYPE`, `html`, `head`, `meta`, `title` y `body`.
- **Links:** conectan una página con otra mediante `<a>` y `href`.
- **CSS:** cambia la apariencia de los elementos HTML.
- **Selectores CSS:** eligen qué elementos recibirán estilos.
- **Componentes de React:** son partes reutilizables de una interfaz.
- **JSX:** permite escribir una sintaxis parecida a HTML dentro de JavaScript.
- **Variables:** guardan datos locales dentro de un componente.
- **Props:** envían información desde un componente padre hacia un hijo.
- **`useState`:** guarda datos que pueden cambiar y actualiza la interfaz.
- **`useEffect`:** ejecuta acciones después de un renderizado o ante cambios.
- **Diferencia entre `useState` y `useEffect`:** el primero administra estado; el segundo reacciona a renderizados o cambios para realizar efectos secundarios.

Con estas bases ya es posible entender cómo se estructura una página con HTML, cómo se diseña con CSS y cómo React ayuda a construir interfaces dinámicas y reutilizables.
