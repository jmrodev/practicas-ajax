let message = document.querySelector('#message');

document.getElementById('mostrar').addEventListener('click', function() {
    // let valorActivo = document.querySelector('input[name="status"]:checked').value; // Esto tiene el problema de que puede que un elemento no esté activo, entonces no se podría acceder al value de un null, lo que sería un error en tiempo de ejecución
    let elementoActivo = document.querySelector('input[name="status"]:checked');
    if(elementoActivo) {
        message.innerHTML = elementoActivo.value;
    } else {
        message.innerHTML = 'No hay ninún elemento activo';
    }
});

document.getElementById('setear').addEventListener('click', function() {
    setRadio('status', 'interesado')
});

function setRadio(name, value) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(element => {
        if(element.value === value) {
            element.checked = true;
        }
    });
}

function cambiaColor() { 
    var i 
    for (i = 0; i < document.fcolores.colorin.length; i++){ 
       if (document.fcolores.colorin[i].checked) {
          break; 
      }
    } 
    document.bgColor = document.fcolores.colorin[i].value 
} 

