const {Frecuencias} = require("../models");
const {whereSequelize, objetoTabla} = require('../utils/');
const {traduceErrores} = require('../utils/');

module.exports = (app, router) => {

    router
        .get('/frecuencias', async function (context) {
            const {busca, total} = whereSequelize(context.query);
            context.body = objetoTabla(await Frecuencias.findAll(busca), await Frecuencias.findAll(total))

        });

    router.get('/frecuencias/todas', async function (context) {
        context.body = await Frecuencias.findAll();

    });

    router.get('/frecuencias/:id', async function (context) {
        const id = context.params.id;
        context.body = await Frecuencias.findOne({where: {
                id
            }})

    });

    router.post('/frecuencias', async function (context) {
        const datos = context.request.body;
        try
        {
            await Frecuencias.create(datos);
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.put('/frecuencias', async function (context) {
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Frecuencias.update(datos, {where: {
                    id
                }});
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.delete('/frecuencias', async function (context) {
        try {
            const {id} = context.query;
            context.body = await Frecuencias.destroy({where: {
                    id
                }});
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

};