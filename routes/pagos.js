const { Pagos }   = require("../models");
const { whereSequelize, objetoTabla }     = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/pagos', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await Pagos.findAll(busca),await Pagos.findAll(total))

    });  

    router.get('/pagos/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Pagos.findOne({where:{id}})        

    });  

    router.post('/pagos', async function(context) {  
        const datos = context.request.body;
        try
        {
            await Pagos.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
      
    router.put('/pagos', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Pagos.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });  
    
    router.delete('/pagos', async function(context) {  
        try{
            const {id} = context.query;
            context.body =  await Pagos.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};