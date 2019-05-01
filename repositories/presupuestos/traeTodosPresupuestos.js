const { sequelize,ItemsMercaderias,Presupuestos, Personas, Usuarios, Status, Monedas }   = require("../../models");
const { whereSequelize, objetoTabla }     = require('../../utils');

module.exports = async (query) => {
    const {busca, total} = whereSequelize(query,'Presupuestos');
    const include = 
    [
        {
            model : Personas,
            as    : 'persona',
            attributes: ['c_nombre','c_identificacion']
        },
        {
            model : Usuarios,
            as    : 'usuario',
            include:{
                model:Personas,
                as:'persona',
                attributes: ['c_nombre']
            },
            attributes: ['c_usuario']
        },
        {
            model : Monedas,
            as    : 'moneda',
            attributes: ['c_descripcion']
        },
        {
            model : Status,
            as    : 'status',
            attributes: ['c_descripcion']
        }
    ];

    const params = {
        ...busca,
        include,
        attributes: { 
            include: [
                [sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT ( COALESCE(SUM(ItemsMercaderias.n_exentas),0) + COALESCE(SUM(ItemsMercaderias.n_gravadas_5),0) + COALESCE(SUM(ItemsMercaderias.n_gravadas_10),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id UNION ALL SELECT  COALESCE(SUM(ItemsServicios.n_exentas) ,0) + COALESCE(SUM(ItemsServicios.n_gravadas_5),0) + COALESCE(SUM(ItemsServicios.n_gravadas_10),0) FROM ItemsServicios WHERE `ItemsServicios`.`n_id_presupuesto` = Presupuestos.id) aux)'),'n_total']
            ]
        },
    }
    const newTotal = {
        ...total,
        include,
    }

    return objetoTabla(await Presupuestos.findAll(params),await Presupuestos.findAll(newTotal))
}