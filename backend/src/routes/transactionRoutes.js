import express from 'express'
import { getAllTransactions, createTransaction, searchTransaction, updateTransaction, deleteTransaction, getTransactionSummary } from '../controllers/transactionControllers.js'
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router()

router.get("/", protect, getAllTransactions)
router.post("/", protect, createTransaction)
router.get("/summary", protect, getTransactionSummary)
router.get("/:id", protect, searchTransaction)
router.put("/:id", protect, updateTransaction)
router.delete("/:id", protect, deleteTransaction)

export default router