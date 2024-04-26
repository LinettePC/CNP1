const cantidadItemsCarrito = document.getElementById("cantidadItemsCarrito");



document.addEventListener("DOMContentLoaded", async () => {
    listaObjetosLocalStorage = JSON.parse(localStorage.getItem("productos_en_carrito")) || [];
    cantidadItemsCarrito.innerHTML = listaObjetosLocalStorage.length;
  });

