const contenedorGeneral = document.getElementById("contenedorGeneral");

function crearTarjetaProducto(
  nombre,
  categoria,
  precio,
  tramo,
  descripcion,
  id
) {
  // Crear el contenedor principal del producto
  const contenedorProducto = document.createElement("div");
  contenedorProducto.classList.add("contenedorProducto");

  // Contenedor de la imagen
  const contenedorImagen = document.createElement("div");
  contenedorImagen.classList.add("contenedorImagen");

  // Imagen del producto
  const imagen = document.createElement("img");
  imagen.src = "img/ejemploProducto.png"; // URL de la imagen del producto
  imagen.alt = ""; // Texto alternativo de la imagen (opcional)

  // Agregar la imagen al contenedor de la imagen
  contenedorImagen.appendChild(imagen);

  // Contenedor de la información del producto
  const infoProducto = document.createElement("div");
  infoProducto.classList.add("infoProducto");

  // Nombre del producto
  const nombreElemento = document.createElement("h1");
  nombreElemento.classList.add("nombre");
  nombreElemento.textContent = nombre;

  // Categoría del producto
  const categoriaElemento = document.createElement("h1");
  categoriaElemento.classList.add("nomCategoria");
  categoriaElemento.textContent = "Categoria: " + categoria;

  // Precio del producto
  const precioElemento = document.createElement("h1");
  precioElemento.classList.add("precio");
  precioElemento.textContent = "₡" + precio + " i.v.i";

  // Tramo del producto
  const tramoElemento = document.createElement("h1");
  tramoElemento.classList.add("tramo");
  tramoElemento.textContent = "Tramo: " + tramo;

  // Div para el botón de cantidad
  const divCantidad = document.createElement("div");
  divCantidad.classList.add("cantidad");

  // Botón de reducir cantidad
  const btnMinus = document.createElement("button");
  btnMinus.classList.add("btn-minus");
  btnMinus.textContent = "-";
  divCantidad.appendChild(btnMinus);

  // Input de cantidad
  const inputCantidad = document.createElement("input");
  inputCantidad.classList.add("cantidadInput");
  inputCantidad.type = "text";
  inputCantidad.value = "1";
  divCantidad.appendChild(inputCantidad);

  // Botón de aumentar cantidad
  const btnPlus = document.createElement("button");
  btnPlus.classList.add("btn-plus");
  btnPlus.textContent = "+";
  divCantidad.appendChild(btnPlus);

  // Div para el botón de agregar al carrito
  const divContenedorParaComprar = document.createElement("div");
  divContenedorParaComprar.classList.add("comprar");

  // Botón de agregar al carrito
  const btnAgregarCarrito = document.createElement("button");
  btnAgregarCarrito.classList.add("agregarCarrito");
  btnAgregarCarrito.textContent = "Agregar al carrito";

  divContenedorParaComprar.appendChild(divCantidad);
  divContenedorParaComprar.appendChild(btnAgregarCarrito);

  // Título de la descripción
  const tituloDescripcion = document.createElement("span");
  tituloDescripcion.classList.add("tituloDescripcion");
  tituloDescripcion.textContent = "Descripción del Producto";

  // Descripción del producto
  const descripcionElemento = document.createElement("p");
  descripcionElemento.classList.add("descripcion");
  descripcionElemento.textContent = descripcion;

  btnPlus.addEventListener("click", () => {
    actualizarCantidad(+1);
  });

  btnMinus.addEventListener("click", () => {
    actualizarCantidad(-1);
  });

  function actualizarCantidad(cambio) {
    let nuevaCantidad = parseInt(inputCantidad.value) + cambio;
    if (nuevaCantidad < 1) {
      nuevaCantidad = 1; // Evitar cantidades negativas
    }
    inputCantidad.value = nuevaCantidad;
  }

  // Agregar todos los elementos al contenedor de información del producto
  infoProducto.appendChild(nombreElemento);
  infoProducto.appendChild(categoriaElemento);
  infoProducto.appendChild(precioElemento);
  infoProducto.appendChild(tramoElemento);
  infoProducto.appendChild(divContenedorParaComprar);
  infoProducto.appendChild(tituloDescripcion);
  infoProducto.appendChild(descripcionElemento);

  // Agregar el contenedor de la imagen y el de la información del producto al contenedor principal del producto
  contenedorProducto.appendChild(contenedorImagen);
  contenedorProducto.appendChild(infoProducto);

  btnAgregarCarrito.addEventListener("click", () => {
    // Obtener la lista actual de IDs del carrito del Local Storage
    let idsEnCarrito = JSON.parse(localStorage.getItem("ids_en_carrito")) || [];

    // Agregar el nuevo ID del producto seleccionado a la lista
    idsEnCarrito.push(id);

    // Guardar la lista actualizada de IDs en el Local Storage
    localStorage.setItem("ids_en_carrito", JSON.stringify(idsEnCarrito));
  });

  btnAgregarCarrito.addEventListener("click", () => {
    // Obtener el ID del producto y la cantidad deseada
    const idProducto = id; // Suponiendo que tienes una función para obtener el ID del producto
    const cantidadDeseada = inputCantidad.value; // Suponiendo que tienes una función para obtener la cantidad deseada

    // Crear un objeto que contenga el ID del producto y la cantidad
    const productoEnCarrito = {
        id: idProducto,
        cantidad: cantidadDeseada
    };

    // Obtener la lista actual de productos en el carrito del Local Storage
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

    // Agregar el producto al carrito
    productosEnCarrito.push(productoEnCarrito);

    // Guardar la lista actualizada de productos en el carrito en el Local Storage
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));

});

  // Devolver la tarjeta creada
  return contenedorProducto;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Obtener el ID del producto desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const id_producto = urlParams.get("id");

  if (id_producto) {
    // Llamar a la función para obtener el producto por su ID
    let objetoProducto = await obtenerProductoPorId(id_producto);

    if (objetoProducto) {
      // Verificar si se obtuvo un producto válido
      let nuevaTarjeta = crearTarjetaProducto(
        objetoProducto.nombre,
        objetoProducto.categoria,
        objetoProducto.precio_vendedor,
        objetoProducto.cedula_vendedor,
        objetoProducto.descripcion,
        objetoProducto._id
      );
      contenedorGeneral.appendChild(nuevaTarjeta);
    } else {
      console.log("No se encontró el producto.");
    }
  } else {
    console.log("No se proporcionó un ID de producto en la URL.");
  }
});
