window.addEventListener("DOMContentLoaded", getData)
let url = 'https://62b09dd5196a9e987027a824.mockapi.io/servicio'

async function getData(){
    let list = document.querySelector('#list')
    list.innerHTML = ''
    try{
        let res  = await fetch(url)
        let dataJson = await res.json()
        
        for ( const servicio of dataJson){
            let actividad = servicio.actividades
            let precio = servicio.precio
            let id = servicio.id
            list.innerHTML += `
            <tr>

                <td>${actividad}</td>
                <td>${precio}</td>
                <td>
                    <button  class="btn-edit" data-id="${id}">Editar</button>    
                    <button onclick="deleteData()" class="btn-delete" data-id="${id}">Borrar</button>
                </td>
            </tr>
            `
        }
        }catch (e) {
            console.log(e)
        }
}

async function deleteData(){
    console.log("delete")
    let id = this.dataset.id
    console.log(id)
    let res = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    let dataJson = await res.json()
    console.log(dataJson)
    getData()
}