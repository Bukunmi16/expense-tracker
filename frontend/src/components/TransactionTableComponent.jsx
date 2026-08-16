import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



const TablesComponent = () => {

    const transactions = [
  {
    id: 1,
    date: "Aug 15, 2026",
    description: "Lunch",
    category: "Food",
    type: "expense",
    amount: 2500,
  },
  {
    id: 2,
    date: "Aug 14, 2026",
    description: "Salary",
    category: "Salary",
    type: "income",
    amount: 200000,
  },
  {
    id: 3,
    date: "Aug 13, 2026",
    description: "Fuel",
    category: "Transport",
    type: "expense",
    amount: 15000,
  },
];

  return (
    <div>
    <div className='w-xl md:w-6xl mx-auto' >
    <div className='rounded-md border my-5' >
        <Table>
            <TableHeader className={'bg-black '}>
                <TableRow>
                    <TableHead className={'text-white rounded-tl-md'}>Date</TableHead>
                    <TableHead className={'text-white'}>Description</TableHead>
                    <TableHead className={'text-white'}>Category</TableHead>
                    <TableHead className={'text-white'}>Type</TableHead>
                    <TableHead className={"text-right text-white  rounded-tr-md "}>Amount</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                { transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                         <TableCell>{transaction.category}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className={'text-right'} >₦{transaction.amount.toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    </div>

    </div>
  )
}

export default TablesComponent