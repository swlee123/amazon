import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux';
import { addToBasket,removeFromBasket } from '../slices/basketSlice';

function convertpound(price){
    let poundFormatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    });
 
    let formattedAmount = poundFormatter.format(price);

    return formattedAmount
}

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime
}) {

  const dispatch = useDispatch();

  const addItemToBasket = () =>{

    const product = {
        id,
        title,
        price,
        rating,
        description,
        category,
        image,
        hasPrime
    };
    dispatch(addToBasket(product))
  };

  const removeItemFromBasket = () =>{
    dispatch(removeFromBasket({ id }))
  }
  return (
    <div className='grid grid-cols-5'>

        <Image src={image} height={200} width ={200} objectFit='contain'></Image>
        
        <div className='col-span-3 mx-5'>
            <p>{title}</p>
            <div className='flex'>
                {Array(rating).fill().map((_,i) => (
                    <StarIcon key={i} className='h-5'  fill='#ecc94b' stroke=''></StarIcon>
                ))
            }
            </div>

            <p className='text-xs my-2 line-clamp-3'>{description}</p>

            <p> {convertpound(price)}</p>

            {hasPrime && (
                <div className='flex items-center space-x-2'>
                    <img className = "w-12" src="prime_tag.png" alt="prime img" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
        </div>

        {/* Right add/remove buttons  */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button className='button' onClick={addItemToBasket}>Add to Basket</button>
            <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct