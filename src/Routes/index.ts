import { Request, Response } from "express";
import { Model } from "mongoose";
import DefaultUser, { IUser } from "../models/User";
import { genSalt, hash } from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";
import { catch500 } from "../utils/errors";
import { ValidationError, Result, validationResult } from "express-validator";

//Make it a only Register email route
export async function register(
  req: Request,
  res: Response,
  expireTime: string,
  secret: string,
  User: Model<IUser> = DefaultUser,
  errorString: string = "User with the same E-Mail found."
) {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array });
  }

  const { email, password } = req.body;
  try {
    let user: IUser | null = await User.findOne({ email });

    if (user) {
      return res.status(401).json({ msg: errorString });
    }

    user = new User(req.body);

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    const accessToken: string = generateAccessToken(
      user.id,
      "secret",
      expireTime
    );
    const refreshToken: string = generateRefreshToken(user.id, secret);

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    catch500(res, err);
  }
}

export async function registerCustomQuery(
  req: Request,
  res: Response,
  expireTime: string,
  secret: string,
  userGiven: IUser | null,
  User: Model<IUser> = DefaultUser,
  errorString: string = "User with the same E-Mail found."
) {
  const { password } = req.body;
  try {
    let user: IUser | null = userGiven;
    if (user) {
      return res.status(401).json({ msg: errorString });
    }

    user = new User(req.body);

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    const accessToken: string = generateAccessToken(
      user.id,
      "secret",
      expireTime
    );
    const refreshToken: string = generateRefreshToken(user.id, secret);

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    catch500(res, err);
  }
}
