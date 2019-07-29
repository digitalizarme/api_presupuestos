const {sequelize, ServiciosGrupos} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {
    const {busca, total} = whereSequelize(query, 'ServiciosGrupos');

    const params = {
        ...busca,
        attributes: {
            include: [
                [
                    sequelize.literal(`CASE WHEN "ServiciosGrupos".b_activo THEN 'SÍ' ELSE 'NO' END`),
                    'c_activo'
                ]
            ]
        }
    }
    const newTotal = {
        ...total
    }
    return objetoTabla(await ServiciosGrupos.findAll(params), await ServiciosGrupos.findAll(newTotal))
}