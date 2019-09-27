const {Personas, Usuarios} = require("../../models");

module.exports = async(context) => {
    const c_email = context
        .params
        .email
        .toLowerCase();
    const persona = await Personas.findOne({where: {
            c_email
        }});
    const usuario = persona
        ? await Usuarios.findOne({
            where: {
                n_id_persona: persona.id
            }
        })
        : false;
    let msg = '';
    if (!persona) {
        msg = "Email no existe"
    } else if (persona && !usuario) {
        msg = "Este email no es de un usuario del sistema"
    }
    const res = {
        res: persona && usuario
            ? true
            : false,
        avatar: usuario && usuario.t_avatar
            ? usuario.t_avatar
            : null,
        msg
    }
    return res;
}