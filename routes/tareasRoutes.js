import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/all", taskController.consultarTodo);
router.post("/create", taskController.insertar);

router.route("/:id")
    .get(taskController.consultarUno)
    .put(taskController.actualizar)
    .delete(taskController.eliminar);

export default router;