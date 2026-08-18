import React from 'react'
import { Link } from 'react-router'
import { NotebookIcon, PlusIcon, DollarSignIcon } from 'lucide-react'
import { Button } from './ui/button'

const NoTransaction = ({setOpen}) => {
  return (
    <div>
         <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-black shadow rounded-full py-6 px-7.5 ">
        <p className="font-bold text-3xl text-center text-white">₦</p>
      </div>
      <h3 className="text-2xl font-bold">No Transactions Yet</h3>
      <p className="text-base-content/70 text-sm mx-2">
        Ready to track your expenses? Click the button below to get started 
      </p>
            <Button onClick={() => setOpen(true)}>
            <PlusIcon/> Add Transaction
            </Button>
    </div>
    </div>
  )
}

export default NoTransaction
