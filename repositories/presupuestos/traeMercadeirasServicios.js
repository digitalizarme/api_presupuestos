const { sequelize } = require('../../models');
/**
 * update generic
 * */
module.exports = async() => {

  const SQL = `
                SELECT
                m.id
                ,m.c_descripcion
                ,m.n_venta as n_unitario
                ,CASE
                  WHEN n_iva = 0 THEN
                      m.n_venta
                  ELSE 0
                END AS n_exentas
                ,CASE
                  WHEN n_iva =5 THEN
                      m.n_venta
                  ELSE 0
                END AS n_gravadas_5
                ,CASE
                  WHEN n_iva = 10 THEN
                      m.n_venta
                ELSE 0
                END AS n_gravadas_10
                ,m.t_observacion
                ,'M' as c_tipo
                ,m.b_activo
                ,m.n_id_moneda
                ,mo.c_descripcion AS c_desc_moneda
                ,mo.c_letras AS c_letras_moneda
                ,mo.n_decimales AS n_decimales_moneda
                ,m.n_peso
                ,f.n_valor as n_flete
                ,f.n_id_moneda as n_flete_moneda
                ,mf.c_letras as c_letras_flete_moneda
                ,mf.n_decimales as n_decimales_flete_moneda
                ,mg.n_id_flete
              FROM
                public."Mercaderias" m
                ,public."Monedas" mo
                ,public."MercaderiasGrupos" mg
                ,public."Fletes" f
                ,public."Monedas" mf
              WHERE
                m.n_id_moneda = mo.id
                AND m.n_id_grupo = mg.id
                AND mg.n_id_flete = f.id
                AND f.n_id_moneda = mf.id

              UNION ALL

              SELECT
                s.id
                ,s.c_descripcion
                ,s.n_valor
                ,CASE
                  WHEN n_iva = 0 THEN
                      s.n_valor
                  ELSE 0
                END AS n_exentas
                ,CASE
                  WHEN n_iva =5 THEN
                      s.n_valor
                  ELSE 0
                END AS n_gravadas_5
                ,CASE
                  WHEN n_iva = 10 THEN
                      s.n_valor
                ELSE 0
                END AS n_gravadas_10
                ,s.t_observacion
                ,'S' as c_tipo
                ,s.b_activo
                ,s.n_id_moneda
                ,mo.c_descripcion AS c_desc_moneda
                ,mo.c_letras AS c_letras_moneda
                ,mo.n_decimales AS n_decimales_moneda
                ,0 as n_peso
                ,0 as n_flete
                ,0 as n_flete_moneda
                ,'' as c_letras_flete_moneda
                ,0 as n_decimales_flete_moneda
                ,0 as n_id_flete
              FROM
                public."Servicios" s
                ,public."Monedas" mo
              WHERE
                s.n_id_moneda = mo.id;

  `;
  return await sequelize.query(SQL, { type: sequelize.QueryTypes.SELECT });
};
