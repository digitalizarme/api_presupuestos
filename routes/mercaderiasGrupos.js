const { MercaderiasGrupos }   = require("../models");
const { traduceErrores } = require('../utils/');
const { traeTodosGrupos  } = require('../repositories/mercaderiasGrupos');

module.exports = (app, router) => {

    router.get('/mercaderiasGrupos', async function(context) {  
        context.body = await traeTodosGrupos(context.query);

    });  

    router.get('/mercaderiasGrupos/todos', async function(context) {  
        context.body = await MercaderiasGrupos.findAll();

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