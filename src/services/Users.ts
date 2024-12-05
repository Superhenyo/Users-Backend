import Users from '../models/Users';
import argon2 from 'argon2';
import { createAccessToken } from '../middleware/auth';

export const checkEmailExists = async (email: String): Promise<Boolean> => {
    try {
        const count = await Users.count({
            where: { email },
        });
        return count > 0;
    } catch (error) {
        console.error('Error checking email:', error);
        throw new Error("Unable to verify email")
    }
};

export const registerUser = async (user: {
    userID: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}): Promise<void> => {
    try {
        const { password, email, ...rest } = user;
        const emailExist = await checkEmailExists(email);
        if (emailExist) {
            throw new Error('Email is already in use'); // Provide a meaningful error message
        }
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
        });
        // Use hashedPassword instead of overwriting passwordHash
        const newAdminStaff = new Users({
            ...rest,
            email,
            password: hashedPassword, // Use the hashed password here
        });
        await newAdminStaff.save();
    } catch (error) {
        console.error("Error in service registerAdminStaff", error);
        throw error
    }
};

export const loginUser = async (email: string, password: string)=> {
    try {
        if (!email || !password) {
            console.log("Email or password is empty.");
            return null;
        }

        const findEmail = await Users.findOne({ where: { email } });

        if (!findEmail) {
            return null;
        }
        const isPasswordCorrect = await argon2.verify(findEmail.password, password);

        if (isPasswordCorrect) {
            return {
                userId: findEmail.userID,
                email: findEmail.email,
                role: findEmail.role
            }
        } else {
            console.log("Password is incorrect.");
            return null;
        }

    } catch (error) {
        console.error("Error in the loginAdminStaff service", error);
        return false;
    }
};

export const getProfile = async (userID: string): Promise<{
    success: boolean;
    data?: {
        userID: string,
        firstName: string,
        lastName: string,
        email: string,
        role: string
    };
    error?: string;
    }> => {
    try {
        // Find the user by userID
        const result = await Users.findOne({ where: { userID } });

        if (!result) {
            return {
                success: false,
                error: `User with ID ${userID} not found`
            }
        }
        const { password, ...safeResult } = result.get({ plain: true })

        return {
            success: true,
            data: safeResult
        }

    } catch (error) {
        console.error("Error in getProfile:", error);
        return {
            success: false,
            error: "An internal Error occur"
        }
    }
}

//fix
export const updateProfile = async (userID: string, userUpdates: {
    firstName?: string,
    lastName?: string,
    password?: string,
}): Promise<void> => {
    try{
        const userRecord = await Users.findOne({ where: {userID} })
        if(!userRecord){
            throw new Error(`User ID ${userID} not found.`);
        }
        if(userUpdates.password){
            userRecord.password = await argon2.hash(userUpdates.password,{
                type: argon2.argon2id,
            })
        }
        if(userUpdates.firstName){
            userRecord.firstName = userUpdates.firstName;
        }
        if(userUpdates.lastName){
            userRecord.lastName = userUpdates.lastName;
        }
        await userRecord.save();
    } catch(error){
        console.log("Error at update profile", error)
        throw new Error("Unexpected error occur.")
    }

        

}

// export const handleDeleteUser = async (user)




