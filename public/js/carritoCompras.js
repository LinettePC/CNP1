const productosFlex = document.querySelector(".contenedor");
const totalFinal = document.querySelector(".totalFinal");

function formatearNumeroConComas(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function agregarProductoParaComprar(
  nombreProducto,
  descripcion,
  vendedor,
  tramo,
  cantidad,
  precioUnitario,
  id,
  imagenProducto
) {
  // Crear el contenedor principal para el producto
  let productoDiv = document.createElement("div");
  productoDiv.classList.add("producto");

  // Crear el contenedor para la información del producto
  let textoProductoDiv = document.createElement("div");
  textoProductoDiv.id = "textoProducto";

  //Crear Enlace
  const enlace = document.createElement("a");
  enlace.href = `paginaProducto.html?id=${id}`; // URL dinámica del producto
  enlace.target = "_blank"; // Abre el enlace en una nueva pestaña

  // Crear el div para la imagen
  let imagenCarritoDiv = document.createElement("div");
  imagenCarritoDiv.id = "imagenCarrito";
  let imagen = document.createElement("img");
  imagen.src = imagenProducto;
  imagen.alt = "";
  enlace.appendChild(imagen);
  imagenCarritoDiv.appendChild(enlace);
  textoProductoDiv.appendChild(imagenCarritoDiv);

  // Crear el div para la descripción del producto
  let descripProducDBDiv = document.createElement("div");
  descripProducDBDiv.id = "descripProducDB";
  let nombreProductoElement = document.createElement("h3");
  nombreProductoElement.textContent = nombreProducto;
  let descripcionElement = document.createElement("h4");
  descripcionElement.textContent = descripcion;
  let vendedorElement = document.createElement("h4");
  vendedorElement.textContent = vendedor;
  let tramoElement = document.createElement("h4");
  tramoElement.textContent = "Tramo: " + tramo;
  let eliminarBtn = document.createElement("button");
  eliminarBtn.classList.add("btn-eliminar");
  eliminarBtn.textContent = "Eliminar";
  descripProducDBDiv.appendChild(nombreProductoElement);
  descripProducDBDiv.appendChild(descripcionElement);
  descripProducDBDiv.appendChild(vendedorElement);
  descripProducDBDiv.appendChild(tramoElement);
  descripProducDBDiv.appendChild(eliminarBtn);
  textoProductoDiv.appendChild(descripProducDBDiv);

  // Agregar el contenedor de información del producto al contenedor principal
  productoDiv.appendChild(textoProductoDiv);

  // Crear el div para el precio del producto
  let precioProducDBDiv = document.createElement("div");
  precioProducDBDiv.id = "precioProducDB";
  let precio = document.createElement("h3");
  precio.textContent = `₡${formatearNumeroConComas(precioUnitario)}`;
  precioProducDBDiv.appendChild(precio);
  productoDiv.appendChild(precioProducDBDiv);

  // Crear el div para la cantidad del producto
  const divContenedorCantidad = document.createElement("div");
  divContenedorCantidad.classList.add("contenerCantidad");

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
  inputCantidad.value = cantidad;
  divCantidad.appendChild(inputCantidad);

  // Botón de aumentar cantidad
  const btnPlus = document.createElement("button");
  btnPlus.classList.add("btn-plus");
  btnPlus.textContent = "+";
  divCantidad.appendChild(btnPlus);
  divContenedorCantidad.appendChild(divCantidad);
  // Botón Confirmar
  const btnConfirmar = document.createElement("button");
  btnConfirmar.classList.add("btn-confirmarEditar");
  btnConfirmar.textContent = "Confirmar";
  divContenedorCantidad.appendChild(btnConfirmar);

  productoDiv.appendChild(divContenedorCantidad);

  // Event listeners para los botones de aumentar y reducir cantidad
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

  btnConfirmar.addEventListener("click", () => {
    const idProducto = id; // Obtener el identificador único del producto
    const nuevaCantidad = parseInt(inputCantidad.value); // Obtener la nueva cantidad desde el input

    // Obtener la lista de productos del localStorage
    let listaProductos =
      JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

    // Buscar el producto correspondiente en la lista
    const productoIndex = listaProductos.findIndex(
      (producto) => producto.id === idProducto
    );
    if (productoIndex !== -1) {
      // Si se encuentra el producto
      // Actualizar la cantidad del producto
      listaProductos[productoIndex].cantidad = nuevaCantidad;
      // Guardar la lista actualizada en el localStorage
      localStorage.setItem(
        "productos_en_carrito",
        JSON.stringify(listaProductos)
      );

      // Mostrar SweetAlert de confirmación
      Swal.fire({
        title: "Confirmado",
        text: "Cantidad actualizada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        // Después de mostrar el mensaje, reiniciar la página
        if (result.isConfirmed) {
          location.reload(); // Recargar la página
        }
      });
    }
  });

  function eliminarProductoDelLocalStorage(id) {
    // Obtener la lista actual de productos en el carrito del Local Storage
    let productosEnCarrito =
      JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

    // Filtrar la lista para excluir el producto que se va a eliminar
    productosEnCarrito = productosEnCarrito.filter(
      (producto) => producto.id !== id
    );

    // Guardar la lista actualizada de productos en el carrito en el Local Storage
    localStorage.setItem(
      "productos_en_carrito",
      JSON.stringify(productosEnCarrito)
    );
  }

  eliminarBtn.addEventListener("click", () => {
    eliminarProductoDelLocalStorage(id);
    Swal.fire({
      title: "Producto Eliminado",
      text: "",
      icon: "info",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      // Después de mostrar el mensaje, reiniciar la página
      if (result.isConfirmed) {
        location.reload(); // Recargar la página
      }
    });
  });

  // Crear el div para el total del producto
  let totalProductoDBDiv = document.createElement("div");
  totalProductoDBDiv.id = "totalProductoDB";
  let total = document.createElement("h3");
  let totalPorProducto = precioUnitario * cantidad;
  total.textContent = `₡${formatearNumeroConComas(totalPorProducto)}`;
  totalProductoDBDiv.appendChild(total);
  productoDiv.appendChild(totalProductoDBDiv);

  return productoDiv;
}

// Función para actualizar el total final
function actualizarTotal(nuevoTotal) {
  totalSumado = parseInt(totalFinal.innerText) + nuevoTotal;
  totalFinal.textContent = `₡${formatearNumeroConComas(totalSumado)}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Ocultar el contenedor de productos inicialmente
  productosFlex.style.display = "none";

  listaProductosParaComprar =
    JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

  console.log(listaProductosParaComprar);

  if (listaProductosParaComprar.length === 0) {
    //let mensajeSinProductos = crearMensajeSinProductos();
    //divMensaje.appendChild(mensajeSinProductos);
  } else {
    let totalProductos = 0; // Variable para almacenar el total de los productos
    for (let i = 0; i < listaProductosParaComprar.length; i++) {
      let idProducto = listaProductosParaComprar[i].id;
      productoDB = await obtenerProductoPorId(idProducto);
      console.log("producto encontrado", productoDB);
      cantidadComprar = listaProductosParaComprar[i].cantidad;

      let nuevaTarjeta = agregarProductoParaComprar(
        productoDB.nombre,
        productoDB.descripcion,
        "vendedor",
        "Tramo",
        cantidadComprar,
        productoDB.precio_vendedor,
        productoDB._id,
        productoDB.imagen
      );

      productosFlex.appendChild(nuevaTarjeta);

      // Actualizar el total de los productos
      totalProductos += productoDB.precio_vendedor * cantidadComprar;
    }

    // Mostrar el contenedor de productos después de que todos los productos se hayan agregado
    productosFlex.style.display = "block";

    // Actualizar el total final después de agregar todos los productos
    actualizarTotal(totalProductos);
  }

  // Mostrar la sección "Ir al checkout" después de cargar los productos y actualizar el total
  const irAlCheckOut = document.querySelector(".irAlCheckOut");
  irAlCheckOut.style.display = "block";
});
