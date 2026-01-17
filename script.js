const controlador = {
    items: [],
    agregar(btn) {
        const card = btn.closest('.card');
        const nombre = card.querySelector('h3').innerText;
        const carneSelect = card.querySelector('.opt-carne');
        const salsaSelect = card.querySelector('.opt-salsa');
        
        let precio = carneSelect ? parseFloat(carneSelect.options[carneSelect.selectedIndex].getAttribute('data-p')) : parseFloat(card.querySelector('.price-tag').getAttribute('data-precio'));
        let desc = nombre + (carneSelect ? ` (${carneSelect.value})` : '') + (salsaSelect ? ` [${salsaSelect.value}]` : '');

        this.items.push({ desc, precio });
        this.render();
        btn.innerText = "¡Añadido!";
        setTimeout(() => btn.innerText = "Añadir +", 700);
    },
    render() {
        const drawer = document.getElementById('cart-drawer');
        const list = document.getElementById('cart-items-list');
        const totalAmt = document.getElementById('cart-total-amt');
        this.items.length > 0 ? drawer.classList.remove('cart-hidden') : drawer.classList.add('cart-hidden');
        list.innerHTML = this.items.map((i, idx) => `<div style="display:flex; justify-content:space-between;"><span>• ${i.desc}</span><span>$${i.precio} <i class="fa fa-trash" onclick="controlador.eliminar(${idx})" style="color:red; cursor:pointer;"></i></span></div>`).join('');
        const subtotal = this.items.reduce((acc, obj) => acc + obj.precio, 0);
        const envio = parseFloat(document.querySelector('input[name="envio"]:checked').value);
        totalAmt.innerText = `$${subtotal + envio}`;
    },
    eliminar(idx) { this.items.splice(idx, 1); this.render(); },
    limpiar() { this.items = []; this.render(); },
    pagar() { alert("Total: " + document.getElementById('cart-total-amt').innerText + "\nRedirigiendo a pago..."); }
};

window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
});