import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generarJWT(usuario_id, rol) {
  const payload = { usuario_id, rol };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
}