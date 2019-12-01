const {ServiciosGrupos} = require("../models");
const {traduceErrores} = require('../utils/');
const {traeTodosGrupos} = require('../repositories/serviciosGrupos');

module.exports = (app, router) => {

    router
        .get('/serviciosGrupos', async function (context) {
            context.body = await traeTodosGrupos(context.query);

        });

    router.get('/serviciosGrupos/todos', async function (context) {
        context.body = await ServiciosGrupos.findAll({order: ['c_descripcion']});

    });

    router.get('/serviciosGrupos/:id', async function (context) {
        const id = context.params.id;
        context.body = await ServiciosGrupos.findOne({where: {
                id
            }})

    });

    router.post('/serviciosGrupos', async function (context) {
        const datos = context.request.body;
        try
        {
            await ServiciosGrupos.create(datos);
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.put('/serviciosGrupos', async function (context) {
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await ServiciosGrupos.update(datos, {where: {
                    id
                }});
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.delete('/serviciosGrupos', async function (context) {
        try {
            const {id} = context.query;
            context.body = await ServiciosGrupos.destroy({where: {
                    id
                }});
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

};