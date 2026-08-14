import express from "express"
import { connectDB } from "./config/db.js"
import dotenv from 'dotenv'
import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config()

const app = express()

const PORT = 5000

app.use(express.json())

app.use('/api/transactions', transactionRoutes)


connectDB().then(() => {
    app.listen(PORT, () => { 
        console.log(`Server running on PORT ${PORT}`);    
    })
})
