const {Usuarios, sequelize, Personas} = require("../../models");
const whereSequelize = require('../../utils/whereSequelize');
const objetoTabla = require('../../utils/objetoTabla');

module.exports = async(query) => {

    const casos = [
        [
            sequelize.literal(`CASE WHEN "Usuarios".b_activo THEN 'SÍ' ELSE 'NO' END`),
            `c_activo`
        ],
        [
            sequelize.literal(`CASE WHEN b_administrador THEN 'SÍ' ELSE 'NO' END`),
            `c_administrador`
        ],
        [
            sequelize.literal(`CASE WHEN b_cadastrar THEN 'SÍ' ELSE 'NO' END`),
            `c_cadastrar`
        ],
        [
            sequelize.literal(`CASE WHEN b_editar THEN 'SÍ' ELSE 'NO' END`),
            `c_editar`
        ],
        [
            sequelize.literal(`CASE WHEN b_eliminar THEN 'SÍ' ELSE 'NO' END`),
            `c_eliminar`
        ],
        [
            sequelize.literal(`CASE WHEN b_imprimir THEN 'SÍ' ELSE 'NO' END`),
            `c_imprimir`
        ]
    ];

    query = {
        ...query,
        casos
    }

    const {busca, total} = whereSequelize(query, 'Usuarios');
    const params = {
        ...busca,
        include: {
            model: Personas,
            as: 'persona'
        },
        attributes: {
            include: casos
        }
    }
    const newTotal = {
        ...total,
        include: {
            model: Personas,
            as: 'persona'
        }
    }
    return objetoTabla(await Usuarios.findAll(params), await Usuarios.findAll(newTotal))
}