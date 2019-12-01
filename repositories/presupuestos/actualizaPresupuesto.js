const {Presupuestos, Pagos} = require("../../models");
const sequelize = require('sequelize');
const {Op} = sequelize;

const atualizaCuotas = require("./atualizaCuotas");
const {traduceErrores} = require("../../utils/");
const {tengoPagos} = require("../pagos");

module.exports = async(datos) => {

    if (datos.n_id_status === 4) {
        throw Error('No se permite actualizar presupuesto ya concluido.');
    }
    const id = datos.id;
    if (datos.cuotas && datos.cuotas.length > 0) {
        // pegos todos os pagamentos em que a data do pagamento nao seja null, ouseja
        // que tenha sido pagado
        const totPagamentos = await tengoPagos(id);
        // si nao tenho nenhum pagamento para esse orçamento entao atualizo as parcelas
        // o que incluir deletar e voltar a cadastrar
        if (totPagamentos > 0) {
            throw Error('No se permite actualizar presupuesto con parcelas pagas.');
        }
    }
    try {
        if (datos.cuotas && datos.cuotas.length > 0) {
            await atualizaCuotas(datos.cuotas);
        }
        await Presupuestos.update(datos, {where: {
                id
            }});

        return datos;
    } catch (error) {
        throw Error(traduceErrores(error));
    }

}