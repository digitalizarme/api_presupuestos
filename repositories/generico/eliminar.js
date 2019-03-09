const { sequelize } = require('../../models');

/**
 * update generic
 * */
module.exports = (param) => {
  const {table,where_field,where_value} = param  
  const SQL = `
  DELETE FROM \`${table}\`
  WHERE
  ${where_field} = '${where_value}'

  `;
  return sequelize.query(SQL, { type: sequelize.QueryTypes.DELETE });
};
