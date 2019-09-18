const {Mercaderias} = require("../models");
const {traduceErrores} = require('../utils/');
const {traeTodasMercaderias, actualizar, guardar} = require('../repositories/mercaderias');

module.exports = (app, router) => {

    router
        .get('/mercaderias', async function (context) {

            context.body = await traeTodasMercaderias(context.query);

        });

    router.get('/mercaderias/:id', async function (context) {
        const id = context.params.id;
        context.body = await Mercaderias.findOne({where: {
                id
            }})

    });

    router.post('/mercaderias', async function (context) {
        context.body = await guardar(context.request.body);
    });

    router.put('/mercaderias', async function (context) {
        context.body = await actualizar(context.request.body);
    });

    router.delete('/mercaderias', async function (context) {
        try {
            const {id} = context.query;
            context.body = await Mercaderias.destroy({where: {
                    id
                }});
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

};