import Transaction from '../models/TransactionModel.js'
import { protect } from '../middleware/authMiddleware.js';

export const getTransactionSummary = async (req, res) => {
    try {
        const incomeTransactions = await Transaction.find({user: req.user._id, type: "income"})
        
        const totalIncome = incomeTransactions.reduce(
            (total, transaction) => total + transaction.amount, 0);
        console.log(totalIncome)

        const expenseTransactions = await Transaction.find({user: req.user._id, type: "expense"})
        
        const totalExpense = expenseTransactions.reduce(
            (total, transaction) => total + transaction.amount, 0);
        console.log(totalExpense)

        res.json({
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            balance: totalIncome - totalExpense
        })
    
    } catch (error) {
        res.status(400).json({message: 'Error getting transaction summary', error})
    }
}

export const getAllTransactions = async (req, res) => {
    try {
        const {page = 1, limit = 5} = req.query
        const limitNum = Number(limit) //query parameter not a route parameter
        const pageNum = Number(page)
        const skipNum = (pageNum - 1) * limitNum

        const transactions = await Transaction.find({user: req.user._id}).skip(skipNum).limit(limitNum).sort({ createdAt: -1})
        
        // Counting Documents, Total Pages etc.

        const total = await Transaction.countDocuments({user: req.user._id})
        const totalPages = Math.ceil(total/limitNum)
        
        res.status(200).json({
            transactions,
            page: pageNum,
            limit: limitNum,
            total,
            totalPages
        })
        // console.log(transactions)
    } catch (error) {
        res.status(400).json({message: 'Error fetching all transactions', error})
    }
}
export const searchTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({user: req.user._id, id: req.params._id});
        res.status(200).json({
            message: 'Found Transaction',
            transaction
        })
    } catch (error) {
        res.status(400).json({message: 'Error searching for transaction', error})
    }
}

export const createTransaction = async (req, res) => {
    try {
        const {description, amount, type, category} = req.body
        const transaction = await Transaction.create({
            description, 
            amount, 
            type: type.toLowerCase(),
            category: category.toLowerCase(),
            user: req.user._id
        })

            res.status(201).json(transaction)

    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Error recording transaction', error});
    }
}

export const updateTransaction = async (req, res) => {
    try {
        const {description, amount, type, category} = req.body
        const transaction = await Transaction.findOne({user: req.user._id, _id:req.params.id})
        
        if(!transaction) return res.status(404).json({message : 'Cannot Find Transaction'})
            
            transaction.description = description 
            transaction.amount = amount
            transaction.type =  type.toLowerCase(),
            transaction.category = category.toLowerCase()

            await transaction.save()
        

        res.status(200).json(
            {
            message: 'Transaction Updated Successfully',
            transaction: transaction 
            },
        )
        
    } catch (error) {
        res.status(400).json({message: 'Failed to Delete Transaction'})
        console.log(error);
    }
}

export const deleteTransaction = async (req, res) => {
    try {
        const {id} = req.params
        const transaction = await Transaction.findOne({user: req.user._id, _id:req.params.id})

        if(!transaction) return res.status(404).json({message : 'Cannot find Transaction'})
        
            await transaction.deleteOne()

        res.status(200).json({message : "Transaction Deleted Successfully"})
        
    } catch (error) {
        res.status(400).json({message: 'Failed to Delete Transaction'})
        console.log(error);        
    }
}