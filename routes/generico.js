const { actualizar, eliminar }   = require("../repositories/generico");

module.exports = (app, router) => {

    router.get('/generico/actualizar', async function(context) {  
        context.body =  await actualizar(context.query);
    });  

    router.get('/generico/eliminar', async function(context) {  
        context.body =  await eliminar(context.query);
    });    
};