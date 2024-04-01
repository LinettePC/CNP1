const seleccioneUsuarioOption = document.createElement('option');
seleccioneUsuarioOption.text = 'Seleccione un usuario';
seleccioneUsuarioOption.value = '0';
seleccioneUsuarioOption.disabled = true;

document
	.getElementById('selectTipoUsuario')
	.addEventListener('change', function () {
		var selectTipoUsuario = document.getElementById('selectTipoUsuario');
		var selectUsuario = document.getElementById('selectUsuario');
		var selectedValue = selectTipoUsuario.value;

		// Clear existing options
		selectUsuario.innerHTML = '';

		// Add "Seleccione usuario"
		selectUsuario.appendChild(seleccioneUsuarioOption);

		// Add "Todos" option for selected types
		if (
			selectedValue === 'tipoVendedor' ||
			selectedValue === 'tipoComprador' ||
			selectedValue === 'tipoCualquiera'
		) {
			seleccioneUsuarioOption.selected = true;

			var todosOption = document.createElement('option');
			todosOption.text = 'Todos';
			todosOption.value = 'todos';
			selectUsuario.appendChild(todosOption);
		}

		// Add other specific options
		if (selectedValue === 'tipoAdmin') {
			seleccioneUsuarioOption.selected = true;

			var adminOption = document.createElement('option');
			adminOption.text = 'Admin';
			adminOption.value = 'admin';
			selectUsuario.appendChild(adminOption);
		}
	});
