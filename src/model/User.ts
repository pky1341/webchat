import mongoose, { Schema, Document, ObjectId, Model } from "mongoose";

export interface IUser extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    created_at: Date;
    updated_at: Date;
}

export type UserModel = Model<IUser, {}>;

const UserSchema: Schema<IUser, UserModel> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username must not exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"],
        lowercase: true,
        validate: {
            validator: (value: string) => {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            }
        },
        message: "Please use a valid email address",
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false,
});

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

const UserModel = (mongoose.models.User as UserModel) || mongoose.model<IUser, UserModel>('User', UserSchema);

export default UserModel;