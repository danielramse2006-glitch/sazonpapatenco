let carrito = [];
let total = 0;

// 1. Agregar productos SIMPLES (solo nombre y precio)
function agregarDirecto(nombre, precio) {
    agregarAlCarrito(nombre, precio);
}

// 2. Agregar productos con PRECIO VARIABLE (Select de precios + Selects de detalle)
function agregarConOpciones(nombreBase, boton) {
    const container = boton.parentElement;
    const selPrecio = container.querySelector('.opt-precio');
    const selDetalle = container.querySelector('.opt-detalle');
    const selDetalle2 = container.querySelector('.opt-detalle2');

    let nombreFinal = nombreBase;
    let precio = 0;

    // Obtener precio y nombre de la opción principal
    if (selPrecio) {
        precio = parseFloat(selPrecio.options[selPrecio.selectedIndex].getAttribute('data-p'));
        nombreFinal += ` (${selPrecio.value})`;
    }

    // Agregar detalles (salsas, rellenos)
    if (selDetalle) {
        nombreFinal += ` - ${selDetalle.value}`;
    }
    if (selDetalle2) {
        nombreFinal += ` - ${selDetalle2.value}`;
    }

    agregarAlCarrito(nombreFinal, precio);
}

// 3. Agregar productos con PRECIO FIJO pero con detalles (ej. Mole, Chilaquiles)
function agregarConDetalles(nombreBase, precioBase, boton) {
    const container = boton.parentElement;
    const selDetalle = container.querySelector('.opt-detalle');
    const selDetalle2 = container.querySelector('.opt-detalle2');

    let nombreFinal = nombreBase;
    
    if (selDetalle) nombreFinal += ` (${selDetalle.value})`;
    if (selDetalle2) nombreFinal += ` - ${selDetalle2.value}`;

    agregarAlCarrito(nombreFinal, precioBase);
}

// Lógica central del carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarUI();
    
    // Abre el carrito automáticamente
    const drawer = document.getElementById('cart-drawer');
    if(!drawer.classList.contains('active')) toggleCart();
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarUI();
}

function actualizarUI() {
    const lista = document.getElementById('cart-items');
    const count = document.getElementById('cart-count');
    const totalTxt = document.getElementById('total-price');
    
    lista.innerHTML = "";
    carrito.forEach((item, index) => {
        lista.innerHTML += `
            <div class="cart-item">
                <span style="flex-grow:1; padding-right:10px;">${item.nombre}</span>
                <span style="white-space:nowrap;">$${item.precio} 
                <i class="fas fa-trash" style="color:#8e2113; margin-left:8px; cursor:pointer;" onclick="eliminarDelCarrito(${index})"></i></span>
            </div>
        `;
    });

    count.innerText = carrito.length;
    totalTxt.innerText = "$" + total;
}

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('active');
}

function enviarWhatsApp() {
    if(carrito.length === 0) return alert("¡Tu carrito está vacío!");

    let mensaje = "¡Hola Sazón Papatenco! 🌶️\nQuisiera hacer el siguiente pedido:\n\n";
    carrito.forEach(item => {
        mensaje += `▪️ ${item.nombre} - $${item.precio}\n`;
    });

    const notas = document.getElementById('notas').value;
    if(notas) mensaje += `\n📝 NOTAS: ${notas}`;
    
    mensaje += `\n\n💰 *TOTAL A PAGAR: $${total}*`;
    mensaje += `\n📍 *Dirección:* (Escribe aquí tu dirección)`;
    
    const url = `https://wa.me/528994931166?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Animaciones de entrada
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
});
window.onload = () => { document.querySelector('.reveal').classList.add('active'); };