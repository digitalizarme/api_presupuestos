const {Presupuestos, Pagos} = require("../../models");
const sequelize = require('sequelize');
const {Op} = sequelize;

const {atualizaCuotas} = require("./");
const {traduceErrores} = require("../../utils/");
module.exports = async(datos) => {

    if (datos.n_id_status === 4) {
        throw Error('No se permite actualizar presupuesto ya concluido.');
    }
    const id = datos.id;
    try {
        if (datos.n_id_status < 3 && datos.cuotas && datos.cuotas.length > 0) {
            const pagos = await Pagos.findAll({
                where: {
                    d_fecha_ago: {
                        [Op.ne]: null
                    },
                    n_id_presupuesto: id
                }
            });
            if (pagos.length === 0) {
                await atualizaCuotas(datos.cuotas);

            }
        }
        await Presupuestos.update(datos, {where: {
                id
            }});
        return datos;
    } catch (error) {
        throw Error(traduceErrores(error));
    }

}