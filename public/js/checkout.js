const tarjetaUsada = document.getElementById("tarjetaUsada");
const direccionEnvio = document.getElementById("direccionEnvio");
const totalFinal = document.getElementById("precioTotalCarrito");
const productosFlex = document.querySelector(".productos-flex");

// const producto = agregarProductoParaComprar('Naranja Importada Grande', 5, '₡500.00');
// productosFlex.appendChild(producto);

function formatearNumeroConComas(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function actualizarTotal(nuevoTotal) {
  totalSumado = parseInt(precioTotalCarrito.innerText) + nuevoTotal;
  precioTotalCarrito.textContent = `₡${formatearNumeroConComas(totalSumado)}`;
}

function agregarProductoParaComprar(nombre, cantidad, precio, id, imagenProducto) {
  // Crear el contenedor principal del producto
  const productoDiv = document.createElement("div");
  productoDiv.classList.add("producto");

  // Crear el contenedor de la imagen
  const contenedorImagen = document.createElement("div");
  contenedorImagen.classList.add("contenedor-imagen");

  // Crear la imagen
  const imagen = document.createElement("img");
  imagen.src = imagenProducto;
  imagen.alt = "";
  imagen.classList.add("imagen-ejemplo");

  // Agregar la imagen al contenedor de la imagen
  contenedorImagen.appendChild(imagen);

  // Crear el contenedor del nombre y cantidad del producto
  const nombreCantidadDiv = document.createElement("div");
  nombreCantidadDiv.classList.add("nombre-cantidad-producto");

  // Crear el contenedor del nombre del producto
  const nombreProductoSpan = document.createElement("span");
  nombreProductoSpan.classList.add("nombre-producto");
  nombreProductoSpan.textContent = nombre;

  // Crear el contenedor de la cantidad del producto
  const cantidadDiv = document.createElement("div");
  const cantidadUnidadesParrafo = document.createElement("p");
  cantidadUnidadesParrafo.classList.add("seccionUnidades");
  const cantidadSpan = document.createElement("span");
  cantidadSpan.classList.add("unidades-producto");
  cantidadSpan.textContent = cantidad;
  const cantidadTexto = document.createTextNode(" Unidades");
  cantidadUnidadesParrafo.appendChild(cantidadSpan);
  cantidadUnidadesParrafo.appendChild(cantidadTexto);
  cantidadDiv.appendChild(cantidadUnidadesParrafo);

  // Agregar el nombre y la cantidad al contenedor del nombre y cantidad del producto
  nombreCantidadDiv.appendChild(nombreProductoSpan);
  nombreCantidadDiv.appendChild(cantidadDiv);

  // Crear el contenedor del precio del producto
  const precioDiv = document.createElement("div");
  precioDiv.classList.add("seccion-precio-producto");
  const precioParrafo = document.createElement("p");
  precioParrafo.classList.add("seccionPrecio");
  precioParrafo.textContent = "Precio: ";
  const precioSpan = document.createElement("span");
  precioSpan.classList.add("precio-producto");
  precioSpan.textContent = `₡${formatearNumeroConComas(precio)}`;
  precioParrafo.appendChild(precioSpan);
  precioDiv.appendChild(precioParrafo);

  // Agregar todos los elementos al contenedor principal del producto
  productoDiv.appendChild(contenedorImagen);
  productoDiv.appendChild(nombreCantidadDiv);
  productoDiv.appendChild(precioDiv);

  // Agregar el producto al contenedor de productos-flex

  return productoDiv;
}

document.addEventListener("DOMContentLoaded", async () => {
  listaProductosParaComprar =
    JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

  console.log(listaProductosParaComprar);

  if (listaProductosParaComprar.length === 0) {
    //let mensajeSinProductos = crearMensajeSinProductos();
    //divMensaje.appendChild(mensajeSinProductos);
  } else {
    let totalProductos = 0; 
    for (let i = 0; i < listaProductosParaComprar.length; i++) {
      let idProducto = listaProductosParaComprar[i].id;
      productoDB = await conseguirProductoID(idProducto);
      console.log("producto encontrado", productoDB);
      cantidadComprar = listaProductosParaComprar[i].cantidad;

      let nuevaTarjeta = agregarProductoParaComprar(
        productoDB.nombre,
        cantidadComprar,
        productoDB.precio_vendedor * cantidadComprar,
        productoDB._id,
        productoDB.imagen
      );

      productosFlex.appendChild(nuevaTarjeta);
	  totalProductos += productoDB.precio_vendedor * cantidadComprar;
    }
    actualizarTotal(totalProductos);
  }
  

});

function eliminarProductoDelLocalStorage(idProducto) {
  // Obtener la lista actual de productos en el carrito del Local Storage
  let productosEnCarrito =
    JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

  // Filtrar la lista para excluir el producto que se va a eliminar
  productosEnCarrito = productosEnCarrito.filter(
    (producto) => producto.id !== idProducto
  );

  // Guardar la lista actualizada de productos en el carrito en el Local Storage
  localStorage.setItem(
    "productos_en_carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function revisarDatosUsuario() {
  var tarjetaUsadaDiv = document.getElementById("tarjetaUsada");
  var direccionEnvioDiv = document.getElementById("direccionEnvio");
  var contenedorBotonInfo = document.querySelector(".container-boton-info");
  var contenedorBotonPago = document.querySelector(".container-boton-pago");

  var tarjetaText = tarjetaUsadaDiv.textContent;
  var direccionText = direccionEnvioDiv.textContent;

  if (tarjetaText === "No hay ninguna" && direccionText === "No hay ninguna") {
    var changeInfoButton = document.createElement("a");
    var changeInfoError = document.createElement("p");

    changeInfoError.innerHTML =
      "Para realizar su compra, por favor agregue <br/> su información de dirección y pago.";
    changeInfoError.classList.add("error-mensaje");

    changeInfoButton.textContent = "Agregar información de dirección y pago";

    changeInfoButton.href = "pagoDireccion.html";

    changeInfoButton.classList.add("boton-info");

    contenedorBotonInfo.appendChild(changeInfoError);

    contenedorBotonInfo.appendChild(changeInfoButton);
  } else {
    var buyButton = document.createElement("button");
    buyButton.textContent = "Realizar compra";
    buyButton.type = "submit";
    buyButton.classList.add("boton-comprar");
    contenedorBotonPago.appendChild(buyButton);
  }
}

function llenarCampos(persona) {
  // ${persona.direccion.provincia}
  let direccionString = `${persona.direccion.direccionExacta} / ${persona.direccion.distrito} / ${persona.direccion.canton}`;

  tarjetaUsada.innerHTML = persona.metodo_pago;
  direccionEnvio.innerHTML = direccionString;
}

let usuarioActual = {};
const cedula_usuario = "6-0482-0213";

document.addEventListener("DOMContentLoaded", async () => {
  usuarioActual = await conseguirCompradorCedula(cedula_usuario);

  if (usuarioActual) {
    llenarCampos(usuarioActual);
  }

  revisarDatosUsuario();
});
