import express from 'express'
import { register, login, logout } from '../controllers/authControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/me', protect, (req,res) => {
    res.status(200).json({
        message: 'You are authenticated',
        user: req.user
    })
} )
router.post('/register', register )
router.post('/login', login )
router.post('/logout', logout )


export default router