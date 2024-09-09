import jwt from "jsonwebtoken";

export const handleTokenAndCookie = async (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: "10d",
    });

    res.cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // Use secure in production
        path: "/", // Cookie available site-wide
    });
};
