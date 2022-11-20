let listaArticulos = [];

const items = localStorage.getItem("items")

const objArticulo = {
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
}

let editando =  false;

const createForm = document.querySelector('#createForm');
const nombreInput= document.querySelector('#nombre');
const descripcionInput = document.querySelector('#descripcion');
const precioInput = document.querySelector('#precio');
const imagenInput = document.querySelector('#imagen');
const btnAgregar = document.querySelector('#btnForm')



btnForm.addEventListener('click', validarCreateForm);

function validarCreateForm(e) {
    e.preventDefault();

    if (!nombreInput.value || 
        !descripcionInput.value || 
        !precioInput.value || 
        !imagenInput.value ) {
        alert ('Todos los campos son obligatorios.');
        return;
    }

    if(editando) {
        editarArticulo();
        editando = false;
    } else {
        objArticulo.id = Date.now();
        objArticulo.nombre = nombreInput.value;
        objArticulo.descripcion = descripcionInput.value;
        objArticulo.precio = precioInput.value;
        objArticulo.imagen = imagenInput.value;

        agregarArticulo();
        
    }
}

function agregarArticulo () {
    listaArticulos.push ({...objArticulo});
    mostrarArticulos ();
    createForm.reset ();
    limpiarObjeto();
    
}
    
function limpiarObjeto() {
    objArticulo.id = '';
    objArticulo.nombre = '';
    objArticulo.descripcion = '';
    objArticulo.precio = '';
    objArticulo.imagen = '';
}

function mostrarArticulos() {
    limpiarHTML ();
    const divArticulos = document.querySelector('.div-articulos')

    listaArticulos.forEach( articulo => {
        const {id, nombre, descripcion, precio, imagen} = articulo;

        const carta = document.createElement('div')
        carta.classList.add('card-wrapper')
        carta.innerHTML = `<div class="card-header">
                                <img src="${imagen}"/>
                                 <h3>${nombre}</h3>
                           </div>
                           <div class="card-detail">
                            <p>${descripcion}</p>
                            <p>$ ${precio}</p>
                           </div>`
        carta.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarArticulo (articulo);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-success');
        carta.append (editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarArticulo (id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn' , 'btn-danger');
        carta.append(eliminarBoton);

        // const hr =document.createElement('hr');

        divArticulos.appendChild(carta);
        // divArticulos.appendChild(hr)
        
    });

    localStorage.setItem("items",JSON.stringify(listaArticulos));
}

function cargarArticulo(articulo) {
    const {id, nombre, descripcion, precio, imagen} = articulo;
    nombreInput.value = nombre;
    descripcionInput.value = descripcion;
    precioInput.value = precio;
    imagenInput.value = imagen;

    objArticulo.id = id;

    createForm.querySelector('button[type="submit"]').text = 'Actualizar'

    editando = true;
}

function editarArticulo () {
    objArticulo.nombre = nombreInput.value;
    objArticulo.descripcion= descripcionInput.value;
    objArticulo.precio = precioInput.value;
    objArticulo.imagen = imagenInput.value;
    listaArticulos.map ( articulo => {
        if(articulo.id === objArticulo.id) {
            articulo.id = objArticulo.id;
            articulo.nombre = objArticulo.nombre;
            articulo.descripcion = objArticulo.descripcion;
            articulo.precio = objArticulo.precio;
            articulo.imagen = objArticulo.imagen;
            
        }
    });

    limpiarHTML();
    mostrarArticulos();
    createForm.reset();
    createForm.querySelector('button[type="submit"]').textContent = 'Agregar'
    editando = false;
}

function eliminarArticulo (id) {
    listaArticulos = listaArticulos.filter(articulo => articulo.id !== id )
    limpiarHTML();
    mostrarArticulos();
    localStorage.setItem("items",JSON.stringify(listaArticulos))
}

function limpiarHTML () {
    const divArticulos = document.querySelector('.div-articulos');
    while(divArticulos.firstChild) {
        divArticulos.removeChild(divArticulos.firstChild);
    }
}