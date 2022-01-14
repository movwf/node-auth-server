import { Router } from "express";
import {
  login_user,
  register_user,
  check_session,
  check_browser,
} from "../controllers/authController";

const router = Router();

/*
  Auth Routes
  - login <POST>
  - register <POST>
  - check <GET> Session Check
  - browser <GET> Browser Authorization Check
*/

router.post("/login", login_user);
router.post("/register", register_user);
router.get("/check", check_session);
router.get("/browser", check_browser);

const authRouter = router;
export default authRouter;
