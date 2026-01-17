const controlador = {
    items: [],

    agregar(btn) {
        const card = btn.closest('.card');
        const nombre = card.querySelector('h3').innerText;
        
        const carneSelect = card.querySelector('.opt-carne');
        const salsaSelect = card.querySelector('.opt-salsa');
        
        let precio = 0;
        let detalle = "";

        // Si el producto tiene selectores de carne/tamaño
        if (carneSelect) {
            const opt = carneSelect.options[carneSelect.selectedIndex];
            precio = parseFloat(opt.getAttribute('data-p'));
            detalle = ` - ${opt.value}`;
            if (salsaSelect) detalle += ` (${salsaSelect.value})`;
        } else {
            // Si es un producto de precio fijo
            precio = parseFloat(card.querySelector('.price-tag').getAttribute('data-precio'));
        }

        this.items.push({ desc: nombre + detalle, precio: precio });
        this.render();

        // Feedback visual del botón
        btn.innerText = "¡Agregado!";
        btn.style.background = "#25d366";
        setTimeout(() => { btn.innerText = "Añadir +"; btn.style.background = "#8e2113"; }, 800);
    },

    render() {
        const drawer = document.getElementById('cart-drawer');
        const list = document.getElementById('cart-items-list');
        const totalAmt = document.getElementById('cart-total-amt');
        
        this.items.length > 0 ? drawer.classList.remove('cart-hidden') : drawer.classList.add('cart-hidden');

        list.innerHTML = this.items.map((i, idx) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>• ${i.desc}</span>
                <span>$${i.precio} <i class="fa fa-trash" onclick="controlador.eliminar(${idx})" style="color:red; cursor:pointer; margin-left:10px;"></i></span>
            </div>
        `).join('');
        
        const subtotal = this.items.reduce((acc, obj) => acc + obj.precio, 0);
        const envio = parseFloat(document.querySelector('input[name="envio"]:checked').value);
        totalAmt.innerText = `$${subtotal + envio}`;
    },

    eliminar(index) { this.items.splice(index, 1); this.render(); },
    limpiar() { this.items = []; this.render(); },

    pagar() {
        const total = document.getElementById('cart-total-amt').innerText;
        alert(`ORDEN CONFIRMADA\nTotal: ${total}\n\nRedirigiendo a pasarela de pago...`);
    }
};

// Scroll reveal y Parallax
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
    const scrollPos = window.scrollY;
    if(document.getElementById('bg1')) document.getElementById('bg1').style.opacity = scrollPos > 900 ? "0" : "1";
    if(document.getElementById('bg2')) document.getElementById('bg2').style.opacity = scrollPos > 900 ? "1" : "0";
});

window.onload = () => { if(document.querySelector('.reveal')) document.querySelector('.reveal').classList.add('active'); };