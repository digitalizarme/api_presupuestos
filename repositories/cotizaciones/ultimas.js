
const { Cotizaciones, Monedas,  }        = require("../../models");
const sequelize     = require('sequelize');
const { Op }        = sequelize;

module.exports = async (monedaOrigem) => {
    let totalMonedas = await Monedas.findOne({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']]
      });
    totalMonedas = totalMonedas.dataValues.total-1; 
    const cotizaciones =  await Cotizaciones.findAll({
        attributes: ['c_monedaOrigemDestino','n_valor']
        ,limit:totalMonedas
        ,order: [
            ['createdAt', 'DESC'],
        ]
        ,where: {
            c_monedaOrigemDestino:{
                [Op.like]: `${monedaOrigem}`    
            } 
           
        }
    });
    return cotizaciones;

 }