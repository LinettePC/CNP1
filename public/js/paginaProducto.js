const contenedorGeneral = document.getElementById('contenedorGeneral')


function crearTarjetaProducto(nombre, categoria, precio, tramo, descripcion) {
    // Crear el contenedor principal del producto
    const contenedorProducto = document.createElement('div');
    contenedorProducto.classList.add('contenedorProducto');

    // Contenedor de la imagen
    const contenedorImagen = document.createElement('div');
    contenedorImagen.classList.add('contenedorImagen');

    // Imagen del producto
    const imagen = document.createElement('img');
    imagen.src = 'img/ejemploProducto.png'; // URL de la imagen del producto
    imagen.alt = ''; // Texto alternativo de la imagen (opcional)

    // Agregar la imagen al contenedor de la imagen
    contenedorImagen.appendChild(imagen);

    // Contenedor de la información del producto
    const infoProducto = document.createElement('div');
    infoProducto.classList.add('infoProducto');

    // Nombre del producto
    const nombreElemento = document.createElement('h1');
    nombreElemento.classList.add('nombre');
    nombreElemento.textContent = nombre;

    // Categoría del producto
    const categoriaElemento = document.createElement('h1');
    categoriaElemento.classList.add('nomCategoria');
    categoriaElemento.textContent = 'Categoria: ' + categoria;

    // Precio del producto
    const precioElemento = document.createElement('h1');
    precioElemento.classList.add('precio');
    precioElemento.textContent = '₡' + precio + ' i.v.i';

    // Tramo del producto
    const tramoElemento = document.createElement('h1');
    tramoElemento.classList.add('tramo');
    tramoElemento.textContent = 'Tramo: ' + tramo;

    // Div para el botón de cantidad
    const divCantidad = document.createElement('div');
    divCantidad.classList.add('cantidad');

    // Botón de reducir cantidad
    const btnMinus = document.createElement('button');
    btnMinus.classList.add('btn-minus');
    btnMinus.textContent = '-';
    divCantidad.appendChild(btnMinus);

    // Input de cantidad
    const inputCantidad = document.createElement('input');
    inputCantidad.classList.add('cantidadInput');
    inputCantidad.type = 'text';
    inputCantidad.value = '1';
    divCantidad.appendChild(inputCantidad);

    // Botón de aumentar cantidad
    const btnPlus = document.createElement('button');
    btnPlus.classList.add('btn-plus');
    btnPlus.textContent = '+';
    divCantidad.appendChild(btnPlus);

    // Div para el botón de agregar al carrito
    const divContenedorParaComprar = document.createElement('div');
    divContenedorParaComprar.classList.add('comprar');

    // Botón de agregar al carrito
    const btnAgregarCarrito = document.createElement('button');
    btnAgregarCarrito.classList.add('agregarCarrito');
    btnAgregarCarrito.textContent = 'Agregar al carrito';

    divContenedorParaComprar.appendChild(divCantidad);
    divContenedorParaComprar.appendChild(btnAgregarCarrito);


    // Título de la descripción
    const tituloDescripcion = document.createElement('span');
    tituloDescripcion.classList.add('tituloDescripcion');
    tituloDescripcion.textContent = 'Descripción del Producto';

    // Descripción del producto
    const descripcionElemento = document.createElement('p');
    descripcionElemento.classList.add('descripcion');
    descripcionElemento.textContent = descripcion;

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

    // Devolver la tarjeta creada
    return contenedorProducto;
}


document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id_producto = urlParams.get('id');

    if (id_producto) {
        // Llamar a la función para obtener el producto por su ID
        let objetoProducto = await obtenerProductoPorId(id_producto);

        if (objetoProducto) {
            // Verificar si se obtuvo un producto válido
            let nuevaTarjeta = crearTarjetaProducto(objetoProducto.nombre, objetoProducto.categoria, objetoProducto.precio_vendedor, objetoProducto.cedula_vendedor, objetoProducto.descripcion);
            contenedorGeneral.appendChild(nuevaTarjeta);
        } else {
            console.log('No se encontró el producto.');
        }
    } else {
        console.log('No se proporcionó un ID de producto en la URL.');
    }
});