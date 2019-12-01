const {Pagos} = require("../../models");
const sequelize = require('sequelize');
const {Op} = sequelize;

module.exports = async(n_id_presupuesto) => {

    const totPagamentos = await Pagos.findAll({
        where: {
            n_id_presupuesto,
            d_fecha_pago: {
                [Op.not]: null
            }
        },
        raw: true

    });
    return totPagamentos.length;
}