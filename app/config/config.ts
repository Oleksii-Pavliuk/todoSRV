import convict, { Schema } from "convict";

interface IConfigSchema {
	port: number;
	origin: string;
	jwtkey: string;
	jwtrefreshkey: string;
	pguser: string;
	pghost: string;
	pgport: number;
	pgdatabase: string;
	pgpassword: string;
}

const config: convict.Config<IConfigSchema> = convict({
	port: {
		doc: "The port to bind.",
		format: "port",
		default: 3000,
		env: "PORT",
		arg: "port",
	},
	origin: {
		doc: "Allowed CORS servers",
		format: String,
		default: "*",
		env: "ORIGIN",
		arg: "origin",
	},
	jwtkey : {
		doc: "String key to create JWT",
		format: String,
		default: null,
		env: "AUTH_TOKEN",
		arg: "jwtkey",
	},
	jwtrefreshkey : {
		doc: "String key to refresh JWT",
		format: String,
		default: null,
		env: "REFRESH_TOKEN",
		arg: "jwtrefreshkey",
	},
	pguser: {
		doc: "The postgres user that the application will use",
		format: String,
		default: null,
		env: "PGUSER",
		arg: "pguser",
	},
	pghost: {
		doc: "The host of the postgres server",
		format: "*",
		default: "35.197.171.99",
		env: "PGHOST",
		arg: "pghost",
	},
	pgport: {
		doc: "The port on which the postgres database will be listening",
		format: "port",
		default: 5432,
		env: "PGPORT",
		arg: "pgport",
	},
	pgdatabase: {
		doc: "The name of the postgres databse",
		format: String,
		default: "postgres",
		env: "PGDATABASE",
		arg: "pgdatabase",
	},
	pgpassword: {
		doc: "The password for the postgres database",
		format: String,
		default: null,
		env: "PGPASSWORD",
		arg: "pgpassword",
		sensitive: true,
	},
} as unknown as Schema<IConfigSchema>);


config.loadFile(`./config/development.json`);
config.validate({ allowed: "strict" });

export default config;
