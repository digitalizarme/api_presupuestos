const {Pagos} = require("../../models");
const moment = require('moment');

module.exports = async(datos) => {
    await Pagos.destroy({
        where: {
            n_id_presupuesto: datos.id
        }
    });
    const resPagos = [];
    let n_valor = parseFloat(datos.n_total_general) / parseInt(datos.n_cuotas_pago);
    n_valor = parseFloat(n_valor.toFixed(datos.n_decimales));
    let dif = parseFloat(datos.n_total_general) - (n_valor * parseInt(datos.n_cuotas_pago));
    dif = parseFloat(dif.toFixed(datos.n_decimales));
    for (let index = 0; index < parseInt(datos.n_cuotas_pago); index++) {
        const d_fecha_vcto = moment()
            .add(datos.n_dias_Frecuencia_pago*index, 'days')
            .format('YYYY-MM-DD');
        const pago = {
            n_valor: index === 0
                ? (n_valor + dif)
                : n_valor,
            n_id_presupuesto: datos.id,
            n_id_moneda: datos.n_id_moneda,
            d_fecha_vcto,
            n_nr_cuota: index + 1
        }
        await Pagos.create(pago);
        resPagos.push(pago);

    }
    return resPagos;
}