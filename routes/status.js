const { Status }   = require("../models");
const { traduceErrores,checkAccess } = require('../utils/');

module.exports = (app, router) => {

    router.get('/status', async function(context) {  
        context.body = await Status.findAll();

    });  

    router.get('/status/:id', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        const id = context.params.id;
        context.body = await Status.findOne({where:{id}})        

    });  

    router.post('/status', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        const datos = context.request.body;
        try
        {
            await Status.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/status', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Status.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/status', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        try{
            const {id} = context.query;
            context.body =  await Status.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};