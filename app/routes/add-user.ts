import { Request, Response } from "express";
import { QueryResult } from "pg";
// Local modules
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
	  const rows = await selectQuery;
	  console.log("Data extracted, sending");
	  return res.status(200).send({ data: rows });
	} catch (error) {
	  console.error("An error occurred while retrieving data: ", error);
	  return res.status(500).send();
	}
  };
 