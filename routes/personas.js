const {Personas, sequelize} = require("../models");
const {getAllPersonas} = require('../repositories/personas');
const {traduceErrores} = require('../utils/');

module.exports = (app, router) => {

    router
        .get('/personas', async function (context) {
            context.body = await getAllPersonas(context.query)
        });

        router.get('/personas/todas', async function (context) {
            context.body = await Personas.findAll({order: ['c_nombre']});
        });

        router.get('/personas/comisionistas', async function (context) {
            context.body = await Personas.findAll({order: ['c_nombre'], where:{b_comisionista:true}});
        });

        router.get('/personas/clientes', async function (context) {
            context.body = await Personas.findAll({order: ['c_nombre'], where:{b_cliente:true}});
        });
        
    router.get('/personas/:id', async function (context) {
        const id = context.params.id;
        context.body = await Personas.findOne({where: {
                id
            }})
    });

    router.post('/personas', async function (context) {
        const datos = context.request.body;
        try {
            await Personas.create(datos);
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.put('/personas', async function (context) {
        const datos = context.request.body;
        const id = datos.id;
        if (id == 1) {
            throw Error("Persona del sistema no se permite actualizar");
        }
        try {
            await Personas.update(datos, {where: {
                    id
                }});
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.delete('/personas', async function (context) {
        const {id} = context.query;
        if (id == 1) {
            throw Error("Persona del sistema no se permite eliminar");
        }
        try {
            context.body = await Personas.destroy({where: {
                    id
                }});
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

};