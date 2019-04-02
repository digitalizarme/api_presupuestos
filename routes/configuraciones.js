const { Configuraciones }   = require("../models");
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/configuraciones', async function(context) {  
        context.body = await Configuraciones.findOne({where:{id:1}})        

    });  
      
    router.put('/configuraciones', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Configuraciones.update( datos , { where: { id:1 } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    
};