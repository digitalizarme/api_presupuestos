const { Fletes, Monedas }   = require("../models");
const { traduceErrores } = require('../utils/');
const { traeTodosFletes }    = require('../repositories/fletes');

module.exports = (app, router) => {

    router.get('/fletes', async function(context) {  
        context.body = await traeTodosFletes(context.query);

    });  

    router.get('/fletes/todos', async function(context) {  
        context.body = await Fletes.findAll({include: 
            {
              model : Monedas,
              as    : 'moneda',
            },
    });

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