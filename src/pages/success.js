import React from 'react'
import Header from '../components/Header'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router';

function success() {
    const router = useRouter();
  return (
    <div className='bg-gray-100 h-screen'>
        <Header></Header>
        <main className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col p-10 bg-white'>
                <div className='flex items-center spce-x-2 mb-5'>
                    <CheckCircleIcon className='text-green-500 h-10'></CheckCircleIcon>
                    <h1 className='text-3xl'>Thank You, your order has been comfirmed!</h1>
                </div>
                <p>
                    Thank you for shopping with Amazon. A comfirmation email will be sent when then item has shipped.
                    If you like to check the status of your orders, please press the link below.
                </p>
                <button onClick={()=>router.push('/orders')} className='button mt-8'>Go to my order</button>
            </div>
        </main>
    </div>
    
  )
}

export default success