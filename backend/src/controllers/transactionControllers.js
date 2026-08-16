import Transaction from '../models/TransactionModel.js'

export const getTransactionSummary = async (req, res) => {
    try {
        const incomeTransactions = await Transaction.find({type: "income"})
        
        const totalIncome = incomeTransactions.reduce(
            (total, transaction) => total + transaction.amount, 0);
        console.log(totalIncome)

        const expenseTransactions = await Transaction.find({type: "expense"})
        
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

        const transactions = await Transaction.find().skip(skipNum).limit(limitNum).sort({ createdAt: -1})
        
        // Counting Documents, Total Pages etc.

        const total = await Transaction.countDocuments()
        const totalPages = Math.ceil(total/limitNum)
        
        res.status(200).json({
            transactions,
            page: pageNum,
            limit: limitNum,
            total,
            totalPages
        })
        console.log(transactions)
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
        const transaction = new Transaction({
            description: description.toLowerCase(), 
            amount, 
            type: type.toLowerCase(),
            category: category.toLowerCase()})
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