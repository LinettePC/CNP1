window.onload = function () {
	var tarjetaUsadaDiv = document.getElementById('tarjetaUsada');
	var direccionEnvioDiv = document.getElementById('direccionEnvio');
	var contenedorBotonInfo = document.querySelector('.container-boton-info');
	var contenedorBotonPago = document.querySelector('.container-boton-pago');

	var tarjetaText = tarjetaUsadaDiv.querySelector('p').textContent.trim();
	var direccionText = direccionEnvioDiv.querySelector('p').textContent.trim();

	if (
		tarjetaText === 'No hay ninguna' &&
		direccionText === 'No hay ninguna'
	) {
		var changeInfoButton = document.createElement('button');
		var changeInfoError = document.createElement('p');

		changeInfoError.innerHTML =
			'Para realizar su compra, por favor agregue <br/> su información de dirección y pago.';
		changeInfoError.style.fontSize = '23px';
		changeInfoError.style.marginBottom = '15px';
		changeInfoError.style.color = 'red';

		changeInfoButton.textContent =
			'Agregar información de dirección y pago';

		changeInfoButton.onclick = function () {
			window.location.href = 'pagoDireccion.html';
		};

		changeInfoButton.classList.add('boton-info');

		contenedorBotonInfo.appendChild(changeInfoError);

		contenedorBotonInfo.appendChild(changeInfoButton);
	} else {
		var buyButton = document.createElement('button');
		buyButton.textContent = 'Realizar compra';
		buyButton.type = 'submit';
		buyButton.classList.add('boton-comprar');
		contenedorBotonPago.appendChild(buyButton);
	}
};
