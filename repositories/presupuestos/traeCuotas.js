const {Pagos,Monedas} = require("../../models");
module.exports = async(n_id_presupuesto,) => {

    const include = 
    [
        {
            model : Monedas,
            as    : 'moneda',
        },
    ];



    return await Pagos.findAll(
        {
            order: ['n_nr_cuota'], 
            include,
            where: {
                n_id_presupuesto
            }
        }
    );

}