const {sequelize, Seguros, Monedas} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {

    const casos = [
        [
            sequelize.literal(`CASE WHEN "Seguros".b_activo THEN 'SÍ' ELSE 'NO' END`),
            'c_activo'
        ]
    ];
    query = {
        ...query,
        casos
    }

    const {busca, total} = whereSequelize(query, 'Seguros');

    const params = {
        ...busca,
        include: [
            {
                model: Monedas,
                as: 'moneda',
                attributes: ['c_descripcion']
            }
        ],
        attributes: {
            include: casos
        }
    }
    const newTotal = {
        ...total,
        include: [
            {
                model: Monedas,
                as: 'moneda',
                attributes: ['c_descripcion']
            }
        ]
    }
    return objetoTabla(await Seguros.findAll(params), await Seguros.findAll(newTotal))
}