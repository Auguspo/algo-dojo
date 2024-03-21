import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function lougoutHandler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: " no token" });
  }

  try {
    verify(myTokenName, process.env.JWT_SECRET);
    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("logout succesfully");
  } catch (e) {
    return res.status(401).json({ error: "Invalid Token" });
  }
}
