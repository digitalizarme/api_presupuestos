const { ItemsServicios }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/itemsServicios', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await ItemsServicios.findAll(busca),await ItemsServicios.findAll(total))

    });  

    router.get('/itemsServicios/:id', async function(context) {  
        const id = context.params.id;
        context.body = await ItemsServicios.findOne({where:{id}})        

    });  

    router.post('/itemsServicios', async function(context) {  
        const datos = context.request.body;
        try
        {
            await ItemsServicios.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/itemsServicios', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await ItemsServicios.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/itemsServicios', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await ItemsServicios.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};