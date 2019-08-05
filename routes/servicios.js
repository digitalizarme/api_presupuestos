const { Servicios, ServiciosGrupos }             = require("../models");
const { traeTodosServicios }    = require('../repositories/servicios');
const { traduceErrores }        = require('../utils/');

module.exports = (app, router) => {

    router.get('/servicios', async function(context) {  
        context.body = await traeTodosServicios(context.query);

    });  

    router.get('/servicios/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Servicios.findOne({where:{id}})        

    });  

    router.post('/servicios', async function(context) {  
        let datos = context.request.body;
        try
        {
            if(isNaN(datos.n_id_grupo))
            {
                await ServiciosGrupos.create({c_descripcion:datos.n_id_grupo, b_activo: true}).then(model => (datos.n_id_grupo = model.id))
            }
            await Servicios.create(datos).then(model => context.body = model);
            
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/servicios', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            if(isNaN(datos.n_id_grupo))
            {
                await ServiciosGrupos.create({c_descripcion:datos.n_id_grupo, b_activo: true}).then(model => (datos.n_id_grupo = model.id))
            }
            await Servicios.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/servicios', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Servicios.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};