const {Usuarios, Personas} = require("../models");
const {getAllUsers, getUserByToken} = require('../repositories/usuarios');
const {encrypt} = require('../utils/');
const {traduceErrores, checkAccess} = require('../utils/');

module.exports = (app, router) => {

    router
        .get('/usuarios', async function (context) {
            await checkAccess(context.headers.authorization, 'b_administrador');
            context.body = await getAllUsers(context.query)

        });

    router.get('/usuarios/miUsuario', async function (context) {
        let user = await getUserByToken(context.headers.authorization);
        user = user.dataValues;
        delete user['c_contrasena'];
        context.body = user;

    });

    router.get('/usuarios/:id', async function (context) {
        await checkAccess(context.headers.authorization, 'b_administrador');
        const id = context.params.id;
        context.body = await Usuarios.findOne({where: {
                id
            }})

    });

    router.post('/usuarios', async function (context) {
        await checkAccess(context.headers.authorization, 'b_administrador');
        let datos = context.request.body;
        if (datos.c_contrasena) {
            datos = {
                ...datos,
                c_contrasena: encrypt(datos.c_contrasena)
            }

        }
        try
        {
            await Usuarios.create(datos);
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.put('/usuarios', async function (context) {
        await checkAccess(context.headers.authorization, 'b_administrador');
        let datos = context.request.body;
        const id = datos.id;
        if (id == 1) {
            throw Error("Usuario del sistema no se permite actualizar");
        }
        if (datos.c_contrasena) {
            datos = {
                ...datos,
                c_contrasena: encrypt(datos.c_contrasena)
            }

        }
        try
        {
            await Usuarios.update(datos, {where: {
                    id
                }});
            context.body = datos;
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

    router.put('/usuarios/miUsuario', async function (context) {
        let user = await getUserByToken(context.headers.authorization);
        let datos = context.request.body;
        const id = datos.id;
        if (id != user.id) {
            throw Error("No se permite actualizar datos de otros usuarios");
        }
        if (datos.c_contrasena) {
            datos = {
                ...datos,
                c_contrasena: encrypt(datos.c_contrasena)
            }

        }
        delete datos['n_id_persona'];
        try
        {
            await Usuarios.update(datos, {where: {
                    id
                }});
            context.body = await Usuarios.findOne({
                where: {
                    id
                },
                include: {
                    model: Personas,
                    as: 'persona'
                }
            })
        } catch (error) {
            //console.log(error)
            throw Error(traduceErrores(error))
        };
    });

    router.delete('/usuarios', async function (context) {
        await checkAccess(context.headers.authorization, 'b_administrador');
        const {id} = context.query;
        if (id == 1) {
            throw Error("Usuario del sistema no se permite eliminar");
        }
        try {
            context.body = await Usuarios.destroy({where: {
                    id
                }});
        } catch (error) {
            throw Error(traduceErrores(error))
        };
    });

};