import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/", authController.insertar);

router.route("/:id")
    .get(authController.consultarUno)
    .put(authController.actualizar)
    .delete(authController.eliminar);

export default router;