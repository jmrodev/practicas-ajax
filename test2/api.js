document.addEventListener("DOMContentLoaded", () => {
    getData();
});

let url = 'https://62b09dd5196a9e987027a824.mockapi.io/servicio'
const formulario = document.querySelector('#formulario');
const edit = document.querySelector('#edit');
const actividad = document.querySelector('#actividad');
const precio = document.querySelector('#precio');
const btnSubmit = document.querySelector('#btn-submit');
const list = document.querySelector('#list');
const actividadEdit = document.querySelector('#actividadEdit');
const precioEdit = document.querySelector('#precioEdit');
const template = document.querySelector('#template').content;
let fragment = document.createDocumentFragment();

list.addEventListener('click', e => {
    btnAction(e)
}
);

formulario.addEventListener('submit', e => {
    e.preventDefault();
    setData(e);
}
);

const getData = async () => {
    try {
        const response = await fetch(url);
        const dataObject = await response.json();
        view(dataObject);
    } catch (error) {
        console.log(error);
    }

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
    if (e.target.classList.contains('btn-edit')) {
        toShow(e.target.dataset.id);
    }
    if (e.target.classList.contains('btn-delete')) {
        deleteData(e.target.dataset.id);
    }
}

const deleteData = async (id) => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(a => {
                getData();
                console.log(a);
            })
    } catch (error) {
        console.log(error);
    }
}

const setData = (e) => {
    e.preventDefault();
    try {
        const data = {
            actividades: actividad.value,
            precio: precio.value
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(_a => {
                actividad.value = '';
                precio.value = '';
                getData();
            }
            )
    } catch (error) {
        console.log(error);
    }
}

function toShow(id) {
    if (edit.style.display === 'none') {
        edit.style.display = 'block';
        formulario.style.display = 'none';
        edit.addEventListener('submit', e => {
            e.preventDefault();
            editData(id);
        }
        );
    } else {
        edit.style.display = 'none';
        formulario.style.display = 'block';
    }
}

const editData = id => {
console.log(id);
    try {
        const data = {
            actividades: actividadEdit.value,
            precio: precioEdit.value
        }
        fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(_a => {
                actividadEdit.value = '';
                precioEdit.value = '';
                edit.style.display = 'none';
                formulario.style.display = 'block';
                getData();
            }
            )

    } catch (error) {
        console.log(error);
    }

}


