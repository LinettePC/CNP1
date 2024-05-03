// Foto usuario/cliente

const boton_imagen = document.querySelector("#btn-subir-foto");
const imagen = document.querySelector("#foto-usuario");

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: "dxzx5qtaq",
    uploadPreset: "catware_preset"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Imagen registrada", result.info);
        imagen.src = result.info.secure_url;
    }
});

boton_imagen.addEventListener("click", () => {
    widget_cloudinary.open();
}, false);


// Foto vendedor/permisos

const boton_permiso = document.querySelector("#btn-subir-permiso1");
const permisoImagen = document.querySelector("#foto-permiso1"); // Cambiado el nombre de la variable a permisoImagen

// Verificar si el elemento boton_permiso existe en la página actual
if (boton_permiso) {
    let widget_cloudinary_permiso = cloudinary.createUploadWidget({
        cloudName: "dxzx5qtaq",
        uploadPreset: "catware_preset"
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Permiso registrado", result.info);
            permisoImagen.src = result.info.secure_url; // Cambiado el nombre de la variable a permisoImagen
        }
    });

    // Agregar event listener solo si el elemento boton_permiso existe
    boton_permiso.addEventListener("click", () => {
        widget_cloudinary_permiso.open();
    }, false);
}


// Foto usuario/cliente

const boton_imagen2 = document.querySelector("#btn-subir-foto");
const imagen2 = document.querySelector("#imgUsuario");

let widget_cloudinary2 = cloudinary.createUploadWidget({
    cloudName: "dxzx5qtaq",
    uploadPreset: "catware_preset"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Imagen registrada", result.info);
        imagen2.src = result.info.secure_url;
    }
});

boton_imagen2.addEventListener("click", () => {
    widget_cloudinary2.open();
}, false);