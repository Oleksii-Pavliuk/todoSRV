import { Request, Response } from "express";
import { User} from "../middleware/auth-token"
// Local modules
import {db} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function getTasks(req: Request, res : Response) {

	let user: User = req.body.tokenUser 
	let username = req.body.username;

	if (username == undefined || user.username !== username ) {
		return res.status(400).send();
	}
	try {
	  const rows = await db("tasks").where("username", username);
	  console.log("Data extracted, sending");
	  return res.status(200).send({data: rows})
	} catch (error) {
	  console.error("An error occurred while retrieving data: ", error);
	  return res.status(500).send();
	}
};
