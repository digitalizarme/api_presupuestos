const { Configuraciones }   = require("../models");
const { traduceErrores,checkAccess } = require('../utils/');

module.exports = (app, router) => {

    router.get('/configuraciones', async function(context) {  
        context.body = await Configuraciones.findOne({where:{id:1}})        

    });  
      
    router.put('/configuraciones', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
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