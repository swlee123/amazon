import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key)

function convertpound(price){
    let poundFormatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    });
 
    let formattedAmount = poundFormatter.format(price);

    return formattedAmount
}





function Checkout() {
    const items = useSelector(selectItems);
    const session = useSession();
    const total = useSelector(selectTotal);

    const createCheckOutSession= async () => {
        const stripe = await stripePromise;

        // call backend to create checkout session

        const checkoutsession = await axios.post("/api/create-checkout-session",
        {
            items : items,
            email: session.data.user.email
        });


        // redirect to stripe checkout 

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutsession.data.id,
        });

        if(result.error) alert(result.error.message);

    }
  return (
    <div className='bg-gray-100 '>
        <Header></Header>

        <main className='lg:flex max-w-screen-2xl mx-auto'>
            {/* left */}

            <div className='flex-grow m-5 shadow-sm'>
                <Image 
                src="https://links.papareact.com/ikj"
                width={1020}
                height ={250}
                objectFit= "contain">
                </Image>

                <div className='flex flex-col p-10 space-y-10 bg-white'>
                    <h1 className='text-3xl border-b pb-4'>
                        {items.length === 0 
                        ? "Your Amazon Basket is empty."
                        : "Shopping Basket"}
                    </h1>

                    {items.map((item,i) => 
                        <CheckoutProduct
                        key = {i}
                        id = {item.id}
                        title = {item.title}
                        price = {item.price}
                        rating = {items.rating}
                        description = {item.description}
                        category = {item.category}
                        image = {item.image}
                        hasPrime = {item.hasprime}
                        ></CheckoutProduct>
                    )}
                </div>

                


            </div>
            {/* right */}

            <div className='flex flex-col bg-white p-10 shadow-md'>
                {items.length > 0 && (
                    <>
                        <h2 className='whitespace-nowrap'>
                            SubTotal ({items.length} items):
                            <span className='ml-2 font-bold'>
                                {convertpound(total)}

                            </span>
                        </h2>

                        <button 
                        role='link'
                        onClick={createCheckOutSession}
                        disabled = {!session}
                        className={`button mt-2 
                        ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}
                        `}
                        >
                            {!session ? "Sign in to checkout" : "Proceed to checkout"}
                        </button>
                        
                    </>    
                )}
            </div>


        </main>
    </div>
  )
}

export default Checkout