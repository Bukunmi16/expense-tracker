import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from '@/components/ui/button'; 
import { PlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';


const AddTransactionDialog = ({onTransactionAdded, refreshSummary, transaction, capitalize, resetTransaction, open, setOpen }) => {
    
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [initialFormData, setiInitialFormData] = useState({
        description: "",
        amount: "",
        type: "",
        category: ""
    })

    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        type: "",
        category: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!formData.category.trim() || !formData.amount || formData.amount < 0 || !formData.description.trim() || !formData.type.trim() ){
            toast.warning('Kindly fill out all fields. Thank you!')
        }

        setLoading(true)

        try {
            
            if (transaction) {
             await api.put(`/transactions/${transaction._id}`, {
            ...formData, 
            amount: Number(formData.amount),
         })   
        } else{    
            await api.post('/transactions', {
                ...formData, 
                amount: Number(formData.amount),
            }) 
        }
        setFormData(initialFormData)
        setOpen(false)
        resetTransaction()
         toast.success(`Transaction ${transaction ? 'Updated' : 'Saved'} Successfully`)
         onTransactionAdded()
         refreshSummary()
        } catch (error) {
            toast.error(`Failed to ${transaction ? 'Update' : 'Save'} Transaction`)
          console.log('error');
        } finally {
            setLoading(false)
        }
    }

    // console.log(formData);
    // Update Form Data for Update

    useEffect(() => {
        if(transaction) {
            setFormData({
                description: transaction.description,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category
            })
            setOpen(true)
        }
    }, [transaction])
    


    return (
    <div >
        <Dialog open={open} onOpenChange={
            (value) => {
                setOpen(value)
                setFormData(initialFormData)
                if (!value && transaction) {
                    resetTransaction()
                }
            }
        }>
            <DialogTrigger asChild>
              <Button >
                 <PlusIcon  /> <p className='hidden md:block'> Add Transaction</p>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{transaction ? 'Edit Transaction': 'Add a Transaction'}</DialogTitle>
                    <DialogDescription>
                    {
                    transaction ? "Edit your account transaction" : "Add a new Income or Expense to your Account"
                    }
                    </DialogDescription>
                </DialogHeader>
    <form onSubmit={handleSubmit}>

    <div className='mb-5 '>
    <div className='mb-5  '>
        <Label className='mb-2' htmlFor="description">Description</Label>
        <Input
        id="description"
        name="description"
        placeholder="e.g. Bought Groceries"
        value={formData.description}
        onChange={handleChange}
        />
    </div>
    <div>
        <Label htmlFor="amount" className='mb-2'>Amount</Label>
        <Input
        id="amount"
        name="amount"
        type="number"
        placeholder="e.g. ₦5,000"
        value={formData.amount}
        onChange={handleChange}
        />
    </div>
    
    <div className='my-5'>
        <Label className={"mb-2"}>Transaction Type</Label>
        <Select  
        value={capitalize(formData.type)}
        onValueChange={ (value) => (
                setFormData((prev) => ({
                    ...prev, 
                    type : value,
                    category: ""
                })))}>
  <SelectTrigger>
    <SelectValue placeholder="Select type of Transaction" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
        <SelectItem value="Income" >Income</SelectItem>
        <SelectItem value="Expense" >Expense</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
    
    </div>
    <div >
        <Label className={"mb-2"}>Category</Label>
        <Select  
        value={capitalize(formData.category)}
        onValueChange={ (value) => (
                setFormData((prev) => ({
                    ...prev, 
                    category: value
                })))}>
  <SelectTrigger>
    <SelectValue placeholder="Select Category of Transaction" />
  </SelectTrigger>
  <SelectContent>
            <SelectGroup>

                 {formData.type === "Income" ? (
                     <>
          <SelectItem value="Salary">Salary</SelectItem>
          <SelectItem value="Freelance">Freelance</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
          <SelectItem value="Investment">Investment</SelectItem>
          <SelectItem value="Gift">Gift</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </>
      ) : (
          <>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Transport">Transport</SelectItem>
          <SelectItem value="Church">Church</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Family">Family</SelectItem>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="Education">Education</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </>
      )}
      </SelectGroup>

      </SelectContent>
</Select>
    </div>

      <Button disabled={loading} className={'mt-5 w-full'} type="submit">{loading ? `${transaction ? 'Updating' : 'Adding'} your Transaction...` : `${transaction ? 'Update' : 'Add'} your Transaction`}</Button>
    </div>
          </form>
        </DialogContent>


    </Dialog>
    </div>
  )
}

export default AddTransactionDialog