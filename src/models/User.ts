import {model, Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: String;
    password: String;
    createdAt: Date;
    refreshToken?: String;
    params: any;
}

export const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 

const DefaultUser = model<IUser>("User", UserSchema);

export default DefaultUser;
