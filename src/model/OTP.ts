import mongoose, { Schema, Document, ObjectId, Model } from "mongoose";

export interface IOTP extends Document {
    _id: ObjectId;
    email: String;
    password: string;
    otp: String;
    createdAt: Date;
}

const OTPSchema: Schema<IOTP> = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        otp: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 4,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 90,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

OTPSchema.index({email:1,createdAt:1})

const OTPModel:Model<IOTP> =
    (mongoose.models.OTP as Model<IOTP>) ||
    mongoose.model<IOTP>("OTP", OTPSchema);
export default OTPModel;
