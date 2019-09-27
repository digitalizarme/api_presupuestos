const {Mercaderias, MercaderiasSubGrupos, MercaderiasMarcas} = require("../../models");
const {traduceErrores} = require('../../utils');

module.exports = async(datos) => {
    try
    {
        if (isNaN(datos.n_id_marca)) {
            await MercaderiasMarcas
                .create({c_descripcion: datos.n_id_marca, b_activo: true})
                .then(model => (datos.n_id_marca = model.id))
        }
        if (isNaN(datos.n_id_subgrupo)) {
            await MercaderiasSubGrupos
                .create({c_descripcion: datos.n_id_subgrupo, b_activo: true})
                .then(model => (datos.n_id_subgrupo = model.id))
        }
        await Mercaderias.create(datos);
        return datos;
    } catch (error) {
        throw Error(traduceErrores(error))
    };
}