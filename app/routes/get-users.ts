import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
import {db } from "../db/postgres-connection"

/* =================
   ROUTE HANDLER
================== */
export async function getUsers(req: Request, res : Response) {

	
	try {
	  const rows = await db("tasks").select('*')
	  return res.status(200).json(rows);
	} catch (err) {
	  const error_msg = `An error occurred while retrieving data: ${err}`;
	  console.error(error_msg)
	  return res.status(500).send();
	}
};
