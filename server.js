require("dotenv-safe").config();
import cors from "cors";
import express from "express";
import routes from "./routes";
import session from "express-session";

import db from "./config/db";
import { sessionOptions } from "./config/session";

import logColors, { logSuccess } from "./config/logColors";

const app = express();
db.connect();

app.use(session(sessionOptions));

app.use(cors());
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
  logSuccess("Hotel Management Service v0.1.0");
  console.log(
    logColors.BgCyan,
    logColors.FgBlack,
    `App started @ localhost:${PORT}`,
    logColors.Reset
  );
});
