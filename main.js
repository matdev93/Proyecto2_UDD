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