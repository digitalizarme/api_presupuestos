const { sequelize,Servicios, ServiciosGrupos, Monedas }   = require("../../models");
const { whereSequelize, objetoTabla }     = require('../../utils');

module.exports = async (query) => {
    const {busca, total} = whereSequelize(query,'Servicios');

    const params = {
        ...busca,
        include: 
        [
            {
                model : ServiciosGrupos,
                as    : 'servicioGrupo',
                attributes: ['c_descripcion']
            },
            {
                model : Monedas,
                as    : 'moneda',
                attributes: ['c_descripcion']
            }
        ],
        attributes: { 
            include: [
                [sequelize.literal('CASE WHEN Servicios.b_activo = true THEN "SÍ" ELSE "NO" END'), 'c_activo']
            ] 
        },
    }
    const newTotal = {
        ...total,
        include: 
        [
            {
                model : ServiciosGrupos,
                as    : 'servicioGrupo',
                attributes: ['c_descripcion']
            },
            {
                model : Monedas,
                as    : 'moneda',
                attributes: ['c_descripcion']
            }
        ],
    }
    return objetoTabla(await Servicios.findAll(params),await Servicios.findAll(newTotal))
}