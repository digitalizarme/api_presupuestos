const {sequelize, Servicios, ServiciosGrupos, Monedas} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {

    const casos = [
        [
            sequelize.literal(`CASE WHEN "Servicios".b_activo THEN 'SÍ' ELSE 'NO' END`),
            'c_activo'
        ]
    ];

    query = {
        ...query,
        casos
    }

    const {busca, total} = whereSequelize(query, 'Servicios');

    const params = {
        ...busca,
        include: [
            {
                model: ServiciosGrupos,
                as: 'servicioGrupo',
                attributes: ['c_descripcion']
            }, {
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
                model: ServiciosGrupos,
                as: 'servicioGrupo',
                attributes: ['c_descripcion']
            }, {
                model: Monedas,
                as: 'moneda',
                attributes: ['c_descripcion']
            }
        ]
    }
    return objetoTabla(await Servicios.findAll(params), await Servicios.findAll(newTotal))
}