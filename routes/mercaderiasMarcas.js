const { MercaderiasMarcas }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/mercaderiasMarcas', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await MercaderiasMarcas.findAll(busca),await MercaderiasMarcas.findAll(total))

    });  

    router.get('/mercaderiasMarcas/todas', async function(context) {  
        context.body = await MercaderiasMarcas.findAll();

    });  

    router.get('/mercaderiasMarcas/:id', async function(context) {  
        const id = context.params.id;
        context.body = await MercaderiasMarcas.findOne({where:{id}})        

    });  

    router.post('/mercaderiasMarcas', async function(context) {  
        const datos = context.request.body;
        try
        {
            await MercaderiasMarcas.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/mercaderiasMarcas', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await MercaderiasMarcas.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/mercaderiasMarcas', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await MercaderiasMarcas.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};