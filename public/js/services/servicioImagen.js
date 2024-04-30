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

const boton_permiso = document.querySelector("#btn-subir-permiso");
const permisoImagen = document.querySelector("#foto-permiso"); // Cambiado el nombre de la variable a permisoImagen

let widget_cloudinary_permiso = cloudinary.createUploadWidget({
    cloudName: "dxzx5qtaq",
    uploadPreset: "catware_preset"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Permiso registrado", result.info);
        permisoImagen.src = result.info.secure_url; // Cambiado el nombre de la variable a permisoImagen
    }
});

boton_permiso.addEventListener("click", () => {
    widget_cloudinary_permiso.open();
}, false);
