import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface OTP extends Document {
    _id: ObjectId;
    email: String;
    otp: String;
    createdAt: Date;
}

const OTPSchema:Schema<OTP>=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
        expires: 90
    },
});

const OTPModel=(mongoose.models.OTP as mongoose.Model<OTP>) || mongoose.model<OTP>('OTP',OTPSchema);
export default OTPModel;