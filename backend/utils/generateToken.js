import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    })
}