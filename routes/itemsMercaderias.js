const {ItemsMercaderias} = require("../models");
const {whereSequelize, objetoTabla} = require('../utils/');
const {traduceErrores} = require('../utils/');

module.exports = (app, router) => {

    router
        .get('/itemsMercaderias', async function (context) {
            const {busca, total} = whereSequelize(context.query);
            context.body = objetoTabla(await ItemsMercaderias.findAll(busca), await ItemsMercaderias.findAll(total))

        });

    router.get('/itemsMercaderias/:id', async function (context) {
        const id = context.params.id;
        context.body = await ItemsMercaderias.findOne({where: {
                id
            }})

    });

    router.post('/itemsMercaderias', async function (context) {
        const datos = context.request.body;
        try
        {
            await ItemsMercaderias.create(datos);
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.put('/itemsMercaderias', async function (context) {
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await ItemsMercaderias.update(datos, {where: {
                    id
                }});
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.delete('/itemsMercaderias', async function (context) {
        try {
            const {id} = context.query;
            context.body = await ItemsMercaderias.destroy({where: {
                    id
                }});
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

};