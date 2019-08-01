module.exports = (error) => {
    let erroPadrao;
    //console.log(error,"truduce errores");
    if (error.errors && error.errors.length > 0) {
        //console.log(error.errors[0].message);
        switch (error.errors[0].message) {
            case `c_identificacion must be unique`:
                erroPadrao = 'Yá existe este numero de identificación en el sistema';
                break;

            case `c_email must be unique`:
                erroPadrao = 'Yá existe este e-mail en el sistema';
                break;

            case `c_usuario must be unique`:
                erroPadrao = 'Yá existe este usuario en el sistema';
                break;

            case `c_descripcion must be unique`:
                erroPadrao = 'Yá existe esta descripción en el sistema';
                break;

            case `Validation isFloat on n_valor_porcentaje_comision failed`:
                erroPadrao = 'El valor de la comision no es valido';
                break;

            default:
                erroPadrao = error.errors[0].message
                break;
        }

    }
    if (typeof error.name !== "undefined" && error.name === 'SequelizeForeignKeyConstraintError') {
        //console.log(error.original.constraint);
        switch (error.original.constraint) {
            case `Presupuestos_n_id_persona_fkey`:
                erroPadrao = 'Esta persona esta vinculada a un presupuesto';
                break;
            case `Mercaderias_n_id_marca_fkey`:
                erroPadrao = 'Esta marca esta vinculada a una mercaderia';
                break;
            case `Mercaderias_n_id_grupo_fkey`:
                erroPadrao = 'Este grupo esta vinculado a una mercaderia';
                break;
            case `Mercaderias_n_id_subgrupo_fkey`:
                erroPadrao = 'Este sub-grupo esta vinculado a una mercaderia';
                break;
            case `Servicios_n_id_grupo_fkey`:
                erroPadrao = 'Este grupo esta vinculado a un servicio';
                break;
            case `MercaderiasGrupos_n_id_flete_fkey`:
                erroPadrao = 'Este flete esta vinculado a un grupo de mercaderias';
                break;
            case `Presupuestos_n_id_seguro_fkey`:
                erroPadrao = 'Este seguro esta vinculado a un presupuesto';
                break;
            case `Presupuestos_n_id_usuario_fkey`:
                erroPadrao = 'Este usuario esta vinculado a un presupuesto';
                break;

            default:
                "Este registro esta vinculado con otros y por lo tanto no puede ser eliminado"
                break;
        }

    }
    else if(typeof error.name !== "undefined" && error.name === 'SequelizeDatabaseError')
    {
        //console.log(error.original,'aqui')
        switch (error.original.code) {
            case `23502`:
                erroPadrao = 'Un campo obligatorio esta vazio';
                break;

            default:
                "Error en la base de datos"
                break;
        }
        
    }
    const erroBanco = error.original && error.original.sqlMessage
        ? error.original.sqlMessage
        : typeof error.name !== "undefined" && error.name === 'SequelizeForeignKeyConstraintError'
            ? 'No se pudo eliminar este registro porque esta siendo usado en otras partes del s' +
                'istema'
            : 'Error desconocido';
    const errorMessage = erroPadrao
        ? erroPadrao
        : erroBanco;
    return (errorMessage)
};
