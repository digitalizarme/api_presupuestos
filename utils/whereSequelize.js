const sequelize = require("sequelize");

const { Op } = sequelize;

module.exports = (query, tabla) => {
  const {
    offset,
    sizePerPage,
    searchText,
    columns,
    sortField,
    sortOrder,
    defaultSorted
  } = query;
  const camposOrdenar =
    typeof defaultSorted !== "undefined" ? JSON.parse(defaultSorted) : [];
  const columnas = typeof columns !== "undefined" ? JSON.parse(columns) : [];
  tabla = !tabla ? columnas[0].table : tabla;

  let condicion = [];
  if (typeof searchText !== "undefined" && searchText !== "") {
    for (const columna of columnas) {
      if (columna.searchable || typeof columna.searchable === "undefined") {
        const tablaComplementar =
          columna.dataField.indexOf(".") !== -1 ? "" : tabla + ".";
        if (columna.dataField === "updatedAt") {
          const fecha = searchText.split("/");
          if (fecha.length === 3) {
            const date = new Date(`${searchText}`);
            console.log(date, "date");
            const isValidDate = Boolean(+date);
            if (isValidDate)
              condicion.push(
                sequelize.where(
                  sequelize.fn(
                    "to_char",
                    sequelize.col(tablaComplementar + columna.dataField),
                    "DD/MM/YYYY"
                  ),
                  { [Op.eq]: searchText }
                )
              );
          }
        } else {
          condicion.push(
            sequelize.where(
              sequelize.fn(
                "UPPER",
                sequelize.col(tablaComplementar + columna.dataField)
              ),
              { [Op.like]: `%${searchText.toUpperCase()}%` }
            )
          );
        }
      }
    }
  }
  const tablaComplementar =
    sortField && sortField.indexOf(".") !== -1 ? "" : `"${tabla}".`;
  let ordenacion =
    sortField && sortOrder
      ? [sequelize.literal(`${tablaComplementar}"${sortField}" ${sortOrder}`)]
      : [sequelize.literal(`"${tabla}"."updatedAt" desc`)];
  for (let index = 1; index < camposOrdenar.length; index++) {
    const ordenar = camposOrdenar[index];
    ordenacion.push(
      sequelize.literal(`"${tabla}"."${ordenar.dataField}" ${ordenar.order}`)
    );
  }

  ordenacion = { order: ordenacion };

  const condiciones =
    condicion && condicion.length > 0
      ? {
          where: {
            [Op.or]: condicion
          }
        }
      : {};

  const busca = {
    ...condiciones,
    offset,
    limit: sizePerPage,
    ...ordenacion
  };
  const total = {
    ...condiciones,
    //attributes: [[sequelize.fn("COUNT", sequelize.col(`${tabla}.id`)), "total"]]
  };
  return { busca, total };
};
