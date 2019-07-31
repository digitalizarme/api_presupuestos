const {sequelize, MercaderiasMarcas} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {

    const casos = [
        [
            sequelize.literal(`CASE WHEN "MercaderiasMarcas".b_activo THEN 'SÍ' ELSE 'NO' END`),
            'c_activo'
        ]
    ];
    query = {
        ...query,
        casos
    }

    const {busca, total} = whereSequelize(query, 'MercaderiasMarcas');

    const params = {
        ...busca,
        attributes: {
            include: casos
        }
    }
    const newTotal = {
        ...total
    }
    return objetoTabla(await MercaderiasMarcas.findAll(params), await MercaderiasMarcas.findAll(newTotal))
}