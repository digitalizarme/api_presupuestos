const { Fletes }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/fletes', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await Fletes.findAll(busca),await Fletes.findAll(total))

    });  

    router.get('/fletes/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Fletes.findOne({where:{id}})        

    });  

    router.post('/fletes', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Fletes.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/fletes', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Fletes.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/fletes', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Fletes.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};