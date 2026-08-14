import express from "express"
import { connectDB } from "./config/db.js"
import dotenv from 'dotenv'
import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config()

const app = express()



app.use(express.json())

app.use('/api/transactions', transactionRoutes)


connectDB().then(() => {
    app.listen(3000, () => { 
        console.log(`Server running on PORT ${3000}`);    
    })
})
