import express from 'express'
import { getAllTransactions, createTransaction } from '../controllers/transactionControllers.js'

const router = express.Router()

router.get("/", getAllTransactions)
// router.get("/:id", getOneTransaction)
router.post("/", createTransaction)
// router.put("/:id", updateTransaction)
// router.get("/:id", deleteTransaction)

export default router