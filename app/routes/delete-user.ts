import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
import {db} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function deleteUser(req: Request, res : Response) {


	let username = req.body.username;
	if (username == undefined) {
		return res.status(400).send();
	}		
  
	try {
	  
	  await db('users').where({ "username": username }).del();
	  return res.status(200).send('ok')
	} catch (error) {
	  console.error("An error occurred while deleting data: ", error);
	  return res.status(500).send();
	}
};
