window.addEventListener('DOMContentLoaded', getData);
const tablediv = document.querySelector('table');
const form = document.querySelector('form');
form.addEventListener('submit', postData);
const url = 'http://localhost:3002/datos';

async function postData(e) {
    let formData = new FormData(form);
    let data = {};
    console.log(data.value);
    console.log(data.key);
    formData.forEach((value, key) => {
        data[key] = value;
    }
    );

    console.log(data);
    e.preventDefault();
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
        
    });
    let data2 = await response.json();
    console.log("datos : " + data2);
    tablediv.innerHTML = '';
    getData();
}

async function getData() {
    let response = await fetch(url);

    let data = await response.json();
    data.forEach(element => {

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.innerHTML = element.name;
        td2.innerHTML = element.age;
        td3.innerHTML = element.phone;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        console.log(tr);
        tablediv.appendChild(tr);

    }
    );
}







