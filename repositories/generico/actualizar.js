const { sequelize } = require('../../models');

/**
 * update generic
 * */
module.exports = (param) => {
  const {table,column,valor,where_field,where_value} = param  
  const SQL = `
  UPDATE \`${table}\`
  SET ${column} = '${valor}'
  WHERE
  ${where_field} = '${where_value}'

  `;
  return sequelize.query(SQL, { type: sequelize.QueryTypes.UPDATE });
};
