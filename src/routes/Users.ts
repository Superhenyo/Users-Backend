import express, {Express, Request, Response} from "express";
import { handleCheckEmailExists, 
        handleRegister,
        handleLogin,
        handleGetProfile,
        handleUpdateProfile
        } from "../controllers/Users"
import {verify, verifyAdmin} from "../middleware/auth"
const UserRouter = express.Router();


UserRouter.post("/checkEmail", async(req: Request, res: Response) => {
    try {
        await handleCheckEmailExists(req, res);
    } catch(error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

UserRouter.post("/register", async(req: Request, res: Response) => {
    try {
        await handleRegister(req, res);
    } catch(error) {
        console.error("error in routes adminStaff", error)
    }
})

UserRouter.post("/login", handleLogin)

UserRouter.get("/profile/:id", verify, handleGetProfile)

UserRouter.post("/updateUser", verify, handleUpdateProfile)




export default UserRouter;