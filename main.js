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

// array de productos
const productos = [
    {id:1, nombre:"Canyon",imagen:"assets/bici2.png",precio:3700},
    {id:2, nombre:"Trek",imagen:"assets/bici3.png",precio:3900},
    {id:3, nombre:"Argon 18",imagen:"assets/bici4.png",precio:3400},
    {id:4, nombre:"S-works",imagen:"assets/bici5.png",precio:3300},
]

// Iterar sobre el array de productos y crear elementos HTML
productos.forEach(producto => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;
    
    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;
;



     // Crear el botón de compra
    const botonCompra = document.createElement("button");
    botonCompra.textContent = "Comprar";
    botonCompra.onclick = () => {
        agregarAlCarrito(producto);
    };

    productoDiv.appendChild(img);
    productoDiv.appendChild(nombre);
    productoDiv.appendChild(precio);
     productoDiv.appendChild(botonCompra); // Agregar el botón al div del producto
    productosContainer.appendChild(productoDiv);
});










