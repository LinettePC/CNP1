

const listar_FrutasVerduras = async()=>{

    let lista_FrutasVerduras=[]//almacenar a los usuarios que recuperamos de la BD

    await axios({
        method:"get",
        url:"http://localhost:3000/api/listar-frutas-verduras",
        responseType:"json"
    }).then((res)=>{
        lista_FrutasVerduras = res.data.lista
    }).catch((error)=>{
        console.log(error)
    })
    
    return lista_FrutasVerduras
}
