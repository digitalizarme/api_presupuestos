const {Presupuestos, Personas, Usuarios, Status, Monedas} = require("../../models");
const sequelize = require("sequelize");
const {Op} = sequelize;

const {whereSequelize, objetoTabla} = require('../../utils');
module.exports = async(query, tipo) => {
    let operador = Op.ne;
    let opValor = 3;
    if(tipo===2)
    {
        operador = Op.eq;
    }
    else if(tipo===3)
    {
        operador = Op.eq;
        opValor = 4;
    }
    let {busca, total} = whereSequelize(query, 'Presupuestos');
    if (typeof busca.where === "undefined") {
        busca = {
            ...busca,
            where: {
                n_id_status: {
                    [operador]: opValor
                }
            }
        }
    }
    else
    {
        busca = {
            ...busca,
            where: {
                ...busca.where
                ,n_id_status: {
                    [operador]: opValor
                }
            }
        }

    }
    console.log(busca, 'busca');

    const include = [
        {
            model: Personas,
            as: 'persona',
            attributes: ['c_nombre', 'c_identificacion']
        }, {
            model: Usuarios,
            as: 'usuario',
            include: {
                model: Personas,
                as: 'persona',
                attributes: ['c_nombre']
            },
            attributes: ['c_usuario']
        }, {
            model: Monedas,
            as: 'moneda',
            attributes: ['c_descripcion', 'n_decimales']
        }, {
            model: Status,
            as: 'status',
            attributes: ['c_descripcion']
        }
    ];

    const params = {
        ...busca,
        include,
        attributes: {
            include: [
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT ( "Presupue' +
                            'stos".n_valor_comision + "Presupuestos".n_valor_seguro + "Presupuestos".n_desc_r' +
                            'edondeo + COALESCE(SUM("ItemsMercaderias".n_flete),0) + COALESCE(SUM("ItemsMerca' +
                            'derias".n_exentas),0) + COALESCE(SUM("ItemsMercaderias".n_gravadas_5),0) + COALE' +
                            'SCE(SUM("ItemsMercaderias".n_gravadas_10),0) ) n_total FROM public."ItemsMercade' +
                            'rias" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupu' +
                            'estos".id UNION ALL SELECT  COALESCE(SUM(ItemsServicios.n_exentas) ,0) + COALESC' +
                            'E(SUM(ItemsServicios.n_gravadas_5),0) + COALESCE(SUM(ItemsServicios.n_gravadas_1' +
                            '0),0) FROM public."ItemsServicios" AS ItemsServicios WHERE ItemsServicios.n_id_p' +
                            'resupuesto = "Presupuestos".id) aux)'),
                    'n_total_general'
                ],
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                            '(SUM("ItemsMercaderias".n_flete),0) + COALESCE(SUM("ItemsMercaderias".n_exentas)' +
                            ',0) + COALESCE(SUM("ItemsMercaderias".n_gravadas_5),0) + COALESCE(SUM("ItemsMerc' +
                            'aderias".n_gravadas_10),0) ) n_total FROM public."ItemsMercaderias" WHERE "Items' +
                            'Mercaderias".n_id_presupuesto = "Presupuestos".id UNION ALL SELECT  COALESCE(SUM' +
                            '(ItemsServicios.n_exentas) ,0) + COALESCE(SUM(ItemsServicios.n_gravadas_5),0) + ' +
                            'COALESCE(SUM(ItemsServicios.n_gravadas_10),0) FROM public."ItemsServicios" AS It' +
                            'emsServicios WHERE ItemsServicios.n_id_presupuesto = "Presupuestos".id) aux)'),
                    'n_total_items'
                ],
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                            '(SUM("ItemsMercaderias".n_exentas),0) ) n_total FROM public."ItemsMercaderias" A' +
                            'S "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuestos".' +
                            'id ) aux)'),
                    'n_total_exentas'
                ],
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                            '(SUM("ItemsMercaderias".n_gravadas_10),0) ) n_total FROM public."ItemsMercaderia' +
                            's" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuest' +
                            'os".id ) aux)'),
                    'n_total_10'
                ],
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                            '((SUM("ItemsMercaderias".n_gravadas_10)/11),0) ) n_total FROM public."ItemsMerca' +
                            'derias" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presu' +
                            'puestos".id ) aux)'),
                    'n_total_iva_10'
                ],
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                            '((SUM("ItemsMercaderias".n_gravadas_5)/21),0) ) n_total FROM public."ItemsMercad' +
                            'erias" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presup' +
                            'uestos".id ) aux)'),
                    'n_total_iva_5'
                ],
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                            '((SUM("ItemsMercaderias".n_gravadas_10)/11),0) + COALESCE((SUM("ItemsMercaderias' +
                            '".n_gravadas_5)/21),0) ) n_total FROM public."ItemsMercaderias" AS "ItemsMercade' +
                            'rias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuestos".id ) aux)'),
                    'n_total_iva'
                ],
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                            '(SUM("ItemsMercaderias".n_gravadas_5),0) ) n_total FROM public."ItemsMercaderias' +
                            '" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuesto' +
                            's".id ) aux)'),
                    'n_total_5'
                ],
                [
                    sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                            '(SUM("ItemsMercaderias".n_flete),0) ) n_total FROM public."ItemsMercaderias" AS ' +
                            '"ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuestos".id' +
                            ' ) aux)'),
                    'n_total_flete'
                ]
            ]
        }
    }

    const newTotal = {
        ...total,
        include
    }
    return objetoTabla(await Presupuestos.findAll(params), await Presupuestos.findAll(newTotal))
}