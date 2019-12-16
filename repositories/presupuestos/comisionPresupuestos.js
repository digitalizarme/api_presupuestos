const {Presupuestos, Pagos, Monedas, Personas, MediosPagos} = require("../../models");
const sequelize = require('sequelize');
const {Op} = sequelize;

module.exports = async(query) => {

    const {n_id_persona_comisionista, d_fecha_ini, d_fecha_fin} = query;

    let whereComisionista = {
        id: {
            [Op.gte]: 1
        }
    }

    if (n_id_persona_comisionista) {
        whereComisionista = {
            id: n_id_persona_comisionista
        }
    }

    const include = [
        {
            model: Monedas,
            as: 'moneda',
            attributes: ['c_descripcion', 'c_simbolo', 'c_letras', 'n_decimales']
        }, {
            model: MediosPagos,
            as: 'medioPago',
            attributes: ['c_descripcion']

        }, {
            model: Personas,
            as: 'personaBaja',
            attributes: ['c_nombre']

        }, {
            model: Presupuestos,
            as: 'presupuesto',
            include: [
                {
                    model: Personas,
                    as: 'comisionista',
                    attributes: ['c_nombre'],
                    where: whereComisionista

                }, {
                    model: Personas,
                    as: 'persona',
                    attributes: ['c_nombre', 'c_identificacion']

                }
            ],
            attributes: ['n_valor_comision', 'createdAt']

        }
    ];

    let where = {
        d_fecha_pago: {
            [Op.not]: null
        }
    }
    if (d_fecha_ini) {
        where = {
            ...where,
            d_fecha_pago: {
                [Op.gte]: d_fecha_ini
            }
        }

    }
    if (d_fecha_fin) {
        where = {
            ...where,
            d_fecha_pago: {
                [Op.lte]: d_fecha_fin
            }
        }

    }
    return await Pagos.findAll({
        where,
        include,
        group: [
            'n_id_presupuesto', sequelize.col('Pagos.createdAt'),
            sequelize.col('moneda.id'),
            sequelize.col('presupuesto.id'),
            sequelize.col('presupuesto->comisionista.id'),
            sequelize.col('presupuesto->persona.id'),
            sequelize.col('medioPago.id'),
            sequelize.col('personaBaja.id')
        ],
        attributes: [
            'n_id_presupuesto',
            'createdAt',
            [
                sequelize.literal(`SUM("Pagos"."n_valor")+SUM("Pagos"."n_desc_redondeo")`),
                'n_valor_cobrado'
            ],
            [
                sequelize.literal(`SUM("Pagos"."n_valor")`),
                'n_valor_presupuesto'
            ],
            [
                sequelize.literal(`presupuesto.n_valor_comision*(presupuesto.n_porc_comisionista/100)`),
                'n_valor_comisionista'
            ],
            [
                sequelize.literal(`((SUM("Pagos"."n_valor")+SUM("Pagos"."n_desc_redondeo"))*presupuesto.n_valor_comision) - (presupuesto.n_valor_comision*(presupuesto.n_porc_comisionista/100))`),
                'n_ganacia_empresa'
            ]
        ],
        order: [
            [
                sequelize.col('moneda.id'),
                'asc'
            ],
            ['n_id_presupuesto', 'desc']
        ]
    });

}