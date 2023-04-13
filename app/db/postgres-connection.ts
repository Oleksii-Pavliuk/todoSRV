import { QueryResult } from "pg";
import Knex, { Knex as KnexType} from 'knex';
import config from "../config/config";
import { Config } from "convict";

// Define the type for the `configs` parameter
type KnexConfigs = Config<any>;

// Create a type for the `db` object to ensure that it's always a Knex instance
export let db: KnexType;

// createUnixSocketPool initializes a Unix socket connection pool for
// a Cloud SQL instance of Postgres.
const createUnixSocketPool = async (configs?: KnexConfigs): Promise<KnexType> => {
  // Use the `config` module to read the environment variables
  const pgUser = config.get("pguser");
  const pgPassword = config.get("pgpassword");
  const pgDatabase = config.get("pgdatabase");
  const pgHost = config.get("pghost");

  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const knex = Knex<KnexType.Config>({
    client: 'pg',
    connection: {
      user: pgUser,
      password: pgPassword,
      database: pgDatabase,
      host: pgHost,
    },
    // ... Specify additional properties here.
    ...configs,
  });

  // Assign the `knex` instance to the `db` variable
  db = knex;

  return knex;
};

// Call `createUnixSocketPool` to initialize the `db` object
createUnixSocketPool();


