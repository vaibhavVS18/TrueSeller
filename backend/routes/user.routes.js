import {Router} from "express";
import {body} from "express-validator";
import * as userController from "../controllers/user.controller.js"
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", 
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({min:4 }).withMessage("password must be atleast 4 characters long"),
    userController.createUserController
);


router.post("/login",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({min:4 }).withMessage("password must be atleast 4 characters long"),
    userController.loginUserController
);


router.get("/profile",
    authMiddleware.authUser,
    userController.ProfileController
);


router.post("/logout", 
    authMiddleware.authUser,
    userController.logoutController
)

export default router;