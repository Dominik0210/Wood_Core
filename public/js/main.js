let mostrandoTareasProyecto = false;
let proyectoSeleccionado = null;
let mostrandoProyectosId = false;



let tareaSinHacer;
let tareasEnProceso;
let tareasRealizadas;
// menú container dashboard
const linkProyectos = document.getElementById("crearProyectos");
const linkTareas = document.getElementById("crearTareas");
// Código del archivo tareas.js para mostrar las tareas

// Obtener el ID del usuario desde localStorage
const userId = localStorage.getItem("id_usuario");

console.log("ID en localStorage después del login:", localStorage.getItem("id_usuario"));




if (!userId) {
    console.warn("ID de usuario no encontrado en localStorage. Redirigiendo a login...");

} else {
    cargarProyectosId(userId);
}



///////////////////////////////////////////////////////////////////////////////////////////
// FUNCIONALIDAD PARA OBTENER LAS TAREAS DE LA BASE DE DATOS Y MOSTRARLAS EN PANTALLA
// funcion para mostrar las tareas en la pantalla
function mostrarTareas(tareas) {

    if (tareaSinHacer) {
        tareaSinHacer.innerHTML = '';
    } else {
        console.error("Error: tareaSinHacer no está definido.");
        return;
    }

    tareas.forEach(task => {
        const contenedorTarea = document.createElement("div");
        contenedorTarea.classList.add("task", "d-flex", "flex-column", "rounded-top", "me-2", "mb-2");
        contenedorTarea.setAttribute("tarea_id", task.tarea_id);
        contenedorTarea.setAttribute("draggable", true);

        // Parte del head de la tarea
        const containerHeadTask = document.createElement("div");
        containerHeadTask.classList.add("container-heading-task", "d-flex", "w-100", "align-items-center");
        const imgEncargado = document.createElement("img");
        imgEncargado.classList.add("rounded-circle", "nav__img--avatar", "ms-2");
        imgEncargado.setAttribute("src", "../img/persona06.jpg");
        const containerNombre = document.createElement("div");
        containerNombre.classList.add("d-flex", "flex-column", "ms-1", "align-items-start", "w-50");
        const nombreEncargado = document.createElement("p");
        nombreEncargado.classList.add("mb-0", "pt-2", "fw-bold");
        nombreEncargado.innerText = task.encargado;
        const legendEncargado = document.createElement("p");
        legendEncargado.classList.add("t-encargado");
        legendEncargado.innerText = "Encargado";
        const containerSprintTask = document.createElement("div");
        containerSprintTask.classList.add("d-flex", "flex-column", "align-items-end", "me-3", "w-50");
        const legendFechaTarea = document.createElement("p");
        legendFechaTarea.classList.add("mb-0", "mt-2", "t-fecha");
        legendFechaTarea.innerText = "Fecha límite";
        const sprintTarea = document.createElement("p");
        sprintTarea.classList.add("fecha", "me-1");
        const fecha = new Date(task.sprint_task);
        const sprintFormateado = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        sprintTarea.innerText = sprintFormateado;
        const botonEditarTarea = document.createElement("button");
        botonEditarTarea.classList.add("btn-abrir-form-edit-tasks", "align-self-start");
        const iconEditarTarea = document.createElement("img");
        iconEditarTarea.classList.add("edit-task-icon");
        iconEditarTarea.setAttribute("src", "../img/edit.png");

        // Parte del contenido de la tarea
        const containerContenidoTarea = document.createElement("div");
        containerContenidoTarea.classList.add("desc-task", "d-flex", "flex-column", "justify-content-center", "ms-2", "mt-2");
        const containerNombreTarea = document.createElement("div");
        containerNombreTarea.classList.add("d-flex", "mb-2", "mt-2");
        const nombreTarea = document.createElement("p");
        nombreTarea.classList.add("mb-0", "fw-bold", "fs-5", "mt-3", "name-task");
        nombreTarea.innerText = task.nombre_task;
        const estadoActividad = document.createElement("p");
        estadoActividad.classList.add("mb-0", "text-wrap", "bg-success", "rounded-pill", "text-center", "state", "ms-1", "align-self-center", "me-1", "flex-shrink-0");
        estadoActividad.innerText = "Activa";
        const descripcionTarea = document.createElement("p");
        descripcionTarea.classList.add("mb-2");
        const boldTextDescripcion = document.createElement("b");
        boldTextDescripcion.innerText = "Descripción: ";
        descripcionTarea.innerHTML = task.des_tasks;
        const containerPrioridad = document.createElement("div");
        containerPrioridad.classList.add("container-prioridad", "d-flex");
        const legendPrioridadTarea = document.createElement("p");
        legendPrioridadTarea.classList.add("mb-1", "me-2");
        const boldTextPrioridad = document.createElement("b");
        boldTextPrioridad.innerText = "Prioridad:";
        const category = document.createElement("p");
        category.classList.add("category", "text-wrap", "w-50", "rounded-pill", "text-center", "mb-0");
        category.innerText = task.prioridad;

        // Parte del progreso de los estados de la tarea
        const containerStates = document.createElement("div");
        containerStates.classList.add("states", "d-flex", "justify-content-between", "align-items-end", "ms-3", "mt-3");
        const firstState = document.createElement("div");
        firstState.classList.add("first-state", "rounded-pill", "w-50", "me-1");
        const secondtState = document.createElement("div");
        secondtState.classList.add("second-state", "rounded-pill", "w-50", "me-1");
        const thirdtState = document.createElement("div");
        thirdtState.classList.add("third-state", "rounded-pill", "w-50");

        // Agregando los elementos al DOM
        containerHeadTask.appendChild(imgEncargado);
        containerHeadTask.appendChild(containerNombre);
        containerNombre.appendChild(nombreEncargado);
        containerNombre.appendChild(legendEncargado);
        containerHeadTask.appendChild(containerSprintTask);
        containerSprintTask.appendChild(legendFechaTarea);
        containerSprintTask.appendChild(sprintTarea);
        containerHeadTask.appendChild(botonEditarTarea);
        botonEditarTarea.appendChild(iconEditarTarea);

        containerContenidoTarea.appendChild(containerNombreTarea);
        containerNombreTarea.appendChild(nombreTarea);
        containerNombreTarea.appendChild(estadoActividad);
        descripcionTarea.insertAdjacentElement("afterbegin", boldTextDescripcion);
        containerContenidoTarea.appendChild(descripcionTarea);
        containerContenidoTarea.appendChild(containerPrioridad);
        legendPrioridadTarea.appendChild(boldTextPrioridad);
        containerPrioridad.appendChild(legendPrioridadTarea);
        containerPrioridad.appendChild(category);

        containerStates.appendChild(firstState);
        containerStates.appendChild(secondtState);
        containerStates.appendChild(thirdtState);

        contenedorTarea.appendChild(containerHeadTask);
        contenedorTarea.appendChild(containerContenidoTarea);
        contenedorTarea.appendChild(containerStates);

        tareaSinHacer.appendChild(contenedorTarea);
    });

    obtenerYCrearEventosTareas();
    aplicarPrimerEstado();
    abrirModalEditTasks();
}



// Cargar todas las tareas al cargar la página 
document.addEventListener("DOMContentLoaded", function () {
    const linkTareas = document.getElementById("crearTareas");

    if (linkTareas) {
        linkTareas.addEventListener("click", function () {
            fetchTareas();
        });
    } else {
        console.warn("Elemento 'crearTareas' no encontrado en el DOM.");
    }
});

// Función para cargar todas las tareas
async function fetchTareas() {
    try {
        mostrandoTareasProyecto = false;
        proyectoSeleccionado = null;

        const res = await fetch("http://localhost:8080/tasks");
        const tareas = await res.json();
        mostrarTareas(tareas);
    } catch (err) {
        console.log("error al cargar las tareas: ", err);
    }
}

// Función para cargar tareas de un proyecto específico
async function cargarTareasProyecto(idProyecto) {
    try {
        mostrandoTareasProyecto = true;
        proyectoSeleccionado = idProyecto;
        tareaSinHacer.innerHTML = '';
        const response = await fetch(`http://localhost:8080/tasks/proyecto/${idProyecto}`);
        const tareas = await response.json();
        console.log(tareas);
        mostrarTareas(tareas);
    } catch (error) {
        console.log("error al cargar las tareas: ", error);
    }
}


// funcion para cargar proyectos de un id especifico
async function cargarProyectosId(userId) {
    if (!userId || isNaN(userId)) {
        console.error("ID de usuario inválido:", userId);
        return;
    }

    console.log("Enviando solicitud para usuario ID:", userId);

    try {
        const response = await fetch(`http://localhost:8080/project/mis-proyectos/${userId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const proyectos = await response.json();
        if (proyectos.length === 0) {
            console.warn("No se encontraron proyectos para este usuario.");
        }

        mostrarProyectos(proyectos);
    } catch (error) {
        console.error("Error al cargar proyectos del usuario:", error);
        containerDashboardProyectos.innerHTML = "<p>Error al cargar proyectos.</p>";
    }
}


///////////////////////////////////////////////////////////////////////////////////////////
// Funcionalidad para la partel nav y visualización de los proyectos

const verTareas = document.getElementById("verTareas");
const verProyectos = document.getElementById("verProyectos");
const containerDashboard = document.getElementById("container-dashboard");
const containerDashboardProyectos = document.getElementById("container-dashboard-projects");
const titleDashboard = document.getElementById("title-dashboard");
// const stringClasesContainerDashboard = containerDashboard.className;
// const arrayClasesContainerDashboard = stringClasesContainerDashboard.split(" ");
// const claseDFlex = arrayClasesContainerDashboard.includes("d-flex");



// contenedor principal de cada proyecto

const containerProject = document.createElement("div");

const botonEditarProyecto = document.createElement("button");



// contenedor para el img del aside
const containerImgCover = document.createElement("div");
const content = document.createElement("div");
const textImgCover = document.createElement("a");
// container par el contenedor del progreso, nombre y descripción
const containerInfoProject = document.createElement("div");
// container de los avatars de las personas 
const containerEquipo = document.createElement("div");

// container de avatar individual
const containerPersona = document.createElement("div");
const imgPersona = document.createElement("img");
const legendPersona = document.createElement("p");

// container para la descripción, progreso, nombre y estado
const containerMainInfo = document.createElement("div");
// container para el nobre y estado del proyecto
const containerNameProject = document.createElement("div");
const nameProject = document.createElement("p");
const stateProject = document.createElement("p");



// container para el progreso de cada proyecto
const containerProgressProject = document.createElement("div");
const legendProgress = document.createElement("p");
const progress = document.createElement("div");




// FUNCIONALIDAD PARA OBTENER LOS PROYECTOS DE LA BASE DE DATOS Y MOSTRARLAS EN PANTALLA
function limpiarProyectos() {
    containerDashboardProyectos.innerHTML = "";
}

async function mostrarProyectos(proyectos) {
    limpiarProyectos();


    proyectos.forEach(proyecto => {
        console.log("Esta obteniendo:", proyecto);

        const id_proyecto = proyecto.id_proyecto;
        const nombre_proyecto = proyecto.nombre_proyecto;
        const prioridad = proyecto.prioridad;
        const sprint_inicio = proyecto.sprint_inicio;
        const sprint_final = proyecto.sprint_final;
        const encargado_proyecto = proyecto.encargado_proyecto;

        // Contenedor principal del proyecto
        const containerProject = document.createElement("div");
        containerProject.classList.add("proyecto", "container-project", "d-flex", "ms-4", "mt-3", "position-relative");
        containerProject.setAttribute("id_proyecto", id_proyecto);

        containerProject.innerHTML = `
                <div class="container-img-cover me-3">
                    <img class="img-fluid rounded">
                    <a href="#" class="text-img-cover text-white">Ver detalles del proyecto</a>
                </div>
                <div class="container-info-project flex-grow-1">
                    <div class="d-flex align-items-center p-2">
                        <h4 class="name-project fw-bold me-2">${proyecto.nombre_proyecto}</h4>
                        <span class="state-project bg-success rounded-pill text-white px-2 py-1">Activo</span>
                    </div>
                </div>
            `;

        // Contenedor de la imagen de portada
        const containerImgCover = document.createElement("div");
        containerImgCover.classList.add("container-img-cover", "me-3");

        // Imagen de portada
        const imgCover = document.createElement("img");
        imgCover.classList.add("img-fluid", "rounded");

        // Enlace de "Ver detalles del proyecto"
        const textImgCover = document.createElement("a");
        textImgCover.classList.add("text-img-cover", "text-white");
        textImgCover.href = "#";
        textImgCover.innerText = "Ver detalles del proyecto";

        // Agregar evento para cambiar al dashboard de tareas
        textImgCover.addEventListener("click", function (e) {
            e.preventDefault();

            // Guardar el ID del proyecto seleccionado
            proyectoSeleccionado = id_proyecto;

            titleDashboard.innerText = `Proyecto: ${nombre_proyecto}`;
            containerDashboard.style.display = "flex";
            containerDashboardProyectos.style.display = "none";

            // Vaciar el contenedor de tareas antes de cargar nuevas
            const taskContainer = document.getElementById("container-dashboard");
            taskContainer.innerHTML = "";

            taskContainer.innerHTML = `
                        <div>
                            <h4 class="text-center title-tasks"> Tareas sin hacer</h4>
                            <div class="container-task sinHacer me-2 ms-3 p-1" id="sinHacer">
                                <button class="btn-task abrir-form">
                                    <img src="../img/svg/plus-square.svg" class="icon-btn">
                                    Agregar Tarea
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 class="text-center title-tasks">Tareas en Proceso</h4>
                            <div class="container-task Haciendo me-2 d-flex flex-column  p-1" id="Haciendo">
                                <button class="btn-task abrir-form">
                                    <img src="../img/svg/plus-square.svg" class="icon-btn">
                                    Agregar Tarea
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 class="text-center title-tasks">Tareas Realizadas</h4>
                            <div class="container-task taskHecho me-2 p-1" id="taskHecho">
                                <button class="btn-task abrir-form">
                                    <img src="../img/svg/plus-square.svg" class="icon-btn">
                                    Agregar Tarea
                                </button>
                            </div>
                        </div>
                    `;


            // Definir tareaSinHacer aquí, después de que el HTML ha sido creado
            tareaSinHacer = document.getElementById("sinHacer");
            tareasEnProceso = document.getElementById("Haciendo");
            tareasRealizadas = document.getElementById("taskHecho");

            const abrirModalForm = document.querySelectorAll(".abrir-form");
            const cerrarModalForm = document.querySelectorAll("#cerrar-form");
            const modalForm = document.querySelectorAll("#modal-form")

            cerrarModalForm.forEach(elemento => {
                modalForm.forEach(form => {
                    const Formtask = form;

                    abrirModalForm.forEach(elemento => {
                        elemento.addEventListener("click", () => {
                            Formtask.showModal();
                        });
                    });

                    elemento.addEventListener("click", () => {
                        Formtask.close()
                    });
                });
            });

            // Cargar solo las tareas asociadas a este proyecto
            cargarTareasProyecto(id_proyecto);
        });

        // Agregar imagen y enlace al contenedor de imagen
        containerImgCover.appendChild(imgCover);
        containerImgCover.appendChild(textImgCover);

        // Contenedor de información del proyecto
        const containerInfoProject = document.createElement("div");
        containerInfoProject.classList.add("container-info-project", "flex-grow-1");

        // Contenedor para nombre y estado
        const containerNameState = document.createElement("div");
        containerNameState.classList.add("d-flex", "align-items-center", "p-2");

        // Nombre del proyecto
        const nameProject = document.createElement("h4");
        nameProject.classList.add("name-project", "fw-bold", "me-2");
        nameProject.innerText = nombre_proyecto;

        // Estado del proyecto
        const stateProject = document.createElement("span");
        stateProject.classList.add("state-project", "bg-success", "rounded-pill", "text-white", "px-2", "py-1");
        stateProject.innerText = "Activo";

        // Agregar nombre y estado al contenedor de información
        containerNameState.appendChild(nameProject);
        containerNameState.appendChild(stateProject);
        containerInfoProject.appendChild(containerNameState);

        // Prioridad del proyecto
        const prioridadProject = document.createElement("p");
        prioridadProject.classList.add("prioridad-project", "text-white");
        prioridadProject.innerText = "Prioridad: " + prioridad;

        // Sprint inicio
        const sprintInicio = document.createElement("p");
        sprintInicio.classList.add("sprint-inicio", "text-white");
        sprintInicio.innerText = "Fecha Inicial: " + sprint_inicio;

        // Sprint final
        const sprintFinal = document.createElement("p");
        sprintFinal.classList.add("sprint-final", "text-white");
        sprintFinal.innerText = "Fecha Final: " + sprint_final;

        // Encargado del proyecto
        const encargadoProject = document.createElement("p");
        encargadoProject.classList.add("encargado-project", "text-white");
        encargadoProject.innerText = "Encargado: " + encargado_proyecto;

        //  Botón de editar
        const botonEditarProyecto = document.createElement("button");
        botonEditarProyecto.classList.add("btn-abrir-edit-project", "mt-2", "position-absolute", "top-0", "end-0");

        // Ícono dentro del botón
        const iconEditarProyecto = document.createElement("img");
        iconEditarProyecto.classList.add("edit-project-icon");
        iconEditarProyecto.setAttribute("src", "../img/edit.png");

        botonEditarProyecto.appendChild(iconEditarProyecto);

        // Agregar prioridad y encargado al contenedor de información
        containerInfoProject.appendChild(botonEditarProyecto);
        botonEditarProyecto.appendChild(iconEditarProyecto);
        containerInfoProject.appendChild(prioridadProject);
        containerInfoProject.appendChild(sprintInicio);
        containerInfoProject.appendChild(sprintFinal);
        containerInfoProject.appendChild(encargadoProject);

        // Agregar contenedores al contenedor principal
        containerProject.appendChild(containerImgCover);
        containerProject.appendChild(containerInfoProject);

        // Agregar el proyecto al dashboard
        containerDashboardProyectos.appendChild(containerProject);
        abrirModalEditProjects(proyecto.id_proyecto);
    });

}




///////////////////////////////////////////////////////////////////////////////////////////
// FUNCIONALIDAD PARA DEFINIR EL FONDO DEL PRIMER ESTADO DE CADA TAREA
function aplicarPrimerEstado() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(tarea => {

        // para los estados de cada una de las tareas
        const firstState = tarea.children[2].children[0];
        const secondState = tarea.children[2].children[1];
        const thirdState = tarea.children[2].children[2];

        firstState.classList.add("bg-primary");
    })


}

///////////////////////////////////////////////////////////////////////////////////////////
// FUNCIONALIDAD PARA CREAR EL EFECTO DE DRAG AND DROP EN CADA UNA DE LAS TAREAS

async function obtenerYCrearEventosTareas() {
    try {
        const tareas = document.querySelectorAll(".task");

        const arrayTareas = Array.from(tareas);

        // Pruba de código
        // console.log(arrayTareas);

        // total de tareas
        const tareasTotales = arrayTareas.length;

        //  Asignando el data id a cada una de las tareas del arrayTareas
        arrayTareas.forEach((tarea, indice) => {
            tarea.id = indice;
        })

        // Código para hacer que las tareas sean drag and drop 
        // para cuando inicia el arrastre en cada uno de los contenedores y para indentificar que tarea se agrega a qué container
        tareaSinHacer.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("id", e.target.id);
        })


        tareasEnProceso.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("id", e.target.id);

        })

        tareasRealizadas.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("id", e.target.id);

        })


        //  para los eventos dragover de los contenedores
        tareaSinHacer.addEventListener("dragover", function (e) {
            e.preventDefault();
        })
        tareasEnProceso.addEventListener("dragover", function (e) {
            e.preventDefault();
        })
        tareasRealizadas.addEventListener("dragover", function (e) {
            e.preventDefault();
        })


        // para los eventos drop de los contenedores
        tareaSinHacer.addEventListener("drop", function (e) {
            e.stopImmediatePropagation();

            const id = e.dataTransfer.getData("id");
            e.target.appendChild(document.getElementById(id));
            // console.log("drag and drop",id);
            estadosTareas()
        })

        tareasEnProceso.addEventListener("drop", function (e) {
            e.stopImmediatePropagation();

            const id = e.dataTransfer.getData("id");
            e.target.appendChild(document.getElementById(id));
            // console.log(id);
            estadosTareas()
        })

        tareasRealizadas.addEventListener("drop", function (e) {
            e.stopImmediatePropagation();

            const id = e.dataTransfer.getData("id");
            e.target.appendChild(document.getElementById(id));
            // console.log(id);
            estadosTareas()
        })




    } catch (err) {
        console.log(err);
    }
}


///////////////////////////////////////////////////////////////////////////////////////////
// FUNCIONALIDAD DE LA BARRA DE PROGRESO DE LAS TAREAS

async function estadosTareas() {
    const tasks = document.querySelectorAll(".task");
    const containerTareasSinHacer = document.querySelector(".sinHacer");
    const containerTareasEnProceso = document.querySelector(".Haciendo");
    const containerTareasRealizadas = document.querySelector(".taskHecho");


    const hijosContainerTareasSinHacer = containerTareasSinHacer.children;
    const hijosContainerTareasEnProceso = containerTareasEnProceso.children;
    const hijosContainerTareasRealizadas = containerTareasRealizadas.children;


    // console.log(hijosContainerTareasSinHacer);
    // console.log(hijosContainerTareasEnProceso);
    // console.log(hijosContainerTareasRealizadas);

    tasks.forEach((tarea, indice) => {
        // Prueba de código para recorrer cada tarea
        // console.log(tarea)

        // Adquirir los elementos padre y su clase
        const elementoPadre = tarea.parentNode;
        const idElementoPadre = elementoPadre.id;

        // prueba para ver el id del elemento padre de cada tarea
        // console.log(idElementoPadre);

        // para los estados de cada una de las tareas
        const firstState = tarea.children[2].children[0];
        const secondState = tarea.children[2].children[1];
        const thirdState = tarea.children[2].children[2];



        // Hacer la validación para aplicar el fondo a cada uno de los estados en base a si contiene o no la clase "bg-primary";
        //para las clases de cada una de las clases de los estados de la tarea
        const stringClasesFirstState = firstState.className;
        const stringClasesSecondtState = secondState.className;
        const stringClasesThirdtState = thirdState.className;
        //conversión de las clases de los estados a array
        const arrayClasesFirstState = stringClasesFirstState.split(" ");
        const arrayClasesSecondState = stringClasesSecondtState.split(" ");
        const arrayClasesThirdState = stringClasesThirdtState.split(" ");
        // Para verificar que existe la clase dentro del array de clases de cada uno de los estados
        const claseBgPrimaryFirstState = arrayClasesFirstState.includes("bg-primary");
        const claseBgPrimarySecondState = arrayClasesSecondState.includes("bg-primary");
        const claseBgPrimaryThirdState = arrayClasesThirdState.includes("bg-primary");


        // console.log(getComputedStyle(firstState).getPropertyValue("background-color"))
        console.log(idElementoPadre === "sinHacer");


        // condicional para las tareas que se encuentren en el primer elemento padre (Tareas sin hacer)
        if (idElementoPadre === "sinHacer" && claseBgPrimarySecondState && claseBgPrimaryThirdState) {

            secondState.classList.remove("bg-primary");
            thirdState.classList.remove("bg-primary");

        } else if (idElementoPadre === "sinHacer" && claseBgPrimaryThirdState) {

            thirdState.classList.remove("bg-primary");

        } else if (idElementoPadre === "sinHacer" && claseBgPrimarySecondState) {

            secondState.classList.remove("bg-primary");

        } else if (idElementoPadre === "Haciendo" && claseBgPrimaryThirdState) {

            thirdState.classList.remove("bg-primary");
            console.log("elemento padre: Tareas en proceso");


        } else if (idElementoPadre === "Haciendo" && claseBgPrimarySecondState === false) {

            secondState.classList.add("bg-primary");


        } else if (idElementoPadre === "taskHecho" && claseBgPrimarySecondState === false && claseBgPrimaryThirdState === false) {

            secondState.classList.add("bg-primary");
            thirdState.classList.add("bg-primary");


        } else if (idElementoPadre === "taskHecho") {

            thirdState.classList.add("bg-primary");

        }
    })

    // Prueba de código para verificar la obtención de las tareas
    // console.log(tasks)
}



///////////////////////////////////////////////////////////////////////////////////////////
// Funcionalidad pra el form de crear tareas

const abrirModalForm = document.querySelectorAll(".abrir-form");
const cerrarModalForm = document.querySelectorAll("#cerrar-form");
const modalForm = document.querySelectorAll("#modal-form")

cerrarModalForm.forEach(elemento => {
    modalForm.forEach(form => {
        const Formtask = form;

        abrirModalForm.forEach(elemento => {
            elemento.addEventListener("click", () => {
                Formtask.showModal();
            })
        })

        elemento.addEventListener("click", () => {
            Formtask.close()
        })
    })
})


// para enviar los datos al backend
modalForm.forEach(form => {
    const formCreatTask = form;


    formCreatTask.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Verifica si los campos existen y están obteniendo valores correctos
        // console.log(document.querySelector('#nombre_task').value);
        // console.log(document.querySelector('#prioridad').value);
        // console.log(document.querySelector('#des_tasks').value);
        // console.log(document.querySelector('#encargado').value);
        // console.log(document.querySelector('#sprint_task').value);

        if (!proyectoSeleccionado) {
            alert("Por favor, selecciona un proyecto antes de crear una tarea.");
            return;
        }

        const idProyecto = proyectoSeleccionado;
        console.log("id proyecto tarea:", idProyecto);

        const res = await fetch("http://localhost:8080/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskEntity: {
                    nombre_task: document.querySelector('#nombre_task').value,
                    prioridad: document.querySelector('#prioridad').value,
                    des_tasks: document.querySelector('#des_tasks').value,
                    encargado: document.querySelector('#encargado').value,
                    sprint_task: document.querySelector('#sprint_task').value,
                },
                idProyecto: idProyecto
            })
        });

        console.log('Respuesta:', res);
    });
});


//Funcionalidad para abir y cerrar el form de editar tareas

function abrirModalEditTasks() {
    // Obtener los botones para abrir y cerrar cada modal
    const abrirModalFormEditTasks = document.querySelectorAll(".btn-abrir-form-edit-tasks");
    const cerrarModalFormEditTasks = document.querySelectorAll("#close-edit-form");
    const modalEditTaskForm = document.querySelectorAll("#modal-edit-task-form");
    const formEditTask = document.querySelectorAll(".form-edit-tasks");

    // Crear las variables para guardar los inputs y los elementos del formulario
    const inputIdTask = formEditTask[0].querySelector("input[name='id_task']");
    const inputNombreTarea = formEditTask[0].querySelector("input[name='nombre_task']");
    const inputDescTarea = formEditTask[0].querySelector("textarea[name='des_tasks']");
    const inputEncargadoTarea = formEditTask[0].querySelector("input[name='encargado']");
    const inputSelectPrioridad = formEditTask[0].querySelector("select[name='prioridad']");
    const inputSprint = formEditTask[0].querySelector("input[name= 'sprint_task']");
    // const inputIdTaskProject = formEditTask[0].querySelector("input[name='id_proyecto']") 
    const optionsSelectPrioridad = inputSelectPrioridad.children;


    abrirModalFormEditTasks.forEach(button => {
        modalEditTaskForm.forEach(form => {


            cerrarModalFormEditTasks.forEach(button => {
                button.addEventListener("click", () => {
                    form.close();
                })
            })

            // Al hacer clic en el botón de abrir modal de edición
            button.addEventListener("click", async (e) => {
                e.preventDefault();

                // Obtener el ID de la tarea
                const idTarea = e.target.closest('.task').getAttribute('tarea_id');
                console.log("ID de la tarea:", idTarea);



                try {
                    // Hacer la llamada al backend para obtener los datos de la tarea
                    const response = await fetch(`http://localhost:8080/tasks/${idTarea}`);

                    if (!response.ok) {
                        console.log("Error al obtener la tarea");
                        return;
                    }

                    const result = await response.json();
                    // console.log(result);
                    if (!result) {
                        console.log("Error en la respuesta:", result);
                        return;
                    }

                    // Asignar los valores de la tarea al formulario
                    const tareaAActualizar = result;

                    // Llenar los campos del formulario con los datos de la tarea
                    inputIdTask.value = idTarea;
                    inputNombreTarea.value = tareaAActualizar.nombre_task;
                    inputDescTarea.value = tareaAActualizar.des_tasks;
                    inputEncargadoTarea.value = tareaAActualizar.encargado;
                    inputSprint.value = tareaAActualizar.sprint_task;


                    // // Seleccionar la prioridad correcta en el select
                    for (const option of optionsSelectPrioridad) {
                        if (option.value === tareaAActualizar.prioridad) {
                            option.selected = true;
                        }
                    }

                    // Mostrar el modal
                    form.showModal();

                } catch (err) {
                    console.error("ERROR: ", err);
                }
            });
        });
    });

    // Funcionalidad para enviar los valores actualizados al backend
    formEditTask.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const idTarea = e.target['id_task'].value;
            console.log("ID de la tarea:", idTarea);

            if (isNaN(idTarea)) {
                console.error("El id de la tarea no es válido");
                return;
            }

            const updatedTask = {
                tarea_id: e.target['id_task'].value,
                nombre_task: e.target['nombre_task'].value,
                prioridad: e.target['prioridad'].value,
                des_tasks: e.target['des_tasks'].value,
                encargado: e.target['encargado'].value,
                sprint_task: e.target['sprint_task'].value
            };
            console.log(updatedTask);

            try {
                const response = await fetch(`http://localhost:8080/tasks/${idTarea}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedTask)
                });

                if (response.ok) {
                    alert("Tarea actualizada con éxito");
                    location.reload();  // Recargar la página para reflejar los cambios
                } else {
                    console.log("Error al actualizar la tarea");
                }

            } catch (err) {
                console.error("Error al enviar los datos:", err);
            }
        });
    });

    // Funcionalidad para eliminar la tarea seleccionada
    const buttonDeleteTask = document.getElementById("delete-task");

    buttonDeleteTask.addEventListener("click", async (e) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            const idTarea = document.querySelector("input[name='id_task']").value;

            if (!idTarea) {
                console.error("No se encontró un ID de tarea válido.");
                return;
            }

            const result = await fetch(`http://localhost:8080/tasks/${idTarea}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (result.ok) {
                alert("Tarea eliminada con éxito");
                location.reload();
            } else {
                console.log("ERROR AL ELIMINAR LA TAREA");
            }
        }
    });
}


// Funcionalidad para abrir y cerrar el formulario de creación de proyectos
const abrirModalFormProject = document.getElementById("abrir-form-proyecto");
const cerrarModalFormProject = document.getElementById("cerrar-form-proyecto");
const modalFormProject = document.getElementById("modal-form-project");
const formProyecto = document.querySelector("#form-project");

if (abrirModalFormProject && cerrarModalFormProject && modalFormProject) {
    abrirModalFormProject.addEventListener("click", () => modalFormProject.showModal());
    cerrarModalFormProject.addEventListener("click", () => modalFormProject.close());
}

// Capturar el evento de envío del formulario
if (formProyecto) {
    formProyecto.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.querySelector("#nombre_proyecto").value.trim();
        const prioridad = document.querySelector("#prioridad").value;
        const sprintInicio = document.querySelector("#Sprint_inicio").value;
        const sprintFinal = document.querySelector("#Sprint_final").value;
        const encargado = document.querySelector("#encargado_proyecto").value;

        // Obtener el ID del usuario desde localStorage
        const usuarioId = localStorage.getItem("userId");

        if (!usuarioId) {
            Swal.fire("Error", "No se encontró el usuario. Inicia sesión nuevamente.", "error");
            return;
        }

        try {
            // 🔹 1. Verificar si el proyecto ya existe antes de enviarlo
            const checkResponse = await fetch(`http://localhost:8080/project/mis-proyectos/${usuarioId}`);
            if (!checkResponse.ok) throw new Error("No se pudo verificar los proyectos existentes.");

            const proyectos = await checkResponse.json();
            const proyectoExistente = proyectos.some(p => p.nombre_proyecto.toLowerCase() === nombre.toLowerCase());

            if (proyectoExistente) {
                Swal.fire("Error", "Ya tienes un proyecto con este nombre.", "warning");
                return;
            }

            // 🔹 2. Si el proyecto no existe, proceder a enviarlo al backend
            const res = await fetch(`http://localhost:8080/project/usuario/${usuarioId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre_proyecto: nombre,
                    prioridad,
                    sprint_inicio: sprintInicio,
                    sprint_final: sprintFinal,
                    encargado_proyecto: encargado,
                    usuario: { id: usuarioId }
                })
            });

            if (res.ok) {
                Swal.fire({
                    title: "Éxito",
                    text: "Proyecto creado correctamente.",
                    icon: "success"
                }).then(() => {
                    cargarProyectosId(usuarioId);
                    modalFormProject.close();
                });
            } else {
                throw new Error("No se pudo crear el proyecto.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            Swal.fire("Error", "Hubo un problema con la solicitud.", "error");
        }
    });
}

// 🔹 Funcionalidad para abrir el modal de edición de proyectos
function abrirModalEditProjects() {
    const abrirModalFormEditProjects = document.querySelectorAll(".btn-abrir-edit-project");
    const cerrarModalFormEditProject = document.getElementById("cerrar-form-proyecto-edit");
    const modalEditProject = document.getElementById("modal-edit-project-form");
    const formEditProject = document.querySelector(".form-edit-project");

    if (!modalEditProject || !formEditProject) return;

    const inputIdProject = modalEditProject.querySelector("input[name='id_proyecto']");
    const inputNombreProject = modalEditProject.querySelector("input[name='nombre_proyecto']");
    const inputSelectPrioridadProject = modalEditProject.querySelector("select[name='Prioridad']");
    const inputSprintInicio = modalEditProject.querySelector("input[name='Sprint_inicio']");
    const inputSprintFinal = modalEditProject.querySelector("input[name='Sprint_final']");
    const inputEncargadoProyecto = modalEditProject.querySelector("input[name='encargado_proyecto']");

    abrirModalFormEditProjects.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            const idProject = button.dataset.id;
            console.log("ID del proyecto a editar:", idProject);

            try {
                const response = await fetch(`http://localhost:8080/project/${idProject}`);
                if (!response.ok) throw new Error("Error al obtener el proyecto.");

                const proyectoAActualizar = await response.json();

                inputIdProject.value = idProject;
                inputNombreProject.value = proyectoAActualizar.nombre_proyecto;
                inputSprintInicio.value = proyectoAActualizar.sprint_inicio;
                inputSprintFinal.value = proyectoAActualizar.sprint_final;
                inputEncargadoProyecto.value = proyectoAActualizar.encargado_proyecto;

                Array.from(inputSelectPrioridadProject.options).forEach(option => {
                    option.selected = (option.value === proyectoAActualizar.prioridad);
                });

                const modal = new bootstrap.Modal(modalEditProject);
                modal.show();
            } catch (err) {
                console.error("ERROR: ", err);
            }
        });
    });

    if (cerrarModalFormEditProject) {
        cerrarModalFormEditProject.addEventListener("click", () => {
            const modalInstance = bootstrap.Modal.getInstance(modalEditProject);
            modalInstance?.hide();
        });
    }

    formEditProject.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idProject = inputIdProject.value;

        if (!idProject) {
            Swal.fire("Error", "ID de proyecto no válido.", "error");
            return;
        }

        const updatedProject = {
            id_proyecto: idProject,
            nombre_proyecto: inputNombreProject.value,
            prioridad: inputSelectPrioridadProject.value,
            sprint_inicio: inputSprintInicio.value,
            sprint_final: inputSprintFinal.value,
            encargado_proyecto: inputEncargadoProyecto.value,
        };

        try {
            const response = await fetch(`http://localhost:8080/project/${idProject}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProject)
            });

            if (response.ok) {
                Swal.fire({
                    title: "Éxito",
                    text: "Proyecto actualizado correctamente.",
                    icon: "success"
                }).then(() => location.reload());
            } else {
                throw new Error("Error al actualizar el proyecto.");
            }

        } catch (err) {
            console.error("Error al enviar los datos:", err);
            Swal.fire("Error", "Hubo un problema con la solicitud.", "error");
        }
    });
}

// 🔹 Funcionalidad para eliminar proyectos con alerta de confirmación
document.getElementById("delete-project").addEventListener("click", async () => {
    const idProject = document.querySelector("input[name='id_proyecto']").value;
    if (!idProject) return;

    const confirmDelete = await Swal.fire({
        title: "¿Eliminar Proyecto?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    });

    if (confirmDelete.isConfirmed) {
        try {
            const result = await fetch(`http://localhost:8080/project/${idProject}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (result.ok) {
                Swal.fire("Eliminado", "El proyecto fue eliminado.", "success").then(() => location.reload());
            } else {
                throw new Error("Error al eliminar el proyecto.");
            }
        } catch (err) {
            console.error("Error al eliminar proyecto:", err);
            Swal.fire("Error", "No se pudo eliminar el proyecto.", "error");
        }
    }
});




// Inicializar eventos del dashboard
document.addEventListener("DOMContentLoaded", function () {
    // Mostrar proyectos por defecto al cargar la página
    containerDashboardProyectos.style.display = "block";
    containerDashboard.style.display = "none";
    titleDashboard.innerText = "Tus Proyectos";
    cargarProyectosId(userId);
});

verProyectos.addEventListener("click", function (e) {
    titleDashboard.innerText = "Proyectos";
    containerDashboard.style.display = "none";
    containerDashboardProyectos.style.display = "block";
    cargarProyectosId(userId);
});

verTareas.addEventListener("click", function () {
    titleDashboard.innerText = "Tareas";
    containerDashboard.style.display = "flex";
    containerDashboardProyectos.style.display = "none";
});

//Funcionalidad de reporte en pdf
document.getElementById('generarReporte').addEventListener('click', () => {
    fetch('http://localhost:8080/report', {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                return response.blob(); // Obtén el archivo como un blob
            } else {
                throw new Error('Error al generar el reporte');
            }
        })
        .then(blob => {
            // Crea una URL para descargar el archivo
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo generar el reporte');
        });
});







console.log("Js funcionando")