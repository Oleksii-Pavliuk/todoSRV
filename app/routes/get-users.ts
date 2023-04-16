import { Request, Response } from "express";

// Local modules
import { User } from "../middleware/gen-token"
import {db } from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function getUsers(req: Request, res : Response) {

	let user : User = req.body.tokenUser
	console.log(user)
	if(!user.admin){
		return res.sendStatus(403)
	}

	try {
	  const rows = await db("users").select('*')
	  return res.status(200).json(rows);
	} catch (err) {
	  const error_msg = `An error occurred while retrieving data: ${err}`;
	  console.error(error_msg)
	  return res.status(500).send();
	}
};
