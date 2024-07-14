import mongoose,{Schema,Document,ObjectId} from "mongoose";

export interface Session extends Document{
    _id:ObjectId;
    userId:ObjectId;
    refreshToken:String;
    expiresAt:Date;
}

const SessionSchema:Schema<Session>=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    refreshToken:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true
    }
});

const SessionModel=(mongoose.models.Session as mongoose.Model<Session>) || mongoose.model<Session>('Session',SessionSchema);

export default SessionModel;