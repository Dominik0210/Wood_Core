import express from "express";
import projectsController from "../controllers/projectsController.js"; // Asegúrate de la extensión .js

const router = express.Router();

router
    .get("/", projectsController.consultarTodo)
    .post("/", projectsController.insertar)
    .put("/:id", projectsController.actualizar)
    .delete("/:id", projectsController.eliminar);

export default router;