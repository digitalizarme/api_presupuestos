const { Servicios_grupos }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/servicios_grupos', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        // await new Promise(function(resolve, reject){
		// 	setTimeout(function(){
		// 		resolve();
		// 	}, 2000)
		// });
        context.body = objetoTabla(await Servicios_grupos.findAll(busca),await Servicios_grupos.findAll(total))

    });  

    router.get('/servicios_grupos/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Servicios_grupos.findOne({where:{id}})        

    });  

    router.post('/servicios_grupos', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Servicios_grupos.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/servicios_grupos', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Servicios_grupos.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    
};