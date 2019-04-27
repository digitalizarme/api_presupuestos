const { sequelize,Seguros, Monedas }   = require("../../models");
const { whereSequelize, objetoTabla }     = require('../../utils');

module.exports = async (query) => {
    const {busca, total} = whereSequelize(query,'Seguros');

    const params = {
        ...busca,
        include: 
        [
            {
                model : Monedas,
                as    : 'moneda',
                attributes: ['c_descripcion']
            }
        ],
        attributes: { 
            include: [
                [sequelize.literal('CASE WHEN Seguros.b_activo = true THEN "SÍ" ELSE "NO" END'), 'c_activo']
            ] 
        },
    }
    const newTotal = {
        ...total,
        include: 
        [
            {
                model : Monedas,
                as    : 'moneda',
                attributes: ['c_descripcion']
            }
        ],
    }
    return objetoTabla(await Seguros.findAll(params),await Seguros.findAll(newTotal))
}