import { Request, Response } from "express";

// Local modules
import {User } from "../middleware/gen-token"
import {db} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function deleteUser(req: Request, res : Response) {

	let user: User = req.body.tokenUser
	let username = req.body.username;
	if (username == undefined || user.username !== username) {
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
