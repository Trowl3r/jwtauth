import { sign } from "jsonwebtoken";

export function generateAccessToken(
  userId: string,
  secret: string,
  time: string
): string {
  return sign({ userId }, secret, { expiresIn: time });
}

export function generateRefreshToken(userId: string, secret: string): string {
  return sign({ userId }, secret);
}
