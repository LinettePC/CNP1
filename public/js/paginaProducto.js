const contenedorGeneral = document.getElementById('contenedorGeneral');

let objetoProducto = {};

function formatearNumeroConComas(numero) {
	return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function crearTarjetaProducto(
	nombre,
	categoria,
	precio,
	tramo,
	descripcion,
	id,
	imagenProducto,
	max_inventario
) {
	// Crear el contenedor principal del producto
	const contenedorProducto = document.createElement('div');
	contenedorProducto.classList.add('contenedorProducto');

	// Contenedor de la imagen
	const contenedorImagen = document.createElement('div');
	contenedorImagen.classList.add('contenedorImagen');

	// Imagen del producto
	const imagen = document.createElement('img');
	imagen.src = imagenProducto; // URL de la imagen del producto
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
	precioElemento.textContent = '₡' + formatearNumeroConComas(precio);

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

	inputCantidad.addEventListener('input', function () {
		this.value = this.value.replace(/\D/g, '');

		var value = parseInt(this.value);
		if (value >= max_inventario) {
			this.value = max_inventario;
		}
		if (isNaN(value) || value < 0) {
			this.value = 1;
		}
	});

	btnPlus.addEventListener('click', () => {
		actualizarCantidad(+1, max_inventario);
	});

	btnMinus.addEventListener('click', () => {
		actualizarCantidad(-1, max_inventario);
	});

	function actualizarCantidad(cambio, max) {
		let nuevaCantidad = parseInt(inputCantidad.value) + cambio;
		if (nuevaCantidad < 1) {
			nuevaCantidad = 1; // Evitar cantidades negativas
		}
		if (nuevaCantidad > parseInt(max)) {
			nuevaCantidad = parseInt(max);
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

	btnAgregarCarrito.addEventListener('click', () => {
		let productoEnCarrito =
			JSON.parse(localStorage.getItem('productos_en_carrito')) || [];

		if (
			productoEnCarrito.find(
				(productoParaBuscar) => productoParaBuscar.id === id
			)
		) {
			let indexBuscado = productoEnCarrito.findIndex(
				(objeto) => objeto.id === id
			);
			let objetoAModificar = productoEnCarrito[indexBuscado];
			console.log(objetoAModificar);
			objetoAModificar.cantidad =
				parseInt(objetoAModificar.cantidad) +
				parseInt(inputCantidad.value);

			productoEnCarrito[indexBuscado] = objetoAModificar;

			localStorage.setItem(
				'productos_en_carrito',
				JSON.stringify(productoEnCarrito)
			);

			Swal.fire({
				title: 'El producto ya existe en el carrito',
				text: 'Se actualizara la cantidad actual',
				icon: 'success',
				confirmButtonText: 'Entendido!',
			}).then((result) => {
				// Después de mostrar el mensaje, reiniciar la página
				if (result.isConfirmed) {
					location.reload(); // Recargar la página
				}
			});
		} else {
			const productoNuevo = {
				id: id,
				cantidad: inputCantidad.value,
			};
			productoEnCarrito.push(productoNuevo);
			localStorage.setItem(
				'productos_en_carrito',
				JSON.stringify(productoEnCarrito)
			);
			Swal.fire({
				title: 'Producto agregado al carrito',
				text: '',
				icon: 'success',
				confirmButtonText: 'Entendido!',
			}).then((result) => {
				// Después de mostrar el mensaje, reiniciar la página
				if (result.isConfirmed) {
					location.reload(); // Recargar la página
				}
			});
		}

		inputCantidad.value = '1';
	});

	// Devolver la tarjeta creada
	return contenedorProducto;
}

function createReviewHTML(usuario, estrellas, comentario) {
	// Create parent div.review element
	const reviewDiv = document.createElement('div');
	reviewDiv.classList.add('review');

	// Create div.usuario-review element and append it to parent
	const usuarioDiv = document.createElement('div');
	usuarioDiv.classList.add('usuario-review');
	const usuarioP = document.createElement('p');
	usuarioP.textContent = usuario;
	usuarioDiv.appendChild(usuarioP);
	reviewDiv.appendChild(usuarioDiv);

	// Create div.flex-estrellas element and append stars to it
	const estrellasDiv = document.createElement('div');
	estrellasDiv.classList.add('flex-estrellas');
	for (let i = 0; i < 5; i++) {
		let estrellaImg = document.createElement('img');
		estrellaImg.alt = 'estrella';
		estrellaImg.classList.add('estrella');

		if (i < estrellas) {
			estrellaImg.src = 'img/estrellas/star-fill.svg';
		} else {
			estrellaImg.src = 'img/estrellas/star.svg';
		}

		estrellasDiv.appendChild(estrellaImg);
	}
	reviewDiv.appendChild(estrellasDiv);

	// Create div.comentario element and append it to parent
	if (comentario) {
		const comentarioDiv = document.createElement('div');
		comentarioDiv.classList.add('comentario');
		const comentarioP = document.createElement('p');
		comentarioP.textContent = comentario;
		comentarioDiv.appendChild(comentarioP);
		reviewDiv.appendChild(comentarioDiv);
	}

	return reviewDiv;
}

function comentarioSinReviews() {
	// Create parent div with class "review"
	const reviewDiv = document.createElement('div');
	reviewDiv.classList.add('review');

	// Create child div with class "comentario"
	const comentarioDiv = document.createElement('div');
	comentarioDiv.classList.add('comentario');

	// Create paragraph element
	const paragraph = document.createElement('p');
	paragraph.textContent = 'Todavía no hay reseñas para este producto';

	// Append paragraph to "comentario" div
	comentarioDiv.appendChild(paragraph);

	// Append "comentario" div to "review" div
	reviewDiv.appendChild(comentarioDiv);

	// Return the parent div
	return reviewDiv;
}

let id_producto = '';
let usuarioActual = {};
// let cedula = sessionStorage.getItem('cedula');
let cedula = '604820213';
let botonDejarReviews = document.getElementById('botonDejarReviews');
let msjDejarReviews = document.getElementById('msjDejarReviews');

window.addEventListener('load', async () => {
	// Obtener el ID del producto desde la URL
	const urlParams = new URLSearchParams(window.location.search);
	const reviewsProducto = document.getElementById('reviewsProducto');
	id_producto = urlParams.get('id');

	usuarioActual = await conseguirCompradorCedula(cedula);
	lista_ventas = await listarVentasUsuario(cedula);

	if (id_producto) {
		// Llamar a la función para obtener el producto por su ID
		objetoProducto = await conseguirProductoID(id_producto);

		if (lista_ventas) {
			for (let i = 0; i < lista_ventas.length; i++) {
                if (lista_ventas[i].id_producto == id_producto) {
                    botonDejarReviews.style.display = 'block';
                    msjDejarReviews.style.display = 'none';
                }
            }
		}

		if (objetoProducto) {
			// Verificar si se obtuvo un producto válido
			let nuevaTarjeta = crearTarjetaProducto(
				objetoProducto.nombre,
				objetoProducto.categoria,
				objetoProducto.precio_vendedor,
				objetoProducto.tramo,
				objetoProducto.descripcion,
				objetoProducto._id,
				objetoProducto.imagen,
				objetoProducto.inventario
			);

			if (objetoProducto.reviews.length > 0) {
				for (let i = 0; i < objetoProducto.reviews.length; i++) {
					let usuario = objetoProducto.reviews[i].usuario;
					let cantidad_estrellas = parseInt(
						objetoProducto.reviews[i].estrellas
					);

					let comentario_usuario =
						objetoProducto.reviews[i].comentario;

					if (comentario_usuario) {
						reviewsProducto.appendChild(
							createReviewHTML(
								usuario,
								cantidad_estrellas,
								comentario_usuario
							)
						);
					} else {
						reviewsProducto.appendChild(
							createReviewHTML(usuario, cantidad_estrellas)
						);
					}
				}
			} else {
				reviewsProducto.appendChild(comentarioSinReviews());
			}

			contenedorGeneral.appendChild(nuevaTarjeta);
		} else {
			console.log('No se encontró el producto.');
		}
	} else {
		console.log('No se proporcionó un ID de producto en la URL.');
	}
});

function guardarPaginaActual() {
	localStorage.setItem('paginaActual', window.location.href);
}

// Función para redirigir a la página anterior
function regresarPaginaAnterior() {
	const paginaAnterior = localStorage.getItem('paginaActual');
	if (paginaAnterior) {
		window.location.href = paginaAnterior;
	} else {
		// Manejo de error si no se encuentra la página anterior
		console.error(
			'No se pudo encontrar la página anterior en el localStorage.'
		);
	}
}

function showStarRating() {
	Swal.fire({
		title: 'Seleccione un puntaje (1-5)',
		html: `
		  <div class="d-flex justify-content-between">
			<span class="star" data-value="1"><img
			src="img/estrellas/star.svg"
			alt="estrella"
			class="estrella"
		/></span>
			<span class="star" data-value="2"><img
			src="img/estrellas/star.svg"
			alt="estrella"
			class="estrella"
		/></span>
			<span class="star" data-value="3"><img
			src="img/estrellas/star.svg"
			alt="estrella"
			class="estrella"
		/></span>
			<span class="star" data-value="4"><img
			src="img/estrellas/star.svg"
			alt="estrella"
			class="estrella"
		/></span>
			<span class="star" data-value="5"><img
			src="img/estrellas/star.svg"
			alt="estrella"
			class="estrella"
		/></span>
		  </div>
		`,
		showCloseButton: true,
		showConfirmButton: false,
	});

	let star1 = document.querySelector('.star[data-value="1"]');
	let star1img = star1.querySelector('img');

	let star2 = document.querySelector('.star[data-value="2"]');
	let star2img = star2.querySelector('img');

	let star3 = document.querySelector('.star[data-value="3"]');
	let star3img = star3.querySelector('img');

	let star4 = document.querySelector('.star[data-value="4"]');
	let star4img = star4.querySelector('img');

	let star5 = document.querySelector('.star[data-value="5"]');
	let star5img = star5.querySelector('img');

	document.querySelectorAll('.star').forEach((star) => {
		star.addEventListener('click', () => {
			const cantEstrellas = star.getAttribute('data-value').toString();

			Swal.fire({
				title: `Ingrese un comentario para la reseña (opcional):`,
				input: 'text',
				inputAttributes: {
					autocapitalize: 'off',
				},
				showCancelButton: true,
				confirmButtonColor: '#81b12a',
				cancelButtonColor: 'rgb(198, 0, 0)',
				confirmButtonText: 'Enviar reseña',
				cancelButtonText: 'Cancelar',
			}).then(async (result) => {
				if (result.isConfirmed) {
					let estrellasJSON = {
						reviews: {
							usuario: usuarioActual.nombre,
							estrellas: cantEstrellas,
						},
					};

					if (result.value) {
						estrellasJSON.reviews.comentario = result.value;
					}

					await agregarReviewProducto(id_producto, estrellasJSON);

					Swal.fire({
						title: 'Se agregó la reseña al sistema',
						text: 'Gracias por usar nuestros servicios',
						icon: 'success',
						timer: 2000,
						timerProgressBar: true,
						showConfirmButton: false,
						allowOutsideClick: false,
					});

					setTimeout(() => {
						window.location.reload();
					}, 2000);
				}
			});
		});
	});

	function cambiarSrcStar(cant) {
		switch (cant) {
			case 1:
				star1img.src = 'img/estrellas/star-fill.svg';
				break;
			case 2:
				star1img.src = 'img/estrellas/star-fill.svg';
				star2img.src = 'img/estrellas/star-fill.svg';
				break;
			case 3:
				star1img.src = 'img/estrellas/star-fill.svg';
				star2img.src = 'img/estrellas/star-fill.svg';
				star3img.src = 'img/estrellas/star-fill.svg';
				break;
			case 4:
				star1img.src = 'img/estrellas/star-fill.svg';
				star2img.src = 'img/estrellas/star-fill.svg';
				star3img.src = 'img/estrellas/star-fill.svg';
				star4img.src = 'img/estrellas/star-fill.svg';
				break;
			case 5:
				star1img.src = 'img/estrellas/star-fill.svg';
				star2img.src = 'img/estrellas/star-fill.svg';
				star3img.src = 'img/estrellas/star-fill.svg';
				star4img.src = 'img/estrellas/star-fill.svg';
				star5img.src = 'img/estrellas/star-fill.svg';
				break;
			default:
				quitarSrcStar();
				break;
		}
	}

	function quitarSrcStar() {
		star1img.src = 'img/estrellas/star.svg';
		star2img.src = 'img/estrellas/star.svg';
		star3img.src = 'img/estrellas/star.svg';
		star4img.src = 'img/estrellas/star.svg';
		star5img.src = 'img/estrellas/star.svg';
	}

	star1.addEventListener('mouseenter', () => cambiarSrcStar(1));
	star2.addEventListener('mouseenter', () => cambiarSrcStar(2));
	star3.addEventListener('mouseenter', () => cambiarSrcStar(3));
	star4.addEventListener('mouseenter', () => cambiarSrcStar(4));
	star5.addEventListener('mouseenter', () => cambiarSrcStar(5));
	star1.addEventListener('mouseleave', () => quitarSrcStar());
	star2.addEventListener('mouseleave', () => quitarSrcStar());
	star3.addEventListener('mouseleave', () => quitarSrcStar());
	star4.addEventListener('mouseleave', () => quitarSrcStar());
	star5.addEventListener('mouseleave', () => quitarSrcStar());
}
