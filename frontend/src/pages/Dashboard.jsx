import React from 'react'
import SummaryCards from '@/components/SummaryCards'
import TablesComponent from '@/components/TransactionTableComponent'
import AddTransactionDialog from '@/components/AddTransactionDialog'

const Dashboard = () => {
  return (
    <main>
        <div className='p-6 shadow  mx-auto flex justify-between items-center '>
        <div className='font-bold text-xl sm:text-3xl'>Expense Tracker</div>
        <AddTransactionDialog/>
        </div>

        <SummaryCards/>
        <TablesComponent/>
    </main>
  )
}

export default Dashboard