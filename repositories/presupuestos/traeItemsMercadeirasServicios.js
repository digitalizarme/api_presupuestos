const { sequelize } = require('../../models');
/**
 * update generic
 * */
module.exports = (presupuestoID) => {

  const SQL = `
            SELECT
              *
            FROM
            (  
              SELECT
                m.id
                ,m.n_id_presupuesto
                ,m.c_descripcion 
                ,m.n_cantidad
                ,m.n_unitario
                ,m.n_flete
                ,COALESCE(m.n_exentas,0) as n_exentas
                ,COALESCE(m.n_gravadas_5,0) as n_gravadas_5
                ,COALESCE(m.n_gravadas_10,0) as n_gravadas_10
                ,COALESCE(m.n_peso,0) as n_peso
                ,p.n_id_moneda
                ,m.t_observacion
                ,m.b_seguro
                ,CASE
                  WHEN m.b_seguro='true' THEN 'SI'
                  ELSE 'NO'
                END AS c_seguro
                ,m.createdAt
                ,'M' as c_tipo
              FROM
                ItemsMercaderias m
                ,Presupuestos p
              WHERE
                m.n_id_presupuesto = p.id
                AND p.id = ${presupuestoID}

              UNION ALL

              SELECT
                s.id
                ,s.n_id_presupuesto
                ,s.c_descripcion
                ,s.n_cantidad
                ,s.n_unitario
                ,0 as n_flete
                ,COALESCE(s.n_exentas,0) as n_exentas
                ,COALESCE(s.n_gravadas_5,0) as n_gravadas_5
                ,COALESCE(s.n_gravadas_10,0) as n_gravadas_10
                ,0 as n_peso
                ,p.n_id_moneda
                ,s.t_observacion
                ,'false' as b_seguro
                ,'NO' as c_seguro
                ,s.createdAt
                ,'S' as c_tipo
              FROM
                ItemsServicios s
                ,Presupuestos p
              WHERE
                s.n_id_presupuesto = p.id
                AND p.id = ${presupuestoID}
            ) AS AUX
            ORDER BY
              id DESC

  `;
  return sequelize.query(SQL, { type: sequelize.QueryTypes.SELECT });
};
