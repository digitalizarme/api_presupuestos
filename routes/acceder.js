const { acceder }   = require("../repositories/acceder");
const { Personas,Usuarios }   = require("../models");
module.exports = (app, router) => {

    router.get('/acceder', async function(context) {  
        context.body =  await acceder(context.query);
    });   

    router.get('/acceder/sinSesion', async function(context) {  
        context.body =  await acceder(context.query);
    });   

    router.get('/acceder/verificaEmail/:email', async function(context) {  
        const c_email = context.params.email.toLowerCase();
        const persona = await Personas.findOne({where:{c_email}});
        const usuario = await Usuarios.findOne({where:{n_id_persona:persona.id}});
        let msg = '';
        if(!persona)
        {
            msg = "Email no existe"
        }
        else if(persona && !usuario)
        {
            msg = "Este email no es de un usuario del sistema"
        }
        const res = 
        {
            res: persona && usuario?true:false,
            avatar: usuario && usuario.t_avatar?usuario.t_avatar:null,
            msg
        }
        context.body =  res;
    });    
};