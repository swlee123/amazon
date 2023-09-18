import React, { useState } from 'react'
import Image from 'next/legacy/image'
import { StarIcon } from '@heroicons/react/outline'
import {useDispatch} from "react-redux"
import { addToBasket } from '../slices/basketSlice'

const MAX_RATING = 5
const MIN_RATING = 1

function convertpound(price){
    let poundFormatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    });
 
    let formattedAmount = poundFormatter.format(price);

    return formattedAmount
}



function Product({id,title,price,description,category,image}) {

    const dispatch = useDispatch();
    const [rating] = useState(
        Math.floor(Math.random()*(MAX_RATING-MIN_RATING+1)) + MIN_RATING
    );

    const [hasprime] = useState(Math.random() < 0.5)

    const additemtobasket = () =>{
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            hasprime

        };

        // sending product as an action to the redux store (basket slice)
        dispatch(addToBasket(product))

    }

    return (
        
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>

        <p className='absolute top-2 right-2 text-xs italic text-gray-100s'>{category}</p>

        <Image src={image} height={200} width={200} objectFit='contain'></Image>
        <h4>{title}</h4>

        <div className='flex'>
            {Array(rating).fill().map((_,i) => (
                <StarIcon className='h-5'  fill='#ecc94b' stroke=''></StarIcon>
            ))}
        </div>

        <p className='text-xs my-2 line-clamp-2'>{description}</p>

        <div className='mb-5'>
            <p>{convertpound(price)}</p>
        </div>

        
        {hasprime && (
            <div className='flex items-center space-x-2 mt-5'>
                {/* image link not working find another one */}
                {/* put locally first later see how */}
                <img className = "w-12" src="prime_tag.png" alt="prime img" />
                <p className='text-xs text-gry-500'> FREE Next-day delivery</p>
            </div>
        )}

        <button onClick = {additemtobasket} className='mt-auto button'>Add to Basket</button>
        



    </div>
  )
}

export default Product