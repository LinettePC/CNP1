// Autor: Julio
// DOM listener
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formLogin');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevenir envío del formulario por defecto
  
      // Validar campos
      if (!validarCamposVacios() || !validarCorreo()) {
        return; // Detener la función si la validación falla
      }
  
      // Enviar formulario o realizar otras acciones si es válido
      Swal.fire({
        title: "Formulario válido",
        text: "Los campos son válidos, se puede enviar el formulario.",
        icon: "success"
      });
  
      // Ejemplo: Simular envío del formulario (reemplazar con lógica de envío real)
      console.log("Enviando formulario (reemplazar con lógica de envío real)");
    });
  });
  
  function validarCamposVacios() {
    let camposRequeridos = document.querySelectorAll("input[required]");
    let error = false;
  
    camposRequeridos.forEach(campo => {
      if (campo.value.trim() === "") {
        error = true;
        campo.classList.add("error");
      } else {
        campo.classList.remove("error");
      }
    });
  
    if (error) {
      Swal.fire({
        title: "Existen Campos Vacíos",
        text: "Completa todos los campos obligatorios.",
        icon: "warning"
      });
    }
  
    return !error; // Devolver true si no hay errores, false de lo contrario
  }
  
  function validarCorreo() {
    const correoInput = document.getElementById("correo");
    const correoValue = correoInput.value.trim();
    const correoExpresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!correoExpresion.test(correoValue)) {
      correoInput.classList.add("error");
      Swal.fire({
        title: "El Correo es inválido",
        text: "Revisa el formato utilizado. Debe ser: usuario@dominio.com",
        icon: "warning"
      });
      return false;
    } else {
      correoInput.classList.remove("error");
      return true;
    }
  }
