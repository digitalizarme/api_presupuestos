const {sequelize, Fletes, Monedas} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {

    const casos = [
        [
            sequelize.literal(`CASE WHEN "Fletes".b_activo = true THEN 'SÍ' ELSE 'NO' END`),
            'c_activo'
        ]
    ];
    query = {
        ...query,
        casos
    }

    const {busca, total} = whereSequelize(query, 'Fletes');

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
    return objetoTabla(await Fletes.findAll(params), await Fletes.findAll(newTotal))
}