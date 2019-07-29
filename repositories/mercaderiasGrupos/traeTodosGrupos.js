const {sequelize, MercaderiasGrupos} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {
    const {busca, total} = whereSequelize(query, 'MercaderiasGrupos');

    const params = {
        ...busca,
        attributes: {
            include: [
                [
                    sequelize.literal(`CASE WHEN "MercaderiasGrupos".b_activo THEN 'SÍ' ELSE 'NO' END`),
                    'c_activo'
                ]
            ]
        }
    }
    const newTotal = {
        ...total
    }
    return objetoTabla(await MercaderiasGrupos.findAll(params), await MercaderiasGrupos.findAll(newTotal))
}