//Autor: Linette

//esta ruta esta en doc 
const validarCliente = async (pCedula, pContrasenna) =>{
    await axios({
        method:"get",
        url:"http://localhost:3000/api/validarLogCliente",
        responseType:"json",
        data:{
            cedula:pCedula,
            contrasenna:pContrasenna
        }
    }).then((res)=>{
        if(res.data.resultado==false){
            Swal.fire({
                title:"Datos incorrectos",
                text:"La contraseña es incorrecta o el usuario no existe",
                icon:"warning"
            })
        }else{
            //sessionStorage.setItem("estado","Activo") no necesario creo
            sessionStorage.setItem("rol","cliente") //no necesario creo;
            //sessionStorage.setItem("estado",res.data.resultado.estado) no necesario creo
            Swal.fire({
                title: 'Datos correctos!!!',
                text: '',
                icon: 'success',
            });
            window.location.href= "miPerfil.html"
            
        }
    })
}