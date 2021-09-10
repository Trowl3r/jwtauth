import { Request, Response, Router } from "express";
import { Model } from "mongoose";
import { IUser } from "../models/User";

export async function register(
  req: Request,
  res: Response,
  User: Model<IUser>,
  onlyEmail: boolean = false,
  params: any
) {
  const { name, email, password } = req.body;
  const searchQuery = onlyEmail ? {$or: [{email}]} : {$or: [{email, name}]};
  try {
    let user: Model<IUser> = await User.findOne(searchQuery);

    if (user) {
      let error: String;
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
}
