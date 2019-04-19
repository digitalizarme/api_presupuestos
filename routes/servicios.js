const { Servicios }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/servicios', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await Servicios.findAll(busca),await Servicios.findAll(total))

    });  

    router.get('/servicios/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Servicios.findOne({where:{id}})        

    });  

    router.post('/servicios', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Servicios.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/servicios', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Servicios.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/servicios', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Servicios.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};