const cantidadItemsCarrito = document.getElementById("cantidadItemsCarrito");
const nombreCliente = document.getElementById("textoCuenta")


document.addEventListener("DOMContentLoaded", async () => {
    usuarioActual = await conseguirCompradorCedula(sessionStorage.getItem('cedula'));
    nombreCliente.innerText = `${usuarioActual.nombre} ${usuarioActual.primerApellido}`;
    listaObjetosLocalStorage = JSON.parse(localStorage.getItem("productos_en_carrito")) || [];
    cantidadItemsCarrito.innerHTML = listaObjetosLocalStorage.length;
  });

