"use client";
import { getTopProductApi } from "@/lib/api";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ProductType } from "@/types/product";

export default function Home() {
  const [dataHotSale, setDataHotSale] = useState<ProductType[]>([])
  const [dataNewArrival, setDataNewArrival] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const responseData1: ProductType[] = await getTopProductApi("hot-sales", 6)
      setDataHotSale(responseData1);
      const responseData2: ProductType[] = await getTopProductApi("new-arrivals", 6)
      setDataNewArrival(responseData2)
    }
    fetchData();
  }, [])

  

  return (
    <main>
      <div className="relative h-[580px] my-6">
        <Image src="/image/young-friends-sitting-curb-city.svg" alt="Studio Collection" layout="fill" objectFit="cover" />
        <div className="absolute inset-x-0 bottom-10 text-center text-white pb-12">
          <div className="text-2xl text-white font-light">
            <span>SPRING SUMMER</span>
          </div>
          <div className="text-4xl text-white ">
            <span>TELL ME MORE</span>
          </div>
          <div className="mt-4">
            <Link
              href={{
                pathname: '/search',
                query: { tags: ['men'] },
              }}
              className="btn mr-2 bg-white text-black hover:bg-gray-200 hover:text-black text-base"
            >
              SHOP MEN
            </Link>
            <Link
              href={{
                pathname: '/search',
                query: { tags: ['women'] },
              }}
              className="btn bg-white text-black hover:bg-gray-200 hover:text-black text-base"
            >
              SHOP WOMEN
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-10">
        {dataHotSale.map((product, index) => (
              <Link 
              key={product.id} 
              href={`/product/${product.id}`} 
              className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 relative block"
            >
              <div className="w-11/12 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <Image
                  src={product.imgDisplay[0].url}
                  alt={product.productName}
                  className="h-full w-full object-contain"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{product.productName}</h3>
                <p className="text-gray-500 text-sm mt-2">{product.detail?.company}</p>
                <h4 className="text-lg text-gray-700 font-bold mt-4">{product.price}đ</h4>
              </div>
              <div className="flex mt-[5px] flex-row justify-center gap-1 justify-self-center">
                {product.color.map((value: string, index) => (
                  <div
                    key={index}
                    className="border-[3px] border-indigo-500/75 w-[30px] h-[30px]"
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
            </Link>
        ))}

      </div>

      <div className="relative h-[580px] my-6">
        <Image src="/image/image-collection.svg" alt="Studio Collection" layout="fill" objectFit="cover" />
        <div className="absolute inset-x-0 bottom-10 text-center text-white pb-12">
          <div className="text-2xl font-light">
            <span>NEW IN</span>
          </div>
          <div className="text-4xl">
            <span>STUDIO COLLECTION</span>
          </div>
          <div className="mt-4">
            <Link
              href={{
                pathname: '/search',
                query: { tags: ['new-arrival'] },
              }}
              className="btn bg-white text-black hover:bg-gray-200 hover:text-black text-base">SHOP NOW</Link>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-10">
  {dataNewArrival.map((product, index) => (
    <Link 
      key={product.id} 
      href={`/product/${product.id}`} 
      className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 relative block"
    >
      <div className="w-11/12 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
        <Image
          src={product.imgDisplay[0].url}
          alt={product.productName}
          className="h-full w-full object-contain"
          width={100}
          height={100}
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800">{product.productName}</h3>
        <p className="text-gray-500 text-sm mt-2">{product.detail?.company}</p>
        <h4 className="text-lg text-gray-700 font-bold mt-4">{product.price}đ</h4>
      </div>
      <div className="flex mt-[5px] flex-row justify-center gap-1 justify-self-center">
        {product.color.map((value: string, index) => (
          <div
            key={index}
            className="border-[3px] border-indigo-500/75 w-[30px] h-[30px]"
            style={{ backgroundColor: value }}
          />
        ))}
      </div>
    </Link>
  ))}
</div>

    </main>
  );
}
