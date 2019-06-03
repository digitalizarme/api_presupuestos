
module.exports = () => {
  const fecha = new Date();
  let mes = fecha.getUTCMonth()+1;
  mes = mes<10?"0"+ mes:mes;
  let dia = fecha.getUTCDate();
  dia = dia<10?"0"+ dia:dia;

  let minutos = fecha.getUTCMinutes();
  minutos = minutos<10?"0"+ minutos:minutos;

  return fecha.getUTCFullYear()+"-"+mes+"-"+dia+" "+fecha.getUTCHours()+":"+minutos+":"+fecha.getUTCSeconds()+"."+fecha.getUTCMilliseconds()+" +00:00";
}
