//Autor:Linette
const validarVendedor = async(pCedula,pContrasenna,/*pEstado*/)=>{
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
            }).then(()=>{
                //tengo que mandarlo al otro html para que haga nueva contrasenna
                setTimeout(()=>{
                
                    sessionStorage.setItem("cedula",res.data.usuario.cedula)
                    sessionStorage.setItem("nombre",res.data.usuario.nombre)
                    sessionStorage.setItem("primerApellido",res.data.usuario.primerApellido)
                    sessionStorage.setItem("correo",res.data.usuario.correo)
                    sessionStorage.setItem("telefono",res.data.usuario.telefono)
    
                    //sessionStorage.setItem("rol","cliente") //ejemplo
                    //sessionStorage.setItem("estado",res.data.resultado.estado) //ejemplo
                    
                    //falta crear este html cambioContrasennaVend.html
                    window.location.href= "cambioContrasennaVend.html"
                    
                },1000)

            })
            


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
                    //estos no son todos los atributos pero creo que solo se necesita cedula
    
                    //sessionStorage.setItem("rol","cliente") //ejemplo
                    //sessionStorage.setItem("estado",res.data.resultado.estado) //ejemplo
    
                    window.location.href= "miPerfil.html"

                },1000)

            })
        }else if(res.data.resultado==3){
            Swal.fire({
                title:"Contraseña incorrecta",
                text:"Vuelve a intentarlo",
                icon:"warning"
            })
        }else if(res.data.resultado==4){
            Swal.fire({
                title:"Debes esperar",
                text:"a que tu solicitud sea revisada",
                icon:"warning"
            })

        }else if(res.data.resultado==5){
            Swal.fire({
                title:"Lo siento,",
                text:"tu solicitud fue rechazada",
                icon:"warning"
            })
        }else if(res.data.resultado==6){
            Swal.fire({
                title:"Datos incorrectos",
                text:"No existe un vendedor con esta identificación",
                icon:"warning"
            })
        }


    })
}