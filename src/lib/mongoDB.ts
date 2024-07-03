import mongoose from "mongoose";

type connectionObject= {
    isConnected?:number;
}

const connection:connectionObject={};

async function mongoDB(){
    if(connection.isConnected){
        console.log('Already connected to the database');
        return;
    }
    try{
        const db=await mongoose.connect(process.env.MONGODB_URI || '');

        connection.isConnected=db.connections[0].readyState;

        console.log('Database connected successfully');
    }
    catch(err){
            console.log(`Database Connection Is Failed ${err}`);
            process.exit();
    }
}