import React, { useState } from 'react'
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

const AddTransactionDialog = () => {
    
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

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
    }

    // console.log(formData);
    

    return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
              <Button>
                 <PlusIcon/> Add Transaction
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Transaction</DialogTitle>
                    <DialogDescription>
                    Add a new Income or Expense to your Account
                    </DialogDescription>
                </DialogHeader>
    <form onSubmit={handleSubmit}>

    <div className='mb-5'>
    <div className='my-5'>
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
        value={formData.type}
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
        value={formData.category}
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

      <Button className={'mt-5 w-full'} type="submit">Add Transaction</Button>
    </div>
          </form>
        </DialogContent>


    </Dialog>
    </div>
  )
}

export default AddTransactionDialog