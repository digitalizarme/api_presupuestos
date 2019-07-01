const { Cotizaciones }     = require("../models");
const { enlinea }                   = require("../repositories/cotizaciones");
const { traduceErrores,checkAccess } = require('../utils/');
const { whereSequelize, objetoTabla }     = require('../utils/');

module.exports = (app, router) => {

    router.get('/cotizaciones/ultimas', async function(context) {  
        context.body = await enlinea(context.query);
    });  

    router.get('/cotizaciones', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await Cotizaciones.findAll(busca),await Cotizaciones.findAll(total))

    });  

    router.get('/cotizaciones/:id', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        const id = context.params.id;
        context.body = await Cotizaciones.findOne({where:{id}})        

    });  

    router.post('/cotizaciones', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        const datos = context.request.body;
        try
        {
            await Cotizaciones.create(datos);
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };


    });    
    router.put('/cotizaciones', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            await Cotizaciones.update( datos , { where: { id } });
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };


    });    

    router.delete('/cotizaciones', async function(context) {  
        await checkAccess(context.headers.authorization, 'b_administrador');
        try{
            const {id} = context.query;
            context.body =  await Cotizaciones.destroy( { where: { id } });
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    

};