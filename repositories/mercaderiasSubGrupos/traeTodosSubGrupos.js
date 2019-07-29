const {sequelize, MercaderiasSubGrupos} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {
    const {busca, total} = whereSequelize(query, 'MercaderiasSubGrupos');

    const params = {
        ...busca,
        attributes: {
            include: [
                [
                    sequelize.literal(`CASE WHEN "MercaderiasSubGrupos".b_activo THEN 'SÍ' ELSE 'NO' END`),
                    'c_activo'
                ]
            ]
        }
    }
    const newTotal = {
        ...total
    }
    return objetoTabla(await MercaderiasSubGrupos.findAll(params), await MercaderiasSubGrupos.findAll(newTotal))
}