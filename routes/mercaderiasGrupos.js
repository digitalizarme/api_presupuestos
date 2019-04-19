const { MercaderiasGrupos }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/mercaderiasGrupos', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await MercaderiasGrupos.findAll(busca),await MercaderiasGrupos.findAll(total))

    });  

    router.get('/mercaderiasGrupos/:id', async function(context) {  
        const id = context.params.id;
        context.body = await MercaderiasGrupos.findOne({where:{id}})        

    });  

    router.post('/mercaderiasGrupos', async function(context) {  
        const datos = context.request.body;
        try
        {
            await MercaderiasGrupos.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/mercaderiasGrupos', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await MercaderiasGrupos.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/mercaderiasGrupos', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await MercaderiasGrupos.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};