//Este metodo se puede utilizar de manera general para listar los productos de distintas categorias, sin necesidad de reescribir codigo
const listar_productos = async(categoria)=>{

    let lista_productos=[]//almacenar a los productos que recuperamos de la BD

    await axios({
        method:"get",
        url:"http://localhost:3000/api/" + categoria,
        responseType:"json"
    }).then((res)=>{
        lista_productos = res.data.lista
    }).catch((error)=>{
        console.log(error);
    })
    
    return lista_productos;
}

const listar_lacteos = async()=>{

    let lista_lacteos=[]//almacenar a los productos que recuperamos de la BD

    await axios({
        method:"get",
        url:"http://localhost:3000/api/listar-lacteos",
        responseType:"json"
    }).then((res)=>{
        lista_lacteos = res.data.lista
    }).catch((error)=>{
        console.log(error);
    })
    
    return lista_lacteos;
}

const listar_FrutasVerduras = async()=>{

    let lista_FrutasVerduras=[]//almacenar a los productos que recuperamos de la BD

    await axios({
        method:"get",
        url:"http://localhost:3000/api/listar-frutas-verduras",
        responseType:"json"
    }).then((res)=>{
        lista_FrutasVerduras = res.data.lista
    }).catch((error)=>{
        console.log(error);
    })
    
    return lista_FrutasVerduras;
}

const listar_carnes = async()=>{

    let lista_carnes=[]//almacenar a los productos que recuperamos de la BD

    await axios({
        method:"get",
        url:"http://localhost:3000/api/listar-carnes",
        responseType:"json"
    }).then((res)=>{
        lista_carnes = res.data.lista
    }).catch((error)=>{
        console.log(error);
    })
    
    return lista_carnes;
}

const obtenerProductoPorId = async (id_producto) => {
    let productoEncontrado = {};
    try {
        const response = await axios.get(`http://localhost:3000/api/producto/${id_producto}`);
        if (response.data.resultado === true) {
            productoEncontrado = response.data.producto;
        } else {
            console.error('Error al obtener el producto:', response.data.msj);
        }
    } catch (error) {
        console.error('Error de red al obtener el producto:', error);
    }
    return productoEncontrado;
};

const obtenerUrlProductoPorId = async (id_producto) => {
    let urlProducto = '';
    try {
        const response = await axios.get(`http://localhost:3000/producto/${id_producto}`);
        if (response.data.resultado === true) {
            const producto = response.data.producto;
            urlProducto = producto.url;
        } else {
            console.error('Error al obtener el producto:', response.data.msj);
        }
    } catch (error) {
        console.error('Error de red al obtener el producto:', error);
    }
    return urlProducto;
};