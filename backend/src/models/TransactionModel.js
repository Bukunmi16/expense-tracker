import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    description : {
        type: String,
        required: [true, 'Description is required']
    },
    amount : {
        type: Number,
        required: [true, 'Amount is required'],
        min: [10, 'Amount must be over NGN10.00']
    },
    type : {
        type: String,
        required: [true, 'Type is required'],
        enum: {
           values: ['income', 'expense'],
           message: ['Type must be income or expense']
        }
    },
    category : {
        type: String,
        required: [true, 'Category is required'],
    },

}, {timestamps: true})

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction