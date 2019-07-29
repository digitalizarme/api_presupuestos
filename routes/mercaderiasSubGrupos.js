const {MercaderiasSubGrupos} = require("../models");
const {traduceErrores} = require('../utils/');
const {traeTodosSubGrupos} = require('../repositories/mercaderiasSubGrupos');

module.exports = (app, router) => {

    router
        .get('/mercaderiasSubGrupos', async function (context) {
            context.body = await traeTodosSubGrupos(context.query);

        });

    router.get('/mercaderiasSubGrupos/todos', async function (context) {
        context.body = await MercaderiasSubGrupos.findAll();
    });

    router.get('/mercaderiasSubGrupos/:id', async function (context) {
        const id = context.params.id;
        context.body = await MercaderiasSubGrupos.findOne({where: {
                id
            }})

    });

    router.post('/mercaderiasSubGrupos', async function (context) {
        const datos = context.request.body;
        try
        {
            await MercaderiasSubGrupos.create(datos);
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.put('/mercaderiasSubGrupos', async function (context) {
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await MercaderiasSubGrupos.update(datos, {where: {
                    id
                }});
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.delete('/mercaderiasSubGrupos', async function (context) {
        try {
            const {id} = context.query;
            context.body = await MercaderiasSubGrupos.destroy({where: {
                    id
                }});
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

};