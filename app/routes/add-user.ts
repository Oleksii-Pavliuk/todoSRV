import { Request, Response } from "express";

// Local modules
import {generateAccessToken, User } from "../middleware/gen-token"
import {db} from "../db/postgres-connection"



/* =================
   ROUTE HANDLER
================== */
export async function addUser(req: Request, res : Response) {
	const { username, password } = req.body;
	if (!username || !password) {
	  return res.status(400).send();
	}
	const insertQuery = db("users").insert({ "username":username,"password": password });
	const selectQuery = db("users").where("username", username);
	
	try {
	  await insertQuery;
	  const rows: User[] = await selectQuery;
	  console.log("Data extracted, sending");

	  return res.status(200).send({ data: rows, token: generateAccessToken(rows[0]) });
	} catch (error) {
	  console.error("An error occurred while retrieving data: ", error);
	  return res.status(500).send();
	}
  };
 