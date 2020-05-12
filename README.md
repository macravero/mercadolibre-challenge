

# Code challenge para MercadoLibre

El proyecto se bootstrapeo con [Create React App](https://github.com/facebook/create-react-app) y se ejecto para configurar css modules.

## Requerimientos:

En base a los diseños dados, construir las siguientes tres vistas:

* Caja de búsqueda

* Resultados de la búsqueda

* Detalle del producto

Las vistas son navegables de manera independiente y cuentan con su propia url:

*  Caja de Búsqueda: ​ “/”

*  Resultados de la búsqueda:​ “/items?search=”

*  Detalle del producto: ​ “/items/:id”

En la vista de caja de búsqueda, debería poder ingresar el producto a buscar y al enviar el formulario navegar a la vista de Resultados de búsqueda, visualizando solo 4 productos. Luego, al hacer clic sobre uno de ellos,
debería navegar a la vista de Detalle de Producto.

Dado un id de producto, debería poder ingresar directamente a la vista de detalle de producto.

## Scripts (esencialmente los de CRA):

### `yarn start`

Corre la app en development mode.<br />
Apunta a [http://localhost:3000](http://localhost:3000).

### `yarn test`

Corre el test runner de `Jest`.

### `yarn build`

Boundlea la app para produccion en la carpeta de `build`.

[Info acerca de Deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Estructura del proyecto:

## Contextos:

Las vistas se manejan desde contenedores que importan, parsean y actualizan dos contextos, el de ItemListContext y el de ItemDetailsContext.

el ItemListContext se encarga de generar las llamadas a la api en dos useEffects. El primero se realiza en la inicializacion de la aplicacion y se basa en buscar la query desde la URL a traves de las props de las rutas que provee [React Router Dom](https://www.npmjs.com/package/react-router-dom) y pushear esa ruta para renderizar el componente.

El segundo se realiza cada vez que la query(o busqueda) cambia desde la Searchbar.

Los resultados se parsean a travez de las utils de parsing en un objeto con la forma requerida en el test, incluyendo el autor, las categorias de los mismos(que tienen un parseo especial explicado debajo) y la lista de items. Se llaman a CategoryParser y a ItemList Parser con un slice amount para recibir los 4 resultados (o el numero indicado en `ITEM_AMOUNT`)) y parsear asi la data que necesito de la API. Se parseo la data con el modelo indicado pero se agrego `item.address` ya que en el diseño me pedian agregar la address a la derecha y no formaba parte del modelo.

Tambien se genera una categoryList que se utiliza en el breadcrumb component.

El ItemDetailsContext realiza dos llamados a la api. El primero toma y parsea la data del item para generar los values del objeto usado para renderizar el componente, con el modelo requerido, y un segundo llamado se encarga de buscar la ID de la descripcion de la primera respuesta y usarla para parsear la description del item, y usar el plainText en el item parser.

Las categories del breadcrumb component se generan nuevamente en esta parte porque, por un lado, las categorias del item muchas veces no coinciden con las de la busqueda; y por el otro, necesitaba agregar el titulo del item al final.

## Componentes:

El `Search` component renderiza una barra de busqueda y recibe como props todos los datos que su contenedor, la `Searchbar`, recibe del contexto y el user input.

El `Breadcrumb` component recibe un array de strings y lo renderiza en el tope de la pagina. Esse array ya esta previamente parseado en el comtenedor que se lo provee.

El `PageNotFound` component es esencialmente una vista de fallback para cuando las URLs no coinciden con ninguna ruta prevista. El unico container que se ve en todas las vistas es el de `Searchbar`.

El `ItemList` component recibe la lista de items desde la request del `ItemListContext` y la mapea para devolver un componente `Item` con las propiedades de cada elemento de la lista. Tambien recibe una imagen de placeholder para ocupar el lugar de la imagen del producto, mientras esta carga.

Cada `Item` component se genera con los props mappeados desde la lista que recibe `ItemList` y los renderiza mediante JSX en un componente con el diseño previsto.

## Containers:

Se crearon ciertos stateful components como contenedores para manejar la logica e intentar mantener los componentes como puramente presentacionales.

El `ItemDetails` container tiene un useEffect que corre en el mounting del container para analizar si el path provisto por las rutas tiene los requerimientos del endpoint de ID. Si los tiene, actualiza la query del `ItemDetailsContext` y por ende corre ese useEffect para realizar la request correspondiente y renderizar el item.
Ademas de eso, renderiza un `Breadcrumb` con la lista de categorias parseada desde el context previamente nombrado, y un componente de `DetailedItem` presentacional con los props trabajados.

El `Searchbar` container se encuentra fuera de las rutas pero conectado a sus props mediante el hoc provisto por react-router-dom,  `withRouter`, para poder hacer uso de la funcion `push` una vez que se haya actualizado su estado en `onClick`. Hay dos `onClick` que llaman a dos funciones. La primera es `getProducts` que previene el default del evento y actualiza la query del `itemListContext` para que este genere la request; se llama desde el form del `Search` component que renderiza `Searchbar`. El segundo `onClick` se llama desde el logo de MercadoLibre, y limpia los estados para volver a la "pantalla de inicio" sin tener que recargar la aplicacion.

## Constants y Utils:

El proyecto hace uso de constantes importadas en vez de strings directas para evitar error humano y poder reimportar los metodos, variables y strings mas facilmente por toda la aplicacion.

Dentro de la carpeta `utils` tenemos `constants` y `selectors`. Las `constants` hacen referencia a traducciones, variables, parametros de URL y posibles endpoints, mientras que los `selectors` extrapolan selectores generados con la libreria [Ramda](https://ramdajs.com/docs/) para poder hacer deep dive de objetos y arrays de una manera mas funcional a la hora de parsear las categorias del breadcrumb.

La libreria de `utils` exporta snippers de codigo para ser reutilizado a traves de la aplicacion. Entre los mismos tenemos:

### stringifyByKey:

recibe la data y la key, y la reduce en un array de strings cuyo elemento de la data coincida con la key propuesta. Se utiliza mayormente en las iteraciones de `categoryParser` para el `Breadcrumb`

### categoryParser:

Recibe la data y checkea que coincida con alguno de los posibles resultados propuestos en la funcion `pathOr` de `Ramda`. Hace uso de los `selectors` y de `stringifyByKey`

### setDecimals:

Es una helper function que recibe una `currencyId` y mediante un `switch` devuelve el numero de selectores. Se armo de esta forma por escalabilidad a nuevos tipos de moneda o requerimientos de decimales en el futuro(usarse como config quizas)

### itemListParser:

Recibe un objeto y lo parsea en un nuevo objeto `item` del tipo `object` con los diferentes datos que requeria el modelo del challenge. A estos se le agrega el `address.state_name` por utilidad en la view. Utiliza `setDecimals` para declarar los `decimals` del `item.price`

### itemParser:

Recibe un objeto y una string(que se usa para la `item.description`) y las parsea.
Utiliza `setDecimals` para declarar los `decimals` del `item.price`

### formatCurrency:

Recibe un string a modo de `currencyId` y un int que defaultea a `0`. 
Incialmente planee utilizar el Internationalization API de Javascript, ya que es un metodo nativo para resolver esto, pero los resultados no estaban al nivel de los requeridos en el diseño asi que retorne una `string` con una expresion regular para conseguir la estructura requerida.

### bulkPreloader:

Lo deje como sugerencia para hacer un preloading de multiple image assets en alguna de las pantallas/inicio de la SPA. Pero asumi que un ecommerce se basa mas en serverside rendering y no lo requeriria.

### preload:

Esencialmetne una version unitaria del bulkPreloader que recibe una string como image source y genera una `new Image()` con esa string como source para ser hoisteada en el browser.

## styles:

El proyecto utiliza una combinacion de SCSS y css modules para hacer mejor scope de mis estilos en cada componente.

En las carpetas globales de SCSS separe `functions` `mixins` y `variables`. 

### functions:
Tiene solo una funcion que retorna el valor en `rem` del numero de pixeles previsto (tomando como `1rem = 16px`). Lo guarde en su propia stylesheet por escalabilidad.

### mixins:
Los mixins devuelven `fontSize()` en rem con un fallback de pixeles, `accesibleFocus()` como un hover state para accesibilidad (no requerido pero me parecio un buen extra), `accesibleButtonFocus()` que permite lo anterior pero con otros tonos para el boton y `gridWidth()` que utilice para intentar imitar el estilo de grid que se brindo en el diseño (a ojo, no tenia valores).

### variables:
Guardan todas las variables de colores, bordes, grid splits, hover outlines y el base font size de la aplicacion.

## CSS modules:

Cada componente tiene renombrada su hoja de estilo con la forma `Component.module.scss` para poder importar cada clase:
```
import styles from './Component.module.scss;
```
y permitirme utilizarlos de la siguiente manera:
```
<div className={styles.container} />
```
La convencion de nombres de las clases *intenta* seguir las reglas de BEM, tomando en cuenta que mi eslint requiere camelCase en variables.

## Testing:

Cada container cuenta con su carpeta de tests unitarios escritos con Jest y Enzyme. Los objetivos de estos eran preveer que cada componente presentacional se renderize con los props correctos.

La recepcion y tipo de los props esta controlada por el uso de [propTypes](https://reactjs.org/docs/typechecking-with-proptypes.html);

Las utils tienen su propia carpeta de tests que intentan confirmar casos de exito y error dependiendo de las variables que reciban.

## es-lint:

Para darle constancia al proyecto importe las reglas de linting recomendadas de react, `airbnb` y `prettier`.

Agregue excepciones como `indentacion`, `quotes`, `no-param-reassign` para reducers, etc. Todas estas reglas se pueden ver en el file `.eslintrc.js`

## TECH DEBT:

### I suck at testing:

Necesito encontrar la forma de poder testear context providers correctamente, ya que Enzyme parece no soportar del todo la nueva context API:
* Encontrar formas de testear context providers
* experimentar posible refactor a react-context en vez de usar useContext
* experimentar con react testing library (parece soportarlo)

### Lean out the app:

Puedo planificar una mejor folder structure probablemente, y dividir aun mas mis componentes presentacionales.
* Mejorar folder structure
* Generar mas componentes presentacionales como titulos, botones, etc.
### las pantallas no son mobile-first:

Basandome en el diseño previsto, no tengo una clara idea del responsive del site. Deberia generar un par de wireframes para ver una solucion elegante para itemDetails.
* mejorar mobile screens across app.

### Testear y mejorar accesibilidad:

Las pantallas son levemente accesibles pero hay espacio para mejora.
* testear accesibilidad con alguna herramienta.
* mejorar detalles de accesibilidad.

### No tengo landing/inicio ni 404:

No hay diseño previsto para la home, y siento que se ve muy vacia la searchbar sola. Deberia ver las posibilidades que me brinda la API para dar una buena landing page/homepage a la app.

Tampoco tengo un diseño de una pagina no encontrada en las rutas, por lo que puse un mensaje simple de error.

### Mejorar el coverage

I suck at testing(sic).

### Refactor a Redux y class-based containers (opcional):

Me gustaria probar si es mas sencillo realizar TDD con una redux store y class-based containers. useContext me dio menos overhead al momento de desarrollo y muchisimo mas overhead al momento de testing (tuve que crear un custom hook para poder usar jest.spy sobre mis context providers, por ejemplo).

* I suck at context API?
* forkear el repo para implementar Redux en un refactor
* refactorizar containers como class-based con lifecycle hooks.

### Algunas utils podrian mejorarse:

Ciertas utils son un poco repetitivas en su funcionalidad y podrian ser mas abarcativas. Voy a ir sumandolas a la lista mientras se me vayan ocurriendo:

* ItemDetailsParser e ItemListParser podrian ser una sola funcion ItemParser que llame a ambas implementaciones para darle reusabilidad.