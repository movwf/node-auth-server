import { Router } from "express";

import authRouter from "./auth";
import jwtRouter from "./jwt";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/jwt", jwtRouter);

export default routes;
