class UI {

    constructor() {
        // iniciamos la api
        this.api = new API();
        // creamos los markers con LayerGroup
        this.markers = new L.LayerGroup();
        // Iniciar el mapa
        this.mapa = this.inicializarMapa();
    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + enlaceMapa + ' Contributors',
                maxZoom: 18,
            }).addTo(map);
        return map;
    }

    mostrarEstablecimientos() {
        this.api.getDatos()
            .then(resp => {
                const respuesta = resp.results;
                this.mostrarPines(respuesta);
            })
            .catch(err => {
                console.error(err);
            });
    }

    mostrarPines(datos) {
        // limpiar los markers
        this.markers.clearLayers();
        // recorrer establecimientos
        datos.forEach(e => {
            const {
                latitude,
                longitude,
                calle,
                regular,
                premium
            } = e;

            const popUp = L.popup()
                .setContent(`
                    <p>Calle: ${calle}</p>
                    <p><b>Regular: </b>$${regular}</p>
                    <p><b>Premium: </b>$${premium}</p>
                `);

            // agregar PIN
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(popUp);

            this.markers.addLayer(marker);
        });

        this.markers.addTo(this.mapa);
    }

    getSugerencias(busqueda) {
        this.api.getDatos()
            .then(datos => {
                const resp = datos.results;
                this.filtrarResultados(resp, busqueda);
            })
            .catch(err => {
                console.error(err);
            });
    }

    filtrarResultados(resp, datos) {
        const filtro = resp.filter(filtro => filtro.calle.indexOf(datos) !== -1);
        this.mostrarPines(filtro);
    }
}