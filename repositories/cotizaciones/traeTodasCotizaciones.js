const {whereSequelize, objetoTabla} = require('../../utils/');
const {Cotizaciones} = require("../../models");

module.exports = async(context) => {
    const {busca, total} = whereSequelize(context.query);
    return objetoTabla(await Cotizaciones.findAll(busca), await Cotizaciones.findAll(total))

}