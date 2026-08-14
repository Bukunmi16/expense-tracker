import Transaction from '../models/TransactionModel.js'

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1})
        res.status(200).json(transactions)
        console.log(transactions)
        console.log(req.query)
    } catch (error) {
        res.status(400).json({message: 'Error fetching all transactions', error})
    }
}
export const searchTransaction = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id);
        const transaction = await Transaction.findById(id);
        res.status(200).json(transaction ? transaction : {message : 'Transaction Not Found'})
    } catch (error) {
        res.status(400).json({message: 'Error searching for transaction', error})
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

export const updateTransaction = async (req, res) => {
    try {
        const {description, amount, type, category} = req.body
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.param.id, {description, amount, type, category}, {new: true})
        
        if(!updatedTransaction) return res.status(404).json({message : 'Error Updating Transaction'})
        
        res.status(200).json(updateTransaction, {message: 'Transaction Updated Successfully'})
        
    } catch (error) {
        
    }
}

export const deleteTransaction = async (req, res) => {
    try {
        const {id} = req.params
        const deletedTransaction = await Transaction.findByIdAndDelete(id)
        
        if(!deletedTransaction) return res.status(404).json({message : 'Error Deleting Transaction'})
        
        res.status(200).json(deletedTransaction, {message : "Transaction Deleted Successfully"})
        
    } catch (error) {
        
    }
}