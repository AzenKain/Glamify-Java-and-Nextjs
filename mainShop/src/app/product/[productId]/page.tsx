"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getProductByIdApi } from "@/lib/api";
import { Backend_URL } from "@/lib/Constants";
import { ProductType, IImage } from "@/types/product";

export default function Product({ params }: { params: { productId: string } }) {
    const [productData, setProductData] = useState<ProductType | null>(null);
    const [mainDisplay, setMainDisplay] = useState<IImage>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductByIdApi(params.productId);
            setProductData(data);
            setMainDisplay(data?.imgDisplay[0]);
        };
        fetchData();
    }, [params.productId]);

    return (
        <div className="font-[sans-serif] mt-20 mx-10">
            <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="text-center">
                        <Image
                            width={400}
                            height={400}
                            src={mainDisplay?.url ?? ""}
                            alt="Product Main"
                            className="lg:w-11/12 w-full h-full rounded-xl object-cover"
                        />
                        <div className="flex flex-wrap gap-4 justify-center mt-6">
                            {productData?.imgDisplay.map((product, index) => (
                                <button
                                    onClick={() => setMainDisplay(product)}
                                    key={index}
                                    className={`w-20 rounded-xl ${mainDisplay === product ? 'outline' : ''}`}
                                >
                                    <Image width={400} height={400} src={product.url} alt={`Product ${index + 1}`} className="w-full h-full" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{productData?.productName} | {productData?.productType}</h2>
                        <p className="text-sm text-gray-400 mt-2">{productData?.detail?.company}</p>
                        <hr className="my-8" />
                        <p className="text-3xl font-bold text-gray-800">{productData?.cost}đ</p>
                        <hr className="my-8" />
                        <h3 className="text-lg font-bold text-gray-800">Size</h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {productData?.size.map((value, index) => (
                                <button key={index} className="w-12 h-12 border-2 font-bold text-sm rounded-full flex items-center justify-center">
                                    {value.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <hr className="my-8" />
                        <h3 className="text-lg font-bold text-gray-800">Color</h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {productData?.color.map((value, index) => (
                                <button key={index} className="w-12 h-12 border-4 rounded-full" style={{ backgroundColor: value }}></button>
                            ))}
                        </div>
                        <hr className="my-8" />
                    </div>
                </div>
                <div className="mt-24 w-fit">
                    <h3 className="text-gray-800 font-bold text-sm bg-gray-100 py-3 px-8 border-b-2 border-gray-800">Description</h3>
                    <div className="mt-8" dangerouslySetInnerHTML={{ __html: productData?.description ?? "" }} />
                </div>
            </div>
        </div>
    );
}
