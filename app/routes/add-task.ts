import { Request, Response } from "express";

// Local modules
import { User } from "../middleware/gen-token"
import {db} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function addTask(req: Request, res : Response) {

	let user: User = req.body.tokenUser
	let name = req.body.name;
	let description = req.body.description;
    let username = req.body.username;
	if (username == undefined || name == undefined || description == undefined || user.username !== username) {
		return res.status(400).send();
	}
  
	const insertStmt = db("tasks").insert({ "name": name,"description": description,"username": username });

	try {
		const rows = await insertStmt;
		console.log("Data extracted, sending");
		return res.status(200).send({ data: rows });
	  } catch (error) {
		console.error("An error occurred while retrieving data: ", error);
		return res.status(500).send();
	  }
	}
