const { MediosPagos }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/mediosPagos', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await MediosPagos.findAll(busca),await MediosPagos.findAll(total));

    });  

    router.get('/mediosPagos/:id', async function(context) {  
        const id = context.params.id;
        context.body = await MediosPagos.findOne({where:{id}});      

    });  

    router.get('/mediosPagos/todos', async function(context) {  
        context.body = await MediosPagos.findAll();        

    });  

    router.post('/mediosPagos', async function(context) {  
        const datos = context.request.body;
        try
        {
            await MediosPagos.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/mediosPagos', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await MediosPagos.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/mediosPagos', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await MediosPagos.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};