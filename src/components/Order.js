import React from 'react'
import moment from 'moment'

function convertpound(price){
    let poundFormatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    });
 
    let formattedAmount = poundFormatter.format(price);

    return formattedAmount
}

function Order({id,amount,amountShipping,items,timestamp,images}) {
  return (
    <div className='relative border rounded-md'>
        <div className='flex items-cente space-x-10 p-5 bg-gray-100
        text-sm text-gray-600'>
            <div>
                <p className='font-bold text-sx'>ORDER PLACED</p>
                <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
            </div>
            
            <div>
                <p className='text-xs font-bold'> TOTAL</p>
                <p>
                    {convertpound(amount)} - Next Day Delivery 
                    {convertpound(amountShipping)}
                </p>
            </div>

            <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue'>
                {items.length} items
            </p>

            <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-sx whitespace-nowrap'>ORDER # {id}</p>
        </div>

        <div className='p-5 sm:p-10'> 
            <div className='flex space-x-6 overflow-x-auto'>
                {images.map(image => (
                    <img src={image} alt="" className='h-20 object-contain sm:32'/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Order