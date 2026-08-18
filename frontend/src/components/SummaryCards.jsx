import React, { useEffect } from 'react'
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/lib/utils'


const SummaryCards = ({summary, loadingSummary}) => {



  return (
        <div className='max-w-6xl mx-auto'>     
    <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-7'>
    <Card className={'cursor-pointer border-none hover:shadow-xl transition duration-300'}>
    <CardHeader className={"font-bold text-xl"}> 
        Income
    </CardHeader>
    {
        loadingSummary ? 
        (
            <>
            <CardContent className={"text-gray-600"}>Getting Income Summary</CardContent>
            <CardContent className={""}><Spinner/></CardContent>
            </>
        ) : (
            <>
            <CardContent className={"text-gray-600"}>How much you've earned</CardContent>
            <CardContent className={"font-bold text-2xl text-green-700"}>₦{summary?.totalIncome?.toLocaleString() ?? 0}</CardContent>
            </>
        )
    }
    </Card>
    <Card className={'cursor-pointer border-none hover:shadow-xl transition duration-300 '}>
    <CardHeader className={"font-bold text-xl"}> 
        Expenses
    </CardHeader>
        {
        loadingSummary ? 
        (
            <>
            <CardContent className={"text-gray-600"}>Getting expense summary</CardContent>
            <CardContent className={""}><Spinner/></CardContent>
            </>
        ) : (
            <>
            <CardContent className={"text-gray-600"}>How much you've spent</CardContent>
            <CardContent className={"font-bold text-2xl text-red-600"}>₦{summary?.totalExpense?.toLocaleString() ?? 0}</CardContent>
            </>
        )
    }
    </Card>
    <Card className={'cursor-pointer border-none hover:shadow-xl transition duration-300'}>
    <CardHeader className={"font-bold text-xl"}> 
        Balance
    </CardHeader>
        {
        loadingSummary ? 
        (
            <>
            <CardContent className={"text-gray-600"}>Getting Balance</CardContent>
            <CardContent className={""}><Spinner/></CardContent>
            </>
        ) : (
            <>
            <CardContent className={"text-gray-600"}>How much money you have left</CardContent>
            <CardContent className={"font-bold text-2xl text-green-700"}>₦{summary?.balance?.toLocaleString() ?? 0}</CardContent>
            </>
        )
    }
    </Card>
        </div>
    </div>
        
  )
}

export default SummaryCards