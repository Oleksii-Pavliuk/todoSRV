import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
import {postgreQuery} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function deleteUser(req: Request, res : Response) {


	let username = req.body.username;
	if (username == undefined) {
		return res.status(400).send();
	}
	const deleteStmt = 'DELETE FROM users WHERE username =  $1';
  
	try {
	  await postgreQuery(deleteStmt, [username]);
	  return res.status(200).send('ok')
	} catch (error) {
	  console.error("An error occurred while deleting data: ", error);
	  return res.status(500).send();
	}
};
