import { Request } from "express";
import { IUser } from "../models/User";

export default interface AuthRequest extends Request {
    user?: IUser;
}