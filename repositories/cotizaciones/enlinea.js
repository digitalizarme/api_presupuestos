const {Cotizaciones, Monedas} = require("../../models");
const sequelize = require('sequelize');
const {Op} = sequelize;

const guardaCotizaciones = require("./guardaCotizaciones");
const ultimas = require("./ultimas");
const axios = require('axios');
const {fechaHoyYMDUTC} = require('../../utils');

module.exports = async(datos) => {
    const hoy = fechaHoyYMDUTC();
    let totalMonedas = await Monedas.findOne({
        attributes: [
            [
                sequelize.fn('COUNT', sequelize.col('id')),
                'total'
            ]
        ],
        raw: true
    });
    totalMonedas = totalMonedas.total;
    const monedas = datos
        .monedas
        .split(",");
    const retornaUnaMoneda = monedas.length === 1;
    const monedaBase = datos
        .monedas
        .slice(0, 3);
    let arrayCotizaciones = [];
    let dadosCotizacion = {};
    for await(let moneda of monedas) {
        dadosCotizacion = await Cotizaciones.findOne({
            attributes: [
                'c_monedaOrigemDestino', 'n_valor','createdAt'
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn('to_char', sequelize.col('"Cotizaciones"."createdAt"'), sequelize.literal(`'YYYY-MM-DD'`)), hoy), {
                        c_monedaOrigemDestino: moneda
                    }
                ]
            },
            raw: true
        });
        if (dadosCotizacion) {
            arrayCotizaciones.push(dadosCotizacion);
        }

    }
    if (arrayCotizaciones.length !== monedas.length) {
        let monedasBuscarCotizacion = datos.monedas;
        //desabilitador que a versao free nao permite mais de duas moedas
        // if (monedas.length !== totalMonedas) {
        //     const todasMonedas = await Monedas.findAll({raw: true});
        //     arrayMonedas = [];
        //     let stringMoneda;
        //     for (const itemMoneda of todasMonedas) {
        //         if (itemMoneda.c_letras !== monedaBase) {
        //             stringMoneda = monedaBase + "_" + itemMoneda.c_letras;
        //             arrayMonedas.push(stringMoneda);

        //         }
        //     }
        //     monedasBuscarCotizacion = arrayMonedas.join();

        // }
        const  url = `https://free.currconv.com/api/v7/convert?apiKey=af27a67bf6e735a91824&q=${monedasBuscarCotizacion}&compact=ultra`
        return await axios({
                method: 'get',
                url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(async function (response) {

            const data = response.data;
            if (typeof data.status === "undefined") {
                await guardaCotizaciones(data);
                let stringUltimasMonedas = monedaBase + "_%";
                if (retornaUnaMoneda) {
                    stringUltimasMonedas = datos.monedas;
                }

                return await ultimas(stringUltimasMonedas);
            } else {

                throw Error(data);
                }
            })
            .catch(async function (error) {
                arrayCotizaciones = [];
                for await(let moneda of monedas) {
                    let dadosCotizacion = await Cotizaciones.findOne({
                        attributes: [
                            'c_monedaOrigemDestino', 'n_valor'
                        ],
                        order: [
                            ['createdAt', 'DESC']
                        ],
                        where: {
                            c_monedaOrigemDestino: moneda
                        },
                        raw: true
                    });
                    if (dadosCotizacion) {
                        arrayCotizaciones.push(dadosCotizacion);
                    }

                };
                //console.log(arrayCotizaciones,'error cotizacion');
                if (arrayCotizaciones.length !== monedas.length) {
                    //console.log(error.response.data,'error cotizacion');
                    let msg = error;
                    if (typeof error.response !== "undefined" && typeof error.response.data.error !== "undefined") {
                        msg = error.response.data.error;
                    } else if (typeof error.response !== "undefined" && typeof error.response.data !== "undefined") {
                        msg = error.response.data;
                    }
                    if(msg.indexOf("503 Service Unavailable") !== -1)
                    {
                        msg = "El proveedor de cotizaciones free.currconv.com no esta disponible. Favor cadastrar manualmente las cotizaciones"
                    }
                    //console.log(msg,'error cotizacion');
                    throw Error(msg);
                } else {
                    return arrayCotizaciones

                }

            });

    } else {
        return arrayCotizaciones;
    }

}