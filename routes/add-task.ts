import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
import {postgreQuery} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function addTask(req: Request, res : Response) {


	let name = req.body.name;
	let description = req.body.description;
    let username = req.body.username;
	if (username == undefined || name == undefined || description == undefined) {
		return res.status(400).send();
	}

	const insertStmt = 'INSERT INTO tasks (name, description, username ) VALUES ($1, $2, $3)';
  
	try {
	  const result = await postgreQuery(insertStmt, [name,description,username]);
	  const rows = result.rows;
	  console.log("Data extracted, sending");
	  return res.status(200).send({data: rows})
	} catch (error) {
	  console.error("An error occurred while retrieving data: ", error);
	  return res.status(500).send();
	}
};
