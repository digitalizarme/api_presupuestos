const {Presupuestos, Personas, Usuarios, Status, Monedas} = require("../../models");
const sequelize = require("sequelize");
const {Op} = sequelize;

const {whereSequelize, objetoTabla} = require('../../utils');
module.exports = async(query, tipo) => {
    let operador = Op.lte;
    let opValor = 2;
    if (tipo !== 1) {
        operador = Op.eq;
        opValor = tipo;

    }

    const casos = [
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
                    'id UNION ALL SELECT  COALESCE(SUM(ItemsServicios.n_exentas) ,0) FROM public."Ite' +
                    'msServicios" AS ItemsServicios WHERE ItemsServicios.n_id_presupuesto = "Presupue' +
                    'stos".id) aux)'),
            'n_total_exentas'
        ],
        [
            sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                    '(SUM("ItemsMercaderias".n_gravadas_5),0) ) n_total FROM public."ItemsMercaderias' +
                    '" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuesto' +
                    's".id UNION ALL SELECT  COALESCE(SUM(ItemsServicios.n_gravadas_5) ,0) FROM publi' +
                    'c."ItemsServicios" AS ItemsServicios WHERE ItemsServicios.n_id_presupuesto = "Pr' +
                    'esupuestos".id ) aux)'),
            'n_total_5'
        ],
        [
            sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                    '(SUM("ItemsMercaderias".n_gravadas_10),0) ) n_total FROM public."ItemsMercaderia' +
                    's" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuest' +
                    'os".id UNION ALL SELECT  COALESCE(SUM(ItemsServicios.n_gravadas_10) ,0) FROM pub' +
                    'lic."ItemsServicios" AS ItemsServicios WHERE ItemsServicios.n_id_presupuesto = "' +
                    'Presupuestos".id ) aux)'),
            'n_total_10'
        ],
        [
            sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                    '((SUM("ItemsMercaderias".n_gravadas_10)/11),0) ) n_total FROM public."ItemsMerca' +
                    'derias" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presu' +
                    'puestos".id UNION ALL SELECT  COALESCE((SUM(ItemsServicios.n_gravadas_10)/11) ,0' +
                    ') FROM public."ItemsServicios" AS ItemsServicios WHERE ItemsServicios.n_id_presu' +
                    'puesto = "Presupuestos".id ) aux)'),
            'n_total_iva_10'
        ],
        [
            sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                    '((SUM("ItemsMercaderias".n_gravadas_5)/21),0) ) n_total FROM public."ItemsMercad' +
                    'erias" AS "ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presup' +
                    'uestos".id UNION ALL SELECT  COALESCE((SUM(ItemsServicios.n_gravadas_5)/21) ,0) ' +
                    'FROM public."ItemsServicios" AS ItemsServicios WHERE ItemsServicios.n_id_presupu' +
                    'esto = "Presupuestos".id ) aux)'),
            'n_total_iva_5'
        ],
        [
            sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                    '((SUM("ItemsMercaderias".n_gravadas_10)/11),0) + COALESCE((SUM("ItemsMercaderias' +
                    '".n_gravadas_5)/21),0) ) n_total FROM public."ItemsMercaderias" AS "ItemsMercade' +
                    'rias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuestos".id UNION ALL SE' +
                    'LECT  COALESCE((SUM(ItemsServicios.n_gravadas_5)/21) ,0) + COALESCE((SUM(ItemsSe' +
                    'rvicios.n_gravadas_10)/11) ,0) FROM public."ItemsServicios" AS ItemsServicios WH' +
                    'ERE ItemsServicios.n_id_presupuesto = "Presupuestos".id ) aux)'),
            'n_total_iva'
        ],
        [
            sequelize.literal('(SELECT round(cast(SUM(n_total) as numeric),2) n_total FROM ( SELECT (  COALESCE' +
                    '(SUM("ItemsMercaderias".n_flete),0) ) n_total FROM public."ItemsMercaderias" AS ' +
                    '"ItemsMercaderias" WHERE "ItemsMercaderias".n_id_presupuesto = "Presupuestos".id' +
                    ' ) aux)'),
            'n_total_flete'
        ]
    ];
    query = {
        ...query,
        casos
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
    } else {
        busca = {
            ...busca,
            where: {
                ...busca.where,
                n_id_status: {
                    [operador]: opValor
                }
            }
        }

    }
    if (typeof total.where === "undefined") {
        total = {
            ...total,
            where: {
                n_id_status: {
                    [operador]: opValor
                }
            }
        }
    } else {
        total = {
            ...total,
            where: {
                ...total.where,
                n_id_status: {
                    [operador]: opValor
                }
            }
        }

    }

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
            include: casos
        }
    }

    const newTotal = {
        ...total,
        include
    }
    return objetoTabla(await Presupuestos.findAll(params), await Presupuestos.findAll(newTotal))
}