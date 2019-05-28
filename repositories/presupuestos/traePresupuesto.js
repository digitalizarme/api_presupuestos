const { sequelize,Presupuestos,Monedas }   = require("../../models");
module.exports = async (id) => {

    const include = 
    [
        {
            model : Monedas,
            as    : 'moneda',
        },
    ];

    
    return await Presupuestos.findOne({
        where:{id}
        ,include
        ,attributes: { 
            include: [
                [sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT ( Presupuestos.n_valor_comision + Presupuestos.n_valor_seguro + Presupuestos.n_desc_redondeo + COALESCE(SUM(ItemsMercaderias.n_flete),0) + COALESCE(SUM(ItemsMercaderias.n_exentas),0) + COALESCE(SUM(ItemsMercaderias.n_gravadas_5),0) + COALESCE(SUM(ItemsMercaderias.n_gravadas_10),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id UNION ALL SELECT  COALESCE(SUM(ItemsServicios.n_exentas) ,0) + COALESCE(SUM(ItemsServicios.n_gravadas_5),0) + COALESCE(SUM(ItemsServicios.n_gravadas_10),0) FROM ItemsServicios WHERE `ItemsServicios`.`n_id_presupuesto` = Presupuestos.id) aux)'),'n_total_general']
                ,[sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT (  COALESCE(SUM(ItemsMercaderias.n_flete),0) + COALESCE(SUM(ItemsMercaderias.n_exentas),0) + COALESCE(SUM(ItemsMercaderias.n_gravadas_5),0) + COALESCE(SUM(ItemsMercaderias.n_gravadas_10),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id UNION ALL SELECT  COALESCE(SUM(ItemsServicios.n_exentas) ,0) + COALESCE(SUM(ItemsServicios.n_gravadas_5),0) + COALESCE(SUM(ItemsServicios.n_gravadas_10),0) FROM ItemsServicios WHERE `ItemsServicios`.`n_id_presupuesto` = Presupuestos.id) aux)'),'n_total_items']
                ,[sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT (  COALESCE(SUM(ItemsMercaderias.n_exentas),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id ) aux)'),'n_total_exentas']
                ,[sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT (  COALESCE(SUM(ItemsMercaderias.n_gravadas_10),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id ) aux)'),'n_total_10']
                ,[sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT (  COALESCE((SUM(ItemsMercaderias.n_gravadas_10)/11),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id ) aux)'),'n_total_iva_10']
                ,[sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT (  COALESCE((SUM(ItemsMercaderias.n_gravadas_5)/21),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id ) aux)'),'n_total_iva_5']
                ,[sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT (  COALESCE((SUM(ItemsMercaderias.n_gravadas_10)/11),0) + COALESCE((SUM(ItemsMercaderias.n_gravadas_5)/21),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id ) aux)'),'n_total_iva']
                ,[sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT (  COALESCE(SUM(ItemsMercaderias.n_gravadas_5),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id ) aux)'),'n_total_5']
                ,[sequelize.literal('(SELECT round(SUM(n_total),2) n_total FROM ( SELECT (  COALESCE(SUM(ItemsMercaderias.n_flete),0) ) n_total FROM ItemsMercaderias WHERE `ItemsMercaderias`.`n_id_presupuesto` = Presupuestos.id ) aux)'),'n_total_flete']
            ]
        },

    });

}