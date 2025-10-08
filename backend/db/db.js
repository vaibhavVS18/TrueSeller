import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const connect = async()=>{
    try{
        // await mongoose.connect(process.env.MONGO_URI,{
        //     useNewUrlParser: true,         // Makes the connection string parsing more stable.
        //     useUnifiedTopology: true    // Uses the new MongoDB driver's unified topology layer for better performance.
        // });
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch(err){
        console.error("MongoDB connection error:", err.message);
        process.exit(1);    //Exit the Node.js process with a failure code (1).
    }
}


export default connect;