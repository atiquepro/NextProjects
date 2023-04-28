import User from '../models/user'
import { hashPassword, comparePassword } from '../helpers/auth'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { name, email, password, secret } = req.body
    if(!name) return res.status(400).send("Name is required")
    if(!email) return res.status(400).send("Email is required")
    if(!password || password.length < 6) 
        return res
                .status(400)
                .send("Password is required or must be greater than 6 characters")
    if(!secret) return res.status(400).send("Answer is required")
    const exist = await User.findOne({email})
    if(exist) return res.status(400).send("Email is taken")

    //hash password

    const hashedPassword = await hashPassword(password)
    const user = new User({name, email, password:hashedPassword, secret})
    try{
        await user.save()
        console.log(user);
        return res.json({
            ok: true
        })
    }
    catch (err){
        console.log("Register Failed =>", err);
        return res.status(400).send("Error")
    }

}

export const login = async(req, res) =>{
    try{
        const {email, password} = req.body
        //check if db has the email
        const user = await User.findOne({email})
        if(!user) return res.status(400).send("Email not found")
        //check password
        const match = await comparePassword(password, user.password)
        if(!match) return res.status(400).send("Password incorrect")
        //create signed token
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})
        user.password=undefined
        user.secret=undefined
        res.json({
            token,
            user
        })

    }
    catch(err){
        return res.status(400).send("Error occured. Try again.")
    }
}