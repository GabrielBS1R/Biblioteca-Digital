// Carrito.js

// Inicializar el carrito si no existe en localStorage
if (!localStorage.getItem("carrito")) {
    localStorage.setItem("carrito", JSON.stringify([]));
}

// Agregar un libro al carrito
function agregarAlCarrito(id, nombre, precio = 10) {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.push({ id, nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Renderizar el carrito en la página del carrito
function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    const carritoElement = document.getElementById("carrito-items");

    carritoElement.innerHTML = ""; // Limpia la vista del carrito

    if (carrito.length === 0) {
        carritoElement.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "carrito-item";
        itemElement.innerHTML = `
            <span>${item.nombre} - $${item.precio}</span>
        `;
        carritoElement.appendChild(itemElement);
    });
}

// Cargar el carrito al iniciar la página
document.addEventListener("DOMContentLoaded", renderizarCarrito);
