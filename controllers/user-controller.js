import User from "../model/User"
import bcrypt from 'bcryptjs'

export const getAllusers = async(req, res, next) => {
    let users
    try{
        users = await User.find()
    }catch(err){
        return console.log(err)
    }
    if(!users){
        return res.status(400).json({message: "Users not found"})
    }
    return res.status(200).json({users})
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body
    let existingUser
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "User already exists ! Login instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword
    })

    try{
        await user.save()
    }catch(err){
        return console.log(err);
    }
    return res.status(201).json({user})
}

export const login = async (req, res, next) => {
    const {email, password} = req.body
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message: "The user is not registered ! please signup first"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    console.log(isPasswordCorrect);
    if(!isPasswordCorrect){
        return res.status(404).json({message:"The password is incorrect"})
    }
    return res.status(200).json({message:"Login successfull", user: existingUser})
    
}