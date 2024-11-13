# Mercado del CNP para Vendedores y Compradores

<p align="left"> 
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" /> 
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" /> 
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" /> 
  <br> 
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /> 
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" /> 
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /> 
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" /> 
</p>

Este proyecto ofrece un mercado en línea donde los usuarios pueden comprar y vender productos, proporcionando una plataforma integral para vendedores y compradores en el CNP.

## Descripción del Proyecto
La plataforma permite a los usuarios navegar y comprar productos, mientras que los vendedores pueden administrar sus inventarios y ventas. También incluye un sistema de administración que facilita la moderación de usuarios y productos, además de la creación de categorías y plantillas de productos.

## Características
- **Roles de Usuario**

- **Usuarios:**
  - Realizan compras de productos.
  - Pueden dejar reseñas de productos.
  - Editan su perfil personal.
  - Acceden a reportes detallados de sus compras.

- **Vendedores:**
  - Publican y gestionan sus productos para la venta.
  - Pueden editar los detalles de sus productos y perfil.
  - Visualizan reportes de sus ventas.

- **Administrador:**
  - Crea plantillas de productos y categorías del sitio.
  - Modera el acceso al sitio rechazando usuarios si es necesario.
  - Administra usuarios y productos.
  - Accede a reportes globales de compras y ventas.

## Funcionalidades Principales
- **Autenticación y Autorización:**
  - Registro de usuarios y autenticación segura.
  - Control de acceso diferenciado según el rol del usuario.

- **Gestión de Productos:**
  - Creación, edición y eliminación de productos por los vendedores.
  - Clasificación y búsqueda de productos por categorías.

- **Reseñas y Calificaciones:**
  - Sistema de reseñas para que los usuarios califiquen y comenten prod 

- **Reportes y Análisis:**
  - Los usuarios y vendedores pueden ver reportes detallados de sus compras y ventas.
  - El administrador puede ver reportes de compras y ventas a nivel global.

## Tecnologías Utilizadas

- **Front-end:**
  - HTML5
  - CSS3
  - JavaScript

- **Back-end:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Módulos Node.js:**
  - body-parser
  - cors
  - dotenv
  - nodemon

## Instrucciones de Instalación
1. **Clonar el repositorio:**

  ```bash
  git clone https://github.com/username/mercado-cnp.git
  cd mercado-cnp
  ```

2. **Instalar las dependencias:**

  Asegúrate de tener Node.js y npm instalados. Luego, ejecuta:

  ```bash
  npm install
  ```

3. **Configuración de la base de datos:**

  - Configura una base de datos en MongoDB (puedes utilizar MongoDB Atlas si prefieres una base de datos en la nube).
  - Actualiza las credenciales de conexión en el archivo .env.

  Iniciar la aplicación:

  ```bash
  nodemon --exec npm start
  ```
4. **Acceso a la aplicación:**

  Abre tu navegador y ve a http://localhost:3000 (o el puerto que hayas configurado).

5. **Uso**

  La aplicación ofrece las siguientes funcionalidades según el rol del usuario:

  - **Usuarios:**
    - Pueden registrarse, comprar productos y dejar reseñas.
    - Acceden a reportes de sus compras y pueden editar sus perfiles.

  - **Vendedores:**
    - Publican productos, los administran y editan sus perfiles.
    - Acceden a reportes de ventas detallados.

  - **Administrador:**
    - Administra y categoriza productos.
    - Puede aprobar o rechazar usuarios y productos.
    - Genera reportes de actividad globales.
