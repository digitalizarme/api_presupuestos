const sequelize     = require('sequelize');

const { Op }        = sequelize;

module.exports = (query,tabla) => {
  const {offset, sizePerPage,searchText,columns,sortField, sortOrder, defaultSorted} = query;
  const camposOrdenar = typeof defaultSorted !== 'undefined'?JSON.parse(defaultSorted):[];
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
  
  let ordenacion = sortField&&sortOrder
  ?
    [
      sequelize.literal(`${sortField} COLLATE NOCASE ${sortOrder}`),
    ]
        
  :
    [
      sequelize.literal(`updatedAt desc`),
    ]
  ;

  for (let index = 1; index < camposOrdenar.length; index++) 
  {
    const ordenar = camposOrdenar[index];
    ordenacion.push(sequelize.literal(`${ordenar.dataField} ${ordenar.order}`))
  }

  ordenacion = {order: ordenacion};

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
