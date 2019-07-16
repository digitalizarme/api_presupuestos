const {Pagos} = require("../../models");

module.exports = async(datos, metodo) => {
    if(typeof metodo === "undefined")
    {
        await Pagos.destroy({
            where: {
                n_id_presupuesto: datos[0].n_id_presupuesto
            }
        });
        for (let index = 0; index < datos.length; index++) {
            const pago = {
                n_valor: datos[index].n_valor,
                d_fecha_vcto:datos[index].d_fecha_vcto,
                n_id_presupuesto: datos[index].n_id_presupuesto,
                n_id_moneda: datos[index].n_id_moneda,
                n_nr_cuota: index + 1
            }
            await Pagos.create(pago);
        }
        return true;
    
    }
    else
    {
        for (let index = 0; index < datos.length; index++) {

            await Pagos.update( datos[index] , { where: { id:datos[index].id } })

        };
        return true;

    }
}