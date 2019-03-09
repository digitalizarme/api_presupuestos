const sequelize     = require('sequelize');

const { Op }        = sequelize;

module.exports = (query) => {
  const {offset, sizePerPage,filters,sortField, sortOrder} = query;
  const filtros = typeof filters !== 'undefined'?JSON.parse(filters):{};
  let condicion = [];
  for (const [columna, obj] of Object.entries(filtros)) {
      const { filterVal, filterType, comparator } = obj;
      condicion.push(sequelize.where(sequelize.fn("UPPER", sequelize.col(columna)),{ [Op.like]:`%${filterVal.toUpperCase()}%` }));
  }

  const ordenacion = sortField&&sortOrder?{order:
    [
        sequelize.literal(`${sortField} COLLATE NOCASE ${sortOrder}`),
    ]
        
}:{};

const condiciones = condicion?{where:
    {
        [Op.and]:condicion
    }
}:{};

const busca = {
      ...condiciones
      ,offset
      ,limit:sizePerPage
      ,...ordenacion
  }
  const total = 
  {
     ...condiciones
      ,attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']]
     
  }
  return {busca,total}
}
