const botonCerrarSesion = document.querySelector("#btnCerrarSesion")

const cerrarSesion = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.href="dosLandingPage.html"
}
botonCerrarSesion.addEventListener("click",cerrarSesion)