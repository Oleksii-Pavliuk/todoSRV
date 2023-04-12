import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
import { postgreQuery } from "../db/postgres-connection";

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

	let query: string;
	let params: any[];

	if (name && !description) {
		query = "UPDATE tasks SET name = $1 WHERE id = $2;";
		params = [name, id];
	} else if (description && !name) {
		query = "UPDATE tasks SET description = $1 WHERE id = $2;";
		params = [description, id];
	} else {
		query = "UPDATE tasks SET name = $1, description = $2 WHERE id = $3;";
		params = [name, description, id];
	}

	try {
		await postgreQuery(query, params);
		return res.status(200).send("ok");
	} catch (error) {
		console.error("An error occurred while retrieving data: ", error);
		return res.status(500).send();
	}
}
