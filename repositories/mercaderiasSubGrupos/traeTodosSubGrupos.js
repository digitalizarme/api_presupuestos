const {sequelize, MercaderiasSubGrupos} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {

    const casos = [
        [
            sequelize.literal(`CASE WHEN "MercaderiasSubGrupos".b_activo THEN 'SÍ' ELSE 'NO' END`),
            'c_activo'
        ]
    ];
    query = {
        ...query,
        casos
    }

    const {busca, total} = whereSequelize(query, 'MercaderiasSubGrupos');

    const params = {
        ...busca,
        attributes: {
            include: casos

        }
    }
    const newTotal = {
        ...total
    }
    return objetoTabla(await MercaderiasSubGrupos.findAll(params), await MercaderiasSubGrupos.findAll(newTotal))
}