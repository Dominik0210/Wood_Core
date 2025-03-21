import { mostrarTareas, crearTarea, getOneTask, editOneTask, deleteOneTask } from "../services/tareas.js";

class TasksController {
    constructor() {}

    consultarTodo(req, res) {
        mostrarTareas()
            .then((tareasProcesadas) => {
                res.json(tareasProcesadas);
            })
            .catch((err) => {
                console.error("Error al obtener la tareas", err);
            });
    }

    consultarUno(req, res) {
        const idTarea = req.params.id;

        console.log(`El id de la tarea a buscar es: ${idTarea}`);
        if (!idTarea) {
            console.log("(CONTROLLER) Error al obtener la tarea");
        }

        getOneTask(idTarea)
            .then((tarea) => {
                res.json(tarea);
            })
            .catch((err) => {
                console.log("Error al devolver la tarea(CONTROLLER)", err);
            });
    }

    insertar(req, res) {
        const nombre_tarea = req.body.nombre;
        const prioridad = req.body.prioridad;
        const resumen = req.body.descripcion;
        const encargado_tarea = req.body.encargado;
        const sprint_tarea = req.body.sprint;

        const newTask = {
            nombre_tarea,
            prioridad,
            resumen,
            encargado_tarea,
            sprint_tarea,
        };

        crearTarea(newTask);
    }

    actualizar(req, res) {
        const { body, params: { id } } = req;

        if (!id) {
            console.log("Error al obtener la tarea(CONTROLLER UPDATE)");
            res.status(400).send({ status: "ERROR", message: "id de tarea no proporcionado" });
        }

        console.log("el id de la tarea a actualizar es: ", id);
        console.log(`Los cambios son: ${body}`);

        editOneTask(id, body)
            .then((tareaActualizada) => res.json(tareaActualizada));
    }

    eliminar(req, res) {
        const { id } = req.params;

        console.log("Tarea a eliminar(CONTROLLER): ", id);

        if (!id) {
            console.log("ERROR: No se proporciono el id de la tarea (CONTROLLER)");
        }

        deleteOneTask(id)
            .then((mensaje) => {
                res.json(mensaje);
            });
    }
}

export default new TasksController();