import mongoose, { Schema, Document,ObjectId } from "mongoose";

export interface User extends Document {
    _id:ObjectId;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    created_at: Date;
    updated_at: Date;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const UserModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User',UserSchema);

export default UserModel;