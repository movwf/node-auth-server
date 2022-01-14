require("dotenv-safe").config();
import cors from "cors";
import express from "express";
import routes from "./routes";
import session from "express-session";

import db from "./config/db";
import { corsOptions } from "./config/cors";
import { sessionOptions } from "./config/session";

import logColors, { logSuccess } from "./config/logColors";

const app = express();
db.connect();

app.set("trust proxy", 1);
app.use(session(sessionOptions));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`
   █████╗ ██╗   ██╗████████╗██╗  ██╗     █████╗ ██████╗ ██╗
  ██╔══██╗██║   ██║╚══██╔══╝██║  ██║    ██╔══██╗██╔══██╗██║
  ███████║██║   ██║   ██║   ███████║    ███████║██████╔╝██║
  ██╔══██║██║   ██║   ██║   ██╔══██║    ██╔══██║██╔═══╝ ██║
  ██║  ██║╚██████╔╝   ██║   ██║  ██║    ██║  ██║██║     ██║
  ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝     ╚═╝  
  `);
  logSuccess("Authentication Server v1.0.0");
  console.log(
    logColors.BgCyan,
    logColors.FgBlack,
    `App started @ localhost:${PORT}`,
    logColors.Reset
  );
});
