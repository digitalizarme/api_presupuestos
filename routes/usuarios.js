const { Usuarios }   = require("../models");
const { getAllUsers } = require('../repositories/usuarios');
module.exports = (app, router) => {

    router.get('/usuarios', async function(context) {  
        context.body = await getAllUsers(context.query)

    });  

    router.get('/usuarios/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Usuarios.findOne({where:{id}})        

    });  

    router.post('/usuarios', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        let res;
        if(typeof datos.id === "undefined" || id === '')
        {
            res = await Usuarios.create(datos);
        }
        else{
            res = await Usuarios.update( datos , { where: { id } });
        }
        context.body = res;

    });    
};