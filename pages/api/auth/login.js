import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";
import  disconnectDb  from "../../utils/connectDb"
import  connectDb  from "../../utils/connectDb"

export default async function loginHandler(req, res) {
  const { email, password } = req.body;

  try {
    const collection = await connectDb("usuarios");
    const user = await collection.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: user.email,
            user: user.username,
          },
          process.env.JWT_SECRET
        );
        const serialized = serialize("myTokenName", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialized);
        return res.json("login successfully");
      } else {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await disconnectDb();
  }
}