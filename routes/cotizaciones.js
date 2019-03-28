const { Cotizaciones, Monedas }     = require("../models");
const { enlinea }                   = require("../repositories/cotizaciones");
const { traduceErrores }            = require('../utils/');
const { whereSequelize, objetoTabla }     = require('../utils/');

module.exports = (app, router) => {

    router.get('/cotizaciones/enlinea', async function(context) {  
        context.body = await enlinea(context.query);
    });  

    router.get('/cotizaciones/monedas', async function(context) {  
        context.body = await Monedas.findAll();

    });  

    router.get('/cotizaciones', async function(context) {  
        const {busca, total} = whereSequelize(context.query);
        context.body = objetoTabla(await Cotizaciones.findAll(busca),await Cotizaciones.findAll(total))

    });  

    router.get('/cotizaciones/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Cotizaciones.findOne({where:{id}})        

    });  

    router.post('/cotizaciones', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        try
        {
            if(typeof datos.id === "undefined" || id === '')
            {
                await Cotizaciones.create(datos);
            }
            else{
                await Cotizaciones.update( datos , { where: { id } });
            }
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };


    });    
};