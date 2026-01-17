const controlador = {
    items: [],

    agregar(btn) {
        const card = btn.closest('.card');
        const nombre = card.querySelector('h3').innerText;
        const carneSel = card.querySelector('.opt-carne');
        const salsaSel = card.querySelector('.opt-salsa');
        const tag = card.querySelector('.price-tag');

        let precio = 0;
        let opciones = "";

        if (carneSel) {
            // Si el select tiene data-p (precio), lo usamos
            const selectedOpt = carneSel.options[carneSel.selectedIndex];
            precio = selectedOpt.getAttribute('data-p') ? parseFloat(selectedOpt.getAttribute('data-p')) : parseFloat(tag.getAttribute('data-precio'));
            opciones += ` (${carneSel.value})`;
        } else if (tag) {
            precio = parseFloat(tag.getAttribute('data-precio'));
        }

        if (salsaSel) opciones += ` [Salsa: ${salsaSel.value}]`;

        this.items.push({ desc: nombre + opciones, precio: precio });
        this.render();

        btn.innerText = "¡Añadido!";
        setTimeout(() => btn.innerText = "Añadir +", 700);
    },

    render() {
        const drawer = document.getElementById('cart-drawer');
        const list = document.getElementById('cart-items-list');
        const totalAmt = document.getElementById('cart-total-amt');
        
        this.items.length > 0 ? drawer.classList.remove('cart-hidden') : drawer.classList.add('cart-hidden');

        list.innerHTML = this.items.map((i, idx) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>• ${i.desc}</span>
                <span>$${i.precio} <i class="fa fa-trash" onclick="controlador.borrar(${idx})" style="color:red; margin-left:10px; cursor:pointer;"></i></span>
            </div>
        `).join('');

        const total = this.items.reduce((acc, obj) => acc + obj.precio, 0);
        totalAmt.innerText = `$${total}`;
    },

    borrar(idx) { this.items.splice(idx, 1); this.render(); },

    pagar() {
        if (this.items.length === 0) return;
        let msg = "¡Hola! Mi pedido de El Sazón Papatenco es:\n\n";
        this.items.forEach(i => msg += `- ${i.desc}: $${i.precio}\n`);
        msg += `\n*TOTAL: ${document.getElementById('cart-total-amt').innerText}*`;
        
        const url = `https://wa.me/528994931166?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    }
};

// Scroll Effects
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
    const scrollPos = window.scrollY;
    const bg1 = document.getElementById('bg1');
    const bg2 = document.getElementById('bg2');
    if (scrollPos > 1200) { bg1.style.opacity = "0"; bg2.style.opacity = "1"; }
    else { bg1.style.opacity = "1"; bg2.style.opacity = "0"; }
});

window.onload = () => document.querySelector('.reveal').classList.add('active');