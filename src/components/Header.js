import Image from "next/image";
import {MenuIcon,SearchIcon,ShoppingCartIcon,} 
from "@heroicons/react/outline";

function Header() {
  return (
    <header>
        {/* top nav */}
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image 
                src = "https://links.papareact.com/f90" 
                width={150} 
                height ={40}
                objectFit='contain'
                className='cursor-pointer'></Image>
            </div>

            {/* search bar */}
            <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
                <input type="text" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"/>
                <SearchIcon className="h-12 p-4"></SearchIcon>
            </div>

            {/* Right icons */}
            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                {/* account */}
                <div className="link">
                    <p>Hello Shang Wei</p>
                    <p className="text1">Account & List</p>
                </div>
                {/* orders */}
                <div className="link">
                    <p>Returns</p>
                    <p className="text1">& Orders</p>
                </div>
                {/* shopping cart */}
                <div className="relative link flex items-center">
                    <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-200 text-center rounded-full text-black font-bold">4</span>
                    <ShoppingCartIcon className="h-10"></ShoppingCartIcon>
                    <p className= "hidden md:inline text1 mt-2">Basket</p>
                </div>
            </div>
        </div>
        

        {/* bottom nav */}
        <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
            <p className="link flex items-center"> 
                <MenuIcon className="h-6 mr-1s"></MenuIcon>
                All 
            </p>

            <p className="link">Prime Video</p>
            <p className="link">Amazon Business</p>
            <p className="link ">Today's Deals</p>
            <p className="link hidden lg:inline-flex">Electronics</p>
            <p className="link hidden lg:inline-flex">Food & Grocery</p>
            <p className="link hidden lg:inline-flex">Prime</p>
            <p className="link hidden lg:inline-flex">Buy Again</p>
            <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
            <p className="link hidden lg:inline-flex">Health & Personal Care</p>
        </div>
    </header>
  )
}

export default Header