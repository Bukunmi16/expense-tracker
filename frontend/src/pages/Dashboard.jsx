import React, { useEffect, useState } from 'react'
import SummaryCards from '@/components/SummaryCards'
import TablesComponent from '@/components/TransactionTableComponent'
import AddTransactionDialog from '@/components/AddTransactionDialog'
import { api } from '@/lib/utils'

const Dashboard = () => {

  const [data, setData] = useState([])
  const [summary, setSummary] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isLoadingTransactions, setIsLoadingTransactions] = useState();
  const [isLoadingSummary, setIsLoadingSummary] = useState();
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const getTransactions = async () => {
    setIsLoadingTransactions(true)
    try {
        const res = await api.get(`/transactions?page=${page}&limit=5`)
        setData(res.data.transactions)
        const totalPages = res.data.totalPages
        setTotalPages(totalPages)
        
       if (page > totalPages && totalPages > 0) {
        setPage(totalPages);
        }
        
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoadingTransactions(false)
    }
  }

  
      const getSummary = async () => {
        setIsLoadingSummary(true)
        try {
          const res = await api.get('/transactions/summary')
          setSummary(res.data)  
          // console.log(res);
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoadingSummary(false)
        }
      }
  
      const handleEdit = async (transaction) => {
        setSelectedTransaction(transaction)
        console.log(selectedTransaction);
      } 
      const closeEdit = async () => {
        setSelectedTransaction(null)
      } 

      //Format Funcs
        const capitalizeWords = (str) => {
      
         if (!str || typeof str !== 'string') return ''; 

  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
      
      
      useEffect(() => {
        getTransactions()
        getSummary()
  }, [page])

  return (
    <main>
        <div className='p-3 md:p-6 shadow  mx-auto flex justify-between items-center '>
        <div className='font-bold text-sm sm:text-3xl'>Expense Tracker</div>
        
        <AddTransactionDialog 
        onTransactionAdded={getTransactions}
        refreshSummary={getSummary}
        transaction={selectedTransaction}
        capitalize={capitalizeWords}
        resetTransaction={closeEdit}
        open={open} 
        setOpen={setOpen}
        />
        </div>
        <SummaryCards 
        summary={summary}
        loadingSummary={isLoadingSummary}
        />
        <TablesComponent 
        onEdit={handleEdit}
        onTransactionAdded={getTransactions}
        refreshSummary={getSummary}
        data={data}
        capitalize={capitalizeWords}
        isLoadingTransactions={isLoadingTransactions}
        open={open} 
        setOpen={setOpen}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
  />
    </main>
  )
}

export default Dashboard