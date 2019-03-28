
const { Cotizaciones }          = require("../../models");
const { guardaCotizaciones }    = require("./");
const axios                     = require('axios');
const { fechaHoyYMD, traduceErrores } = require('../../utils');

module.exports = async (datos) => {
    const hoy = fechaHoyYMD();
    const monedas = datos.monedas.split(",");
    let arayCotizaciones = [];
    for (let index = 0; index < monedas.length; index++) {
        const moneda = datos.base + monedas[index];
        const dadosCotizacion = await Cotizaciones.findOne({
            attributes: ['c_monedaOrigemDestino','n_valor']
            ,where: {
              $and: [
                sequelize.where(sequelize.fn('strftime', '%Y-%m-%d',sequelize.col('createdAt')), hoy),
                { c_monedaOrigemDestino:moneda }
              ]
            }
        });
        if(dadosCotizacion)
        {
            arayCotizaciones.push(dadosCotizacion);
        }
            
    }
    if(arayCotizaciones.length !== monedas.length)
    {
        return await axios({
            method: 'get',
            url: `http://apilayer.net/api/live?access_key=8a9ad4ca3199d05d4bd76e5063f4d4ba&source=${datos.base}&currencies=${datos.monedas}`,
            headers: {'Accept': 'application/json','Content-Type': 'application/json'}
        })
        .then(async function(response) {
            const data = response.data;
            await guardaCotizaciones(data);
            return data;
        })
        .catch(async function(error) {
            throw Error(traduceErrores(error))
        });

    }
    else{
        return {source:datos.base,quotes:arayCotizaciones};
    }
  
}