const { Mercaderias }   = require("../models");
const { traduceErrores } = require('../utils/');
const { traeTodasMercaderias }    = require('../repositories/mercaderias');

module.exports = (app, router) => {

    router.get('/mercaderias', async function(context) {  
        
        context.body = await traeTodasMercaderias(context.query);

    });  

    router.get('/mercaderias/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Mercaderias.findOne({where:{id}})        

    });  

    router.post('/mercaderias', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Mercaderias.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/mercaderias', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Mercaderias.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/mercaderias', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Mercaderias.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};