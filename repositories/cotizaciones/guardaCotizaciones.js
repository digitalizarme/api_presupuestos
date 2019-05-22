
const { Cotizaciones }   = require("../../models");

module.exports = async (monedas) => {
    let dados;
    for (let moneda in monedas) {
        dados = {
            c_monedaOrigemDestino: moneda
            ,n_valor: monedas[moneda]
        };
        await Cotizaciones.create(dados);
      }
      
}