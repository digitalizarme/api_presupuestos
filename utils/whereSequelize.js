const sequelize     = require('sequelize');

const { Op }        = sequelize;

module.exports = (query,tabla) => {
  const {offset, sizePerPage,searchText,columns,sortField, sortOrder} = query;
  const columnas = typeof columns !== 'undefined'?JSON.parse(columns):[];
  let condicion = [];
  if(typeof searchText !== 'undefined' && searchText !== "")
  {
    for (const columna of columnas) {
        if(columna.searchable || typeof columna.searchable === "undefined")
        {
            condicion.push(sequelize.where(sequelize.fn("UPPER", sequelize.col(columna.dataField)),{ [Op.like]:`%${searchText.toUpperCase()}%` }));

        }
    }
    
  }
//   for (const [columna, obj] of Object.entries(filtros)) {
//       const { filterVal, filterType, comparator } = obj;
//       condicion.push(sequelize.where(sequelize.fn("UPPER", sequelize.col(columna)),{ [Op.like]:`%${filterVal.toUpperCase()}%` }));
//   }

  const ordenacion = sortField&&sortOrder?{order:
    [
        sequelize.literal(`${sortField} COLLATE NOCASE ${sortOrder}`),
    ]
        
}:{};

const condiciones = condicion && condicion.length>0?{where:
    {
        [Op.or]:condicion
    }
}:{};

const busca = {
      ...condiciones
      ,offset
      ,limit:sizePerPage
      ,...ordenacion
  }
  tabla = !tabla?columnas[0].table:tabla;
  const total = 
  {
     ...condiciones
      ,attributes: [[sequelize.fn('COUNT', sequelize.col(`${tabla}.id`)), 'total']]
     
  }
  return {busca,total}
}
