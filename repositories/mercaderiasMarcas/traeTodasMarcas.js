const {sequelize, MercaderiasMarcas} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {
    const {busca, total} = whereSequelize(query, 'MercaderiasMarcas');

    const params = {
        ...busca,
        attributes: {
            include: [
                [
                    sequelize.literal(`CASE WHEN "MercaderiasMarcas".b_activo THEN 'SÍ' ELSE 'NO' END`),
                    'c_activo'
                ]
            ]
        }
    }
    const newTotal = {
        ...total
    }
    return objetoTabla(await MercaderiasMarcas.findAll(params), await MercaderiasMarcas.findAll(newTotal))
}