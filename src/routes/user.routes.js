import { upload } from "../middlewares/multer.middleware.js";
import { registerUser,loginUser, logoutUser,refreshAccessToken} from "../controllers/user.controller.js";
import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Ensure correct field names: "avatar" and "coverImage"

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
export default router;
