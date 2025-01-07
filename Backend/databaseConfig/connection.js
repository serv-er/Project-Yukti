import mongoose from 'mongoose';

export const connection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"YUKTI"
    }).then(()=>{
        console.log("Database connected");
    }).catch((err)=>{
        console.log(`Some error occured while connecting to the database ${err}`);
    })
    
}