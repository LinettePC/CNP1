const boton_imagen_producto = document.getElementById("btn-subir-foto-producto");
const imagenProducto = document.querySelector("#foto-producto");
const contenedor = document.querySelector('.divImagenProducto');

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: "dxzx5qtaq",
    uploadPreset: "catware_preset"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Imagen registrada", result.info);
        imagenProducto.src = result.info.secure_url;
    }
});



boton_imagen_producto.addEventListener("click", () => {
    widget_cloudinary.open();
    contenedor.style.display = 'flex';
}, false);

