import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
import tareasRoutes from "./routes/tareasRoutes.js";
import proyectosRoutes from "./routes/proyectosRoutes.js";
import { PORT } from "./model/config.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

// Rutas de vistas
const views = [
    { route: "/", file: "index.html" },
    { route: "/dashboard", file: "dashboard.html" },
    { route: "/login", file: "inicio_sesion.html" },
    { route: "/sig-up", file: "registro.html" },
    { route: "/recuperar", file: "recuperar.html" }
];

views.forEach(({ route, file }) => {
    app.get(route, (req, res) => {
        res.sendFile(path.resolve(__dirname, "views", file));
    });
});

// Rutas de API
app.use("/dashboard/tasks", tareasRoutes);
app.use("/dashboard/projects", proyectosRoutes);
app.use("/users", usersRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});