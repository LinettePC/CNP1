document.getElementById('toggleButton').addEventListener('click', function() {
    var contenedor = document.getElementById('ocultar');
    if (contenedor.style.display === 'none') {
        contenedor.style.display = 'block';
    } else {
        contenedor.style.display = 'none';
    }
});