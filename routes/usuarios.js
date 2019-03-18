const { Usuarios }   = require("../models");
const { getAllUsers } = require('../repositories/usuarios');
const { encrypt } = require('../utils/');
const { traduceErrores } = require('../utils/');

module.exports = (app, router) => {

    router.get('/usuarios', async function(context) {  
        context.body = await getAllUsers(context.query)

    });  

    router.get('/usuarios/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Usuarios.findOne({where:{id}})        

    });  

    router.post('/usuarios', async function(context) {  
        let datos = context.request.body;
        if(datos.c_contrasena)
        {
            datos = 
            {
                ...datos
                ,c_contrasena: encrypt(datos.c_contrasena)
            }
    
        }
        const id = datos.id;
        try
        {
            if(typeof datos.id === "undefined" || id === '')
            {
                await Usuarios.create(datos);
            }
            else{
                await Usuarios.update( datos , { where: { id } });
            }
            context.body = datos;
        }
        catch(error) {
            throw Error(traduceErrores(error))
        };
    });    
};