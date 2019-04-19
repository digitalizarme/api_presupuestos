const { Monedas }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/monedas', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await Monedas.findAll(busca),await Monedas.findAll(total))

    });  

    router.get('/monedas/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Monedas.findOne({where:{id}})        

    });  

    router.post('/monedas', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Monedas.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/monedas', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Monedas.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/monedas', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Monedas.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};