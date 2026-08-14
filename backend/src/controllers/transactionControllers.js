import Transaction from '../models/TransactionModel.js'

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1})
        res.status(200).json(transactions)
    } catch (error) {
        res.status(400).json({message: 'Error fetching all transactions', error})
    }
}

export const createTransaction = async (req, res) => {
    try {
        const {description, amount, type, category} = req.body
        const transaction = new Transaction({description, amount, type, category})
        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction)

    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Error recording transaction', error});
    }
}