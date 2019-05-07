const { Presupuestos }   = require("../models");
const { traeTodosPresupuestos,traeItemsMercadeirasServicios }     = require('../repositories/presupuestos');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/presupuestos', async function(context) {  
        context.body = await traeTodosPresupuestos(context.query);

    });  

    router.get('/presupuestos/itemsMercaderiasServicios/:idPresupuesto', async function(context) {  
        const idPresupuesto = context.params.idPresupuesto;

        context.body = await traeItemsMercadeirasServicios(idPresupuesto);

    });  

    router.get('/presupuestos/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Presupuestos.findOne({where:{id}})        

    });  

    router.post('/presupuestos', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Presupuestos.create(datos);
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
    
    router.delete('/presupuestos', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Presupuestos.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};