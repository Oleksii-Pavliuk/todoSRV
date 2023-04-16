import cors from "cors";

//Local modules
import config from "../config/config";

const CORS_ORIGIN = config.get("origin");

// Middleware function to handle CORS
export const corsOptions: cors.CorsOptions = {
	origin: CORS_ORIGIN as unknown as string,
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
