import React from 'react'
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'

const SummaryCards = () => {
  return (
        <div className='max-w-6xl mx-auto'>     
    <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-7'>
    <Card>
    <CardHeader className={"font-bold text-xl"}> 
        Income
    </CardHeader>
        <CardContent className={"text-gray-600"}>How much you've earned</CardContent>
        <CardContent className={"font-bold text-2xl text-green-700"}>₦1,100,000</CardContent>
    </Card>
    <Card size=''>
    <CardHeader className={"font-bold text-xl"}> 
        Expenses
    </CardHeader>
        <CardContent className={"text-gray-600"}>How much you've spent</CardContent>
        <CardContent className={"font-bold text-2xl text-red-600"}>₦730,000</CardContent>
    </Card>
    <Card size=''>
    <CardHeader className={"font-bold text-xl"}> 
        Balance
    </CardHeader>
        <CardContent className={"text-gray-600"}>How much money you have left</CardContent>
        <CardContent className={"font-bold text-2xl text-green-700"}>₦370,000</CardContent>
    </Card>
        </div>
    </div>
        
  )
}

export default SummaryCards