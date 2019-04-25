class API {

    async getDatos() {
        let res = 1000;
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${res}`);
        const json = await datos.json();
        return json;
    }
}