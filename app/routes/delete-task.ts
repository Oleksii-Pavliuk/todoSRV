import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
import { db} from "../db/postgres-connection";

/* =================
   ROUTE HANDLER
================== */
export async function deleteTask(req: Request, res: Response) {
	let id = req.body.id;
	if (id == undefined) {
		return res.status(400).send();
	}

	try {		
		await db("tasks")
		.update({
		deleted: true
		})
		.where("id", id);
		return res.status(200).send("ok");
	} catch (error) {
		console.error("An error occurred while retrieving data: ", error);
		return res.status(500).send();
	}
}
