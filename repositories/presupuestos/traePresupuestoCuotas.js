const traeCuotas = require("./traeCuotas");
const traePresupuesto = require("./traePresupuesto");
module.exports = async(id) => {

    const cuotas = await traeCuotas(id);
    const presupuesto = await traePresupuesto(id);
    const retorno = {
        presupuesto,
        cuotas
    }

    return retorno;

}