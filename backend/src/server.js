import path from "path";
import { fileURLToPath } from "url";
import express from "express"
import { connectDB } from "./config/db.js"
import dotenv from 'dotenv'
// import cors from 'cors'
import cookieParser from 'cookie-parser'
import transactionRoutes from './routes/transactionRoutes.js'
import authRoutes from './routes/authRoutes.js'


dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()



app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));

app.use('/api/transactions', transactionRoutes)
app.use('/api/auth', authRoutes)

const frontendPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));

app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
        return next();
    }

    res.sendFile(path.join(frontendPath, "index.html"));
});

connectDB().then(() => {
    app.listen(3000, () => { 
        console.log(`Server running on PORT ${3000}`);    
    })
})
