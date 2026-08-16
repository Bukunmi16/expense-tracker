import express from 'express'
import { getAllTransactions, createTransaction, searchTransaction, updateTransaction, deleteTransaction, getTransactionSummary } from '../controllers/transactionControllers.js'

const router = express.Router()

router.get("/", getAllTransactions)
router.post("/", createTransaction)
router.get("/summary", getTransactionSummary)
router.get("/:id", searchTransaction)
router.put("/:id", updateTransaction)
router.delete("/:id", deleteTransaction)

export default router