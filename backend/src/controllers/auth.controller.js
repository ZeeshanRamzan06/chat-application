import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'

export const signup = async (req,res) => {
    const {fullname, email, password} = req.body;
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"password must be atleast 6 characters"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already exist"})
        }
        const salt =await bcrypt.genSalt(10)
        const hashPassword =await bcrypt.hash(password,salt)
        const newUser = new User({
            fullname,
            email,
            password:hashPassword
        })
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic

            })
        }else{
            res.status(400).json({message:"Invalid User data"})
        }
    } catch (error) {
        console.log("Error in signup controller",error.message)
      return  res.status(500).json({message:"Internal Server Error"})
    }
}

export const login =async (req,res) => {
    const {email, password} =req.body;

    try {
        const user =await  User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Credential"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credential"})
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic

        })
    } catch (error) {
        console.log("Error in login credentials" ,error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout = (req,res) => {
    try {
        res.cookie("jwt", "",{maxAge:0});
        res.status(200).json({message:"Logout successfully"})
    } catch (error) {
        console.log('Error in logout Controlerl',error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const updateProfile  = async (req,res) =>{
    try {
        const {profilePic} = req.body;
        const userId =req.user._id;

        if(!profilePic){
            res.status(400).json({message:"Profile pic is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updateUser)
    } catch (error) {
        console.log("error in update profile:" , error.message)

        res.status(500).json({message:"Internal Server Error"})
    }
}

export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth Controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}