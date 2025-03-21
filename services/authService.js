import conexion from "../model/conexion.js"; // Asegúrate de la extensión .js

const consultaCrearUsuario = "INSERT INTO tareas_prueba SET ?";

const createUser = (user) => {
    console.log("SERVICE", user);

    const documentoFormateado = parseInt(user.numeroDocumento);

    const userToInsert = {
        numero_documento: documentoFormateado,
        tipo_documento: user.tipoDocumento,
        nombres: user.nombrePersona,
        apellidos: user.apellidoPersona,
        tipo_rol: user.tipoRol,
        email: user.email,
        password: user.password,
    };

    conexion.query(consultaCrearUsuario, [userToInsert], (err) => {
        if (err) {
            console.log("ERROR al insertar usuario", err);
        }

        console.log("Usuario Registrado correctamente");
    });
};

export default { createUser };