const {Presupuestos, ItemsMercaderias, ItemsServicios, Pagos, Personas} = require("../models");
const sequelize = require('sequelize');
const {Op} = sequelize;
const {
    traeTodosPresupuestos,
    traePresupuesto,
    traeItemsMercadeirasServicios,
    traeMercadeirasServicios,
    generaCuotas,
    atualizaCuotas,
    traeCuotas
} = require("../repositories/presupuestos");
const {traduceErrores} = require("../utils/");

module.exports = (app, router) => {

    router
        .get("/presupuestos/pendientes", async function (context) {
            context.body = await traeTodosPresupuestos(context.query, 1);
        });

    router.get("/presupuestos/aprobados", async function (context) {
        context.body = await traeTodosPresupuestos(context.query, 3);
    });

    router.get("/presupuestos/concluidos", async function (context) {
        context.body = await traeTodosPresupuestos(context.query, 4);
    });

    router.get("/presupuestos/cobradores", async function (context) {
        context.body = await Personas.findAll({
            where: {
                [Op.and]: [
                    {
                        b_activo: true
                    }
                ],
                [Op.or]: [
                    {
                        b_funcionario: true
                    }, {
                        b_usuario: true
                    }
                ]
            }
        })
    });

    router.get("/presupuestos/itemsMercaderiasServicios/:idPresupuesto", async function (context) {
        const idPresupuesto = context.params.idPresupuesto;
        context.body = await traeItemsMercadeirasServicios(idPresupuesto);
    });

    router.get("/presupuestos/mercaderiasServicios", async function (context) {
        context.body = await traeMercadeirasServicios();
    });

    router.get("/presupuestos/cuotas/:n_id_presupuesto", async function (context) {
        const n_id_presupuesto = context.params.n_id_presupuesto;
        try {
            context.body = await traeCuotas(n_id_presupuesto);

        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.get("/presupuestos/cuotas/:n_id_presupuesto/1", async function (context) {
        const n_id_presupuesto = context.params.n_id_presupuesto;
        try {
            context.body = await traeCuotas(n_id_presupuesto, 1);

        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.get("/presupuestos/:id", async function (context) {
        const id = context.params.id;
        context.body = await traePresupuesto(id);
    });

    router.delete("/presupuestos/:tipoPresupuesto", async function (context) {
        const tipoPresupuesto = context.params.tipoPresupuesto;

        if (tipoPresupuesto === 'concluidos') {
            throw Error('No se permite eliminar presupuesto ya concluido.');
        }
        const {id} = context.query;
        await Pagos.destroy({
            where: {
                n_id_presupuesto: id
            }
        });
        await ItemsMercaderias.destroy({
            where: {
                n_id_presupuesto: id
            }
        });
        await ItemsServicios.destroy({
            where: {
                n_id_presupuesto: id
            }
        });
        context.body = await Presupuestos.destroy({where: {
                id
            }});
    });

    router.post("/presupuestos", async function (context) {
        const datos = context.request.body;
        try {
            if (datos.cuotas && datos.cuotas.length > 0) {
                await atualizaCuotas(datos.cuotas);
            }
            await Presupuestos
                .create(datos)
                .then(model => (context.body = model));
        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.delete("/presupuestos/cuotas/:n_id_presupuesto", async function (context) {
        const n_id_presupuesto = context.params.n_id_presupuesto;
        try {
            await Pagos.destroy({where: {
                    n_id_presupuesto
                }});
            context.body = [];

        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.post("/presupuestos/cuotas", async function (context) {
        const datos = context.request.body;
        try {

            context.body = await generaCuotas(datos);
        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.put("/presupuestos/cuota/:id", async function (context) {
        const datos = context.request.body;
        const n_id_presupuesto = datos.n_id_presupuesto;
        const id = context.params.id;

        try {
            const resPagos = await Pagos.update(datos, {where: {
                    id
                }});
            const todosPagos = await Pagos.findAll({
                where: {
                    d_fecha_pago: null,
                    n_id_presupuesto
                }
            });
            if (todosPagos.length === 0) {
                const datos = {
                    n_id_status: 4
                }
                await Presupuestos.update(datos, {
                    where: {
                        id: n_id_presupuesto
                    }
                });
            }
            context.body = resPagos;

        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.post("/presupuestos/item", async function (context) {
        const datos = context.request.body;
        try {
            if (datos.c_tipo === "M") {
                await ItemsMercaderias
                    .create(datos)
                    .then(model => (context.body = model));
            } else {
                await ItemsServicios
                    .create(datos)
                    .then(model => (context.body = model));
            }
        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.delete("/presupuestos/item/:id/:tipo", async function (context) {
        try {
            const {id, tipo} = context.params;
            if (tipo === "M") {
                context.body = await ItemsMercaderias.destroy({where: {
                        id
                    }});
            } else {
                context.body = await ItemsServicios.destroy({where: {
                        id
                    }});
            }
        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.put("/presupuestos/item", async function (context) {
        const datos = context.request.body;
        const id = datos.id;
        try {
            if (datos.c_tipo === "M") {
                await ItemsMercaderias.update(datos, {where: {
                        id
                    }});
            } else {
                await ItemsServicios.update(datos, {where: {
                        id
                    }});
            }
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

    router.put("/presupuestos", async function (context) {
        const datos = context.request.body;
        if (datos.n_id_status === 4) {
            throw Error('No se permite actualizar presupuesto ya concluido.');
        }
        const id = datos.id;
        try {
            if (datos.cuotas && datos.cuotas.length > 0) {
                await atualizaCuotas(datos.cuotas);
            }
            await Presupuestos.update(datos, {where: {
                    id
                }});
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error));
        }
    });

};
