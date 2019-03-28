
const { Cotizaciones }   = require("../../models");

module.exports = async (obj) => {
    let dados;
    const monedas = obj.quotes;
    for (let moneda in monedas) {
        dados = {
            c_monedaOrigemDestino: moneda
            ,n_valor: monedas[moneda]
        };
        await Cotizaciones.create(dados);
      }
      
}