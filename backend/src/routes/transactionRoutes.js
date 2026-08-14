import express from 'express'
import { getAllTransactions, createTransaction, searchTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionControllers.js'

const router = express.Router()

router.get("/", getAllTransactions)
router.post("/", createTransaction)
router.get("/:id", searchTransaction)
router.put("/:id", updateTransaction)
router.delete("/:id", deleteTransaction)

export default router