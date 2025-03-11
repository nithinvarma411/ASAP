import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        if (!user) {
            console.log("User not found");
            return
        }
        const accessToken = user.generateAccessToken()
        if (!accessToken) {
            console.log("Access token not generated");
            return 
        }
        const refreshToken = user.generateRefreshToken()

        if (!refreshToken) {
            console.log("Refresh token not generated");
            return
        }

        console.log(accessToken, refreshToken, user._id);

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.error("Error generating access and refresh tokens:", error);
    }
}

const register = async (req, res) => {
    const {userName, email, password} = req.body;

    if (!(userName && email && password)) {
        return res.send({"message": "all fields are required"});
    }

    const user = await User.findOne({email});

    if (user) {
        return res.status(404).send({"message": "user exist already"});
    }

    const newUser = new User({
        userName,
        email,
        password
    })

    try {
        await newUser.save();
        return res.status(200).send(newUser);
    } catch (error) {
        console.error("error registering user", error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((field) => field.trim() === "")) {
        return res.status(400).send({ message: "EMAIL AND password ARE REQUIRED" });
    }

    const checkUser = await User.findOne({email});

    if (!checkUser) {
        return res.status(404).send({ message: "USER DOES NOT EXIST" });
    }

    const isPasswordCorrect = await checkUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(401).send({ message: "INVALID PASSWORD" });
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(checkUser._id);
    const loggedInUser = await User.findById(checkUser._id).select("-password");

    console.log(accessToken, refreshToken, loggedInUser);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    

    return res.status(200).send({
        message: "USER LOGGED IN",
        user: loggedInUser,
        accessToken,
        refreshToken
    })
};

export {login, register, generateAccessAndRefereshTokens}