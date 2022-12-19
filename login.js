
localStorage.clear()


class Nodo{
    constructor(_value){
        this.value = _value
        this.next = null
    }
}



class Lista{
    constructor(){
        this.head = null
    }

    //metodos de la lista
    //insertar
    insert(_value){
        var tempo = new Nodo(_value)
        tempo.next = this.head
        this.head = tempo
    }
    //mostrar 
    printList(){
        var temporal = this.head
        while(temporal!=null){
            console.log(temporal.value)
            temporal = temporal.next
        }
    }
}

cargarDatosInicialesBaseDeDatosLogin()
// localStorage.clear()



baseDatosLogin = new Lista();
baseDatosLogin = JSON.parse(localStorage.getItem("sistema-de-login")) 

if (!baseDatosLogin){
    cargarDatosInicialesBaseDeDatosLogin()
    console.log(baseDatosLogin)
}

function guardarDatosDeLaBaseDeDatosLogin(){
localStorage.setItem("sistema-de-login", JSON.stringify(baseDatosLogin))
console.log(baseDatosLogin)
}


function cargarDatosInicialesBaseDeDatosLogin(){

// baseDatosLogin={
//     1234567890:{
//         contraseña:"abc"
//     },

//     EDD:{
//      dpi: "2654568452521",
//      nombre:"Oscar Armin",
//      contraseña:"123",
//      telefono:" +502 (123) 123-4567"
//     },

//     "123456789":{
//         contraseña:"abc"
//     }
// };

    baseDatosLogin = new Lista();
    baseDatosLogin.insert(
        {
            nombre:"primerRegistro",
            contraseña:"contraPrimero"
        }
        );

    baseDatosLogin.insert(
        {
            usuario: "EDD",
            dpi: "2654568452521",
            contraseña:"123",
            telefono:" +502 (123) 123-4567"
        }
        );

    baseDatosLogin.insert(
        {
            nombre:"123456789",
            contraseña:"abc"
        }
        );

}




async function menúBasico(){

opción_menúBasico = -1
await swal.fire({
    title: "Menú",
    showConfirmButton:false,
    html: `
    <button class="swal2-confirm swal2-styled" onclick= opción_menúBasico=0;Swal.close()>
     Registrar nuevo usuario
     </button>
     <br>
     <button class="swal2-confirm swal2-styled" onclick= opción_menúBasico=1;Swal.close()>
     Login
     </button>
    `
})

switch(opción_menúBasico){
    case 0:
    registrarNuevoUsuario();
    break;
    case 1:
    login();
    break;
    default:
        await menúBasico();
        break;

}




}

async function registrarNuevoUsuario(){
    opción_registrarNuevousuario=-1;
    await swal.fire({
       title:"Registrar" ,
        showConfirmButton:false,
        html: `
        <input class="swal2-input" placeholder="usuario" id="usuario"> 
        <input class="swal2-input" placeholder="Nombre Completo" id="Nombre Completo"> 
        <input class="swal2-input" placeholder="DPI" id="DPI"> 
        <input class="swal2-input" placeholder="Telefono" id="Telefono"> 
        <input class="swal2-input" placeholder="Contraseña" id="contraseña">
        <button class="swal2-confirm swal2-styled" onclick= opción_opción_registrarNuevousuario=0;Swal.clickConfirm()>
         Crear nuevo usuario
         </button>
         <button class="swal2-confirm swal2-styled" onclick= opción_opción_registrarNuevousuario=1;Swal.close()>
         Cancelar
         </button>
        `
        ,
        preConfirm:()=>{
            let usuario=document.getElementById("usuario").value 
            let nombreCompleto=document.getElementById("nombreCompleto")  
            let DPI=document.getElementById("DPI").value     
            let telefono=document.getElementById("telefono")        
            let contraseña=document.getElementById("contraseña").value;
            if(!usuario){
                Swal.showValidationMessage("No existe un usuario");
                return false;
            }
            if(!contraseña){
                Swal.showValidationMessage("No existe una contraseña");
                return false;
            }

            if( usuarioRepetido (usuario) ){
                console.log("Este usuario ya existe")
                console.log(baseDatosLogin)
            }
            else{
                console.log("aca")
                nuevoUsuario = {
                    user: usuario,
                    nombreCompleto:nombreCompleto,
                    DPI:DPI,
                    telefono:telefono,
                    constrasenia : contraseña
                }
                baseDatosLogin.insert(nuevoUsuario)
                console.log("===========REGISTRO ACTUALIZADO=============")
                console.log(baseDatosLogin)
                return true
            }

            
        

        },
    });

 switch(opción_registrarNuevousuario){
    case 0:
        break;
        case 1:
            menúBasico();
            default:
            break;

}
}


async function login(){
    let {value:datos}= await swal.fire({
        title:"Bienvenido",
        confirmButtonText: "Login",
        html:`
        <div style ="margin:5px">
        <input class="swal2-input" placeholder="usuario" id="usuario"></input>
        <input class="swal2-input" placeholder="contraseña" id="contraseña"></input>
        </div>
        `
        ,
        preConfirm:()=>{
            let usuario=document.getElementById("usuario").value;
            let contraseña=document.getElementById("contraseña").value;
            if(!usuario){
                Swal.showValidationMessage("No existe un usuario");
                return false;
            }
            if(!contraseña){
                Swal.showValidationMessage("No existe una contraseña");
                return false;
            }
            

          let datos= baseDatosLogin[usuario]
           if(!datos){
            Swal.showValidationMessage("El usuario no existe");
            return false;
        }          

        if (datos.contraseña !=contraseña){
            Swal.showValidationMessage("Contraseña icnorrecta");
            return false;
        }
        return datos
        },


    });

    return datos;
}



function usuarioRepetido(usuario){


    var temporal = baseDatosLogin.head
    while(temporal !=null ){

        console.log(`comparando ${temporal.value.nombre} con ${usuario}`)
        if( temporal.value.nombre === usuario ){
            return true;
        }

        temporal = temporal.next
    }
    return false;

}