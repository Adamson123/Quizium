import jwt from "jsonwebtoken";

export const handleTokenAndCookie = async (id, res) => {
  const token = jwt.sign({ id }, "SECRET_KEY", { expiresIn: "15d" });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite: "lax", // Use lowercase 'none'
    secure: process.env.NODE_ENV === "production", // Use secure in production
    path: "/", // Cookie available site-wide
  });
};
