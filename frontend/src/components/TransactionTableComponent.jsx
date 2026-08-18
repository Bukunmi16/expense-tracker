import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/utils';
import { useState } from 'react'; 
import NoTransaction from './NoTransaction';
import PaginationControls from './PaginationControls';
import { Card, CardContent } from '@/components/ui/card';

const TablesComponent = ({data, onTransactionAdded, refreshSummary, onEdit, capitalize, isLoadingTransactions, setOpen, totalPages, setPage, page }) => {
    
  const transactions = data
  
  // Format Functions
  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}



    // Requests
    const handleDelete = (e, id, type) => {
      e.stopPropagation()
       toast(`Are you sure you want to delete this ${type}?`,
        {
          position: 'top-center',
          action: {
            label: "Yes",
            onClick: async () => {
try {
  await api.delete(`/transactions/${id}`)
  toast.success('Transaction Deleted Succesfully')
  onTransactionAdded()
  refreshSummary()
} catch (error) {
    console.log(error);
    toast.error('Error Deleting Transaction. Please try again')
      }
            },
          },
        })


    } 

    console.log(totalPages);
    
  return (

    isLoadingTransactions ? (<div className='text-center p-3'>
        Loading Transactions...
    </div>
    ) :(
    transactions?.length === 0 && !isLoadingTransactions ? <NoTransaction setOpen={setOpen}/> :
    // Desktop Table
    <div>

    <div className='hidden md:block'>
    <div className='w-xl md:w-6xl mx-auto' >
      <div className='rounded-md border my-5' >
        <Table  >
            <TableHeader className={''}>
                <TableRow>
                    <TableHead className={'text-black text-center font-bold rounded-tl-md'}>Date</TableHead>
                    <TableHead  className={' text-black font-bold'}>Description</TableHead>
                    <TableHead className={'text-black font-bold'}>Category</TableHead>
                    <TableHead className={'text-black font-bold'}>Type</TableHead>
                    <TableHead className={"text-black font-bold  rounded-tr-md "}>Amount</TableHead>
                    <TableHead className={"text-center text-black font-bold  rounded-tr-md "}>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                 { transactions.map((transaction) => (
                    <TableRow 
                    key={transaction.id}
                    onClick={() => onEdit(transaction)}
                    className={' cursor-pointer'}>
                        <TableCell className={'text-center'}>{formatDate(transaction.createdAt)}</TableCell>
                        <TableCell className={'max-w-37.5 truncate'}>{transaction.description}</TableCell>
                         <TableCell>{capitalize(transaction.category)}</TableCell>
                        <TableCell>{capitalize(transaction.type)}</TableCell>
                        <TableCell className={` ${transaction.type == 'income' ? 'text-green-600' : 'text-red-600'} font-bold` } >₦{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell className={'text-center'}>
                          <button className='p-4 shadow rounded-full'  onClick={(e) => handleDelete(e, transaction._id, transaction.type)}>

                            <Trash2Icon size={20} color='black'/>
                          </button>
                        </TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
            
        </Table>

    </div>
                  { totalPages > 1 &&  <PaginationControls 
                setPage={setPage}
                page={page}
                totalPages={totalPages}
                />}
    </div>

    </div>
    {/* Mobile View */}
            <div className="md:hidden p-4 m-3 grid  grid-cols-1 sm:grid-cols-2 gap-4">
          
          {transactions.map((transaction) => (
            
                    <div onClick={() => onEdit?.(transaction)} className="cursor-pointer shadow-sm py-2 rounded-xl">
      <div className="p-3">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1">{transaction.description}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(transaction.createdAt)} &middot; {capitalize(transaction.category)}
            </p>
          </div>
          <p
            className={`text-sm font-semibold ${
              transaction.type === 'income' ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            { transaction.type === 'income' ? "+" : "-"}{transaction.amount.toLocaleString()}
          </p>
        </div>

        <div className="mt-2 flex justify-end">
          <button
            onClick={(e) => {
              handleDelete?.(e, transaction._id);
            }}
            aria-label="Delete transaction"
          >
            <Trash2Icon className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
          ))}

             { totalPages > 1 &&  <PaginationControls 
                setPage={setPage}
                page={page}
                totalPages={totalPages}
                />}

            </div>
    </div>

  )
  )
}

export default TablesComponent