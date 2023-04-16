import { Request, Response } from "express";
// Local modules
import { db } from "../db/postgres-connection";

/* =================
   ROUTE HANDLER
================== */
export async function editTask(req: Request, res: Response) {
	let name = req.body.name;
	let description = req.body.description;
	let id = req.body.id;
	if (id == undefined) {
		return res.status(400).send();
	}



	try {
		if (name && !description) {
			await db("tasks").update({ name: name }).where({ id: id });
		} else if (description && !name) {
			await db("tasks").update({ description: description }).where({ id: id });
		} else {
			 await db("tasks").update({ name: name, description: description }).where({ id: id });
		}
		return res.status(200).send("ok");
	} catch (error) {
		console.error("An error occurred while retrieving data: ", error);
		return res.status(500).send();
	}
}
