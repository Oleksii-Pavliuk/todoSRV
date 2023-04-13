import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import Router from "express-promise-router";
//Local modules
import config from "./config/config";
import { postgreQuery } from "./db/postgres-connection";

//Routes
import { getUsers } from "./routes/get-users";
import { addUser } from "./routes/add-user";
import { checkUser } from "./routes/check-user";
import { deleteUser } from "./routes/delete-user";
import { getTasks } from "./routes/get-tasks";
import { addTask } from "./routes/add-task";
import { editTask } from "./routes/edit-task";
import { changeTask } from "./routes/change-task";
import { translateTask } from "./routes/translate-task";

/* =================
   SERVER SETUP
================== */
const app = express();
const router = Router();

//Getting convict vars
const PORT = config.get("port");
const CORS_ORIGIN = config.get("origin");

// Middleware function to handle CORS
const corsOptions: cors.CorsOptions = {
	origin: CORS_ORIGIN as unknown as string,
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Middleware function to handle OPTIONS requests
const handleOptions = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === "OPTIONS") {
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Max-Age": "3600",
		};
		res.header(headers).status(200).send();
	} else {
		next();
	}
};

app.use(express.json());
app.use(cors(corsOptions));
router.use(handleOptions);
app.use(router);

/* ======
   ROUTES
========*/

// USer routes
router.get("/getUsers", getUsers);
router.post("/addUser", addUser);
router.post("/checkUser", checkUser);
router.post("/deleteUser", deleteUser);

//Tasks routes
router.post("/getTasks", getTasks);
router.post("/addTask", addTask);
router.post("/editTask", editTask);
router.post("/changeTask", changeTask);
router.post("/translateTask", translateTask);

/* =================
   SERVER START
================== */
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
