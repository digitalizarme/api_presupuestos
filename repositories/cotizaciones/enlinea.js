
const { Cotizaciones,sequelize,Monedas }        = require("../../models");
const guardaCotizaciones                = require("./guardaCotizaciones");
const ultimas                           = require("./ultimas");
const axios                             = require('axios');
const { fechaHoyYMD }                   = require('../../utils');

module.exports = async (datos) => {
    const hoy = fechaHoyYMD();
    let totalMonedas = await Monedas.findOne({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']]
      });
    totalMonedas = totalMonedas.dataValues.total; 
    const monedas = datos.monedas.split(",");
    const retornaUnaMoneda = monedas.length === 1;
    const monedaBase = datos.monedas.slice(0,3);
    let arayCotizaciones = [];
    for await (let moneda of monedas) {
        let dadosCotizacion = await Cotizaciones.findOne({
            attributes: ['c_monedaOrigemDestino','n_valor']
            ,order: [
                ['createdAt', 'DESC'],
            ]
            ,where: {
              $and: [
                sequelize.where(sequelize.fn('strftime', sequelize.literal(`"%Y-%m-%d"`),sequelize.col('createdAt')), hoy),
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
        let monedasBuscarCotizacion = datos.monedas;
        if(monedas.length !== totalMonedas)
        {
            const todasMonedas = await Monedas.findAll();
            arrayMonedas = [];
            let stringMoneda;
            for (const itemMoneda of todasMonedas) {
                if(itemMoneda.c_letras !== monedaBase)
                {
                    stringMoneda = monedaBase+"_"+itemMoneda.c_letras;
                    arrayMonedas.push(stringMoneda);

                }
            }
            monedasBuscarCotizacion = arrayMonedas.join();
                    
        }
        return await axios({
            method: 'get',
            url: `https://free.currconv.com/api/v7/convert?apiKey=af27a67bf6e735a91824&q=${monedasBuscarCotizacion}&compact=ultra`,
            headers: {'Accept': 'application/json','Content-Type': 'application/json'}
        })
        .then(async function(response) {
            const data = response.data;
            if(typeof data.status === "undefined")
            {
                await guardaCotizaciones(data);
                let stringUltimasMonedas = monedaBase+"_%";
                if(retornaUnaMoneda)
                {
                    stringUltimasMonedas = datos.monedas;
                }

                return await ultimas(stringUltimasMonedas);    
            }
            else
            {
               

                throw Error(data);    
            }
        })
        .catch(function(error) {
            throw Error(typeof error.response !== "undefined"?error.response.data.error:error);    

        });

    }
    else{
        return arayCotizaciones;
    }
  
}