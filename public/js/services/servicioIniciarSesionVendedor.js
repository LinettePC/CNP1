//Autor:Linette
const validarVendedor = async(pCedula,pContrasenna,pEstado)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/validarLogVendedor",
        responseType:"json",
        data:{
            cedula:pCedula,
            contrasenna:pContrasenna,
            //estado:pEstado
        }
    }).then((res)=>{
        if(res.data.resultado==1){
            Swal.fire({
                title:"Ya tu cuenta fue aprobada",
                text:"Ahora debes cambiar la contraseña",
                icon:"success"
            })//tengo que mandarlo al otro html para que haga nueva contrasenna


        }else if(res.data.resultado==2){
            Swal.fire({
                title: 'Datos correctos!!!',
                text: '',
                icon: 'success',
            }).then(()=>{
                setTimeout(()=>{
                
                    sessionStorage.setItem("cedula",res.data.usuario.cedula)
                    sessionStorage.setItem("nombre",res.data.usuario.nombre)
                    sessionStorage.setItem("primerApellido",res.data.usuario.primerApellido)
                    sessionStorage.setItem("correo",res.data.usuario.correo)
                    sessionStorage.setItem("telefono",res.data.usuario.telefono)
    
                    //sessionStorage.setItem("rol","cliente") //ejemplo
                    //sessionStorage.setItem("estado",res.data.resultado.estado) //ejemplo
    
                    window.location.href= "portalVendedor.html"
                    
                },1000)

            })

        }

    })
}