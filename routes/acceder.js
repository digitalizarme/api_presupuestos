const { acceder }   = require("../repositories/acceder");

module.exports = (app, router) => {

    router.get('/acceder', async function(context) {  
        context.body =  await acceder(context.query);
    });    
};