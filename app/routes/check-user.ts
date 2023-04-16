import { Request, Response } from "express";
// Local modules
import {db} from "../db/postgres-connection"
import { generateAccessToken, User } from "../middleware/gen-token";

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
	  const rows: User[] = await selectQuery;
	  if (rows.length !== 1) return res.sendStatus(404)
	  console.log("Data extracted, sending");
	  return res.status(200).send({data: rows, token: generateAccessToken(rows[0])})
	} catch (error) {
	  console.error("An error occurred while retrieving data: ", error);
	  return res.status(500).send();
	}
};
