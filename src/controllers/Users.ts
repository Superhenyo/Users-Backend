import { Request, Response } from "express";
import {
    checkEmailExists,
    registerUser,
    loginUser,
    getProfile,
    updateProfile,

} from "../services/Users";
import { createAccessToken } from "../middleware/auth";
import exp from "constants";



export const handleCheckEmailExists = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' })
    }
    try {
        const emailExist = await checkEmailExists(email);
        if (emailExist) {
            return res.status(200).json(true);
        } else {
            return res.status(404).json(false);
        }
    } catch (error) {
        console.error('Error in controller checkemail', error);
        return res.status(500).json({ message: 'Error in controller checkemail' });
    }
};

export const handleRegister = async (req: Request, res: Response) => {

    const { userID, firstName, lastName, email, password } = req.body;

    if (!userID || !firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Incomplete data" });
    }

    try {
        await registerUser({
            userID,
            firstName,
            lastName,
            email,
            password
        })
        return res.status(200).json({ message: 'Registration Successful' });
    } catch (error: unknown) {
        console.log("Error in controller handleRegisterAdminStaff", error);
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Unexpected Error" })
    }
}

export const handleLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Incomplete data" });
        return;
    }

    try {
        const isLogin = await loginUser(
            email,
            password
        )

        if (!isLogin) {
            res.status(400).json({ message: "Unsuccessful login" })
            return;
        }

        res.send({
            access: createAccessToken({
                userId: isLogin.userId,
                email: isLogin.email,
                role: isLogin.role
            })
        })
        return;
    } catch (error) {
        console.log("Error in controller handleLogin", error)
        res.status(500).json({ message: "An internal server error occurred" })
        return;
    }
}

export const handleGetProfile = async (req: Request, res: Response): Promise<void> => {
    // Ensure `req.user` exists and contains the ID
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                status: 'fail',
                messsage: 'ID parameter is required'
            });
            return;
        }

        const userProfile = await getProfile(id)

        if (!userProfile) {
            res.status(400).json({
                status: 'fail',
                message: `User with ID ${id} not found.`,
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            data: userProfile
        });
    } catch (error) {
        console.error('Error fetching user profile"', error);
        res.status(500).json({
            status: 'error',
            message: 'An internal server error occured.'
        });
    }
};

export const handleUpdateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId

        const { firstName, lastName, password } = req.body
        await updateProfile(userId, {
            firstName: firstName,
            lastName: lastName,
            password: password
        })
        res.status(200).json({ message: "Update Successful" })
        return;
    } catch (error) {
        console.log(Error)
        throw new Error("Unexpected error at handleUpdateProfile ")
    }
}

export const handleDeleteUser = async (req: Request, res: Response) => {

}



