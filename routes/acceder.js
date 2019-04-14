const { acceder }   = require("../repositories/acceder");
const { Personas,sequelize }   = require("../models");
module.exports = (app, router) => {

    router.get('/acceder', async function(context) {  
        context.body =  await acceder(context.query);
    });   

    router.get('/acceder/verificaEmail/:email', async function(context) {  
        const c_email = context.params.email.toLowerCase();
        const persona = await Personas.findOne({where:{c_email}});
        const res = 
        {
            res: persona?true:false,
            avatar: persona && persona.t_avatar?persona.t_avatar:null
        }
        context.body =  res;
    });    
};