import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
    const {name, email, password} = req.body

    const existingUser = await User.findOne({email})
                if(existingUser){
            return res.status(400).json({
                message: 'User already exists'
            })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
     
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword
    })

    res.status(200).json({
        message: 'User Created Successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })
        } catch (error) {
            res.status(500).json({
                message: 'Failed to Create User', error
            })
        }
} 


export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            res.status(400).json({
                message: 'Email or password is incorrect. Please try again.'
            })
        }

        const isPasswordCorrect = await bcrypt.compare( password, user.password)

        if(!isPasswordCorrect){
                res.status(400).json({
                message: 'Email or password is incorrect. Please try again.'
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: 'Login Successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error
        })
    }
} 

export const logout = async (req, res) => { 
    try {
    res.cookie("token" , "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message: 'Logged Out Successfully'
    })

    } catch (error) {
    res.status(400).json({
        message: 'Error Logging Out'
    })    
    }
}