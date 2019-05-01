const { sequelize,Presupuestos, Personas, Usuarios, Status, Monedas }   = require("../../models");
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
    }
    const newTotal = {
        ...total,
        include,
    }
    return objetoTabla(await Presupuestos.findAll(params),await Presupuestos.findAll(newTotal))
}