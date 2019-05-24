const { Presupuestos, ItemsMercaderias, ItemsServicios }   = require("../models");
const { traeTodosPresupuestos,traePresupuesto,traeItemsMercadeirasServicios,traeMercadeirasServicios }     = require('../repositories/presupuestos');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/presupuestos', async function(context) {  
        context.body = await traeTodosPresupuestos(context.query);

    });  

    router.get('/presupuestos/itemsMercaderiasServicios/:idPresupuesto', async function(context) {  
        const idPresupuesto = context.params.idPresupuesto;
        context.body = await traeItemsMercadeirasServicios(idPresupuesto);

    });  

    router.get('/presupuestos/mercaderiasServicios', async function(context) {  
        context.body = await traeMercadeirasServicios();

    });  

    router.get('/presupuestos/:id', async function(context) {  
        const id = context.params.id;
        context.body = await traePresupuesto(id);        

    });  

    router.post('/presupuestos', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Presupuestos.create(datos).then(model => context.body = model);
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.post('/presupuestos/item', async function(context) {  
        const datos = context.request.body;
        try
        {
            if(datos.c_tipo === 'M')
            {
                await ItemsMercaderias.create(datos).then(model => context.body = model);
            }
            else{
                await ItemsServicios.create(datos).then(model => context.body = model);
            }
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  

    router.delete('/presupuestos/item/:id/:tipo', async function(context) {  
        try{
            const {id, tipo} = context.params;
            if(tipo === 'M')
            {
                context.body =  await ItemsMercaderias.destroy( { where: { id } });
            }
            else
            {
                context.body =  await ItemsServicios.destroy( { where: { id } });
            }
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    
      
    router.put('/presupuestos/item', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            if(datos.c_tipo === 'M')
            {
                await ItemsMercaderias.update( datos , { where: { id } });
            }
            else{
                await ItemsServicios.update( datos , { where: { id } });
            }
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/presupuestos', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Presupuestos.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    

    
};