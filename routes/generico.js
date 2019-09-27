const {actualizar, eliminar} = require("../repositories/generico");
const {traduceErrores} = require('../utils/');

module.exports = (app, router) => {

    router
        .put('/generico/actualizar', async function (context) {
            try {
                context.body = await actualizar(context.query);
            } catch (error) {
                throw Error(traduceErrores(error))
            };

        });

    router.delete('/generico/eliminar', async function (context) {
        try {
            context.body = await eliminar(context.query);
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });
};