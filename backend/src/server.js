import express from "express"
import { connectDB } from "./config/db.js"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import transactionRoutes from './routes/transactionRoutes.js'
import authRoutes from './routes/authRoutes.js'

const PORT = process.env.PORT || 3000

dotenv.config()

const app = express()



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/transactions', transactionRoutes)
app.use('/api/auth', authRoutes)


connectDB().then(() => {
    app.listen(PORT, () => { 
        console.log(`Server running on PORT ${PORT}`);    
    })
})
