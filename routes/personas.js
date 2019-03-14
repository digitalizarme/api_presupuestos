const { Personas }   = require("../models");
const { getAllPersonas } = require('../repositories/personas');

module.exports = (app, router) => {

    // const msg_error = (res) => {
    //     let erroPadrao;
    //     switch (res.message) {
    //       case `save.user.error.cpf.not_unique`:
    //         erroPadrao = 'Já existe este CPF no sistema';
    //         break;
    //         case `save.user.error.email.not_unique`:
    //         erroPadrao = 'Já existe este e-mail no sistema';
    //         break;
      
    //       default: break;
    //       }
    //     const erroBanco = res.original?res.original.sqlMessage:'Erro desconhecido ao tentar cadastrar um novo usuario';
    //     return erroPadrao?erroPadrao:erroBanco;
    // }

    router.get('/personas', async function(context) {  
        context.body = await getAllPersonas(context.query)

    });  

    router.get('/personas/:id', async function(context) {  
        const id = context.params.id;
        context.body = await Personas.findOne({where:{id}})        

    });  

    router.post('/personas', async function(context) {  
        const datos = context.request.body;
        const id = datos.id;
        let res;
        if(typeof datos.id === "undefined" || id === '')
        {
            res = await Personas.create(datos);
        }
        else{
            res = await Personas.update( datos , { where: { id } });
        }
            context.body = res;

    });    
};