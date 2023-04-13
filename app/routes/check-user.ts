import { Request, Response } from "express";
// Local modules
import {db} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function checkUser(req: Request, res : Response) {


	let username = req.body.username;
	let password = req.body.password;
	if (username == undefined || password == undefined) {
		return res.status(400).send();
	}

	const selectQuery = db("users").where("username", username);
	
	try {
	  const rows = await selectQuery;
	  console.log("Data extracted, sending");
	  return res.status(200).send({data: rows})
	} catch (error) {
	  console.error("An error occurred while retrieving data: ", error);
	  return res.status(500).send();
	}
};
