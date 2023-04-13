import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
import {postgreQuery} from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function getUsers(req: Request, res : Response) {

	const query = 'SELECT * FROM users';
	
	try {
	  const result: QueryResult = await postgreQuery(query, []);
	  const rows = result.rows;
	  return res.status(200).json(rows);
	} catch (err) {
	  const error_msg = `An error occurred while retrieving data: ${err}`;
	  console.error(error_msg)
	  return res.status(500).send();
	}
};
