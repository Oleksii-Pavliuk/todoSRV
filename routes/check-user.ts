import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
import {postgreQuery} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function checkUser(req: Request, res : Response) {


	let username = req.body.username;
	let password = req.body.password;
	if (username == undefined || password == undefined) {
		return res.status(400).send();
	}
	const selectStmt = 'SELECT * FROM users WHERE username = $1';
  
	try {
	  const result = await postgreQuery(selectStmt, [username]);
	  const rows = result.rows;
	  console.log("Data extracted, sending");
	  return res.status(200).send({data: rows})
	} catch (error) {
	  console.error("An error occurred while retrieving data: ", error);
	  return res.status(500).send();
	}
};
