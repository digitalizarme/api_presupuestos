const { sequelize,Mercaderias, MercaderiasSubGrupos,MercaderiasGrupos,MercaderiasMarcas, Monedas }   = require("../../models");
const { whereSequelize, objetoTabla }     = require('../../utils');

module.exports = async (query) => {
    const {busca, total} = whereSequelize(query,'"Mercaderias"');

    const params = {
        ...busca,
        include: 
        [
            {
                model : MercaderiasGrupos,
                as    : 'grupo',
                attributes: ['c_descripcion']
            },
            {
                model : MercaderiasSubGrupos,
                as    : 'subGrupo',
                attributes: ['c_descripcion']
            },
            {
                model : MercaderiasMarcas,
                as    : 'marca',
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
                [sequelize.literal(`CASE WHEN "Mercaderias".b_activo THEN 'SÍ' ELSE 'NO' END`), 'c_activo']
            ] 
        },
    }

    const newTotal = {
        ...total,
        include: 
        [
            {
                model : MercaderiasGrupos,
                as    : 'grupo',
                attributes: ['c_descripcion']
            },
            {
                model : MercaderiasSubGrupos,
                as    : 'subGrupo',
                attributes: ['c_descripcion']
            },
            {
                model : MercaderiasMarcas,
                as    : 'marca',
                attributes: ['c_descripcion']
            },
            {
                model : Monedas,
                as    : 'moneda',
                attributes: ['c_descripcion']
            }
        ],
    }
    return objetoTabla(await Mercaderias.findAll(params),await Mercaderias.findAll(newTotal))
}