import mongoose from "mongoose"

const chatRoomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            sender:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            content:{
                type:String,
                required:true
            },
            timeStamp:{
                type:Date,
                default:Date.now()
            }
        }
    ]
})


export const ChatRoom=mongoose.model("ChatRoom",chatRoomSchema)