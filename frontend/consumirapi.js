var url = 'http://localhost:3000/api/v1/users';

async function agregar(datos){
await fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(datos), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

}

async function borrar(id){
  const response = await fetch(`${url}/${id}`, {
    method:'DELETE',
  });
  const data = await response.json();
 // console.log(data)
  return  data;
}

async function leer(){
  const response = await fetch(url, {
    method:'GET',
  });
  const data = await response.json();
  
  return data
}

async function leerConId(id){
  const response = await fetch(`${url}/${id}`, {
    method:'GET',
  });
  const data = await response.json();
  //console.log(data)
return data;
}

//borrar(19)


const input = document.querySelector(".entrada");
const button = document.querySelector(".buttonSalida");
const ShowPlaca = document.querySelector(".placas");
const factura=document.querySelector(".facturacion")
//const buttonDarSalida = document.querySelector(".darSalida");
const buttonCancelar=document.querySelector(".cancelar")
const modales=document.querySelector('.modales');
//console.log(buttonDarSalida)
async function mostrarTexto() {
  
    const lecturaPlacas=await leer();
   
    let value = 0;
    let placa;
    let hora;
    let id;
   
    for(let i=0; i<await lecturaPlacas.length; i++){
        const entradaa =input.value;
        const texto = entradaa.toUpperCase()
       

      if(await lecturaPlacas[i].email == texto ){
           value=1;
            placa=await  lecturaPlacas[i].email;
            hora=await lecturaPlacas[i].password;
            id=await lecturaPlacas[i].id;
          
              
          }
          
      } 
     
      return [value,placa,hora,id];
     
    }

  async function mostrarFactura(){
    let placaValue = await mostrarTexto();
    let value=await placaValue[0];
    let placas=await placaValue[1];
    let horasde= await placaValue[2];
    let id= await placaValue[3];
   
    if(value == 1){

      //CONVERSIONES
      let horaEntrada=new Date(horasde);
      let horaSalida=new Date();
      let hora= Date.parse(horaSalida);
      let hora1= Date.parse(horaEntrada);
      let horaMostrar=horaEntrada.toLocaleTimeString();
      let horaMostrar1=horaSalida.toLocaleTimeString();
      let cortarCadena=horaMostrar.substring(0,5)
      let cortarCadena2=horaMostrar1.substring(0,5)

      let minutos=Math.floor(((hora-hora1)*1*1)/(60*1000));
      let horas = Math.floor(((hora-hora1)*1*1)/(60*1000*60));
      let minutosDay=minutos;
      let minutosDay2= minutosDay;
      let total= Math.round(minutosDay*((1/60)*1000));
      let minutosC=Math.round((horas*1000-total)*(60/1000)*(-1));
     // FIN CONVERSIONES
      
    
      const div=document.createElement('DIV');
      const showText = `<div class="text-light text-center">
      <h3>Placa: ${placas}</h3>
      Hora Entrada:  ${cortarCadena}  <br>
      Hora Salida:  ${cortarCadena2} <br>
      Horas Parqueo: ${horas} <br>
      Minutos Parqueo: ${minutosC}
      <h3>El valor es:</h3>
      <h3>${total}$ </h3>
      </div>`
      div.innerHTML = showText;
      factura.appendChild(div)

      const botonImp=document.createElement('A');
      const showBoton = `<a href="javascript:imprSelec('facturacion')"><button type="button" class="btn btn-secondary bg-light text-primary imprimir" data-bs-dismiss="modal">Dar Salida</button></a> `
      botonImp.innerHTML = showBoton;
      modales.appendChild(botonImp)
      const print=document.querySelector('.imprimir')
      print.addEventListener('click', actualizar);
      function actualizar(){
        setTimeout(() => {
          location.reload()
        }, 1000);
        borrar(id)
      }

     return
      
     }
      return await [value,placas,horasde]
    }   

    async function aggDb(){
      let datos = await mostrarFactura();
      const entradaa =input.value;
      const texto = entradaa.toUpperCase()
     
      const value = await mostrarTexto()
      const value2= value[0]
     // console.log(texto)
    // console.log(value2)
    if(value2 == '0' && texto !==''){
   
    await agregar({email: `${texto}`,
    password: `${Date()}`,
    role:'customer'});

    
    const div2=document.createElement('DIV');
    const showText2 = `<div>
    <h3>Placa: <p class="text-success">${texto}</p> ingresada el: ${Date()}</h3>
    </div>`
    div2.innerHTML = showText2;
    ShowPlaca.appendChild(div2)

    const div=document.createElement('DIV');
      const showText = `<div class="text-light text-center">
      <h3>Placa: ${texto}</h3>
      <h3>Agregada con exito </h3>
      </div>`
      div.innerHTML = showText;
      factura.appendChild(div)

    
    }
    if(value2 == '0' && texto ==''){
      const div=document.createElement('DIV');
      const showText = `<div class="text-light text-center">
      
      <h3>No has ingresado ninguna placa</h3>
      </div>`
      div.innerHTML = showText;
      factura.appendChild(div)
    }
    
    }
   
  function actualizarPagina(){
    location.reload();
  
  }
  
    button.addEventListener('click', aggDb)
    buttonCancelar.addEventListener('click', actualizarPagina)
   
  

