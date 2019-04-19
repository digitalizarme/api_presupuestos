const { Frecuencia }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/frecuencia', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await Frecuencia.findAll(busca),await Frecuencia.findAll(total))

    });  

    router.get('/frecuencia/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Frecuencia.findOne({where:{id}})        

    });  

    router.post('/frecuencia', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Frecuencia.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/frecuencia', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Frecuencia.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/frecuencia', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Frecuencia.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};