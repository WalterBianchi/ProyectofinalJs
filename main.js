// selecciono el contenedor 
const tituloConteiner = document.getElementById("Conteiner");

// creacion del h1

const h1 = document.createElement("h1");

h1.textContent = "Bicicletas de Triatlon" ;

h1.style.color ="white"
h1.style.textAlign ="center"
h1.style.fontSize ="50px"
h1.style.marginTop ="20px"

tituloConteiner.appendChild(h1);


//conteneder para las productos
const productosContainer = document.getElementById("Conteiner-productos");

const getproductos = async () => {
    const response = await fetch ("data.json");
    const data = await response.json ();



    // Iterar sobre el array de productos y crear elementos HTML
data.forEach(producto => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const nombre = document.createElement("h3"); 
    nombre.textContent = producto.nombre;
    
    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;




     // Crear el botón de compra
    const botonCompra = document.createElement("button");
    botonCompra.textContent = "Comprar";
    botonCompra.onclick = () => { agregarAlCarrito(producto.id); };

    productoDiv.appendChild(img);
    productoDiv.appendChild(nombre);
    productoDiv.appendChild(precio);
    productoDiv.appendChild(botonCompra); 
    productosContainer.appendChild(productoDiv);
});

// Iniciar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


function agregarAlCarrito(productId) {
    const producto = data.find(item => item.id === productId); 
    if (producto) {
        const existe = carrito.some(item => item.id === productId);
        if (!existe) {
            carrito.push({ id: productId, ...producto }); 
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    } else {
        console.error('Producto no encontrado');
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para calcular el total
function calcularTotal() {
    return carrito.reduce((total, item) => total + item.precio, 0);
}

// Función para mostrar el carrito en el DOM
function mostrarCarrito() {
    const carritoUL = document.getElementById('carrito');
    carritoUL.innerHTML = '';

    if (carrito.length === 0) {
        carritoUL.innerHTML = '<li>El carrito está vacío</li>';
    } else {
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.innerText = `${item.nombre} - $${item.precio}`;
            const button = document.createElement('button');
            button.innerText = 'Eliminar';
            button.onclick = () => eliminarDelCarrito(item.id);
            li.appendChild(button);
            carritoUL.appendChild(li);
        });
    }

    document.getElementById('total').innerText = `Total: $${calcularTotal()}`;
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        swal("El carrito está vacío", "", "warning"); 
    } else {
        swal({
            title: "Compra finalizada",
            text: "Total: $" + calcularTotal(),
            icon: "success",
            buttons: true,
            dangerMode: false,
        }).then((willDelete) => {
            if (willDelete) {
                carrito = [];
                localStorage.removeItem('carrito');
                mostrarCarrito();
            }
        });
    }
}

// Añadir event listeners a los botones de compra
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.getAttribute('data-product-id'));
        agregarAlCarrito(productId);
    });
});

// Botón para finalizar compra
const finalizarButton = document.createElement('button');
finalizarButton.innerText = 'Finalizar Compra';
finalizarButton.onclick = finalizarCompra;
document.body.appendChild(finalizarButton);

// Mostrar el carrito al cargar la página
mostrarCarrito();



}

getproductos();







