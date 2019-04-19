const { Status }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/status', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await Status.findAll(busca),await Status.findAll(total))

    });  

    router.get('/status/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Status.findOne({where:{id}})        

    });  

    router.post('/status', async function(context) {  
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
        try{
            const {id} = context.query;
            context.body =  await Status.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};