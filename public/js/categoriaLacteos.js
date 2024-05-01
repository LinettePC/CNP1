const filaProducto = document.getElementById('fila');

function formatearNumeroConComas(numero) {
	return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function crearTarjetaProducto(nombre, descripcion, precioVendedor, productoID, imagenProducto) {
    // Crear el elemento de la tarjeta de producto
    const item = document.createElement('div');
    item.classList.add('item');

    // Contenedor de la foto
    const contenedorFoto = document.createElement('div');
    contenedorFoto.classList.add('contenedor-foto');

    // Enlace
    const enlace = document.createElement('a');
    enlace.href = `paginaProducto.html?id=${productoID}`; // URL dinámica del producto
    enlace.target = '_blank'; // Abre el enlace en una nueva pestaña

    // Imagen
    const imagen = document.createElement('img');
    imagen.src = imagenProducto; // URL de la imagen
    imagen.alt = ''; // Texto alternativo de la imagen (opcional)

    // Agregar la imagen al enlace
    enlace.appendChild(imagen);

    // Nombre del producto
    const nombreElemento = document.createElement('span');
    nombreElemento.classList.add('nombre');
    nombreElemento.textContent = nombre; 
    // Basicamente esta haciendo esto: <span class = "nombre">nombre<span/>
   

    // Precio del producto
    const precioElemento = document.createElement('span');
    precioElemento.classList.add('precio');
    precioElemento.textContent =  "₡" + formatearNumeroConComas(precioVendedor);

    // Descripción del producto
    const descripcionElemento = document.createElement('p');
    descripcionElemento.classList.add('descripcion');
    descripcionElemento.textContent = descripcion;

    // Agregar elementos al contenedor principal
    contenedorFoto.appendChild(enlace); // Agregar el enlace al contenedor de la foto
    item.appendChild(contenedorFoto); // Agregar el contenedor de la foto al elemento principal
    item.appendChild(nombreElemento); // Agregar el nombre al elemento principal
    item.appendChild(precioElemento); // Agregar el precio al elemento principal
    item.appendChild(descripcionElemento); // Agregar la descripción al elemento principal
    //En otras palabras, llenando el div

    // Devolver la tarjeta creada
    return item;
}


document.addEventListener('DOMContentLoaded', async () => {
	let lista_lacteos = await listar_productos("listar-lacteos");
	
	if (lista_lacteos.length === 0) {
		//let mensajeSinProductos = crearMensajeSinProductos();
		//divMensaje.appendChild(mensajeSinProductos);
	} else {
		for (let i = 0; i < lista_lacteos.length; i++) {
			let productoDB = lista_lacteos[i];

			let nuevaTarjeta = crearTarjetaProducto(productoDB.nombre, productoDB.descripcion, productoDB.precio_vendedor, productoDB._id, productoDB.imagen);

			filaProducto.appendChild(nuevaTarjeta);
		}
	}
});
