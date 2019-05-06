const { Seguros,Monedas }   = require("../models");
const { traeTodosSeguros }    = require('../repositories/seguros');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/seguros', async function(context) {  
        context.body = await traeTodosSeguros(context.query);

    });  

    router.get('/seguros/todos', async function(context) {  
        context.body = await Seguros.findAll({include: 
            {
              model : Monedas,
              as    : 'moneda',
            },
        });
    });  

    router.get('/seguros/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Seguros.findOne({where:{id}})        

    });  

    router.post('/seguros', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Seguros.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/seguros', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Seguros.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/seguros', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Seguros.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};