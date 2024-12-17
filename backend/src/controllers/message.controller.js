import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js";
import User from "../models/user.js";

export const getUserForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filterUsers)
    } catch (error) {
        console.error("Error in getUserForSidebar",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}


export const getMessages = async (req,res) =>{
    try {
        const   {id: userToChatId} = req.params
        const myId = req.user._id;

        const messages =await Message.find({
            $or :[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId},
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages Controller: ",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const sendMessages = async (req,res) =>{
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params
        const senderId =req.user._Id
    
        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl =uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
    
        await newMessage.save();
    // reatime functionality using socket.io
        res.status(200).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controler" ,error.message)
        res.status(500).json({error:"Internal Server Message"})

    }
}