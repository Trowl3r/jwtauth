import {model, Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: String;
    password: String;
    createdAt: Date;
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
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 

const User = model<IUser>("User", UserSchema);

export default User;
