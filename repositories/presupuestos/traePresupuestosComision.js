const {sequelize, Presupuestos} = require("../../models");
module.exports = async(n_id_persona_comisionista) => {

    const include = [
        {
            model: Monedas,
            as: 'moneda'
        }, {
            model: Personas,
            as: 'persona'
        }
    ];

    return await Presupuestos.findAll({
        where: {
            n_id_status: 4,
            n_id_persona_comisionista
        },
        include

    });

}