const filaProducto = document.getElementById('fila')

function crearTarjetaProducto(nombre, descripcion) {

    const item = document.createElement('div');
    item.classList.add('item');



    const contenedorFoto = document.createElement('div');
    contenedorFoto.classList.add('contenedor-foto');

    const imagen = document.createElement('img');
    imagen.src = 'img/ejemploProducto.png';
    imagen.alt = '';
   
    const nombreElemento = document.createElement('span');
    nombreElemento.classList.add('nombre');
    nombreElemento.textContent = nombre

    const descripcionElemento = document.createElement('p');
    descripcionElemento.classList.add('descripcion');
    descripcionElemento.textContent = descripcion;

    


    // Agregar los elementos al contenedor div
    item.appendChild(contenedorFoto);
    contenedorFoto.appendChild(imagen);
    item.appendChild(nombreElemento);
    item.appendChild(descripcionElemento);


    // Devolver la tarjeta creada
    return item;
}


document.addEventListener('DOMContentLoaded', async () => {
	let lista_FrutasVerduras = await listar_FrutasVerduras();
	
	if (lista_FrutasVerduras.length === 0) {
		//let mensajeSinProductos = crearMensajeSinProductos();
		//divMensaje.appendChild(mensajeSinProductos);
	} else {
		for (let i = 0; i < lista_FrutasVerduras.length; i++) {
			let productoDB = lista_FrutasVerduras[i];

			let nuevaTarjeta = crearTarjetaProducto(productoDB.nombre, productoDB.descripcion);

			filaProducto.appendChild(nuevaTarjeta);
		}
	}
});
