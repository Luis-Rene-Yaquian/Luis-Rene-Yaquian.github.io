
baseDatosLogin= JSON.parse(localStorage.getItem("sistema-de-login")) 

if (!baseDatosLogin){
    cargarDatosInicialesBaseDeDatosLogin()
}

function guardarDatosDeLaBaseDeDatosLogin(){
localStorage.setItem("sistema-de-login", JSON.stringify(baseDatosLogin))

}



function cargarDatosInicialesBaseDeDatosLogin(){

baseDatosLogin={
    1234567890:{
        contraseña:"abc"
    },

    EDD:{
     dpi: "2654568452521",
     nombre:"Oscar Armin",
     contraseña:"123",
     telefono:" +502 (123) 123-4567"
    },

    "123456789":{
        contraseña:"abc"
    }
};
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
        <input class="swal2-input" placeholder="Contraseña" id="contraseña">
        <button class="swal2-confirm swal2-styled" onclick= opción_opción_registrarNuevousuario=0;Swal.clickConfirm()>
         Crear nuevo usuario
         </button>
         <br>
         <button class="swal2-confirm swal2-styled" onclick= opción_opción_registrarNuevousuario=1;Swal.close()>
         Cancelar
         </button>
        `
        ,
        preConfirm:()=>{
            let usuario=document.getElementById("usuario").value 
            let contraseña=document.getElementById("contraseña").value;
            if(!usuario){
                Swal.showValidationMessage("No existe un usuario");
                return false;
            }
            if(!contraseña){
                Swal.showValidationMessage("No existe una contraseña");
                return false;
            }
            baseDatosLogin[usuario]={}          
            baseDatosLogin[usuario].contraseña=contraseña 
            guardarDatosDeLaBaseDeDatosLogin();
            return true
        

        },
    });

 switch(opción_registrarNuevousuario){
    case 0:
        menúBasico;
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
            let usuario=document.getElementById("usuario").value 
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