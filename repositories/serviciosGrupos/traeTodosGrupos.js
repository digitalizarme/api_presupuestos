const {sequelize, ServiciosGrupos} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {

    const casos = [
        [
            sequelize.literal(`CASE WHEN "ServiciosGrupos".b_activo THEN 'SÍ' ELSE 'NO' END`),
            'c_activo'
        ]
    ];

    query = {
        ...query,
        casos
    }

    const {busca, total} = whereSequelize(query, 'ServiciosGrupos');

    const params = {
        ...busca,
        attributes: {
            include: casos
        }
    }
    const newTotal = {
        ...total
    }
    return objetoTabla(await ServiciosGrupos.findAll(params), await ServiciosGrupos.findAll(newTotal))
}