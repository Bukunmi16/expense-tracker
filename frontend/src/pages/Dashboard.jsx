import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import SummaryCards from '@/components/SummaryCards'
import TablesComponent from '@/components/TransactionTableComponent'
import AddTransactionDialog from '@/components/AddTransactionDialog'
import { api } from '@/lib/utils'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { LogOut, User, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Dashboard = () => {

  const [data, setData] = useState([])
  const [summary, setSummary] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isLoadingTransactions, setIsLoadingTransactions] = useState();
  const [isLoadingSummary, setIsLoadingSummary] = useState();
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {logout, user} = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () =>{
    toast(`Are you sure you want to log out, ${user.name}? 🥺`,
        {
          position: 'top-center',
          action: {
            label: "Yes",
            onClick: async () =>{
                  await logout()
                  navigate('/signin')    
            }
          }
  })
  }

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
    <main className='flex flex-col max-w-7xl'>
        <div className='p-3 md:p-6 shadow w-full mx-auto flex justify-between items-center '>
        <div className='flex gap-3 items-center'>
        <div className='font-bold text-md sm:text-3xl hidden md:block'>Expense Tracker</div>
            <div className="cursor-pointer inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 shadow-sm">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
        {user.name?.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm font-medium">{user.name}</span>
    </div>
        </div>

        <div className='flex gap-2'>

        <AddTransactionDialog 
        onTransactionAdded={getTransactions}
        refreshSummary={getSummary}
        transaction={selectedTransaction}
        capitalize={capitalizeWords}
        resetTransaction={closeEdit}
        open={open} 
        setOpen={setOpen}
        />

      <Button variant="ghost" onClick={handleLogout}><LogOut className="h-4 w-4" /><p className='md:block hidden'>Logout</p></Button>
        </div>
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