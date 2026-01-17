const controlador = {
    items: [],

    agregar(btn) {
        const card = btn.closest('.card');
        const nombre = card.querySelector('h3').innerText;
        
        const carneSelect = card.querySelector('.opt-carne');
        const salsaSelect = card.querySelector('.opt-salsa');
        
        // Si hay selector de carne/tamaño, toma ese precio. Si no, toma el price-tag.
        let precio = carneSelect ? 
            parseFloat(carneSelect.options[carneSelect.selectedIndex].getAttribute('data-p')) : 
            parseFloat(card.querySelector('.price-tag').getAttribute('data-precio'));

        // Construir descripción detallada
        let desc = nombre;
        if(carneSelect) desc += ` - ${carneSelect.value}`;
        if(salsaSelect) desc += ` (${salsaSelect.value})`;

        this.items.push({ desc, precio });
        this.render();

        // Efecto visual en el botón
        const originalText = btn.innerText;
        btn.innerText = "¡Agregado!";
        btn.style.background = "#25d366";
        setTimeout(() => { 
            btn.innerText = originalText; 
            btn.style.background = "#8e2113"; 
        }, 800);
    },

    render() {
        const drawer = document.getElementById('cart-drawer');
        const list = document.getElementById('cart-items-list');
        const totalAmt = document.getElementById('cart-total-amt');
        
        if(this.items.length > 0) drawer.classList.remove('cart-hidden');
        else drawer.classList.add('cart-hidden');

        list.innerHTML = this.items.map((i, idx) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px; border-bottom:1px solid #222;">
                <span>${i.desc}</span>
                <span>$${i.precio} <i class="fa fa-trash" onclick="controlador.eliminar(${idx})" style="color:red; cursor:pointer; margin-left:10px;"></i></span>
            </div>
        `).join('');
        
        const subtotal = this.items.reduce((acc, obj) => acc + obj.precio, 0);
        const envio = parseFloat(document.querySelector('input[name="envio"]:checked').value);
        
        totalAmt.innerText = `$${subtotal + envio}`;
    },

    eliminar(index) {
        this.items.splice(index, 1);
        this.render();
    },

    limpiar() {
        this.items = [];
        this.render();
    },

    pagar() {
        const total = document.getElementById('cart-total-amt').innerText;
        alert(`Redirigiendo a Pago Seguro...\nTotal: ${total}\nSu pedido será notificado a la sucursal.`);
    }
};

// Scroll effects
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
    const scrollPos = window.scrollY;
    document.getElementById('bg1').style.opacity = scrollPos > 800 ? "0" : "1";
    document.getElementById('bg2').style.opacity = scrollPos > 800 ? "1" : "0";
});

window.onload = () => { document.querySelector('.reveal').classList.add('active'); };