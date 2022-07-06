document.addEventListener("DOMContentLoaded", () => {
    getData();
});

let url = 'https://62b09dd5196a9e987027a824.mockapi.io/servicio'
const formulario = document.querySelector('#formulario');
const actividad = document.querySelector('#actividad');
const precio = document.querySelector('#precio');
const idData = document.querySelector('#idData');
const btnSubmit = document.querySelector('#btn-submit');
const list = document.querySelector('#list');
const template = document.querySelector('#template').content;
let fragment = document.createDocumentFragment();

list.addEventListener('click', e => {
    btnAction(e)
}
);

// formulario.addEventListener('submit', e => {
//     e.preventDefault();
//     setData(e);
// }
// );

const getData = async () => {
    const response = await fetch(url);
    const dataObject = await response.json();
    view(dataObject);
}



const view = (dataObject) => {
    list.innerHTML = '';

    Object.values(dataObject).forEach(item => {
        const clone = template.cloneNode(true);

        clone.querySelector('td').textContent = item.id;
        clone.querySelectorAll('td')[0].textContent = item.actividades;
        clone.querySelectorAll('td')[1].textContent = item.precio;
        clone.querySelectorAll('.btn')[0].dataset.id = item.id;
        clone.querySelectorAll('.btn')[1].dataset.id = item.id;

        fragment.appendChild(clone);

    });
    list.appendChild(fragment);
}

const btnAction = e => {
    console.log(e.target);
    if (e.target.classList.contains('btn-edit')) {
        console.log(e.target.dataset.id);
        getData();
    }
    if (e.target.classList.contains('btn-delete')) {
        console.log(e.target.dataset.id);
        deleteData(e.target.dataset.id);
    }

}

let deleteData = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        const dataObject = await response.json();
        view(dataObject);
        getData();
    }
    catch (error) {
        console.log(error);
    }
}





const setData = (e) => {
    if (input.value.trim() === '') {
        console.log('No puedes dejar la tarea en blanco');
        return;
    }
    const data = {
        id: Date.now(),
        actividad: actividad.value,
        precio: precio.value
    }
    data[data.id] = data;

    console.log(e.data);
    formulario.reset();
    data.focus();

    getData();
}