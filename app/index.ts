import express from "express";
import cors from "cors";
import Router from "express-promise-router";
//Local modules
import config from "./config/config";
import { corsOptions } from "./middleware/cors";	 		// Middleware function to handle CORS
import { handleOptions } from "./middleware/options" 		// Middleware function to handle OPTIONS requests
import { authenticateToken } from "./middleware/auth-token" // Middleware function to handle JWT authentication


const app = express();
const router = Router();
const PORT = config.get("port");
/* =================
   SERVER SETUP
================== */
app.use(express.json());
app.use(cors(corsOptions));
router.use(handleOptions);
app.use(router);

/* ======
   ROUTES
========*/

// User routes
import { getUsers } from "./routes/get-users";
import { addUser } from "./routes/add-user";
import { checkUser } from "./routes/check-user";
import { deleteUser } from "./routes/delete-user";

router.post("/getUsers",authenticateToken, getUsers);
router.post("/addUser", addUser);
router.post("/checkUser", checkUser);
router.post("/deleteUser",authenticateToken, deleteUser);

//Tasks routes
import { getTasks } from "./routes/get-tasks";
import { addTask } from "./routes/add-task";
import { editTask } from "./routes/edit-task";
import { changeTask } from "./routes/change-task";
import { translateTask } from "./routes/translate-task";
import { deleteTask } from "./routes/delete-task";

router.post("/getTasks",authenticateToken, getTasks);
router.post("/addTask",authenticateToken, addTask);
router.post("/editTask",authenticateToken, editTask);
router.post("/changeTask",authenticateToken, changeTask);
router.post("/translateTask",authenticateToken, translateTask);
router.post("/deleteTask",authenticateToken, deleteTask)

/* =================
   SERVER START
================== */
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
