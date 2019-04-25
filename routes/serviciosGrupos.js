const { ServiciosGrupos }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/serviciosGrupos', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        // await new Promise(function(resolve, reject){
		// 	setTimeout(function(){
		// 		resolve();
		// 	}, 2000)
		// });
        context.body = objetoTabla(await ServiciosGrupos.findAll(busca),await ServiciosGrupos.findAll(total))

    });  

    router.get('/serviciosGrupos/todos', async function(context) {  
        context.body = await ServiciosGrupos.findAll()

    });  

    router.get('/serviciosGrupos/:id', async function(context) {  
        const id = context.params.id;
        context.body = await ServiciosGrupos.findOne({where:{id}})        

    });  

    router.post('/serviciosGrupos', async function(context) {  
        const datos = context.request.body;
        try
        {
            await ServiciosGrupos.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/serviciosGrupos', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await ServiciosGrupos.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/serviciosGrupos', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await ServiciosGrupos.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};