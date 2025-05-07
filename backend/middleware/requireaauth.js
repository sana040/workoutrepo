import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
//FGDsas12@
const requireAuth = async (req, res, next) => {
  const secret = "hfdg341C@13SAD#@!";

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, secret);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
