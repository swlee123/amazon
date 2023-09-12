import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import dynamic from 'next/dynamic'

const Table = dynamic(() => import("../components/ProductFeed"), {
ssr: false,
});


export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* Header Component */}
      <Header></Header>

      {/* Scroller Banner */}
      <main className="max-w-screen-2xl mx-auto">
        {/* banner */}
        <Banner></Banner>
        {/* product feed */}
        <ProductFeed products={products}></ProductFeed>
    
      </main>

      
    </div>
  );
}

// function name must be exactly same 
export async function getServerSideProps(context){
  const products = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
  );

  return {
    props:{
      products,
    },
  };
}

// get request this api  https://fakestoreapi.com/products
