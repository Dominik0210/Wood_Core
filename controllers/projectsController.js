import { mostrarProyectos } from "../services/proyectos.js";
import conexion from "../model/conexion.js"; // Asegúrate de importar tu conexión

class ProjectsController {
    consultarTodo(req, res) {
        mostrarProyectos()
            .then((proyectosProcesados) => {
                res.json(proyectosProcesados);
            })
            .catch((err) => {
                console.error("Error al obtener los proyectos", err);
                res.status(500).json({ error: "Error al obtener los proyectos" });
            });
    }

    insertar(req, res) {
        const {
            nombre_proyecto,
            prioridad,
            sprint,
            encargado_proyecto,
            miembros_equipo,
            roles_equipo,
        } = req.body;

        const registrarProyecto =
            "INSERT INTO proyecto_prueba (nombre_proyecto, prioridad, sprint, encargado_proyecto, miembros_proyecto, roles_proyecto) VALUES (?, ?, ?, ?, ?, ?)";

        conexion.query(
            registrarProyecto,
            [
                nombre_proyecto,
                prioridad,
                sprint,
                encargado_proyecto,
                miembros_equipo,
                roles_equipo,
            ],
            (err) => {
                if (err) {
                    console.error("Error al insertar proyecto:", err);
                    res.status(500).json({ error: "Error al insertar proyecto" });
                } else {
                    console.log("Datos almacenados correctamente");
                    res.status(201).json({ message: "Proyecto creado exitosamente" });
                }
            }
        );
    }

    actualizar(req, res) {}

    eliminar(req, res) {}
}

export default new ProjectsController();