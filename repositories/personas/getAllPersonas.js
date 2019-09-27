const {sequelize, Personas} = require("../../models");
const {whereSequelize, objetoTabla} = require('../../utils');

module.exports = async(query) => {

    const casos = [
        [
            sequelize.literal(`CASE WHEN b_activo THEN 'SÍ' ELSE 'NO' END`),
            `c_activo`
        ],
        [
            sequelize.literal(`CASE WHEN b_cliente THEN 'SÍ' ELSE 'NO' END`),
            `c_cliente`
        ],
        [
            sequelize.literal(`CASE WHEN b_comisionista THEN 'SÍ' ELSE 'NO' END`),
            `c_comisionista`
        ],
        [
            sequelize.literal(`CASE WHEN b_funcionario THEN 'SÍ' ELSE 'NO' END`),
            `c_funcionario`
        ],
        [
            sequelize.literal(`CASE WHEN b_usuario THEN 'SÍ' ELSE 'NO' END`),
            `c_usuario`
        ]
    ];
    query = {
        ...query,
        casos
    }

    const {busca, total} = whereSequelize(query, 'Personas');

    const params = {
        ...busca,
        attributes: {
            include: casos
        }
    }
    return objetoTabla(await Personas.findAll(params), await Personas.findAll(total))
}