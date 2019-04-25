const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
});

const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    if (buscador.value.length > 4) {
        ui.getSugerencias(buscador.value);
    } else {
        ui.mostrarEstablecimientos();
    }
});