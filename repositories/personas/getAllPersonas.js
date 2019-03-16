const { sequelize,Personas }   = require("../../models");
const { whereSequelize, objetoTabla }     = require('../../utils');

module.exports = async (query) => {
    const {busca, total} = whereSequelize(query,'personas');

    const params = {
        ...busca,
        attributes: { 
            include: [
                [sequelize.literal('CASE WHEN b_activo = true THEN "SÍ" ELSE "NO" END'), 'c_activo']
                ,[sequelize.literal('CASE WHEN b_cliente = true THEN "SÍ" ELSE "NO" END'), 'c_cliente']
                ,[sequelize.literal('CASE WHEN b_comisionista = true THEN "SÍ" ELSE "NO" END'), 'c_comisionista']
                ,[sequelize.literal('CASE WHEN b_funcionario = true THEN "SÍ" ELSE "NO" END'), 'c_funcionario']
                ,[sequelize.literal('CASE WHEN b_usuario = true THEN "SÍ" ELSE "NO" END'), 'c_usuario']
            ] 
        },
    }
    // const newTotal = {
    //     ...total,
    //     attributes: { 
    //         include: [
    //             ...total.attributes
    //             ,[sequelize.literal('CASE WHEN "b_activo" = true THEN "SÍ" ELSE "NO" END'), 'c_activo']
    //             ,[sequelize.literal('CASE WHEN "b_cliente" = true THEN "SÍ" ELSE "NO" END'), 'c_cliente']
    //             ,[sequelize.literal('CASE WHEN "b_comisionista" = true THEN "SÍ" ELSE "NO" END'), 'c_comisionista']
    //             ,[sequelize.literal('CASE WHEN "b_funcionario" = true THEN "SÍ" ELSE "NO" END'), 'c_funcionario']
    //             ,[sequelize.literal('CASE WHEN "b_usuario" = true THEN "SÍ" ELSE "NO" END'), 'c_usuario']
    //         ] 
    //     },
    // }
    return objetoTabla(await Personas.findAll(params),await Personas.findAll(total))
}