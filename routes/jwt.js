import { Router } from "express";
import {
  check_browser,
  check_jwt,
  login_user,
  register_user,
  validateJWT,
} from "../controllers/jwtController";

const router = Router();

/*
  JWT Routes
  - login <POST>
  - register <POST>
  - check <GET> JWT Check
  - browser <GET> Browser Authorization Check
*/

router.post("/login", login_user);
router.post("/register", register_user);
router.get("/check", validateJWT, check_jwt);
router.get("/browser", validateJWT, check_browser);

const jwtRouter = router;
export default jwtRouter;
