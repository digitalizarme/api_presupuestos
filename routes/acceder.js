const {acceder, verificaEmail} = require("../repositories/acceder");
module.exports = (app, router) => {

    router
        .get('/acceder', async function (context) {
            context.body = await acceder(context.query);
        });

    router.get('/acceder/verificaEmail/:email', async function (context) {
        context.body = await verificaEmail(context);
    });
};