import conexion from "../model/conexion.js";

const seleccionarTareas = "SELECT * FROM tareas_prueba";

function mostrarTareas() {
    return new Promise((resolve, reject) => {
        conexion.query(seleccionarTareas, function (err, listOfTasks) {
            if (err) {
                reject(err);
            } else {
                const taskInfoArray = [];
                listOfTasks.forEach((task, indice) => {
                    const tarea_id = task.tarea_id;
                    const nombre = task.nombre_tarea;
                    const prioridad = task.prioridad;
                    const descripcion = task.resumen;
                    const estado = task.estado;
                    const encargado = task.encargado_tarea;
                    const sprint = task.sprint_tarea;

                    const taskInfo = {
                        tarea_id,
                        nombre,
                        prioridad,
                        descripcion,
                        estado,
                        encargado,
                        sprint,
                    };

                    taskInfoArray.push(taskInfo);
                });

                resolve(taskInfoArray);
            }
        });
    });
}

const crearTarea = (taskToInsert) => {
    const registrarTarea = "INSERT INTO tareas_prueba SET ?";

    conexion.query(registrarTarea, [taskToInsert], function (err) {
        if (err) {
            throw err;
        } else {
            console.log("TAREA CREADA CORRECTAMENTE");
        }
    });
};

const getOneTask = (idTarea) => {
    const tareaABuscar = "SELECT * FROM tareas_prueba WHERE tarea_id = ?";

    return new Promise((resolve, reject) => {
        conexion.query(tareaABuscar, [idTarea], (err, tarea) => {
            if (err) {
                reject(err);
            } else {
                const arrayGetOneTask = [];

                tarea.forEach((tareaIndividual) => {
                    const id = tareaIndividual.tarea_id;
                    const nombre = tareaIndividual.nombre_tarea;
                    const prioridad = tareaIndividual.prioridad;
                    const descripcion = tareaIndividual.resumen;
                    const estado = tareaIndividual.estado;
                    const encargado = tareaIndividual.encargado_tarea;
                    const sprint = tareaIndividual.sprint_tarea;

                    const taskInfo = {
                        id,
                        nombre,
                        prioridad,
                        descripcion,
                        estado,
                        encargado,
                        sprint,
                    };

                    arrayGetOneTask.push(taskInfo);
                });

                resolve(arrayGetOneTask);
            }
        });
    });
};

const editOneTask = (idTarea, changesToEdit) => {
    return new Promise((resolve, reject) => {
        console.log("El id de la tarea a actualizar es: ", idTarea);
        console.log(changesToEdit);

        const consultaEditarTarea = "UPDATE tareas_prueba SET ? WHERE tarea_id = ?";

        conexion.query(consultaEditarTarea, [changesToEdit, idTarea], (err, tareaActualizada) => {
            if (err) {
                console.log("ERROR al actualizar tarea (SERVICE)", err);
            } else {
                console.log("TAREA ACTUALIZADA CORRECTAMENTE");
                resolve(tareaActualizada);
            }
        });
    });
};

const deleteOneTask = (idTask) => {
    return new Promise((resolve, reject) => {
        const consultaEliminarTarea = "DELETE FROM tareas_prueba WHERE tarea_id = ?";

        conexion.query(consultaEliminarTarea, [idTask], (err) => {
            if (err) {
                console.log("Error al eliminar la tarea (SERVICE)");
            } else {
                console.log("TAREA ELIIMINADA CORRECTAMENTE");
                resolve({ mensage: "tarea Eliminada Correctamente" });
            }
        });
    });
};

export {
    mostrarTareas,
    crearTarea,
    getOneTask,
    editOneTask,
    deleteOneTask,
};