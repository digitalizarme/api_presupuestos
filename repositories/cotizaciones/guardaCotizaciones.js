const {Cotizaciones} = require("../../models");

module.exports = async(monedas) => {
    let dados;
    for (let moneda in monedas) {
        //console.log(monedas[moneda],'antes');
        dados = {
            c_monedaOrigemDestino: moneda,
            n_valor: monedas[moneda] * 1.03
        };
        //console.log(dados.n_valor,'depois');
        await Cotizaciones.create(dados);
    }

}