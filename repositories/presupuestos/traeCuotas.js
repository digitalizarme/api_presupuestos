const {Pagos,Monedas} = require("../../models");
module.exports = async(n_id_presupuesto,tipo) => {

    const include = 
    [
        {
            model : Monedas,
            as    : 'moneda',
        },
    ];

    let order = ['n_nr_cuota'];
    if(tipo===1)
    {
        order = [['d_fecha_pago','desc'],['n_nr_cuota']];
    }


    return await Pagos.findAll(
        {
            order, 
            include,
            where: {
                n_id_presupuesto
            }
        }
    );

}