import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const user = verify(myTokenName, process.env.JWT_SECRET);
    console.log(user);

    if (!user || !user.email || !user.username) {
      return res.status(401).json({ error: "Invalid token content" });
    }

    return res.json({ email: user.email, username: user.username });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}
